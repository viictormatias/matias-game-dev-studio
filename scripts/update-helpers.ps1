# Pure process matching is also used by the updater's non-destructive tests.
function Test-MatiasAppProcess($Process) {
  return $Process.Name -in @('matias-game-dev-studio.exe', 'matias-desktop.exe')
}
function Test-MatiasAncestor($Processes, [int]$CurrentId) {
  $taskSeen = @{}
  while ($CurrentId -gt 0 -and -not $taskSeen.ContainsKey($CurrentId)) {
    $taskSeen[$CurrentId] = $true
    $taskParent = $Processes | Where-Object { $_.ProcessId -eq $CurrentId } | Select-Object -First 1
    if (-not $taskParent) { return $false }
    if (Test-MatiasAppProcess $taskParent) { return $true }
    $CurrentId = [int]$taskParent.ParentProcessId
  }
  return $false
}
function Get-MatiasUpdateProcesses($Processes, [string[]]$InstallDirectories) {
  foreach ($taskProcess in $Processes) {
    if (Test-MatiasAppProcess $taskProcess) { $taskProcess; continue }
    if ($taskProcess.Name -ne 'node.exe' -or -not $taskProcess.ExecutablePath) { continue }
    foreach ($taskDirectory in $InstallDirectories) {
      if ($taskDirectory -and $taskProcess.ExecutablePath.StartsWith($taskDirectory.TrimEnd('\') + '\runtime\', [StringComparison]::OrdinalIgnoreCase)) { $taskProcess; break }
    }
  }
}
function Get-MatiasInstallDirectory {
  foreach ($taskRegistry in @('HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*', 'HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*')) {
    $taskInstallEntry = Get-ItemProperty -Path $taskRegistry -ErrorAction SilentlyContinue |
      Where-Object { $_.DisplayName -eq 'Matias Game Dev Studio' -and $_.InstallLocation } | Select-Object -First 1
    # The NSIS installer records InstallLocation wrapped in quotes.
    if ($taskInstallEntry) { return [IO.Path]::GetFullPath($taskInstallEntry.InstallLocation.Trim().Trim('"')) }
  }
  return (Join-Path $env:LOCALAPPDATA 'Matias Game Dev Studio')
}
