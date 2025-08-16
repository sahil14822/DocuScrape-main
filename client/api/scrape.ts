import type { VercelRequest, VercelResponse } from '@vercel/node';
import puppeteer from 'puppeteer';
import PDFDocument from 'pdfkit';
import { z } from 'zod';

// Validation schema
const scrapeRequestSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  format: z.enum(["pdf", "docx"])
});

// In-memory storage (for demo purposes - in production use a database)
const scrapeJobs = new Map<string, any>();

async function scrapeWebsite(url: string) {
  console.log("Starting scrape for URL:", url);
  let browser;
  
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
    
    console.log("Navigating to URL...");
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
    console.log("Page loaded successfully");
    
    console.log("Starting page evaluation...");
    const result = await page.evaluate(() => {
      try {
        const title = document.title || "Untitled";
        const body = document.body;
        if (!body) {
          return { title, content: "No body element found" };
        }
        const content = body.innerText || body.textContent || "No content found";
        return { title, content: content.substring(0, 5000) };
      } catch (error) {
        return { title: "Error", content: "Error in page evaluation: " + error.message };
      }
    });
    
    console.log("Page evaluation completed successfully");
    return result;
  } catch (error) {
    console.error("Error in scrapeWebsite:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function generatePDF(title: string, content: string, url: string) {
  return new Promise<{ filename: string; pages: number; fileSize: number }>((resolve, reject) => {
    try {
      const sanitizedTitle = title.replace(/[^a-zA-Z0-9\s-]/g, "").replace(/\s+/g, "_");
      const filename = `${sanitizedTitle}.pdf`;
      
      const doc = new PDFDocument({
        size: "A4",
        margins: { top: 50, bottom: 50, left: 50, right: 50 }
      });
      
      const chunks: Buffer[] = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const pages = Math.ceil(content.length / 3000);
        
        resolve({
          filename,
          pages,
          fileSize: buffer.length
        });
      });
      
      doc.fontSize(20).font("Helvetica-Bold").text(title, { align: "center" });
      doc.moveDown();
      doc.fontSize(10).font("Helvetica").text(`Source: ${url}`, { align: "center" });
      doc.fontSize(10).text(`Generated: ${new Date().toLocaleDateString()}`, { align: "center" });
      doc.moveDown(2);
      doc.fontSize(12).font("Helvetica");
      
      const lines = content.split("\n");
      for (const line of lines) {
        if (line.trim()) {
          if (line.match(/^[A-Z][^.]*$/)) {
            doc.fontSize(14).font("Helvetica-Bold").text(line.trim());
            doc.moveDown(0.5);
            doc.fontSize(12).font("Helvetica");
          } else {
            doc.text(line.trim(), { align: "justify" });
            doc.moveDown(0.3);
          }
        } else {
          doc.moveDown(0.5);
        }
      }
      
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    const validatedData = scrapeRequestSchema.parse(req.body);
    const jobId = Math.random().toString(36).substring(7);
    
    // Create job
    const job = {
      id: jobId,
      url: validatedData.url,
      format: validatedData.format,
      status: "pending",
      progress: 0,
      createdAt: new Date(),
      completedAt: null
    };
    
    scrapeJobs.set(jobId, job);
    
    // Start processing in background
    processScrapingJob(jobId, validatedData.url, validatedData.format);
    
    res.status(200).json(job);
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({ message: error instanceof Error ? error.message : 'Invalid request' });
  }
}

async function processScrapingJob(jobId: string, url: string, format: string) {
  try {
    // Update job status
    const job = scrapeJobs.get(jobId);
    if (!job) return;
    
    job.status = "processing";
    job.progress = 10;
    scrapeJobs.set(jobId, job);
    
    // Scrape website
    const { title, content } = await scrapeWebsite(url);
    job.title = title;
    job.progress = 60;
    scrapeJobs.set(jobId, job);
    
    // Generate PDF
    const { filename, pages, fileSize } = await generatePDF(title, content, url);
    
    // Complete job
    job.status = "completed";
    job.progress = 100;
    job.filename = filename;
    job.pages = pages;
    job.fileSize = fileSize;
    job.completedAt = new Date();
    scrapeJobs.set(jobId, job);
    
  } catch (error) {
    console.error("Scraping job failed:", error);
    const job = scrapeJobs.get(jobId);
    if (job) {
      job.status = "failed";
      job.error = error instanceof Error ? error.message : 'Unknown error';
      scrapeJobs.set(jobId, job);
    }
  }
}
