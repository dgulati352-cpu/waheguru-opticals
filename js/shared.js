// ==================== OpticAura Simple Shared JavaScript ====================
// Only Header + Footer Injection + Basic Navigation + Cart/Wishlist Systems

document.addEventListener('DOMContentLoaded', () => {
  initCart();
  initWishlist();
  injectHeader();
  injectFooter();
  injectCartPanel();
  setupNavigationEvents();
  updateHeaderBadges();
  highlightActiveNav();
});

// ==================== BROWSER DATABASE (localStorage Management) ====================

const initCart = () => {
  if (!localStorage.getItem('opticaura_cart')) {
    localStorage.setItem('opticaura_cart', JSON.stringify([]));
  }
};

const initWishlist = () => {
  if (!localStorage.getItem('opticaura_wishlist')) {
    localStorage.setItem('opticaura_wishlist', JSON.stringify([]));
  }
};

const getCart = () => {
  return JSON.parse(localStorage.getItem('opticaura_cart')) || [];
};
window.getCart = getCart;

const setCart = (cart) => {
  localStorage.setItem('opticaura_cart', JSON.stringify(cart));
  updateHeaderBadges();
  renderCartItems();
};

const getWishlist = () => {
  return JSON.parse(localStorage.getItem('opticaura_wishlist')) || [];
};
window.getWishlist = getWishlist;

const setWishlist = (wishlist) => {
  localStorage.setItem('opticaura_wishlist', JSON.stringify(wishlist));
  updateHeaderBadges();
};

// ==================== USER ACTIONS ====================

window.addToCart = (productId, quantity = 1, showNotification = true) => {
  if (typeof PRODUCTS === 'undefined') return;
  const product = PRODUCTS[productId];
  if (!product) return;
  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.qty += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      qty: quantity
    });
  }
  setCart(cart);
  if (showNotification) {
    window.showToast('Added to bag');
    window.openCartSidebar();
  }
};

window.removeFromCart = (productId) => {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  setCart(cart);
  window.showToast('Item removed');
};

window.updateCartQty = (productId, qty) => {
  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.qty = Math.max(1, parseInt(qty) || 1);
    setCart(cart);
  }
};

window.changeQtyClick = (productId, delta) => {
  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.qty = Math.max(1, item.qty + delta);
    setCart(cart);
  }
};

window.toggleWishlist = (productId) => {
  const wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  if (index !== -1) {
    wishlist.splice(index, 1);
    setWishlist(wishlist);
    window.showToast('Removed from wishlist');
  } else {
    wishlist.push(productId);
    setWishlist(wishlist);
    window.showToast('Added to wishlist');
  }
  // Dispatch custom event to notify other components (like product recommendations or shop grid)
  window.dispatchEvent(new CustomEvent('wishlistChanged', { detail: { productId } }));
};

window.isInWishlist = (productId) => {
  return getWishlist().includes(productId);
};

// ==================== HEADER INJECTION ====================

function injectHeader() {
  const headerHtml = `
    <!-- Top Info Bar -->
    <div class="top-bar">
      <div class="top-bar-container">
        <a href="01_about_us.html">About us</a>
        <a href="02_contact_us.html">Contact Us</a>
        <a href="06_offline_store.html">Offline Stores</a>
        <a href="07_book_app.html">Book Appointment</a>
        <a href="payment.html">Secure Payment</a>
        <a href="#" onclick="localStorage.removeItem('opticaura_logged_in'); window.location.href='login.html';" style="color: #ff6b6b !important; font-weight: 600;">Logout</a>
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
            <a href="06_offline_store.html" class="dropdown-toggle">STORES hub</a>
            <ul class="dropdown-menu">
              <li><a href="06_offline_store.html">Find a Store</a></li>
              <li><a href="07_book_app.html">Book Eye Test</a></li>
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
          
          <div class="cart-trigger" onclick="window.openCartSidebar()" title="View Cart">
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
          <li><a href="06_offline_store.html">STORES & EYE TEST</a></li>
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
            <li><a href="07_book_app.html">Book Eye Exam</a></li>
            <li><a href="06_offline_store.html">Store Finder</a></li>
            <li><a href="payment.html">Checkout Details</a></li>
            <li><a href="08_privacy_policy.html">Privacy & Terms</a></li>
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

// ==================== DYNAMIC CART PANEL INJECTION ====================

function injectCartPanel() {
  const panelHtml = `
    <div class="cart-backdrop" id="cartBackdrop" onclick="window.closeCartSidebar()"></div>
    <div class="cart-sidebar" id="cartSidebar">
      <div class="cart-header">
        <h3>Shopping Bag</h3>
        <button class="cart-close-btn" onclick="window.closeCartSidebar()">&times;</button>
      </div>
      <div class="cart-items-container" id="cartSidebarItems">
        <!-- Rendered dynamically -->
      </div>
      <div class="cart-summary-footer">
        <div class="cart-summary-row">
          <span>Subtotal</span>
          <span id="cartSubtotal">₹0</span>
        </div>
        <div class="cart-summary-row promo-applied" id="cartDiscountRow" style="display: none;">
          <span>Promo Discount (10% Off)</span>
          <span id="cartDiscount">-₹0</span>
        </div>
        <div class="cart-summary-row total-row">
          <span>Total Payable</span>
          <span id="cartTotal">₹0</span>
        </div>
        <div class="cart-action-buttons">
          <a href="payment.html" class="checkout-btn">PROCEED TO SECURE CHECKOUT</a>
          <button class="continue-shopping-btn" onclick="window.closeCartSidebar()">CONTINUE SHOPPING</button>
        </div>
      </div>
    </div>
    <div class="toast-container" id="toastContainer"></div>
  `;

  document.getElementById('cartSidebar')?.remove();
  document.getElementById('cartBackdrop')?.remove();
  document.getElementById('toastContainer')?.remove();

  const wrapper = document.createElement('div');
  wrapper.innerHTML = panelHtml;
  document.body.appendChild(wrapper);
}

// ==================== CART SIDEBAR VISIBILITY & RENDERING ====================

window.openCartSidebar = () => {
  const sidebar = document.getElementById('cartSidebar');
  const backdrop = document.getElementById('cartBackdrop');
  if (sidebar && backdrop) {
    sidebar.classList.add('open');
    backdrop.classList.add('visible');
    document.body.style.overflow = 'hidden';
    renderCartItems();
  }
};

window.closeCartSidebar = () => {
  const sidebar = document.getElementById('cartSidebar');
  const backdrop = document.getElementById('cartBackdrop');
  if (sidebar && backdrop) {
    sidebar.classList.remove('open');
    backdrop.classList.remove('visible');
    document.body.style.overflow = '';
  }
};

const renderCartItems = () => {
  const container = document.getElementById('cartSidebarItems');
  if (!container) return;
  const cart = getCart();
  
  if (cart.length === 0) {
    container.innerHTML = `<div class="empty-cart-msg">Your shopping bag is empty.</div>`;
    document.getElementById('cartSubtotal').innerText = '₹0';
    document.getElementById('cartTotal').innerText = '₹0';
    document.getElementById('cartDiscountRow').style.display = 'none';
    return;
  }

  let subtotal = 0;
  let html = '';

  cart.forEach(item => {
    subtotal += item.price * item.qty;
    html += `
      <div class="cart-item-card">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <div>
            <div class="cart-item-cat">${item.category.toUpperCase()}</div>
            <h4><a href="product.html?id=${item.id}">${item.name}</a></h4>
          </div>
          <div class="cart-item-actions">
            <div class="cart-qty-picker">
              <button onclick="window.changeQtyClick('${item.id}', -1)">-</button>
              <input type="number" value="${item.qty}" min="1" onchange="window.updateCartQty('${item.id}', this.value)">
              <button onclick="window.changeQtyClick('${item.id}', 1)">+</button>
            </div>
            <button class="cart-item-remove-btn" onclick="window.removeFromCart('${item.id}')">REMOVE</button>
          </div>
        </div>
        <div class="cart-item-price">
          ₹${(item.price * item.qty).toLocaleString()}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  document.getElementById('cartSubtotal').innerText = `₹${subtotal.toLocaleString()}`;

  const isPromoApplied = localStorage.getItem('opticaura_promo') === 'AURA10';
  if (isPromoApplied) {
    const discount = Math.round(subtotal * 0.1);
    const finalTotal = subtotal - discount;
    document.getElementById('cartDiscount').innerText = `-₹${discount.toLocaleString()}`;
    document.getElementById('cartDiscountRow').style.display = 'flex';
    document.getElementById('cartTotal').innerText = `₹${finalTotal.toLocaleString()}`;
  } else {
    document.getElementById('cartDiscountRow').style.display = 'none';
    document.getElementById('cartTotal').innerText = `₹${subtotal.toLocaleString()}`;
  }
};

// ==================== BADGES, STICKY SCROLL, AND NAVIGATION ====================

const updateHeaderBadges = () => {
  const cart = getCart();
  const wishlist = getWishlist();
  
  const cartBadge = document.querySelector('.cart-badge');
  const wishlistBadge = document.querySelector('.wishlist-badge');

  const totalCartItems = cart.reduce((total, item) => total + item.qty, 0);
  const totalWishlistItems = wishlist.length;

  if (cartBadge) {
    cartBadge.innerText = totalCartItems;
    cartBadge.style.display = totalCartItems > 0 ? 'inline-block' : 'none';
  }

  if (wishlistBadge) {
    wishlistBadge.innerText = totalWishlistItems;
    wishlistBadge.style.display = totalWishlistItems > 0 ? 'inline-block' : 'none';
  }
};
window.updateHeaderBadges = updateHeaderBadges;

const setupNavigationEvents = () => {
  // Mobile Hamburger Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileDrawer.classList.toggle('open');
    });
  }

  // Sticky header class adding on scroll
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Search input events
  const searchInput = document.getElementById('navSearchInput');
  const searchBtn = document.querySelector('.search-trigger-btn');

  const executeSearch = () => {
    const query = searchInput?.value.trim();
    if (query) {
      window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
    }
  };

  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') executeSearch();
  });
  searchBtn?.addEventListener('click', executeSearch);
};

const highlightActiveNav = () => {
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll('.main-nav a');
  
  navLinks.forEach(link => { link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href && path.includes(href.split('?')[0])) {
      link.classList.add('active');
    }
  });
};

window.showToast = (message) => {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;
  container.appendChild(toast);

  // Trigger browser flow transition
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  // Fade out
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);

  // Remove element completely after animation closes
  setTimeout(() => {
    toast.remove();
  }, 3900);
};