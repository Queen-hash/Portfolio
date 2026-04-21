const aboutEnterEls = [
  { sel: '.navbar',           tx: 0,   ty: -18, delay: 0    },
  { sel: '.about-photo-wrap', tx: -28, ty: 0,   delay: 0.15 },
  { sel: '.about-left',       tx: 28,  ty: 0,   delay: 0.22 },
];

aboutEnterEls.forEach(({ sel, tx, ty, delay }) => {
  const el = document.querySelector(sel);
  if (!el) return;
  el.style.opacity   = '0';
  el.style.transform = `translate(${tx}px, ${ty}px)`;
  el.style.transition = `opacity 0.8s ${delay}s ease, transform 0.8s ${delay}s cubic-bezier(0.22,1,0.36,1)`;
});

window.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash-screen');
  setTimeout(() => {
    splash.classList.add('splash-hidden');
    setTimeout(() => {
      aboutEnterEls.forEach(({ sel }) => {
        const el = document.querySelector(sel);
        if (!el) return;
        el.style.opacity   = '1';
        el.style.transform = 'none';
      });
      splash.remove(); 
    }, 800); 
  }, 4000); 
});


const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section-label').forEach(el => {
  el.classList.add('fade-left');
  revealObserver.observe(el);
});

document.querySelectorAll('.about-left').forEach(el => {
  el.classList.add('fade-right');
  revealObserver.observe(el);
});
document.querySelectorAll('.about-photo-wrap').forEach(el => {
  el.classList.add('fade-left');
  revealObserver.observe(el);
});
document.querySelectorAll('.stat-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
  el.classList.add('fade-el');
  revealObserver.observe(el);
});
document.querySelectorAll('.skills-section').forEach(el => {
  el.classList.add('fade-el');
  revealObserver.observe(el);
});

document.querySelectorAll('.skill-icon-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.07}s`;
  el.classList.add('fade-el');
  revealObserver.observe(el);
});

document.querySelectorAll('.project-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.12}s`;
  el.classList.add('fade-el');
  if (el.classList.contains('coming-soon')) {
    el.style.opacity = '';
    el.addEventListener('transitionend', () => {
      if (el.classList.contains('visible')) {
        el.style.opacity = '0.35';
      } else {
        el.style.opacity = '';
      }
    });
  }
  revealObserver.observe(el);
});

document.querySelectorAll('.contact-heading, .contact-sub').forEach(el => {
  el.classList.add('fade-el');
  revealObserver.observe(el);
});

document.querySelectorAll('.timeline-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.12}s`;
  el.classList.add('fade-el');
  revealObserver.observe(el);
});
document.querySelectorAll('.contact-link').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.5}s`;
  el.classList.add('fade-el');
  revealObserver.observe(el);
});

document.querySelectorAll('footer p').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
  el.classList.add('fade-el');
  revealObserver.observe(el);
});

document.querySelectorAll('.contact-heading, .contact-sub, .contact-form-wrap').forEach(el => {
  el.classList.add('fade-el');
  revealObserver.observe(el);
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-pill');

const scrollProgressEl = document.getElementById('scroll-progress');
const aboutPhotoEl = document.querySelector('.about-photo-img');

window.addEventListener('scroll', () => {
  let current = '';
  const scrollOffset = window.innerHeight * 0.3; // Trigger earlier for better feel
  
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - scrollOffset) {
      current = section.getAttribute('id');
    }
  });

  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  if (scrollProgressEl) {
    scrollProgressEl.style.width = scrolled + "%";
  }
  
  if (aboutPhotoEl) {
    aboutPhotoEl.style.transform = `translateY(${winScroll * 0.12}px)`; // Slightly reduced for subtleness
  }
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

document.querySelectorAll('.stat-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const rx   = (((e.clientY - rect.top)  / rect.height) - 0.5) * -20;
    const ry   = (((e.clientX - rect.left) / rect.width)  - 0.5) *  20;
    card.style.transition  = 'border-color 0.15s, box-shadow 0.15s';
    card.style.transform   = `perspective(500px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
    card.style.borderColor = 'rgba(205, 234, 18, 0.35)';
    card.style.boxShadow   = `${-ry * 0.8}px ${rx * 0.8}px 24px rgba(200,245,66,0.1)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition  = 'border-color 0.3s, box-shadow 0.3s, transform 0.55s cubic-bezier(0.22,1,0.36,1)';
    card.style.transform   = 'perspective(500px) rotateX(0) rotateY(0) translateY(0)';
    card.style.borderColor = '';
    card.style.boxShadow   = '';
  });
});

const certModal      = document.getElementById('cert-modal');
const certModalClose = document.getElementById('cert-modal-close');
const certStatCard   = document.getElementById('cert-stat-card');

function openCertModal() {
  certModal.classList.remove('hidden');
  requestAnimationFrame(() => requestAnimationFrame(() => certModal.classList.add('visible')));
}

function closeCertModal() {
  certModal.classList.remove('visible');
  setTimeout(() => certModal.classList.add('hidden'), 300);
}

if (certStatCard) certStatCard.addEventListener('click', openCertModal);
if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
if (certModal) certModal.addEventListener('click', (e) => { if (e.target === certModal) closeCertModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCertModal(); });

document.querySelectorAll('.project-card:not(.coming-soon)').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const rx   = (((e.clientY - rect.top)  / rect.height) - 0.5) * -18;
    const ry   = (((e.clientX - rect.left) / rect.width)  - 0.5) *  18;
    card.style.transition  = 'border-color 0.15s, box-shadow 0.15s';
    card.style.transform   = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
    card.style.borderColor = '#c8f542';
    card.style.boxShadow   = `${-ry * 1.5}px ${rx * 1.5}px 30px rgba(200,245,66,0.12)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition  = 'border-color 0.3s, box-shadow 0.3s, transform 0.55s cubic-bezier(0.22,1,0.36,1)';
    card.style.transform   = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
    card.style.borderColor = '';
    card.style.boxShadow   = '';
  });
});

document.querySelectorAll('.contact-link').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect    = card.getBoundingClientRect();
    const x       = e.clientX - rect.left;
    const y       = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform   = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    card.style.borderColor = '#c8f542';
    card.style.color       = '#c8f542';
    card.style.boxShadow   = `${-rotateY * 2}px ${rotateX * 2}px 25px rgba(200,245,66,0.1)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform   = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
    card.style.borderColor = '';
    card.style.color       = '';
    card.style.boxShadow   = '';
  });
});

const typingText = document.getElementById('typing-text');
const words = ["Web Developer", "Front-end Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50; 
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 150;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    typeSpeed = 2000; 
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 1000); 
});

const menuToggle = document.getElementById('mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');
const navItemsMobile = document.querySelectorAll('.nav-pill');

menuToggle.addEventListener('click', () => {
  navLinksContainer.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
});

navItemsMobile.forEach(item => {
  item.addEventListener('click', () => {
    navLinksContainer.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

const yearElement = document.getElementById('current-year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('contact-submit');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    

    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Mohon tunggu...';
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    const data = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {

        contactForm.classList.add('fade-out');
        

        setTimeout(() => {
          formStatus.classList.remove('hidden');
          formStatus.classList.add('visible');
        }, 400); 

        contactForm.reset();


        setTimeout(() => {

          formStatus.classList.remove('visible');
          
          setTimeout(() => {
            formStatus.classList.add('hidden');
            

            contactForm.classList.remove('fade-out');
            

            submitBtn.textContent = originalText;
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
          }, 500);
        }, 5000);

      }
    } catch (error) {

      alert('Maaf, permintaan tidak dapat dikirim. Silakan periksa koneksi internet Anda dan coba lagi.');
      submitBtn.textContent = originalText;
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
}

const svgEl = document.querySelector('.strings-svg');
const physicsItems = document.querySelectorAll('.physics-item');
const photoWrap = document.querySelector('.about-photo-wrap');

if (svgEl && physicsItems.length > 0 && photoWrap) {
  physicsItems.forEach((item, index) => {

    const anchorXPct = parseFloat(item.getAttribute('data-anchor-x'));
    const anchorYPct = parseFloat(item.getAttribute('data-anchor-y'));
    const ropeLength = parseFloat(item.getAttribute('data-length'));

    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svgEl.appendChild(pathEl);

    let isDragging = false;
    let isDropped = false; 

    let currentX = 0;
    let currentY = -150; 
    let velocityX = 0;
    let velocityY = 0;
      
    
    const spring = 0.02;   
    const friction = 0.98; 

    setTimeout(() => {
      isDropped = true;
    }, 2500 + (index * 200));

    function getAnchorPos() {
      return {
        x: (anchorXPct / 100) * photoWrap.offsetWidth,
        y: (anchorYPct / 100) * photoWrap.offsetHeight
      };
    }

    function initPos() {
      const anchor = getAnchorPos();
      currentX = anchor.x;
      currentY = -150; 
    }
    setTimeout(initPos, 50);

    item.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      currentX += e.movementX;
      currentY += e.movementY;
    });

    let startTouch = { x: 0, y: 0 };
    item.addEventListener('touchstart', (e) => {
      isDragging = true;
      startTouch.x = e.touches[0].clientX;
      startTouch.y = e.touches[0].clientY;
      e.preventDefault(); 
    }, { passive: false });
      
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX += (e.touches[0].clientX - startTouch.x);
      currentY += (e.touches[0].clientY - startTouch.y);
      startTouch.x = e.touches[0].clientX;
      startTouch.y = e.touches[0].clientY;
    });

    function animatePhysics() {
      const anchor = getAnchorPos();
      const targetX = anchor.x;
      
      const targetY = isDropped ? anchor.y + ropeLength : -150;

      if (!isDragging) {
        velocityX += (targetX - currentX) * spring;
        velocityY += (targetY - currentY) * spring;
          
        velocityX *= friction;
        velocityY *= friction;
          
        currentX += velocityX;
        currentY += velocityY;
      }
        
      item.style.transform = `translate(${currentX}px, ${currentY}px)`;
        
      const midX = (anchor.x + currentX) / 2;
      const midY = (anchor.y + currentY) / 2;
        
      const controlX = midX - velocityX * 10;
      const controlY = midY - velocityY * 2.5 + 25; 
        
      pathEl.setAttribute('d', `M ${anchor.x} ${anchor.y} Q ${controlX} ${controlY} ${currentX} ${currentY}`);
        
      requestAnimationFrame(animatePhysics);
    }
      
    animatePhysics();
  });
}
