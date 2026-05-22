/**
 * fix_html.js — Repair broken HTML structure across all pages.
 * 
 * Problem: The update_headers.js script replaced <head> with </head> and injected
 * a floating nav bar + the head content into <body>. This means CSS/JS don't load
 * in the proper <head>, causing blank/broken pages.
 *
 * This script:
 * 1. Removes the injected floating site-nav bar (it's redundant — shared.js injects the real header)
 * 2. Restores proper <head> structure with <title>, <meta>, <link>, etc.
 * 3. Ensures a single <body> tag
 * 4. Removes duplicate </head> tags
 */

const fs = require('fs');
const path = require('path');

// Files that use their own stylesheets (01-09 series + index)
const STATIC_FILES = [
  { file: '03_eye_care.html', title: 'Vision Care Services | Waheguru Aura Optix', css: '03_style.css' },
  { file: '04_new_arrival.html', title: 'New Arrivals | Waheguru Aura Optix', css: '04_style.css' },
  { file: '09_help.html', title: 'Help & Support | Waheguru Aura Optix', css: '09_style.css' },
];

// Files that use css/style1.css + js/products-db.js + js/shared.js
const DYNAMIC_FILES = [
  { file: 'shop.html', title: 'Discover Eyewear | Waheguru Aura Optix' },
  { file: 'product.html', title: 'Premium Eyewear | Waheguru Aura Optix' },
  { file: 'special-power.html', title: 'Advanced Optical Lenses | Waheguru Aura Optix' },
];

function fixStaticFile(info) {
  const filePath = path.join(__dirname, info.file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${info.file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove the injected floating nav bar (lines between <nav class="site-nav"...> and </nav>)
  content = content.replace(/<nav class="site-nav"[^>]*>[\s\S]*?<\/nav>\s*/gi, '');

  // Remove any orphan </head> that appears before the actual head content
  // Pattern: </head> appearing right after <html lang="en">
  content = content.replace(/(<html lang="en">\s*)<\/head>/i, '$1');

  // Remove any <body> that appears before the actual head content  
  // (there might be a stray <body> right after the orphan </head>)
  // We need to be careful here — only remove the FIRST <body> if there are two
  const bodyCount = (content.match(/<body>/gi) || []).length;
  if (bodyCount > 1) {
    // Remove the first <body> (the misplaced one)
    content = content.replace(/<body>\s*/, '');  // removes first occurrence
  }

  // Now ensure proper <head> structure
  // Find where <title> is and wrap everything from there to </head> in a proper <head>
  // The pattern should be: <!DOCTYPE html>\n<html lang="en">\n...<title>...\n<link...>\n</head>\n<body>

  // Check if there's already a proper <head> tag
  if (!content.match(/<head>/i)) {
    // Insert <head> before <title> or before first <link> or <meta charset>
    content = content.replace(/(\s*)(<title>|<meta charset|<link\s)/i, '$1<head>\n$1$2');
  }

  // Remove duplicate </head> tags (keep only the last one before <body>)
  const headCloseCount = (content.match(/<\/head>/gi) || []).length;
  if (headCloseCount > 1) {
    let removed = 0;
    content = content.replace(/<\/head>/gi, (match) => {
      removed++;
      if (removed < headCloseCount) return ''; // remove all but last
      return match;
    });
  }

  // Add meta charset and viewport if missing inside <head>
  if (!content.match(/<meta charset/i)) {
    content = content.replace(/<head>\s*/i, '<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
  }

  // Clean up any excessive blank lines
  content = content.replace(/\n{4,}/g, '\n\n');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`FIXED: ${info.file}`);
}

function fixDynamicFile(info) {
  const filePath = path.join(__dirname, info.file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${info.file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove the injected floating nav bar
  content = content.replace(/<nav class="site-nav"[^>]*>[\s\S]*?<\/nav>\s*/gi, '');

  // Remove orphan </head> at the top
  content = content.replace(/(<html lang="en">\s*)<\/head>/i, '$1');

  // Remove stray <body> if there are multiples
  const bodyCount = (content.match(/<body>/gi) || []).length;
  if (bodyCount > 1) {
    content = content.replace(/<body>\s*/, '');
  }

  // Ensure proper <head> tag exists
  if (!content.match(/<head>/i)) {
    content = content.replace(/(\s*)(<title>|<meta charset|<link\s)/i, '$1<head>\n$1$2');
  }

  // Remove duplicate </head>
  const headCloseCount = (content.match(/<\/head>/gi) || []).length;
  if (headCloseCount > 1) {
    let removed = 0;
    content = content.replace(/<\/head>/gi, (match) => {
      removed++;
      if (removed < headCloseCount) return '';
      return match;
    });
  }

  // Add meta tags if missing
  if (!content.match(/<meta charset/i)) {
    content = content.replace(/<head>\s*/i, '<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
  }

  // Clean up excessive blank lines
  content = content.replace(/\n{4,}/g, '\n\n');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`FIXED: ${info.file}`);
}

// Also fix payment.html which has duplicate </head>
function fixPayment() {
  const filePath = path.join(__dirname, 'payment.html');
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove floating nav if present
  content = content.replace(/<nav class="site-nav"[^>]*>[\s\S]*?<\/nav>\s*/gi, '');

  // Fix duplicate </head>
  const headCloseCount = (content.match(/<\/head>/gi) || []).length;
  if (headCloseCount > 1) {
    let removed = 0;
    content = content.replace(/<\/head>/gi, (match) => {
      removed++;
      if (removed < headCloseCount) return '';
      return match;
    });
  }

  // Remove duplicate <body>
  const bodyCount = (content.match(/<body>/gi) || []).length;
  if (bodyCount > 1) {
    content = content.replace(/<body>\s*/, '');
  }

  content = content.replace(/\n{4,}/g, '\n\n');
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('FIXED: payment.html');
}

// Fix login.html too
function fixLogin() {
  const filePath = path.join(__dirname, 'login.html');
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/<nav class="site-nav"[^>]*>[\s\S]*?<\/nav>\s*/gi, '');

  const headCloseCount = (content.match(/<\/head>/gi) || []).length;
  if (headCloseCount > 1) {
    let removed = 0;
    content = content.replace(/<\/head>/gi, (match) => {
      removed++;
      if (removed < headCloseCount) return '';
      return match;
    });
  }

  content = content.replace(/\n{4,}/g, '\n\n');
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('FIXED: login.html');
}

console.log('--- Fixing Static Pages (01-09 series) ---');
STATIC_FILES.forEach(fixStaticFile);

console.log('\n--- Fixing Dynamic Pages (shop, product, special-power) ---');
DYNAMIC_FILES.forEach(fixDynamicFile);

console.log('\n--- Fixing Payment & Login ---');
fixPayment();
fixLogin();

console.log('\n✅ All HTML files repaired! Verify by refreshing http://localhost:3001/');
