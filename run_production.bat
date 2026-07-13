@echo off
title Kassala University Website - Production Server
echo ========================================================
echo   Kassala University Website Redesign - Production
echo ========================================================
echo.
echo [1/2] Building optimized production pages...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Build failed. Please check for errors above.
    pause
    exit /b %errorlevel%
)
echo.
echo [2/2] Starting Next.js production server on port 3000...
echo You can open http://localhost:3000 in your browser.
echo Press Ctrl+C to stop the server at any time.
echo.
call npm run start
pause
