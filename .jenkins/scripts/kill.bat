@echo off

REM Read the PID from .pidfile
set /p PID=<.pidfile

REM Kill the process with the PID
taskkill /F /PID %PID%