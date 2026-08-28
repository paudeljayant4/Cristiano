/**
 * CR7 — THE PHENOMENON
 * Main Application Logic
 * Cinematic journey through Cristiano Ronaldo's legendary career
 */

// Wait for data to load from playerData.js
const CR7_DATA = window.CR7_DATA;

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => parent.querySelectorAll(selector);
let initialized = false;

// ============================================
// PAGE GENERATION
// ============================================

function generateHTML() {
  if (!CR7_DATA) {
    console.error('CR7_DATA not loaded');
    return '';
  }

  const { stats, eras, trophies, moments, international, meta } = CR7_DATA;
  
  const html = `
    <!-- LOADER SECTION -->
    <section class="loader" aria-live="polite" role="status">
      <div class="loader-container">
        <div class="loader-pulse"></div>
        <div class="loader-mark">CR7</div>
        <div class="loader-meta">
          <span>LOADING THE PHENOMENON...</span>
          <b>00</b><span>%</span>
        </div>
        <div class="loader-line">
          <i></i>
        </div>
      </div>
    </section>

    <!-- HERO SECTION -->
    <section class="hero" id="hero" aria-labelledby="hero-title">
      <img src="https://imgs.search.brave.com/Z0ovd0kXjHL852xjTxVp-TOiBiL4YU7JTkYHyWP1Y34/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDg2Nzgz/NjkuanBn" 
           alt="Cristiano Ronaldo in action" class="hero-image" loading="eager">
      <div class="hero-overlay"></div>
      
      <div class="hero-content">
        <div class="hero-meta">
          <span class="hero-year">PORTUGAL</span>
          <span class="hero-dates">1985 — ∞</span>
        </div>
        
        <h1 id="hero-title" class="hero-title">
          <span class="hero-line">CRISTIANO</span>
          <span class="hero-line">RONALDO</span>
        </h1>
        
        <div class="hero-number" aria-hidden="true">07</div>
        
        <div class="hero-cta">
          <p class="scroll-indicator">SCROLL TO ENTER</p>
          <div class="scroll-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- INTRODUCTION SECTION -->
    <section class="intro" id="intro" aria-labelledby="intro-title">
      <div class="intro-container">
        <h2 id="intro-title" class="intro-title" data-reveal>
          THE PHENOMENON
        </h2>
        <p class="intro-subtitle" data-reveal>
          MORE THAN A NUMBER
        </p>
        <p class="intro-text" data-reveal>
          A BOY FROM MADEIRA.<br>
          WHO DREAMED BIGGER THAN HIS ISLAND.<br>
          WHO RAN TOWARD PRESSURE.<br>
          WHO TURNED DOUBT INTO FUEL.<br>
          WHO TURNED 7 INTO CR7.
        </p>
      </div>
    </section>

    <!-- JOURNEY SECTION -->
    <section class="journey" id="journey" aria-labelledby="journey-title">
      <div class="journey-header">
        <h2 id="journey-title">THE JOURNEY</h2>
        <p class="journey-subtitle">FROM MADEIRA TO THE WORLD</p>
      </div>
      
      <div class="journey-timeline">
        ${eras.map((era, index) => `
          <article class="era era-${index}" data-reveal>
            <div class="era-image-wrapper">
              <img src="${era.image}" 
                   alt="Cristiano Ronaldo in ${era.place}" 
                   class="era-image" 
                   loading="lazy">
              <div class="era-overlay"></div>
            </div>
            
            <div class="era-content">
              <div class="era-year">${era.year}</div>
              <h3 class="era-place">${era.place}</h3>
              <h4 class="era-title">${era.title}</h4>
              <p class="era-narrative">${era.narrative}</p>
              <p class="era-copy">${era.copy}</p>
            </div>
          </article>
        `).join('')}
      </div>
    </section>

    <!-- EL BICHO SECTION -->
    <section class="bicho" id="bicho" aria-labelledby="bicho-title">
      <div class="bicho-container">
        <div class="bicho-heartbeat" aria-hidden="true"></div>
        <h2 id="bicho-title" class="bicho-title" data-reveal>
          <span class="bicho-word">THEY</span>
          <span class="bicho-word">CALLED</span>
          <span class="bicho-word">HIM</span>
        </h2>
        <p class="bicho-names" data-reveal>
          THE BOY • THE WINGER • THE STAR • THE MACHINE • THE KING • THE CAPTAIN
        </p>
        <h3 class="bicho-final" data-reveal>EL BICHO</h3>
        <p class="bicho-subtitle" data-reveal>THE BEAST</p>
      </div>
    </section>

    <!-- STATISTICS SECTION -->
    <section class="numbers" id="numbers" aria-labelledby="numbers-title">
      <div class="numbers-header">
        <h2 id="numbers-title">THE NUMBERS</h2>
        <p class="numbers-intro">MONUMENTS OF GREATNESS</p>
      </div>
      
      <div class="numbers-grid">
        ${stats.map((stat, index) => `
          <article class="stat stat-${index}" data-reveal>
            <div class="stat-number">
              <h3 class="counter" data-value="${stat.value}" data-suffix="${stat.suffix}">
                0${stat.suffix}
              </h3>
            </div>
            <div class="stat-info">
              <p class="stat-label">${stat.label}</p>
              <p class="stat-copy">${stat.copy}</p>
            </div>
          </article>
        `).join('')}
      </div>
    </section>

    <!-- THE 7 SECTION -->
    <section class="seven" id="seven" aria-labelledby="seven-title">
      <div class="seven-container">
        <div class="seven-number" aria-hidden="true">7</div>
        <h2 id="seven-title" class="seven-title" data-reveal>
          ONE NUMBER
        </h2>
        <div class="seven-journey">
          ${eras.slice(0, 6).map(era => `
            <div class="seven-era" data-reveal>
              ${era.place}
            </div>
          `).join('')}
        </div>
        <p class="seven-text" data-reveal>
          THE NUMBER BECAME THE BRAND
        </p>
        <h3 class="seven-final" data-reveal>CR7</h3>
      </div>
    </section>

    <!-- PORTUGAL SECTION -->
    <section class="portugal" id="portugal" aria-labelledby="portugal-title">
      <img src="https://imgs.search.brave.com/79nwPz0a8unCbVPMIZJdDY4v2fh4t96AH4tqJt26QGE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzVlLzIx/Lzc1LzVlMjE3NTE5/OWU5NDViYzYxMmUw/MWQ0ZjY0NjRmZDcw/LmpwZw" 
           alt="Cristiano Ronaldo wearing Portugal jersey" 
           class="portugal-image" 
           loading="lazy">
      <div class="portugal-overlay"></div>
      
      <div class="portugal-content">
        <h2 id="portugal-title" class="portugal-title" data-reveal>PORTUGAL</h2>
        <h3 class="portugal-subtitle" data-reveal>THE CAPTAIN</h3>
        
        <div class="portugal-stats">
          <div class="portugal-stat" data-reveal>
            <div class="portugal-stat-number">${international.apps}</div>
            <p class="portugal-stat-label">APPEARANCES</p>
          </div>
          <div class="portugal-stat" data-reveal>
            <div class="portugal-stat-number">${international.goals}</div>
            <p class="portugal-stat-label">GOALS</p>
          </div>
          <div class="portugal-stat" data-reveal>
            <div class="portugal-stat-number">${international.championships}</div>
            <p class="portugal-stat-label">CHAMPIONSHIP</p>
          </div>
        </div>
        
        <p class="portugal-narrative" data-reveal>
          ${international.narrative}
        </p>
      </div>
    </section>

    <!-- TROPHIES SECTION -->
    <section class="trophies" id="trophies" aria-labelledby="trophies-title">
      <div class="trophies-header">
        <h2 id="trophies-title">THE TROPHIES</h2>
        <p class="trophies-intro">MONUMENTS OF VICTORY</p>
      </div>
      
      <div class="trophies-carousel">
        ${trophies.map((trophy, index) => `
          <article class="trophy" data-reveal>
            <div class="trophy-number">0${index + 1}</div>
            <div class="trophy-icon">✦</div>
            <h3 class="trophy-name">${trophy.name}</h3>
            <p class="trophy-years">${trophy.years}</p>
            <p class="trophy-narrative">${trophy.narrative}</p>
          </article>
        `).join('')}
      </div>
    </section>

    <!-- VISUAL ARCHIVE SECTION -->
    <section class="archive" id="archive" aria-labelledby="archive-title">
      <div class="archive-header">
        <h2 id="archive-title">THE VISUAL ARCHIVE</h2>
        <p class="archive-intro">THE PICTURES BETWEEN THE HEADLINES</p>
      </div>
      
      <div class="archive-grid">
        ${moments.map((moment, index) => `
          <figure class="moment moment-${index}" data-reveal>
            <img src="${moment.image}" 
                 alt="${moment.alt}" 
                 class="moment-image" 
                 loading="lazy">
            <div class="moment-overlay"></div>
            <figcaption class="moment-caption">
              <span class="moment-number">0${index + 1}</span>
              <h4 class="moment-label">${moment.label}</h4>
              <p class="moment-detail">${moment.detail}</p>
            </figcaption>
          </figure>
        `).join('')}
      </div>
    </section>

    <!-- CELEBRATION SECTION -->
    <section class="celebration" id="celebration" aria-labelledby="celebration-title">
      <div class="celebration-container">
        <p class="celebration-intro" data-reveal>YOU KNOW WHAT COMES NEXT</p>
        <h2 id="celebration-title" class="celebration-title" data-reveal>
          SIUUUUUUUUUUUUUUUUU
        </h2>
        <img src="https://imgs.search.brave.com/2KwknB7w0hxF7XoVgyDze5z-kv6a3nk1v8mf0RxwUhk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDIwMDg0/NjAuanBn" 
             alt="Cristiano Ronaldo celebrating" 
             class="celebration-image" 
             loading="lazy">
      </div>
    </section>

    <!-- LEGACY SECTION -->
    <section class="legacy" id="legacy" aria-labelledby="legacy-title">
      <div class="legacy-container">
        <h2 id="legacy-title" class="legacy-title" data-reveal>
          THE LEGACY
        </h2>
        
        <div class="legacy-montage">
          ${eras.map((era, index) => `
            <div class="legacy-image-wrapper" data-reveal>
              <img src="${era.image}" 
                   alt="Cristiano Ronaldo in ${era.year}" 
                   class="legacy-image" 
                   loading="lazy">
              <span class="legacy-year">${era.year}</span>
            </div>
          `).join('')}
        </div>
        
        <div class="legacy-text" data-reveal>
          <p class="legacy-statement">
            HE CHANGED TEAMS.<br>
            HE CHANGED ERAS.<br>
            HE CHANGED RECORD BOOKS.<br><br>
            BUT HE NEVER CHANGED THE HUNGER.
          </p>
          <p class="legacy-final">
            THAT IS THE LEGACY.
          </p>
        </div>
      </div>
    </section>

    <!-- FINAL SCENE -->
    <section class="final-scene" id="final-scene" aria-labelledby="final-title">
      <img src="https://imgs.search.brave.com/1SfVk6TxKlmCveCOLRrsxYbwODstqGSZ5ubj3xzcNUc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzk1L2Zh/L2Q0Lzk1ZmFkNGEw/OTI0MmIzNmMwOTQ0/ZDcxM2UxMjNlZWY2/LmpwZw" 
           alt="Cristiano Ronaldo portrait" 
           class="final-image" 
           loading="lazy">
      
      <div class="final-content">
        <h2 id="final-title" class="final-title" data-reveal>
          <span>CRISTIANO</span>
          <span>RONALDO</span>
        </h2>
        
        <p class="final-dates" data-reveal>
          1985 — ∞
        </p>
        
        <p class="final-statement" data-reveal>
          THE STORY IS STILL BEING WRITTEN
        </p>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer" role="contentinfo">
      <div class="footer-container">
        <div class="footer-branding">
          <p class="footer-logo">CR7</p>
          <p class="footer-tagline">THE PHENOMENON</p>
        </div>
        
        <nav class="footer-links" aria-label="Footer navigation">
          <a href="#hero">THE JOURNEY</a>
          <a href="#numbers">THE NUMBERS</a>
          <a href="#trophies">THE TROPHIES</a>
          <a href="#portugal">PORTUGAL</a>
          <a href="#legacy">LEGACY</a>
        </nav>
        
        <div class="footer-meta">
          <p class="footer-disclaimer">
            ${meta.disclaimer}
          </p>
          <p class="footer-credit">
            ${meta.credits}
          </p>
        </div>
      </div>
    </footer>
  `;
  
  return html;
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
  if (initialized) return;

  const root = $('#root');
  if (!root) {
    console.error('Root element not found');
    return;
  }
  
  // Generate and insert HTML
  root.innerHTML = generateHTML();
  initialized = true;
  
  // Initialize menu
  initMenu();
  
  // Initialize interactions
  initInteractions();
  initCursor();
  
  // Initialize scroll effects
  initScrollEffects();
  
}

// ============================================
// MENU FUNCTIONALITY
// ============================================

function initMenu() {
  const menuBtn = $('.menu');
  
  if (!menuBtn) return;
  
  // Create menu panel if it doesn't exist
  let menuPanel = $('.menu-panel');
  if (!menuPanel) {
    const panel = document.createElement('div');
    panel.className = 'menu-panel';
    panel.id = 'site-menu';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'Site navigation');
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
      <p>CR7 / NAVIGATOR</p>
      <a href="#hero">THE JOURNEY</a>
      <a href="#numbers">THE NUMBERS</a>
      <a href="#trophies">THE TROPHIES</a>
      <a href="#portugal">PORTUGAL</a>
      <a href="#legacy">LEGACY</a>
    `;
    document.body.appendChild(panel);
    menuPanel = panel;
  }
  menuBtn.setAttribute('aria-controls', menuPanel.id);
  
  menuBtn.addEventListener('click', () => {
    const isOpen = document.body.classList.contains('menu-open');
    toggleMenu(!isOpen);
  });
  
  // Close menu when link is clicked
  $$('.menu-panel a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
      toggleMenu(false);
    }
  });
  
  function toggleMenu(open) {
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (menuPanel) menuPanel.setAttribute('aria-hidden', String(!open));
    if (open) {
      menuPanel.querySelector('a')?.focus();
    } else {
      menuBtn.focus();
    }
  }
}

// ============================================
// INTERACTIVE EFFECTS
// ============================================

function initInteractions() {
  // Magnetic buttons
  $$('[data-magnetic]').forEach(btn => {
    if (window.AnimationUtils) {
      window.AnimationUtils.magneticButton(btn);
    }
  });
  
  // Parallax images
  $$('[data-parallax]').forEach(img => {
    if (window.AnimationUtils) {
      window.AnimationUtils.parallax(img, {
        speed: 0.5
      });
    }
  });
  
  // Counter animations on visible
  initCounters();
}

function initCounters() {
  const counters = $$('.counter[data-value]');
  if (!('IntersectionObserver' in window)) {
    counters.forEach(counter => {
      counter.textContent = Number(counter.dataset.value).toLocaleString() + (counter.dataset.suffix || '');
    });
    return;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const endValue = parseInt(entry.target.dataset.value);
        const suffix = entry.target.dataset.suffix || '';
        
        let current = 0;
        const increment = endValue / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= endValue) {
            current = endValue;
            clearInterval(timer);
          }
          entry.target.textContent = Math.floor(current).toLocaleString() + suffix;
        }, 30);
        
        entry.target.dataset.animated = 'true';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

function initCursor() {
  const cursor = $('.cursor');
  if (!cursor || !window.matchMedia?.('(pointer: fine)').matches) return;
  if (!cursor || !window.matchMedia('(pointer: fine)').matches) return;

  window.addEventListener('pointermove', event => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.classList.add('cursor-visible');
  }, { passive: true });

  $$('a, button').forEach(element => {
    element.addEventListener('pointerenter', () => cursor.classList.add('cursor-active'));
    element.addEventListener('pointerleave', () => cursor.classList.remove('cursor-active'));
  });
}

// ============================================
// SCROLL EFFECTS
// ============================================

function initScrollEffects() {
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      const nav = $('nav');
      if (nav) {
        if (window.scrollY > 80) {
          nav.classList.add('compact');
        } else {
          nav.classList.remove('compact');
        }
      }

      // Hero image zoom
      const heroImg = $('.hero-image');
      if (heroImg && window.scrollY < window.innerHeight) {
        const scale = 1 + (window.scrollY / 9000);
        heroImg.style.transform = `scale(${Math.min(scale, 1.15)})`;
      }

      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ============================================
// OBSERVER FOR REVEAL ELEMENTS
// ============================================

function initRevealObserver() {
  if (!('IntersectionObserver' in window)) {
    $$('[data-reveal]').forEach(el => el.classList.add('revealed'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  $$('[data-reveal]').forEach(el => {
    observer.observe(el);
  });
}

// ============================================
// ACTIVE NAV LINK TRACKING
// ============================================

function initNavTracking() {
  const navLinks = $$('.navlinks a');
  const sections = $$('section[id]');
  if (!('IntersectionObserver' in window)) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === '#' + entry.target.id) {
            link.classList.add('current');
          } else {
            link.classList.remove('current');
          }
        });
      }
    });
  }, {
    threshold: 0.3
  });
  
  sections.forEach(section => observer.observe(section));
}

// ============================================
// STARTUP
// ============================================

function start() {
  init();

  // Keep the document usable if the optional GSAP CDN scripts fail to load.
  if (!window.gsap || !window.ScrollTrigger) {
    $('.loader')?.remove();
  }
  
  // Initialize features after a small delay for animations setup
  setTimeout(() => {
    initRevealObserver();
    initNavTracking();
  }, 500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
