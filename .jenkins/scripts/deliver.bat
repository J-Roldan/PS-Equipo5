@echo off

REM Build the application
call npm run build

REM Start the application and get the PID
start /B cmd /C "npm start > output.log 2>&1"
echo %errorlevel% > .pidfile

echo Now...
echo Visit http://localhost:3000 to see your Node.js/React application in action.