// ===== CURSOR GLOW =====
const glow = document.getElementById('cursorGlow');
if (glow) {
  document.addEventListener('mousemove', e => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

// ===== NAVBAR SCROLL EFFECT =====
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== REVEAL ANIMATIONS ON SCROLL =====
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
}

// ===== STATS COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-num[data-count]');
if (counters.length) {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let start = 0;
      const step = () => {
        start += Math.ceil(target / 30);
        if (start > target) start = target;
        el.textContent = start;
        if (start < target) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));
}

// ===== PROJECT STATS COUNTER (Portfolio Page) =====
const projectStats = document.querySelectorAll('.stat-number');
if (projectStats.length) {
  const projectStatsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      projectStats.forEach(stat => {
        const targetText = stat.textContent;
        const target = parseInt(targetText);
        if (!isNaN(target)) {
          let start = 0;
          const step = () => {
            start += Math.ceil(target / 30);
            if (start > target) start = target;
            stat.textContent = start + '+';
            if (start < target) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
        }
      });
      projectStatsObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  const statsSection = document.querySelector('.project-stats-grid');
  if (statsSection) {
    projectStatsObserver.observe(statsSection);
  }
}

// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  
  // Close menu when clicking a link
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
const pageLinks = document.querySelectorAll('.nav-links a');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
pageLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (!href) return;
  const normalized = href.split('/').pop();
  if (normalized === currentPage || (currentPage === '' && normalized === 'index.html')) {
    link.classList.add('active');
  }
});

// ===== LOADER HIDE =====
const loader = document.getElementById('loader');
if (loader) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 500);
  });
}

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== THEME TOGGLE WITH FAVICON / ICON =====
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  
  // Set initial icon (using Font Awesome)
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.body.classList.remove('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  // Toggle theme on click
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    
    // Update icon
    if (isLight) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'light');
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'dark');
    }
  });
}

// ===== CONTACT FORM HANDLER =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    
    // Get form values
    const firstName = contactForm.querySelector('input[placeholder="Kwame"]')?.value;
    const lastName = contactForm.querySelector('input[placeholder="Mensah"]')?.value;
    const email = contactForm.querySelector('input[type="email"]')?.value;
    const service = contactForm.querySelector('select')?.value;
    
    // Simple validation
    if (!firstName || !lastName || !email || !service) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent ✓';
      submitButton.style.background = '#2a9d5c';
      setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.style.background = '';
      }, 3000);
    }
    contactForm.reset();
  });
}

// ===== FAQ ACCORDION (Contact Page) =====
const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length) {
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        // Toggle current item
        item.classList.toggle('active');
      });
    }
  });
}

// ===== SERVICES FAQ ACCORDION =====
const servicesFaqItems = document.querySelectorAll('.services-faq-item');
if (servicesFaqItems.length) {
  servicesFaqItems.forEach(item => {
    const question = item.querySelector('.services-faq-question');
    if (question) {
      question.addEventListener('click', () => {
        servicesFaqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        item.classList.toggle('active');
      });
    }
  });
}

// ===== PORTFOLIO FILTER FUNCTIONALITY =====
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-card');

if (filterButtons.length && portfolioItems.length) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      // Filter items
      portfolioItems.forEach(item => {
        const categories = item.getAttribute('data-category');
        if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ===== PORTFOLIO MODAL FUNCTIONALITY =====
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeModalBtn = document.querySelector('.modal-close-btn');

// Project data
const projects = {
  helppro: {
    title: 'HelpPro — Support System',
    category: 'Web App · IT Support',
    description: 'A comprehensive ticketing system designed for IT support teams to manage, track, and resolve client issues efficiently.',
    challenge: 'The client needed a centralized system to handle growing support requests across multiple departments.',
    solution: 'We built a custom web application with ticket tracking, automated assignments, and real-time analytics dashboard.',
    results: ['45% faster response time', '500+ active users', '98% client satisfaction'],
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    duration: '3 months',
    client: 'TechFlow Solutions'
  },
  creativeedge: {
    title: 'CreativeEdge — Portfolio Site',
    category: 'Website · Portfolio',
    description: 'A stunning portfolio website for a creative agency showcasing their work in design and branding.',
    challenge: 'The agency needed a visually impressive portfolio that loads fast and works perfectly on all devices.',
    solution: 'We designed a minimalist, image-focused website with smooth animations and optimized performance.',
    results: ['98% Lighthouse score', '40% increase in inquiries', 'Mobile-first design'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
    duration: '6 weeks',
    client: 'CreativeEdge Agency'
  },
  nextcorp: {
    title: 'NextCorp — Business Website',
    category: 'Corporate · Website',
    description: 'A lead-focused corporate website for a growing technology company.',
    challenge: 'The client wanted to establish authority and generate more qualified leads through their online presence.',
    solution: 'We built a conversion-optimized website with clear CTAs, case studies, and an integrated CRM.',
    results: ['60% increase in leads', '40% faster load time', 'Improved SEO ranking'],
    technologies: ['WordPress', 'PHP', 'MySQL', 'Analytics'],
    duration: '2 months',
    client: 'NextCorp Ltd'
  },
  techx: {
    title: 'TechX Summit — Event Flyer',
    category: 'Graphic Design · Event',
    description: 'Event marketing collateral designed to generate buzz and drive attendance.',
    challenge: 'The event needed standout visuals that would grab attention on social media and print.',
    solution: 'We created a bold, modern flyer series with consistent branding and viral-friendly design.',
    results: ['200% increase in engagement', 'Viral on Instagram', 'Sold-out event'],
    technologies: ['Adobe Illustrator', 'Photoshop', 'After Effects'],
    duration: '2 weeks',
    client: 'TechX Summit'
  },
  itsecurity: {
    title: 'SecureNet — Network Setup',
    category: 'IT Support · Security',
    description: 'Complete network security overhaul for a financial services firm.',
    challenge: 'The firm was experiencing security concerns and frequent downtime.',
    solution: 'We implemented enterprise-grade security protocols, 24/7 monitoring, and staff training.',
    results: ['99.9% uptime achieved', 'Zero security breaches', '50% faster IT response'],
    technologies: ['Firewalls', 'VPN', 'Monitoring Tools', 'Encryption'],
    duration: '1 month',
    client: 'SecureNet Financial'
  },
  brandidentity: {
    title: 'AfroChic — Complete Rebrand',
    category: 'Brand Identity',
    description: 'Full brand identity transformation for a fashion and lifestyle brand.',
    challenge: 'The brand needed to modernize and appeal to a younger, trendier audience.',
    solution: 'We created a complete brand identity including logo, color palette, typography, and brand guidelines.',
    results: ['150% brand recognition', 'Featured in design blogs', 'Expanded customer base'],
    technologies: ['Adobe Creative Suite', 'Brand Strategy', 'Market Research'],
    duration: '2 months',
    client: 'AfroChic'
  }
};

// Open modal with project details
const viewProjectBtns = document.querySelectorAll('.view-project-btn');
if (viewProjectBtns.length && modal && modalContent) {
  viewProjectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project');
      const project = projects[projectId];
      
      if (project) {
        modalContent.innerHTML = `
          <div class="project-detail">
            <div class="project-header">
              <span class="project-category"><i class="fas fa-tag"></i> ${project.category}</span>
              <h2>${project.title}</h2>
            </div>
            <div class="project-body">
              <div class="project-section">
                <h3><i class="fas fa-info-circle"></i> Project Overview</h3>
                <p>${project.description}</p>
              </div>
              <div class="project-section">
                <h3><i class="fas fa-exclamation-triangle"></i> The Challenge</h3>
                <p>${project.challenge}</p>
              </div>
              <div class="project-section">
                <h3><i class="fas fa-lightbulb"></i> Our Solution</h3>
                <p>${project.solution}</p>
              </div>
              <div class="project-section">
                <h3><i class="fas fa-chart-line"></i> Key Results</h3>
                <ul>
                  ${project.results.map(result => `<li><i class="fas fa-check-circle"></i> ${result}</li>`).join('')}
                </ul>
              </div>
              <div class="project-meta-grid">
                <div class="meta-item">
                  <i class="fas fa-code"></i>
                  <strong>Technologies</strong>
                  <span>${project.technologies.join(', ')}</span>
                </div>
                <div class="meta-item">
                  <i class="fas fa-clock"></i>
                  <strong>Duration</strong>
                  <span>${project.duration}</span>
                </div>
                <div class="meta-item">
                  <i class="fas fa-user"></i>
                  <strong>Client</strong>
                  <span>${project.client}</span>
                </div>
              </div>
            </div>
            <div class="project-footer">
              <a href="contact.html" class="btn-primary">Start a Similar Project <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
        `;
        modal.classList.add('show');
      }
    });
  });
}

// Close modal
if (closeModalBtn && modal) {
  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });
}

// Close modal when clicking outside
if (modal) {
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });
}

// ===== SUCCESS MODAL FUNCTIONS =====
function closeSuccessModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.remove('show');
  }
}

// Make function available globally
window.closeSuccessModal = closeSuccessModal;

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});