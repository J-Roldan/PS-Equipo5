@echo off

REM Start the application and get the PID
start /B cmd /C "npm start > output1.log 2>&1"
echo %errorlevel% > .pidfile

echo Now...
echo Server Running