const fs = require('fs');

// 1. Fix site.css colors
let css = fs.readFileSync('assets/css/site.css', 'utf-8');
css = css.replace(/#BE185D/gi, '#D4AF37');
css = css.replace(/190,\s*24,\s*93/g, '212, 175, 55');
css = css.replace(/#FDA4AF/gi, '#F3E5AB');
css = css.replace(/253,\s*164,\s*175/g, '243, 229, 171');
css = css.replace(/#9D174D/gi, '#B5952F');
css = css.replace(/157,\s*23,\s*77/g, '181, 149, 47');

// Fix broken hospital image URL in CSS
css = css.replace(/url\('\/assets\/images\/hospital-site\/hospital-papa-francisco\.jpg'\)/g, "url('https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1920&q=80')");

fs.writeFileSync('assets/css/site.css', css);

// 2. Fix index.html broken image and logo
let html = fs.readFileSync('index.html', 'utf-8');
// Fix broken image ID 1631217868264-e5b1bb5e7385 to a working one (1551190822-a9333d879b1f)
html = html.replace(/1631217868264-e5b1bb5e7385/g, '1551190822-a9333d879b1f');
// Change logo to PNG
html = html.replace(/\/logo\.svg/g, '/logo.png');
fs.writeFileSync('index.html', html);
