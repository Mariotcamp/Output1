document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    // direction: 'Scrollbar',
    effect: 'coverflow',
    loop: true,
    centeredSlides: true,
    slidesPerView: 1,
    speed: 700,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      960: {
          slidesPerView: 2,
      }
    }
  });
  
  const el = document.querySelector('.result__picture');
  const cb = function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('inview');
        observer.unobserve(entry.target);
      }
    });
  };
  let options = {
    rootMargin: "0px 0px -100px 0px"
  }
  const io = new IntersectionObserver(cb, options);
  io.observe(el);
})