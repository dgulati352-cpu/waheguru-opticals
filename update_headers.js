const fs = require('fs');
const path = require('path');

const targetFiles = [
  '01_about_us.html',
  '02_contact_us.html',
  '03_eye_care.html',
  '04_new_arrival.html',
  '05_best_seller.html',
  '06_offline_store.html',
  '07_book_app.html',
  '08_privacy_policy.html',
  '09_help.html',
  'index.html'
];

const newHeader = `    <!-- ===================== TOP BAR ===================== -->
    <div class="top-bar">
        <div class="top-bar-container">
            <a href="01_about_us.html">About us</a>
            <a href="02_contact_us.html">Contact Us</a>
            <a href="03_eye_care.html">Eye Care</a>
            <a href="04_new_arrival.html">New Arrivals</a>
            <a href="05_best_seller.html">Best Sellers</a>
            <a href="06_offline_store.html">Offline Stores</a>
            <a href="07_book_app.html">Book Appointment</a>
            <a href="08_privacy_policy.html">Privacy Policy</a>
            <a href="09_help.html">Help</a>
        </div>
    </div>


    <!-- ===================== NAVBAR ===================== -->
    <header class="main-header">
        <div class="main-header-container">
            <a href="index.html" class="logo">
                <img src="img0.jpeg" alt="Logo">
                WAHEGURU AURA OPTIX
            </a>
            <nav class="main-nav">
                <div class="dropdown">
                    <a href="shop.html?category=eyeglasses">EYEGLASSES</a>
                    <ul class="dropdown-menu">
                        <li><a href="shop.html?category=eyeglasses&sub=men">Men's Eyeglasses</a></li>
                        <li><a href="shop.html?category=eyeglasses&sub=women">Women's Eyeglasses</a></li>
                        <li><a href="shop.html?category=eyeglasses&sub=computer">Computer Glasses</a></li>
                        <li><a href="shop.html?category=eyeglasses&sub=kids">Kids' Eyeglasses</a></li>
                    </ul>
                </div>
                <div class="dropdown">
                    <a href="shop.html?category=sunglasses">SUNGLASSES</a>
                    <ul class="dropdown-menu">
                        <li><a href="shop.html?category=sunglasses&sub=men">Men's Sunglasses</a></li>
                        <li><a href="shop.html?category=sunglasses&sub=women">Women's Sunglasses</a></li>
                        <li><a href="shop.html?category=sunglasses&sub=icon">Power Sunglasses</a></li>
                        <li><a href="shop.html?category=sunglasses&sub=sports">Sports Sunglasses</a></li>
                    </ul>
                </div>
                <div class="dropdown">
                    <a href="shop.html?category=contacts">CONTACTS</a>
                    <ul class="dropdown-menu">
                        <li><a href="shop.html?category=contacts&sub=daily">Daily Disposable</a></li>
                        <li><a href="shop.html?category=contacts&sub=monthly">Monthly Disposable</a></li>
                        <li><a href="shop.html?category=contacts&sub=colored">Colored Contact Lenses</a></li>
                        <li><a href="shop.html?category=contacts&sub=lens">Contact Lens Solution & Care</a></li>
                    </ul>
                </div>
                <div class="dropdown">
                    <a href="special-power.html">SPECIAL POWER</a>
                    <ul class="dropdown-menu">
                        <li><a href="special-power.html">High Power Lenses</a></li>
                        <li><a href="special-power.html">Cylinder Power Lenses</a></li>
                        <li><a href="special-power.html">Photochromic Lenses</a></li>
                        <li><a href="shop.html?category=eyeglasses&sub=computer">Blue Cut + UV Protection</a></li>
                    </ul>
                </div>
                <div class="dropdown">
                    <a href="06_offline_store.html">STORES</a>
                    <ul class="dropdown-menu">
                        <li><a href="06_offline_store.html">Find a Store Near You</a></li>
                        <li><a href="06_offline_store.html">Official Stores</a></li>
                        <li><a href="07_book_app.html">Book Eye Test Appointment</a></li>
                        <li><a href="07_book_app.html">Home Eye Check-up</a></li>
                    </ul>
                </div>
            </nav>
            <div class="header-icons">
                <a href="shop.html" class="cart-icon">🛒</a>
            </div>
        </div>
    </header>`;

targetFiles.forEach(fileName => {
  const filePath = path.join(__dirname, fileName);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${fileName}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Regex to match from <div class="top-bar"> (optionally with whitespace/comments before) up to </header>
  const headerRegex = /<!--\s*={5,}\s*TOP BAR\s*={5,}\s*-->[\s\S]*?<\/header>/i;
  
  if (headerRegex.test(content)) {
    content = content.replace(headerRegex, newHeader);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully updated header in: ${fileName}`);
  } else {
    // If no TOP BAR comment, search for <div class="top-bar"> up to </header>
    const fallbackRegex = /<div class="top-bar">[\s\S]*?<\/header>/i;
    if (fallbackRegex.test(content)) {
      content = content.replace(fallbackRegex, newHeader);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Successfully updated header (fallback) in: ${fileName}`);
    } else {
      console.log(`Could not find header pattern in: ${fileName}`);
    }
  }
});
