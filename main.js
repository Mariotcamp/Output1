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
  
  let hamburger = document.querySelector('.header__hamburger');
  hamburger.addEventListener("click", ()=>{
    document.querySelector('.global-container').classList.toggle('menu-open');
  });

  new ScrollObserver('.result__picture');
  new ScrollObserver('.cover-slide');
  new ScrollObserver('.title');
  new ScrollObserver('.subtitle');
  new TextAnimation('.title');
  new TextAnimation('.subtitle');
});

class ScrollObserver {
  constructor(el) {
    this.els = document.querySelectorAll(el);
    this.cb = function (entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('inview');
          observer.unobserve(entry.target);
        }
      })
    }
    this.options = {
      rootMargin: "0px 0px -100px 0px"
    }
    this._init();
  }

  _init(){
    let that = this;
    let io = new IntersectionObserver(that.cb, that.options);
    if (that.els.length === 1) {
      io.observe(that.els[0]);
    } else {
      that.els.forEach( el => {io.observe(el)});
    };
    // io.observe(that.el);
  }
};

class TextAnimation {
  constructor (els) {
    this.els = document.querySelectorAll(els);
    this.els.forEach(el => {
      this.el = el;
      this.el.text = this.el.innerHTML.split('');
      this.el.innerHTML = this._addSpan();
    });
  }

  _addSpan(){
    return this.el.text.reduce((acc, curr) => {
      if (curr === " "){
        return `${acc}<span class="sentence">&nbsp;</span>`;
      } else {
        return `${acc}<span class="sentence">${curr}</span>`;
      };
    },'');
  };
};