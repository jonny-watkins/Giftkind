$path = "assets/app-master.js"
$content = Get-Content -Raw -Encoding Default $path
$content = $content -replace 'const CURRENCY = .*?;', 'const CURRENCY = "\u00A3";'
Set-Content -Path $path -Value $content -Encoding UTF8
