// ==================== OpticAura Simple Shared JavaScript ====================
// Only Header + Footer Injection + Basic Navigation

document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
  injectFooter();
  setupBasicEvents();
  highlightActiveNav();
});

// ==================== HEADER INJECTION ====================

function injectHeader() {
  const headerHtml = `
    <!-- Top Info Bar -->
    <div class="top-bar">
      <div class="top-bar-container">
        <a href="index.html">About us</a>
        <a href="stores.html">Contact Us</a>
        <a href="stores.html">Offline Stores</a>
        <a href="stores.html">Book Appointment</a>
        <a href="payment.html">Secure Payment</a>
      </div>
    </div>

    <!-- Main Navigation Header -->
    <header class="main-header">
      <div class="main-header-container">
        <a href="index.html" class="logo">OpticAura</a>
        
        <nav class="main-nav">
          <div class="dropdown">
            <a href="shop.html?category=eyeglasses" class="dropdown-toggle">EYEGLASSES</a>
            <ul class="dropdown-menu">
              <li><a href="shop.html?category=eyeglasses&sub=men">Men's Eyeglasses</a></li>
              <li><a href="shop.html?category=eyeglasses&sub=women">Women's Eyeglasses</a></li>
              <li><a href="shop.html?category=eyeglasses&sub=computer">Computer Glasses</a></li>
              <li><a href="shop.html?category=eyeglasses&sub=kids">Kids' Eyeglasses</a></li>
            </ul>
          </div>

          <div class="dropdown">
            <a href="shop.html?category=sunglasses" class="dropdown-toggle">SUNGLASSES</a>
            <ul class="dropdown-menu">
              <li><a href="shop.html?category=sunglasses&sub=men">Men's Sunglasses</a></li>
              <li><a href="shop.html?category=sunglasses&sub=women">Women's Sunglasses</a></li>
              <li><a href="shop.html?category=sunglasses&sub=icon">Power Sunglasses</a></li>
              <li><a href="shop.html?category=sunglasses&sub=sports">Sports Sunglasses</a></li>
            </ul>
          </div>

          <div class="dropdown">
            <a href="shop.html?category=contacts" class="dropdown-toggle">CONTACTS</a>
            <ul class="dropdown-menu">
              <li><a href="shop.html?category=contacts&sub=daily">Daily Disposable</a></li>
              <li><a href="shop.html?category=contacts&sub=monthly">Monthly Disposable</a></li>
              <li><a href="shop.html?category=contacts&sub=colored">Colored Contact Lenses</a></li>
              <li><a href="shop.html?category=contacts&sub=lens">Solution & Care</a></li>
            </ul>
          </div>

          <div class="dropdown">
            <a href="special-power.html" class="dropdown-toggle">SPECIAL POWER</a>
            <ul class="dropdown-menu">
              <li><a href="special-power.html">Advanced Tech Lenses</a></li>
              <li><a href="shop.html?category=eyeglasses&sub=computer">Blue Cut + UV protection</a></li>
            </ul>
          </div>

          <div class="dropdown">
            <a href="stores.html" class="dropdown-toggle">STORES</a>
            <ul class="dropdown-menu">
              <li><a href="stores.html">Find a Store</a></li>
              <li><a href="stores.html">Book Eye Test</a></li>
            </ul>
          </div>
        </nav>

        <div class="nav-icons">
          <div class="nav-search-container">
            <input type="text" id="navSearchInput" placeholder="Search premium eyewear...">
            <span class="search-trigger-btn">🔍</span>
          </div>

          <div class="wishlist-trigger" onclick="location.href='shop.html?wishlist=true'" title="View Wishlist">
            ♡ <span class="badge wishlist-badge">0</span>
          </div>
          
          <div class="cart-trigger" onclick="location.href='cart.html'" title="View Cart">
            🛒 <span class="badge cart-badge">0</span>
          </div>

          <div class="mobile-menu-toggle" id="mobileMenuToggle">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>

      <!-- Mobile Nav Drawer -->
      <div class="mobile-nav-drawer" id="mobileNavDrawer">
        <ul>
          <li><a href="shop.html?category=eyeglasses">EYEGLASSES</a></li>
          <li><a href="shop.html?category=sunglasses">SUNGLASSES</a></li>
          <li><a href="shop.html?category=contacts">CONTACTS</a></li>
          <li><a href="special-power.html">SPECIAL POWER</a></li>
          <li><a href="stores.html">STORES & EYE TEST</a></li>
        </ul>
      </div>
    </header>
  `;

  // Remove old header if exists
  document.querySelector('header')?.remove();
  document.querySelector('.top-bar')?.remove();

  const wrapper = document.createElement('div');
  wrapper.innerHTML = headerHtml;
  document.body.insertBefore(wrapper, document.body.firstChild);
}

// ==================== FOOTER INJECTION ====================

function injectFooter() {
  const footerHtml = `
    <footer>
      <div class="footer-container">
        <div class="footer-col footer-logo">
          <h2>OpticAura</h2>
          <p>Your trusted premium eyewear partner. Experience luxury craftsmanship, advanced vision protection, and professional eye care delivered to your door.</p>
        </div>

        <div class="footer-col">
          <h3>Collection Hub</h3>
          <ul>
            <li><a href="shop.html?category=eyeglasses">Eyeglasses Catalog</a></li>
            <li><a href="shop.html?category=sunglasses">Sunglasses Range</a></li>
            <li><a href="shop.html?category=contacts">Contact Lenses</a></li>
            <li><a href="special-power.html">Lens Protection Tech</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h3>Customer Support</h3>
          <ul>
            <li><a href="stores.html">Book Eye Exam</a></li>
            <li><a href="stores.html">Store Finder</a></li>
            <li><a href="payment.html">Checkout Details</a></li>
            <li><a href="index.html">Privacy & Terms</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h3>OpticAura Trust</h3>
          <p style="font-size: 14px; margin-bottom: 12px; opacity: 0.8;">100% Secure SSL checkout, home trials, and a 1-year product warranty.</p>
          <div class="payment-methods">
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa">
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard">
            <img src="https://img.icons8.com/color/48/000000/rupay.png" alt="Rupay">
            <img src="https://img.icons8.com/color/48/000000/paytm.png" alt="Paytm">
          </div>
        </div>
      </div>

      <div class="bottom-bar">
        © 2026 OpticAura Eyewear. All Rights Reserved.
      </div>
    </footer>
  `;

  document.querySelector('footer')?.remove();

  const wrapper = document.createElement('div');
  wrapper.innerHTML = footerHtml;
  document.body.appendChild(wrapper);
}