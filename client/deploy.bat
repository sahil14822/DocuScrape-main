@echo off
echo 🚀 Deploying DocuScrape Frontend...

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
    echo 1. Deploy this folder to Vercel
    echo 2. Set environment variable VITE_API_URL to your backend URL
    echo 3. Test the connection
) else (
    echo ❌ Build failed!
    pause
    exit /b 1
)
