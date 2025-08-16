import type { VercelRequest, VercelResponse } from '@vercel/node';

// This would normally connect to a database
// For demo purposes, we'll use a simple in-memory store
// In production, use a proper database like Vercel KV, MongoDB, etc.

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    const { id } = req.query;
    
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'Invalid job ID' });
    }
    
    // In a real app, you'd fetch from database
    // For now, return a mock response
    const mockJob = {
      id,
      url: "https://example.com",
      status: "completed",
      format: "pdf",
      progress: 100,
      title: "Example Page",
      filename: "Example_Page.pdf",
      fileSize: 1024,
      pages: 1,
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    };
    
    res.status(200).json(mockJob);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
