import type { VercelRequest, VercelResponse } from '@vercel/node';

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
    // In a real app, you'd fetch from database
    // For now, return mock data
    const mockDocuments = [
      {
        id: "1",
        url: "https://example.com",
        status: "completed",
        format: "pdf",
        progress: 100,
        title: "Example Page 1",
        filename: "Example_Page_1.pdf",
        fileSize: 1024,
        pages: 1,
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        completedAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: "2",
        url: "https://example.org",
        status: "completed",
        format: "pdf",
        progress: 100,
        title: "Example Page 2",
        filename: "Example_Page_2.pdf",
        fileSize: 2048,
        pages: 2,
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        completedAt: new Date(Date.now() - 172800000).toISOString()
      }
    ];
    
    res.status(200).json(mockDocuments);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
