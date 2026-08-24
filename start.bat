@echo off
title Sales Dashboard Local Server
echo ========================================================
echo   Starting Sales Dashboard Local Server (Next.js)
echo ========================================================
echo.

cd /d "%~dp0"

if not exist node_modules (
    echo [INFO] Installing required packages...
    call npm.cmd install
    echo.
)

echo [INFO] Ensuring port 3001 is free...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3001 ^| findstr LISTENING') do (
    echo [INFO] Clearing previous server process PID %%a...
    taskkill /f /pid %%a >nul 2>&1
)

echo.
echo [INFO] Starting Next.js server on http://localhost:3001...
echo [INFO] Browser will launch automatically when compilation finishes...
echo.

start "" powershell -WindowStyle Hidden -Command "do { Start-Sleep -Milliseconds 500; $c = New-Object Net.Sockets.TcpClient; try { $c.Connect('127.0.0.1', 3001); $ok=$true } catch { $ok=$false } finally { $c.Close() } } until ($ok); Start-Process 'http://localhost:3001'"

call npm.cmd run dev
pause
