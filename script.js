'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
//selectors
const allsections = document.querySelectorAll('.section');
console.log(allsections);
//selectors
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

//creating and inserting elements
//.insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); //first child
header.append(message); //last child

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.parentElement.removeChild(message); //dom traversing
    message.remove(); // new method to remove dom elements
  });

//styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

logo.setAttribute('company', 'bankist');
console.log(logo.getAttribute('src'));

const src = 'img/logo.png';

logo.setAttribute('src', src);

// data attributes

console.log(logo.dataset.versionNumber);

//Classes
logo.classList.add('c', 'd');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coord = section1.getBoundingClientRect();

  console.log(s1coord); //coordinates of section one

  console.log(e.target.getBoundingClientRect());
  // get coordinates of the target element which is clicked

  //Scrolling to the section 1
  // window.scrollTo(
  //   s1coord.left + window.pageXOffset,
  //   s1coord.top + window.pageYOffset
  // );

  window.scrollTo({
    left: s1coord.left + window.pageXOffset,
    top: s1coord.top + window.pageYOffset,
    behavior: 'smooth',
  });
});
/////////////////////////////////////////////////////

// Enabling Smoooth Scrolling between the sectionss!
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     console.log(id);

//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });

//1. Add event listner to the common parent
//2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);

  e.preventDefault();

  //Matching Stragery (event delegation  )

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// Creating tiped componets
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (el) {
  const clicked = el.target.closest('.operations__tab');
  //console.log(clicked);

  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //console.log(tabContents);
  //removing the exisisting content classes
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  //Activate Content Area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu Fade Animation, Passing arguments to the event handlers

const handover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};
// Passing "argument" into handler
nav.addEventListener('mouseover', handover.bind(0.5));
nav.addEventListener('mouseout', handover.bind(1));

//Sticky Navigation (scroll event is bad for performance,it hits
// everytime we trigger)
// const coordinates_s1 = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > coordinates_s1.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

//sticky Navigation API

// const obsCallBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: 0.1,
// };

// const observer = new IntersectionObserver(obsCallBack, obsOptions);

// observer.observe(section1);

const header_1 = document.querySelector('.header');

const stickynav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObs = new IntersectionObserver(stickynav, {
  root: null,
  threshold: 0,
});

headerObs.observe(header_1);

/////////////////////////////////
// Applying reavealing on scroll effect
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  entry.target.classList.remove('section--hidden');
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.3,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
/// LAZY Loading image

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

///  Slider Component
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

///////////////////////////////////////////////////

// const heading = document.querySelector('h1');

// const alerth1 = function (e) {
//   alert('addEventListener: Great! Your are reading the heading :)');

//   // heading.removeEventListener('mouseenter', alerth1);
// };

// heading.addEventListener('mouseenter', alerth1);

// setTimeout(() => h1.removeEventListener('mouseenter', alerth1), 3000)

//setTime(() => h1.removeEventListener('click', 'alerth1'), 3000);

// DOM Traversing

const h1 = document.querySelector('h1');

console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
console.log(h1.children);
console.log(h1.firstElementChild);
console.log(h1.lastElementChild);
//console.log((h1.lastElementChild.style.color = 'pink '));

// Find parents
console.log(h1.parentNode);
console.log(h1.parentElement);
console.log(h1.closest('.header'));

// Going Sidways: Sibling
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);

//traversing the siblings and changing the size of
console.log([...h1.parentElement.children]);

const newarr = [...h1.parentElement.children];

// newarr.forEach(function (el) {
//   if (el !== h1) el.style.color = 'blue';
// });
