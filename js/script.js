  const html = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle-btn');
  themeBtn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    themeBtn.querySelector('i').className = next === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
  });

  function tick() {
    const d = new Date();
    const day = `${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()]}, ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()]} ${d.getDate()}`;
    const time = d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',hour12:false});
    
    if(document.getElementById('h-day')) document.getElementById('h-day').textContent = day;
    if(document.getElementById('h-time')) document.getElementById('h-time').textContent = time;
    if(document.getElementById('h-day-mob')) document.getElementById('h-day-mob').textContent = day;
    if(document.getElementById('h-time-mob')) document.getElementById('h-time-mob').textContent = time;
  }
  setInterval(tick, 1000); tick();

  const words = ['Jibril', 'an Engineer', 'a Developer'];
  let wi=0, ci=0, del=false;
  function type() {
    const el = document.getElementById('typed-word');
    if (!el) { setTimeout(type, 1000); return; }
    const w = words[wi];
    el.textContent = del ? w.slice(0, --ci) : w.slice(0, ++ci);
    if (!del && ci === w.length) { del=true; setTimeout(type, 2000); }
    else if (del && ci === 0) { del=false; wi=(wi+1)%words.length; setTimeout(type, 500); }
    else setTimeout(type, del ? 50 : 100);
  }
  type();

  const reveals = document.querySelectorAll('.reveal');
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in-view'); });
  }, { threshold: 0.1 });
  reveals.forEach(r => revealIO.observe(r));

  window.addEventListener('scroll', () => {
    const timelines = document.querySelectorAll('.vertical-timeline');
    timelines.forEach(tl => {
      const rect = tl.getBoundingClientRect();
      const wH = window.innerHeight;
      let p = 0;
      if (rect.top < wH * 0.6) p = (wH * 0.6 - rect.top) / rect.height;
      p = Math.max(0, Math.min(1, p));
      tl.style.setProperty('--scroll-progress', `${p * 100}%`);
      tl.querySelectorAll('.vt-item').forEach((item, i) => {
        const d = tl.querySelectorAll('.vt-dot')[i];
        if (item.getBoundingClientRect().top < wH * 0.6) d.classList.add('active');
        else d.classList.remove('active');
      });
    });
  });

  const deck = document.getElementById('skill-deck');
  if (deck) {
    deck.addEventListener('click', () => {
      const first = deck.firstElementChild;
      deck.appendChild(first);
      Array.from(deck.children).forEach((child, i) => {
        child.style.setProperty('--deck-idx', i);
      });
    });
  }

  const projects = [
    { title: 'Trax', desc: 'A platform for real-time listening insights and social system.', longDesc: 'Trax is a next-generation music analytics platform that goes beyond surface-level stats. Instead of relying on incomplete third-party data, it intelligently tracks real listening behavior — capturing patterns like skips, replays, and actual engagement in near real-time.Built around a "Smart Sync" architecture, Trax continuously processes listening activity to deliver more accurate insights into your music habits. From deep personal stats to competitive social leaderboards, it transforms passive listening into something interactive and meaningful.Whether youre exploring your top tracks, analyzing trends, or competing with friends, Trax gives you a clearer, more honest picture of your music life.', highlights: ['Real-time Spotify integration','Interactive data visualization dashboards','Social discovery and friend activity tracking','Advanced Hybrid Insights'], year: '2026', role: 'Founder', tags: ['Python','React','API','Typescript','Redis','PostgreSQL'], demo: 'https://olajireyy.github.io/trax-demo/', img: 'img/trax.png' },
    { title: 'Coffee Shop', desc: 'Ecommerce platform enabling users to order coffee and manage purchases seamlessly.', longDesc: 'A premium ecommerce experience built for client. It features a streamlined ordering process, secure payments, and a robust admin dashboard for order management.', highlights: ['Seamless checkout with Paystack integration','Dynamic cart and inventory management','Responsive design for mobile ordering','Automated email receipts and status updates'], year: '2024', role: 'Full-Stack Developer', tags: ['Django','Frontend','Payment'], demo: '', img: 'img/coffeeshop.png' },
    { title: 'The.Blog', desc: 'An enterprise-grade editorial engine for modern publishing workflows.', longDesc: 'A powerhouse MVC application engineering a seamless bridge between complex data management and premium UI presentation. Built with an ASP.NET Core backend, this platform features a comprehensive CRUD architecture powered by Entity Framework Core, utilizing SQLite for lightweight yet production-ready data persistence. The frontend is a masterclass in Razor view orchestration, implementing advanced model binding and server-side validation to ensure zero-compromise data integrity. The design philosophy centers on an "Editorial Dark" aesthetic, fusing custom typography from Google Fonts with a high-contrast editorial layout. Fully optimized for the modern cloud, the application is deployed directly to Azure App Service, offering a scalable, high-performance solution for digital content creators.', highlights: ['Enterprise-ready CRUD architecture with EF Core','Production-grade SQLite integration and automated migrations','Razor-sharp model binding and server-side validation','Custom "Editorial Dark" design system for a premium aesthetic','High-performance Azure App Service deployment'], year: '2026', role: 'Full-Stack Developer', tags: ['ASP.NET Core', 'MVC', 'EF Core', 'SQLite', 'Azure', 'Razor'], demo: 'https://blogappx.azurewebsites.net/', img: 'img/blogapp.png' }
    
  ];

  const stackCards = document.querySelectorAll('.stack-card');
  const sbInfo = document.querySelector('.sb-info');
  const sidebar = document.querySelector('.sidebar');
  const defaultSbHtml = sbInfo.innerHTML; 
  const sbPhotoImg = document.querySelector('.sb-photo img');
  const defaultPhotoSrc = sbPhotoImg ? sbPhotoImg.src : '';

  let activeProjIdx = -1;
  let isProjectsSection = false;

  function setSidebarContent(htmlContent, idx = -1) {
    if(sbInfo.innerHTML === htmlContent) return;
    sbInfo.style.opacity = 0;
    
    if (idx !== -1 && sbPhotoImg && projects[idx]) {
       sidebar.classList.add('proj-mode');
       sbPhotoImg.style.transition = 'opacity 0.25s ease';
       sbPhotoImg.style.opacity = 0;
       setTimeout(() => {
          sbPhotoImg.src = projects[idx].img;
          sbPhotoImg.style.opacity = 1;
       }, 250);
    } else if (idx === -1 && sbPhotoImg) {
       sidebar.classList.remove('proj-mode');
       sbPhotoImg.style.transition = 'opacity 0.25s ease';
       sbPhotoImg.style.opacity = 0;
       setTimeout(() => {
          sbPhotoImg.src = defaultPhotoSrc;
          sbPhotoImg.style.opacity = 1;
       }, 250);
    }

    setTimeout(() => {
      sbInfo.innerHTML = htmlContent;
      sbInfo.style.transition = 'opacity 0.4s ease';
      sbInfo.style.opacity = 1;
    }, 250);
  }

  function initMobileProjects() {
    projects.forEach((p, idx) => {
      const card = document.querySelectorAll('.stack-card')[idx];
      const blurBg = card ? card.querySelector('.card-bg-blur') : null;
      if (blurBg) blurBg.style.backgroundImage = `url(${p.img})`;
      
      const container = document.getElementById(`stack-card-${idx}`);
      if (!container) return;
      const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
      container.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="stack-card-meta">
          <div class="stack-card-meta-item"><label>Year</label><span>${p.year}</span></div>
          <div class="stack-card-meta-item"><label>Role</label><span>${p.role}</span></div>
        </div>
        <div class="stack-card-tags">${tags}</div>
        <button class="btn btn-primary" onclick="openProjectModal(${idx})" style="width:100%; justify-content:center; height: 54px; font-weight: 700; font-size: 1.1rem; border-radius: 3rem;">Read More <i class='bx bx-right-arrow-alt'></i></button>
      `;
    });
  }
  window.addEventListener('DOMContentLoaded', initMobileProjects);

  function renderProjectSidebar(idx) {
    const p = projects[idx];
    if(!p) return;
    const tagsHtml = p.tags.map(t => `<span class="btn-ghost" style="padding: 0.35rem 1rem; border-radius: 3rem; font-size: 0.75rem; border: 1px solid var(--border); background: var(--card2);">${t}</span>`).join('');
    
    return `
      <div class="project-side-card" style="width: 100%; display: flex; flex-direction: column; justify-content: space-between; height: 100%; min-height: 480px;">
        <div class="mobile-project-img" style="display: none; width: 100%; margin-bottom: 2rem; border-radius: 1.2rem; overflow: hidden; height: 200px;">
          <img src="${p.img}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div>
          <h2 class="sb-name" style="font-size: 2.5rem; font-weight: 600; margin-bottom: 0.8rem; white-space: normal; line-height: 1.1;">${p.title}</h2>
          <p class="sb-tagline" style="margin-bottom: 2.5rem; font-size: 1.2rem; color: var(--text); line-height: 1.6;">${p.desc}</p>
          
          <div style="display: flex; flex-direction: column; gap: 1.2rem; margin-bottom: 2.5rem;">
            <div>
              <label style="font-size: 0.65rem; color: var(--muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.2rem; font-family: 'Space Grotesk', sans-serif;">Year</label>
              <span style="font-size: 1.05rem; font-weight: 600; color: var(--text);">${p.year}</span>
            </div>
            <div>
              <label style="font-size: 0.65rem; color: var(--muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.2rem; font-family: 'Space Grotesk', sans-serif;">Role</label>
              <span style="font-size: 1.05rem; font-weight: 600; color: var(--text);">${p.role}</span>
            </div>
          </div>
          
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 3rem;">
            ${tagsHtml}
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: flex-end; width: 100%;">
          <div class="sb-actions" style="display: flex; gap: 0.8rem; width: 100%;">
            <a href="${p.demo}" class="btn" style="background: var(--text); color: var(--bg); border-radius: 3rem; padding: 0 1.5rem; height: 44px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; flex: 1;">
               Demo<i class='bx bx-up-arrow-alt' style="transform:rotate(45deg); font-size: 1.2rem;"></i>
            </a>
            <button onclick="openProjectModal(${idx})" class="btn btn-ghost" style="border-radius: 3rem; padding: 0 1.2rem; height: 44px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; flex: 1; border: 1px solid var(--border);">
              Read More
            </button>
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end; width: 100%; margin-top: 1rem;">
          <div style="font-size: 0.95rem; font-weight: 700; color: var(--muted); font-family: 'Space Grotesk', monospace; letter-spacing: 2px;">0${idx+1} / 0${projects.length}</div>
        </div>
      </div>
      <style>
        @media (max-width: 900px) {
          .mobile-project-img { display: block !important; }
          .project-side-card { min-height: auto !important; height: auto !important; padding-bottom: 2rem; }
        }
      </style>
    `;
  }

  const projSection = document.getElementById('projects');

  window.addEventListener('scroll', () => {
    const wH = window.innerHeight;
    const scrollY = window.scrollY;
    let projRect = projSection ? projSection.getBoundingClientRect() : null;

    if (window.innerWidth <= 900 && projSection) {
      // MOBILE SCROLL LOGIC (Vertical -> Horizontal Slide)
      const sectionTop = projSection.offsetTop;
      const sectionHeight = projSection.offsetHeight;
      const progress = (scrollY - sectionTop) / (sectionHeight - wH);
      const safeP = Math.max(0, Math.min(1, progress));

      // 3 cards. 
      // Card 0: Static at 0%
      // Card 1: Slides 100%->0% from progress 0.2 to 0.5
      // Card 2: Slides 100%->0% from progress 0.6 to 0.9
      
      const cards = projSection.querySelectorAll('.stack-card');
      cards.forEach((card, i) => {
        if (i === 0) return;
        const start = 0.1 + (i - 1) * 0.4;
        const end = start + 0.35;
        let cardP = (safeP - start) / (end - start);
        cardP = Math.max(0, Math.min(1, cardP));
        card.style.transform = `translateX(${(1 - cardP) * 100}%)`;
      });
      return; 
    }

    if(window.innerWidth <= 600) return;
    const stickyTop = wH * 0.12; // matching top: 12vh
    let newActiveIdx = -1;

    if (projRect && projRect.top < wH * 0.5 && projRect.bottom > wH * 0.5) {
       // Section is in view
       isProjectsSection = true;
       // Find the card that has scrolled the highest up to its stickyTop
       stackCards.forEach((card, i) => {
          const rect = card.getBoundingClientRect();
          const cardStickyTop = wH * 0.08 + (i * 40); 
          if (rect.top <= cardStickyTop + 20) {
             newActiveIdx = i;
          }
       });
       if(newActiveIdx === -1) newActiveIdx = 0; // fallback if section is in view but no card hit top yet

       if (newActiveIdx !== activeProjIdx) {
          activeProjIdx = newActiveIdx;
          setSidebarContent(renderProjectSidebar(newActiveIdx), newActiveIdx);
       }
    } else {
       if (isProjectsSection) {
          isProjectsSection = false;
          activeProjIdx = -1;
          setSidebarContent(defaultSbHtml);
       }
    }

    // Process scaling effects for the cascading deck
    stackCards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const cardStickyTop = wH * 0.08 + (i * 40);
      
      if (i < stackCards.length - 1) {
         const nextCard = stackCards[i+1];
         const nextRect = nextCard.getBoundingClientRect();
         const nextCardStickyTop = wH * 0.08 + ((i+1) * 40);
         
         // If the NEXT card is coming up, slightly dim THIS card but keep it in the stack
         if (nextRect.top <= wH && nextRect.top >= nextCardStickyTop) {
            const range = wH - nextCardStickyTop;
            const progress = 1 - ((nextRect.top - nextCardStickyTop) / range);
            card.style.setProperty('--overlay-op', progress * 0.4);
            card.style.transform = `scale(${1 - progress * 0.05})`;
         } else if (nextRect.top < nextCardStickyTop) {
            card.style.setProperty('--overlay-op', 0.4);
            card.style.transform = `scale(0.95)`;
         } else {
            card.style.setProperty('--overlay-op', 0);
            card.style.transform = `scale(1)`;
         }
      }
    });
  });

  // --- EMAILJS INTEGRATION ---
  (function() { emailjs.init("toIN7kP5mwr5QaZ58"); })();

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const subBtn = document.getElementById('form-submit');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    console.log("Starting email submission...");
    subBtn.innerHTML = "Sending... <i class='bx bx-loader-alt bx-spin'></i>";
    subBtn.disabled = true;

    // Safety timeout: if it takes more than 10 seconds, fail it.
    const timeout = setTimeout(() => {
      showStatus("Connection timed out. Please try again.", "error");
      subBtn.innerHTML = "Send Message <i class='bx bx-paper-plane'></i>";
      subBtn.disabled = false;
      console.warn("EmailJS: Request timed out after 10s.");
    }, 10000);

    // Use your Service ID and Template ID here
    emailjs.sendForm('service_ull6o1d', 'template_3xauo2n', this)
      .then((res) => {
        clearTimeout(timeout);
        console.log("EmailJS Success:", res.status, res.text);
        showStatus("Message sent successfully!", "success");
        form.reset();
      }, (err) => {
        clearTimeout(timeout);
        console.error("EmailJS Error:", err);
        showStatus("Oops! Something went wrong.", "error");
      })
      .finally(() => {
        if (!subBtn.disabled) return; // already handled by timeout
        subBtn.innerHTML = "Send Message <i class='bx bx-paper-plane'></i>";
        subBtn.disabled = false;
      });
  });

  function showStatus(msg, type) {
    status.style.display = "block";
    status.style.opacity = "1";
    status.textContent = msg;
    
    if (type === "success") {
      status.style.color = "var(--accent)";
      status.style.padding = "0.8rem 1.2rem";
      status.style.border = "none";
    } else {
      status.style.color = "#ff5f57";
      status.style.padding = "0.8rem 1.2rem";
      status.style.border = "none";
    }

    setTimeout(() => {
      status.style.transition = "opacity 0.5s ease";
      status.style.opacity = "0";
      setTimeout(() => {
        status.style.display = "none";
      }, 500);
    }, 5000);
  }

  // --- TESTIMONIALS SLIDER ---
  const testiData = [
    { text: "Jibril transformed our vision into a functional reality. His technical skills in Django are matched by his eye for software architecture. He worked way smoother than I expected, even our frontend team acknowledged his precision.", name: "Dr Fresh", role: "Founder at Tech Space" },
    { text: "He shaped our vision into a strong brand. The process was clear, fast, and the result gave our startup the professional edge we needed to scale in a competitive market.", name: "Sophia Lee", role: "Co-Founder, Horizon Finance" },
    { text: "Detail-oriented and highly efficient. Jibril's ability to tackle complex backend challenges while maintaining clean code standards is truly impressive. A reliable partner for any scale project.", name: "Michael Cheng", role: "Technical Director, CloudStream" }
  ];

  let currentTesti = 0; 
  const testiText = document.getElementById('testi-text');
  const testiName = document.getElementById('testi-name');
  const testiRole = document.getElementById('testi-role');
  const testiPagination = document.getElementById('testi-pagination');

  function updateTestimonial(idx) {
    if (!testiText) return;
    const data = testiData[idx];
    testiText.style.opacity = 0;
    setTimeout(() => {
      testiText.textContent = `"${data.text}"`;
      testiName.textContent = data.name;
      testiRole.textContent = data.role;
      testiPagination.textContent = `${idx + 1} / ${testiData.length}`;
      testiText.style.opacity = 1;
    }, 300);
  }

  document.getElementById('testi-prev').addEventListener('click', () => {
    currentTesti = (currentTesti - 1 + testiData.length) % testiData.length;
    updateTestimonial(currentTesti);
  });
  document.getElementById('testi-next').addEventListener('click', () => {
    currentTesti = (currentTesti + 1) % testiData.length;
    updateTestimonial(currentTesti);
  });

  // Sync initial testimonial on load
  updateTestimonial(currentTesti);

  // Intelligent Active Navigation
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.ctrl-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.ctrl-btn[href="#${entry.target.id}"]`);
        if (activeBtn) activeBtn.classList.add('active');
      }
    });
  }, { rootMargin: "-30% 0px -40% 0px" });
  document.querySelectorAll('.section').forEach(s => navObserver.observe(s));

  // --- PROJECT MODAL FUNCTIONS ---
  let modal;
  
  function initModal() {
    modal = document.getElementById('project-modal');
  }
  
  function openProjectModal(idx) {
    if (!modal) initModal();
    const p = projects[idx];
    if(!p || !modal) return;
    
    document.getElementById('modal-title').textContent = p.title;
    document.getElementById('modal-year').textContent = p.year;
    document.getElementById('modal-role').textContent = p.role;
    document.getElementById('modal-long-desc').textContent = p.longDesc;
    document.getElementById('modal-img').src = p.img;
    document.getElementById('modal-demo').href = p.demo;
    
    const highlightsScroll = document.getElementById('modal-highlights');
    highlightsScroll.innerHTML = p.highlights.map(h => `<li>${h}</li>`).join('');
    
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = p.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
  }
  
  function closeProjectModal() {
    if(!modal) return;
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 400);
  }

  window.addEventListener('click', (e) => {
    if (modal && e.target === modal) closeProjectModal();
  });
  
  // Initialize modal after DOM loads
  window.addEventListener('DOMContentLoaded', initModal);

  // --- HAMBURGER MENU ---
  let navModal;
  function toggleNav() {
    if(!navModal) navModal = document.getElementById('nav-modal');
    if(!navModal) return;
    if (navModal.style.display === 'flex') {
      navModal.classList.remove('active');
      setTimeout(() => navModal.style.display = 'none', 400);
    } else {
      navModal.style.display = 'flex';
      setTimeout(() => navModal.classList.add('active'), 10);
    }
  }
  
  // Initialize hamburger logic after DOM loads
  window.addEventListener('DOMContentLoaded', () => {
    navModal = document.getElementById('nav-modal');
    
    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggleNav();
      });
    });

    if(navModal) {
      navModal.addEventListener('click', (e) => {
        if (e.target === navModal) toggleNav();
      });
    }
  });

  // Clean URL (remove hashes after scroll)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => history.replaceState(null, null, ' '), 500);
        }
      }
    });
  });
