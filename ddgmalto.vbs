Set WshShell = CreateObject("WScript.shell")
WshShell.Run chr(34) & "c:\gamead\start.bat" & Chr(34), 0
Set WshShell = Nothing