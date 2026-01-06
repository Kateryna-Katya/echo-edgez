/**
 * Echo-Edgez.org - Final JS 2026
 * Aesthetic: Light Neo-Brutalism
 */

window.addEventListener('load', () => {

  // --- 1. ICON INITIALIZATION (LUCIDE) ---
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  // --- 2. SMOOTH SCROLL (LENIS) ---
  let lenis;
  if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true
      });

      function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
  }

  // --- 3. MOBILE MENU ---
  const burger = document.getElementById('burger-menu');
  const menuOverlay = document.getElementById('menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav__link');

  if (burger && menuOverlay) {
      const toggleMenu = () => {
          burger.classList.toggle('active');
          menuOverlay.classList.toggle('active');
          document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
      };

      burger.addEventListener('click', toggleMenu);

      mobileLinks.forEach(link => {
          link.addEventListener('click', () => {
              burger.classList.remove('active');
              menuOverlay.classList.remove('active');
              document.body.style.overflow = '';
          });
      });
  }

  // --- 4. HERO ANIMATION (GSAP + SPLITTYPE) ---
  if (window.gsap && window.SplitType) {
      const heroTitle = document.querySelector('#hero-title');
      if (heroTitle) {
          // Split into words and chars for correct white-space handling
          const text = new SplitType(heroTitle, { types: 'words, chars' });

          gsap.from(text.chars, {
              opacity: 0,
              y: 40,
              rotate: 5,
              duration: 0.7,
              stagger: 0.02,
              ease: "back.out(1.7)",
              delay: 0.3
          });

          gsap.from('.hero__subtitle, .hero__actions', {
              opacity: 0,
              y: 20,
              duration: 1,
              stagger: 0.2,
              delay: 1,
              ease: "power2.out"
          });
      }
  }

  // --- 5. FORM LOGIC (CAPTCHA + VALIDATION + AJAX) ---
  const contactForm = document.getElementById('main-form');
  if (contactForm) {
      const phoneInput = document.getElementById('phone');
      const captchaLabel = document.getElementById('captcha-label');
      const captchaInput = document.getElementById('captcha-input');
      const statusDiv = document.getElementById('form-status');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      // Generate random captcha
      const n1 = Math.floor(Math.random() * 8) + 1;
      const n2 = Math.floor(Math.random() * 9) + 1;
      const sum = n1 + n2;
      if (captchaLabel) captchaLabel.innerText = `${n1} + ${n2} = `;

      // Phone validation (digits and + only)
      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/[^\d+]/g, '');
      });

      contactForm.onsubmit = async (e) => {
          e.preventDefault();

          // Captcha check
          if (parseInt(captchaInput.value) !== sum) {
              statusDiv.innerText = "❌ Calculation error. Please try again.";
              statusDiv.style.display = "block";
              statusDiv.style.background = "#FFCFCF"; // Neo-Pink
              return;
          }

          // Simulated submission
          submitBtn.disabled = true;
          const originalBtnText = submitBtn.innerText;
          submitBtn.innerText = "SENDING...";

          statusDiv.innerText = "⏳ Connecting to the platform...";
          statusDiv.style.display = "block";
          statusDiv.style.background = "#C7D2FE"; // Neo-Indigo

          // Mock network delay
          setTimeout(() => {
              statusDiv.innerHTML = `
                  <div style="text-align: center;">
                      <p style="font-size: 1.2rem; margin-bottom: 5px;">🚀 SUCCESS!</p>
                      <p style="font-weight: 400; font-size: 0.9rem;">Your growth strategy is ready. We will contact you within 15 minutes.</p>
                  </div>
              `;
              statusDiv.style.background = "#00FF94"; // Neo-Green
              statusDiv.style.color = "#1A1A1A";

              contactForm.reset();
              submitBtn.disabled = false;
              submitBtn.innerText = "SEND AGAIN";

              // Fade out captcha after success
              if (captchaLabel) captchaLabel.parentElement.style.opacity = "0.3";
          }, 2000);
      };
  }

  // --- 6. COOKIE POPUP ---
  const cookiePopup = document.getElementById('cookie-popup');
  const acceptBtn = document.getElementById('accept-cookies');

  // Changed key to echo_edgez_cookies
  if (cookiePopup && !localStorage.getItem('echo_edgez_cookies')) {
      setTimeout(() => {
          cookiePopup.classList.add('active');
      }, 3000);
  }

  if (acceptBtn) {
      acceptBtn.onclick = () => {
          localStorage.setItem('echo_edgez_cookies', 'true');
          cookiePopup.classList.remove('active');
      };
  }
});