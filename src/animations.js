/**
 * CR7 — THE PHENOMENON
 * GSAP Animation Utilities
 * Reusable cinematic animation system
 */

const animationEngine = window.gsap;
const scrollTriggerPlugin = window.ScrollTrigger;
const animationsAvailable = Boolean(animationEngine && scrollTriggerPlugin);

if (animationsAvailable) {
  animationEngine.registerPlugin(scrollTriggerPlugin);
}

// ============================================
// ANIMATION UTILITIES
// ============================================

const AnimationUtils = {
  /**
   * Split text reveal with stagger
   */
  splitTextReveal(element, options = {}) {
    const defaults = {
      duration: 0.8,
      stagger: 0.05,
      delay: 0,
      ease: 'power2.out',
      y: 20,
      opacity: 0
    };
    const config = { ...defaults, ...options };
    
    const text = element.textContent;
    element.innerHTML = text
      .split('')
      .map(char => char === ' ' ? '<span>&nbsp;</span>' : `<span>${char}</span>`)
      .join('');
    
    const spans = element.querySelectorAll('span');
    
    return gsap.to(spans, {
      duration: config.duration,
      delay: config.delay,
      stagger: config.stagger,
      ease: config.ease,
      y: 0,
      opacity: 1
    });
  },

  /**
   * Word-by-word reveal (dramatic effect)
   */
  wordReveal(element, options = {}) {
    const defaults = {
      duration: 0.6,
      stagger: 0.15,
      delay: 0,
      ease: 'power2.out',
      y: 30,
      opacity: 0
    };
    const config = { ...defaults, ...options };
    
    const words = element.textContent.split(' ');
    element.innerHTML = words
      .map(word => `<span class="word">${word}</span>`)
      .join(' ');
    
    const wordSpans = element.querySelectorAll('.word');
    
    return gsap.to(wordSpans, {
      duration: config.duration,
      delay: config.delay,
      stagger: config.stagger,
      ease: config.ease,
      y: 0,
      opacity: 1
    });
  },

  /**
   * Counter animation (0 to value)
   */
  counter(element, endValue, options = {}) {
    const defaults = {
      duration: 2,
      ease: 'power2.out',
      suffix: '',
      decimals: 0,
      onUpdate: null
    };
    const config = { ...defaults, ...options };
    
    const obj = { value: 0 };
    
    gsap.to(obj, {
      value: endValue,
      duration: config.duration,
      ease: config.ease,
      onUpdate() {
        const formatted = Math.round(obj.value).toLocaleString();
        element.textContent = formatted + config.suffix;
        if (config.onUpdate) config.onUpdate(formatted);
      }
    });
  },

  /**
   * Parallax scroll effect
   */
  parallax(element, options = {}) {
    const defaults = {
      speed: 0.5,
      y: 0,
      trigger: null
    };
    const config = { ...defaults, ...options };
    
    gsap.to(element, {
      y: () => (window.innerHeight + element.offsetHeight) * config.speed,
      scrollTrigger: {
        trigger: config.trigger || element,
        scrub: 0.5,
        markers: false
      },
      ease: 'none'
    });
  },

  /**
   * Image zoom on scroll
   */
  zoomImage(element, options = {}) {
    const defaults = {
      maxScale: 1.05,
      trigger: null
    };
    const config = { ...defaults, ...options };
    
    gsap.to(element, {
      scale: config.maxScale,
      scrollTrigger: {
        trigger: config.trigger || element,
        scrub: 1,
        markers: false
      },
      ease: 'none'
    });
  },

  /**
   * Fade in on scroll
   */
  fadeIn(element, options = {}) {
    const defaults = {
      duration: 0.8,
      delay: 0,
      ease: 'power2.out',
      trigger: null,
      markers: false
    };
    const config = { ...defaults, ...options };
    
    gsap.set(element, { opacity: 0, y: 40 });
    
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: config.duration,
      delay: config.delay,
      ease: config.ease,
      scrollTrigger: {
        trigger: config.trigger || element,
        start: 'top 80%',
        markers: config.markers
      }
    });
  },

  /**
   * Horizontal scroll section
   */
  horizontalScroll(container, options = {}) {
    const defaults = {
      trigger: null,
      duration: 1
    };
    const config = { ...defaults, ...options };
    
    const panels = gsap.utils.toArray(container.children);
    
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: config.trigger || container,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => '+=' + (container.offsetWidth * panels.length)
      }
    });
  },

  /**
   * Text clip reveal
   */
  clipReveal(element, options = {}) {
    const defaults = {
      duration: 1.2,
      delay: 0,
      ease: 'power3.inOut',
      direction: 'ltr' // ltr, rtl, ttb, btt
    };
    const config = { ...defaults, ...options };
    
    gsap.set(element, { 
      clipPath: config.direction === 'ltr' ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'
    });
    
    return gsap.to(element, {
      clipPath: 'inset(0 0% 0 0)',
      duration: config.duration,
      delay: config.delay,
      ease: config.ease
    });
  },

  /**
   * Staggered element entrance
   */
  staggerIn(elements, options = {}) {
    const defaults = {
      duration: 0.6,
      stagger: 0.1,
      delay: 0,
      ease: 'power2.out',
      from: { opacity: 0, y: 30 }
    };
    const config = { ...defaults, ...options };
    
    gsap.set(elements, config.from);
    
    return gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: config.duration,
      stagger: config.stagger,
      delay: config.delay,
      ease: config.ease
    });
  },

  /**
   * Magnetic button effect
   */
  magneticButton(button, options = {}) {
    const defaults = {
      distance: 30,
      ease: 'power2.out'
    };
    const config = { ...defaults, ...options };
    
    let x = 0, y = 0;
    
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      x = (e.clientX - centerX) * 0.3;
      y = (e.clientY - centerY) * 0.3;
      
      gsap.to(button, {
        x: x,
        y: y,
        duration: 0.3,
        ease: config.ease,
        overwrite: 'auto'
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: config.ease,
        overwrite: 'auto'
      });
    });
  },

  /**
   * Screen shake effect
   */
  shake(element, options = {}) {
    const defaults = {
      intensity: 5,
      duration: 0.5
    };
    const config = { ...defaults, ...options };
    
    return gsap.to(element, {
      x: () => gsap.utils.random(-config.intensity, config.intensity),
      y: () => gsap.utils.random(-config.intensity, config.intensity),
      rotation: () => gsap.utils.random(-0.5, 0.5),
      duration: 0.05,
      repeat: Math.floor(config.duration * 1000 / 50),
      ease: 'none'
    });
  },

  /**
   * Cinematic fade to black transition
   */
  fadeToBlack(duration = 0.8) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000;
      z-index: 9999;
      pointer-events: none;
    `;
    overlay.id = 'fade-overlay';
    document.body.appendChild(overlay);
    
    gsap.from(overlay, {
      opacity: 0,
      duration: duration
    });
    
    return overlay;
  },

  /**
   * Fade from black (reveal)
   */
  fadeFromBlack(overlay, duration = 0.8) {
    return gsap.to(overlay, {
      opacity: 0,
      duration: duration,
      onComplete: () => overlay.remove()
    });
  },

  /**
   * Number increment with scroll
   */
  scrollCounter(element, endValue, options = {}) {
    const defaults = {
      suffix: '',
      trigger: null,
      start: 'top 80%'
    };
    const config = { ...defaults, ...options };
    
    const obj = { value: 0 };
    
    gsap.to(obj, {
      value: endValue,
      duration: 1.5,
      scrollTrigger: {
        trigger: config.trigger || element,
        start: config.start,
        markers: false
      },
      onUpdate: () => {
        element.textContent = Math.round(obj.value).toLocaleString() + config.suffix;
      }
    });
  },

  /**
   * Blurred to sharp image reveal
   */
  blurReveal(element, options = {}) {
    const defaults = {
      duration: 1.2,
      ease: 'power2.inOut'
    };
    const config = { ...defaults, ...options };
    
    gsap.set(element, { filter: 'blur(20px)', opacity: 0.5 });
    
    return gsap.to(element, {
      filter: 'blur(0px)',
      opacity: 1,
      duration: config.duration,
      ease: config.ease
    });
  }
};

// ============================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================

function initScrollAnimations() {
  // Reveal sections on scroll
  document.querySelectorAll('[data-reveal]').forEach(el => {
    AnimationUtils.fadeIn(el, {
      duration: 0.8,
      trigger: el
    });
  });
  
  // Counter animations
  document.querySelectorAll('.counter[data-value]').forEach(el => {
    const endValue = parseInt(el.dataset.value);
    const suffix = el.dataset.suffix || '';
    
    gsap.to(el, {
      textContent: endValue,
      duration: 2,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true
      },
      snap: { textContent: 1 },
      onUpdate: function() {
        el.textContent = Math.floor(this.targets()[0].textContent).toLocaleString() + suffix;
      }
    });
  });
}

// ============================================
// LOADER ANIMATION
// ============================================

function initLoaderAnimation() {
  const loader = document.querySelector('.loader');
  if (!loader) return;
  
  const loaderMark = document.querySelector('.loader-mark');
  const progress = document.querySelector('.loader-line i');
  const percentage = document.querySelector('.loader-meta b');
  
  // Animate CR7 text
  gsap.from(loaderMark, {
    scale: 0.5,
    opacity: 0,
    duration: 1,
    ease: 'back.out'
  });
  
  // Progress bar
  gsap.to(progress, {
    width: '100%',
    duration: 2,
    ease: 'power1.inOut'
  });

  gsap.to({ value: 0 }, {
    value: 100,
    duration: 2,
    ease: 'power1.inOut',
    onUpdate() {
      if (percentage) {
        percentage.textContent = String(Math.round(this.targets()[0].value)).padStart(2, '0');
      }
    }
  });
  
  // Fade out loader
  gsap.to(loader, {
    opacity: 0,
    duration: 0.8,
    delay: 2.5,
    ease: 'power2.inOut',
    onComplete: () => {
      loader.style.display = 'none';
    }
  });
}

// ============================================
// HERO SECTION ANIMATION
// ============================================

function initHeroAnimation() {
  const heroImage = document.querySelector('.hero-image');
  const heroContent = document.querySelector('.hero-content');
  
  if (heroImage) {
    gsap.from(heroImage, {
      opacity: 0,
      scale: 1.1,
      duration: 1.2,
      ease: 'power2.out',
      delay: 0.3
    });
  }
  
  if (heroContent) {
    const title = heroContent.querySelector('h1');
    const subtitle = heroContent.querySelector('p');
    
    if (title) {
      AnimationUtils.splitTextReveal(title, {
        duration: 0.05,
        stagger: 0.02,
        delay: 0.5
      });
    }
    
    if (subtitle) {
      gsap.from(subtitle, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
        delay: 1.2
      });
    }
  }
}

// ============================================
// NAVIGATION ANIMATIONS
// ============================================

function initNavigation() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  
  gsap.set(nav, { opacity: 0, y: -20 });
  gsap.to(nav, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out'
  });
  
}

// ============================================
// INITIALIZE ON LOAD
// ============================================

function initAllAnimations() {
  // Wait for DOM to be fully ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        initLoaderAnimation();
        initNavigation();
        initHeroAnimation();
      }, 100);
    });
  } else {
    setTimeout(() => {
      initLoaderAnimation();
      initNavigation();
      initHeroAnimation();
    }, 100);
  }
}

// Auto-initialize only when the CDN-provided animation dependencies are ready.
if (animationsAvailable) {
  initAllAnimations();
}

// Export for manual use
window.AnimationUtils = animationsAvailable ? AnimationUtils : undefined;
