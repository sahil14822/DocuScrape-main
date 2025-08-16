#!/bin/bash

echo "🚀 Deploying DocuScrape Frontend..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🚀 Ready to deploy to Vercel!"
    echo ""
    echo "Next steps:"
    echo "1. Deploy this folder to Vercel"
    echo "2. Set environment variable VITE_API_URL to your backend URL"
    echo "3. Test the connection"
else
    echo "❌ Build failed!"
    exit 1
fi
