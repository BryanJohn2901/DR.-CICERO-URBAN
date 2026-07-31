const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        if (file === 'node_modules' || file === '.git') return;
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.html')) results.push(file);
        }
    });
    return results;
}

const htmlFiles = walk('.');
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    let changed = false;
    if (content.includes('1631217868264-e5b1bb5e7385')) {
        content = content.replace(/1631217868264-e5b1bb5e7385/g, '1551190822-a9333d879b1f');
        changed = true;
    }
    if (content.includes('/logo.svg')) {
        content = content.replace(/\/logo\.svg/g, '/logo.png');
        changed = true;
    }
    // ensure brand color names if they were hardcoded, but tailwind handles classes.
    if (changed) {
        fs.writeFileSync(file, content);
        console.log('Fixed', file);
    }
});
