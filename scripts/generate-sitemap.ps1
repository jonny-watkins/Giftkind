$base = "https://gift-kind.com"
$pages = Get-ChildItem -Filter "*.html" | Select-Object -ExpandProperty Name
$lines = @()
$lines += "<?xml version=`"1.0`" encoding=`"UTF-8`"?>"
$lines += "<urlset xmlns=`"http://www.sitemaps.org/schemas/sitemap/0.9`">"
foreach ($page in $pages) {
  $lines += "  <url><loc>$base/$page</loc></url>"
}
$lines += "</urlset>"
$lines | Set-Content -Path "sitemap.xml" -Encoding UTF8
