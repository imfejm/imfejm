//navigace na klik a krizek z ham
const tlacitko = document.querySelector("#ham");
const rozbal = document.querySelector("#menu");
const odkazy = rozbal.querySelectorAll("a");

tlacitko.addEventListener("click", () => {
  rozbal.classList.toggle("hidden");
  if (logoS) logoS.classList.toggle("logo-menu-open", !rozbal.classList.contains("hidden"));

  document.querySelector("#cara1").classList.toggle("caraA");
  document.querySelector("#cara2").classList.toggle("caraB");
  document.querySelector("#cara3").classList.toggle("caraC");
});

// Zavření menu po kliknutí na jakýkoli odkaz
odkazy.forEach((link) => {
  link.addEventListener("click", () => {
    rozbal.classList.add("hidden");
    if (logoS) logoS.classList.remove("logo-menu-open");

    document.querySelector("#cara1").classList.remove("caraA");
    document.querySelector("#cara2").classList.remove("caraB");
    document.querySelector("#cara3").classList.remove("caraC");
  });
});

// Scroll reveal pro .card__border
const cards = document.querySelectorAll('.card__border');
cards.forEach(card => card.classList.add('card-reveal'));

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const index = [...cards].indexOf(card);
      setTimeout(() => {
        card.classList.remove('card-reveal');
        card.classList.add('card-visible');
      }, index * 200);
      cardObserver.unobserve(card);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

cards.forEach(card => cardObserver.observe(card));

// Zaoblene horni rohy .intro + natazeni pres hero pri skrolu + zmenseni .stick na mobilu
const intro = document.querySelector(".intro");
const heroSection = document.querySelector(".hero-section");
const stick = document.querySelector(".stick");
const logoS = document.querySelector(".logoS");
const mech = document.querySelector('.mech');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;

  if (intro) {
    const heroHeight = heroSection ? heroSection.offsetHeight : 400;
    const shift = Math.min(scrolled * 0.6, heroHeight);
    intro.classList.toggle('scrolled', scrolled > 50);
    intro.style.transform = `translateY(-${shift}px)`;
    intro.style.marginBottom = `-${shift}px`;
  }


  if (mech && intro) {
    const heroBottom = heroSection ? heroSection.offsetTop + heroSection.offsetHeight * 0.2 : 0;
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFromHero = Math.max(scrolled - heroBottom, 0);
    const progress = Math.min(scrollFromHero / (totalScroll - heroBottom), 1);
    const remaining = Math.round((1 - progress) * 100);
    mech.style.clipPath = `inset(0 0 ${remaining}% 0)`;
  }
});

// Zobrazeni .benefits-sidebar (fixed na mobilu) az pri doscrolovani na .benefits
const benefitsSidebar = document.querySelector('.benefits-sidebar');
const benefitsSection = document.querySelector('.benefits');
if (benefitsSidebar && benefitsSection) {
  const sidebarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      benefitsSidebar.classList.toggle('sidebar-visible', entry.isIntersecting);
    });
  }, { threshold: 0.05 });
  sidebarObserver.observe(benefitsSection);
}

// Postupne zobrazovani .benefit radku pri skrolu
const benefits = document.querySelectorAll('.benefit');
const benefitObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('benefit-visible', entry.isIntersecting);
  });
}, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

benefits.forEach(benefit => benefitObserver.observe(benefit));

// Zmenseni gapu v .benefits-list kdyz se doscroluje na posledni polozku
const benefitsList = document.querySelector('.benefits-list');
const lastBenefit = benefits[benefits.length - 1];
if (benefitsList && lastBenefit) {
  const gapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      benefitsList.classList.toggle('benefits-compact', entry.isIntersecting);
    });
  }, { threshold: 0.5 });
  gapObserver.observe(lastBenefit);
}

// Na mobilu: kdyz se doscroluje k poslednimu .benefit,
// prepnout .benefits-sidebar z fixed na relative (in-flow) - permanentne.
// Podminka sidebar-visible zajistuje, ze se sidebar-end prida jen kdyz
// uz button byl videt jako fixed (= uzivatel prosel benefits sekci)
if (benefitsSidebar && lastBenefit && window.innerWidth <= 800) {
  const sidebarEndObserver = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      // Doscrolováno k poslednímu benefitu → přepnout na in-flow
      if (benefitsSidebar.classList.contains('sidebar-visible')) {
        benefitsSidebar.classList.add('sidebar-end');
      }
    } else if (entry.boundingClientRect.top > 0) {
      // Prvek zmizel pod viewportem = scroll nahoru → vrátit fixed
      benefitsSidebar.classList.remove('sidebar-end');
    }
    // Prvek zmizel nad viewportem (top < 0) = scroll dolů → sidebar-end zůstane
  }, { threshold: 0.9 });
  sidebarEndObserver.observe(lastBenefit);
}

// Animace .highlight + fade-in .intro při doscrollování
const introP1 = intro ? intro.querySelector('.p1') : null;
let introAnimated = false;

function checkIntroVisible() {
  if (introAnimated || !intro) return;
  const trigger = introP1 || intro;
  const rect = trigger.getBoundingClientRect();
  // Spustit animaci az kdyz je p1 skutecne viditelny ve viewportu
  if (rect.top < window.innerHeight * 0.9) {
    introAnimated = true;
    intro.classList.add("intro-visible");
    setTimeout(() => intro.classList.add("intro-done"), 2500);
    intro.querySelectorAll(".highlight").forEach(el => {
      el.classList.add("is-visible");
    });
  }
}

window.addEventListener('scroll', checkIntroVisible, { passive: true });
// Timeout zajisti, ze prohlizec stihne vykreslit pocatecni stav
// pred spustenim animace (pro pripad nacteni stranky uz ve scroll pozici)
setTimeout(checkIntroVisible, 100);

// Pulse animace karet pri zobrazeni .others (jen mobil)
if (window.innerWidth <= 800) {
  const othersSection = document.querySelector('.others');
  if (othersSection) {
    const othersObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        othersSection.classList.add('pulse-ready');
        othersObserver.disconnect();
      }
    }, { threshold: 0.3 });
    othersObserver.observe(othersSection);
  }
}

// Rozbaleni .otherSEO a .otherGRAPHIC po kliknuti na kartu (accordion - jen jedna otevrena)
const otherCards = document.querySelectorAll('.otherSEO, .otherGRAPHIC');
otherCards.forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('.styled-wrapper')) return;
    otherCards.forEach(c => { if (c !== card) c.classList.remove('open'); });
    card.classList.add('open');
  });
});

// Karusel .adviceItems
const adsTrack = document.querySelector('.ads-track');
const dotsContainer = document.querySelector('.carousel-dots');

if (adsTrack && dotsContainer) {
  const slides = adsTrack.querySelectorAll('.ad-slide');
  const slideCount = slides.length;
  let current = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.carousel-dot');

  function goTo(index) {
    dots[current].classList.remove('active');
    current = index;
    adsTrack.style.transform = `translateX(-${current * 100}%)`;
    dots[current].classList.add('active');
  }

  setInterval(() => goTo((current + 1) % slideCount), 3500);
}
