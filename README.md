# 🚀 DocuScrape - Web Content to PDF Converter

A powerful web application that scrapes website content and converts it to professionally formatted PDF documents.

## ✨ Features

- 🌐 **Website Scraping** - Extract content from any website
- 📄 **PDF Generation** - Convert content to professional PDFs
- 🎨 **Beautiful UI** - Modern, responsive React interface
- ⚡ **Serverless** - Built entirely on Vercel with serverless functions
- 🔄 **Real-time Updates** - Live progress tracking and status updates
- 📱 **Mobile Friendly** - Works perfectly on all devices

## 🏗️ Architecture

This project is built as a **full-stack application on Vercel**:

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Vercel Serverless Functions (API routes)
- **Database**: In-memory storage (can be upgraded to Vercel KV/Postgres)
- **Deployment**: Single platform - Vercel handles everything!

## 🚀 Quick Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to client directory
cd client

# Install dependencies
npm install

# Build the project
npm run build

# Deploy to Vercel
vercel

# Follow the prompts and you're done!
```

### Option 2: Vercel Dashboard

1. **Fork/Clone** this repository
2. **Go to** [vercel.com](https://vercel.com)
3. **Click** "New Project"
4. **Import** your GitHub repository
5. **Set Root Directory** to `client`
6. **Click** "Deploy"

## 📁 Project Structure

```
DocuScrape-main/
├── client/                    # Frontend + API (Deploy this to Vercel)
│   ├── src/                   # React components
│   ├── api/                   # Vercel serverless functions
│   │   ├── scrape.ts         # Main scraping endpoint
│   │   ├── scrape/[id].ts    # Job status endpoint
│   │   └── documents.ts      # Documents list endpoint
│   ├── vercel.json           # Vercel configuration
│   └── package.json          # Dependencies
├── README.md                  # This file
├── VERCEL_DEPLOYMENT.md      # Detailed deployment guide
├── DEPLOYMENT_CHECKLIST.md   # Step-by-step checklist
└── .gitignore                # Git ignore rules
```

## 🔧 API Endpoints

- **POST** `/api/scrape` - Start a new scraping job
- **GET** `/api/scrape/[id]` - Get job status
- **GET** `/api/documents` - List recent documents

## 🎯 How It Works

1. **User enters a website URL** in the beautiful interface
2. **Serverless function scrapes** the website content
3. **PDF is generated** with professional formatting
4. **User downloads** the completed document
5. **All processing happens** on Vercel's infrastructure

## 🚨 Important Notes

### Function Limits
- **Scraping function**: 60 seconds max duration
- **Memory**: 1024MB per function
- **Cold starts**: First request may be slower

### Browser Limitations
- Puppeteer runs in serverless environment
- Some websites may block automated access
- Consider using headless browser services for production

## 🛠️ Development

### Local Development
```bash
cd client
npm install
npm run dev
```

### Build for Production
```bash
cd client
npm install
npm run build
```

## 🔍 Testing

Test your deployment with:
```bash
# Test scraping
curl -X POST https://your-app.vercel.app/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","format":"pdf"}'

# Check status
curl https://your-app.vercel.app/api/scrape/[job-id]
```

## 🎉 Benefits

- ✅ **Single Platform** - Everything runs on Vercel
- ✅ **No Backend Management** - Serverless functions handle everything
- ✅ **Automatic Scaling** - Vercel handles traffic spikes
- ✅ **Easy Updates** - Just push to GitHub, Vercel auto-deploys
- ✅ **Cost Effective** - Pay only for what you use
- ✅ **Global CDN** - Fast loading worldwide

## 🆘 Need Help?

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Function Logs**: Check Vercel dashboard for errors
- **Performance**: Monitor function execution times
- **Issues**: Check the troubleshooting section in `VERCEL_DEPLOYMENT.md`

## 📄 License

MIT License - feel free to use this project for your own needs!

---

## 🎯 **Ready to Deploy?**

Your DocuScrape app is now perfectly configured for Vercel deployment. Just follow the quick deploy steps above and you'll have a fully functional web scraping application running entirely on Vercel's platform!

**No external services, no backend management, just pure Vercel magic!** ✨
