//navigace na klik a krizek z ham
const tlacitko = document.querySelector("#ham");
const rozbal = document.querySelector("#menu");
const odkazy = rozbal.querySelectorAll("a");

tlacitko.addEventListener("click", () => {
  rozbal.classList.toggle("hidden");

  document.querySelector("#cara1").classList.toggle("caraA");
  document.querySelector("#cara2").classList.toggle("caraB");
  document.querySelector("#cara3").classList.toggle("caraC");
});

// Zavření menu po kliknutí na jakýkoli odkaz
odkazy.forEach((link) => {
  link.addEventListener("click", () => {
    rozbal.classList.add("hidden");

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
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;

  if (intro) {
    const heroHeight = heroSection ? heroSection.offsetHeight : 400;
    const shift = Math.min(scrolled * 0.6, heroHeight);
    intro.classList.toggle('scrolled', scrolled > 50);
    intro.style.transform = `translateY(-${shift}px)`;
    intro.style.marginBottom = `-${shift}px`;
  }

  if (window.innerWidth <= 800) {
    if (logoS) logoS.classList.toggle('logo-hidden', scrolled > 30);
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
// prepnout .benefits-sidebar z fixed na relative (in-flow) - permanentne
if (benefitsSidebar && lastBenefit && window.innerWidth <= 800) {
  const sidebarEndObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      benefitsSidebar.classList.add('sidebar-end');
      sidebarEndObserver.disconnect();
    }
  }, { threshold: 0.3 });
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


