$ErrorActionPreference = 'Stop'

$exclude = @('index.html', 'privacy.html', 'success.html', 'cancel.html')
$files = Get-ChildItem -Path . -Filter '*.html' | Where-Object { $exclude -notcontains $_.Name }

foreach ($file in $files) {
  $text = Get-Content -Path $file.FullName -Raw
  if ($text -match 'class="seo-expanded"') {
    continue
  }

  $h1 = [regex]::Match($text, '<h1>(.*?)</h1>').Groups[1].Value
  if ([string]::IsNullOrWhiteSpace($h1)) {
    $h1 = [regex]::Match($text, '<title>(.*?)</title>').Groups[1].Value
  }
  $topic = ($h1 -replace ' recommendations.*', '') -replace '\s+', ' '

  $block = @"
            <div class="seo-expanded">
              <p>Looking for $topic? Gift-Kind makes it simple to narrow down thoughtful ideas without endless scrolling. Answer a few quick questions and we match suggestions to budget, style, and the kind of moment you want to create.</p>
              <p>Our picks balance usefulness with meaning, so you can choose something they will actually enjoy. Whether you are buying early or last-minute, you will see fast, UK-friendly options that feel personal.</p>
            </div>
"@

  $replacement = "</p>`n$block`n            <p class=""small seo-keywords"">"
  $text = $text -replace '</p>\s*<p class="small seo-keywords">', $replacement
  Set-Content -Path $file.FullName -Value $text -NoNewline
}
