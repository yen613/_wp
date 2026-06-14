@echo off
cd /d "%~dp0"
echo Starting blog server from %CD%
echo Open http://localhost:3000 in your browser
node index.js
pause
