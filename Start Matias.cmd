@echo off
setlocal
set "MATIAS_LAUNCH_ROOT=%~dp0"
if exist "%LOCALAPPDATA%\Matias Game Dev Studio\matias-game-dev-studio.exe" (
  start "" "%LOCALAPPDATA%\Matias Game Dev Studio\matias-game-dev-studio.exe" --repo "%MATIAS_LAUNCH_ROOT%."
  exit /b 0
)
if exist "%MATIAS_LAUNCH_ROOT%src-tauri\target\release\matias-game-dev-studio.exe" (
  start "" "%MATIAS_LAUNCH_ROOT%src-tauri\target\release\matias-game-dev-studio.exe" --repo "%MATIAS_LAUNCH_ROOT%."
  exit /b 0
)
echo Install Matias Game Dev Studio from this project's GitHub Releases.
echo Or build with: powershell -NoProfile -ExecutionPolicy Bypass -File Setup.ps1 -Mode Desktop
echo See docs\getting-started.md for agent-guided setup.
pause
