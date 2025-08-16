@echo off
echo 🚀 Deploying DocuScrape to Vercel...

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Build the project
echo 🔨 Building project...
call npm run build

REM Check if build was successful
if %ERRORLEVEL% EQU 0 (
    echo ✅ Build successful!
    echo 🚀 Ready to deploy to Vercel!
    echo.
    echo Next steps:
    echo 1. Install Vercel CLI: npm install -g vercel
    echo 2. Login to Vercel: vercel login
    echo 3. Deploy: vercel
    echo.
    echo Or use the Vercel Dashboard:
    echo 1. Go to vercel.com
    echo 2. Import your GitHub repo
    echo 3. Set root directory to 'client'
    echo 4. Deploy!
) else (
    echo ❌ Build failed!
    pause
    exit /b 1
)
