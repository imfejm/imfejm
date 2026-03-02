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
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;

  if (intro) {
    const heroHeight = heroSection ? heroSection.offsetHeight : 400;
    const shift = Math.min(scrolled * 0.6, heroHeight);
    intro.classList.toggle('scrolled', scrolled > 50);
    intro.style.transform = `translateY(-${shift}px)`;
    intro.style.marginBottom = `-${shift}px`;
  }

  if (stick && window.innerWidth <= 800) {
    stick.classList.toggle('shrunk', scrolled > 80);
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

// Animace .highlight při doscrollování na .intro
if (intro) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        intro.querySelectorAll(".highlight").forEach(el => {
          el.classList.add("is-visible");
        });
        observer.unobserve(intro);
      }
    });
  }, { threshold: 0.1 });
  observer.observe(intro);
}


