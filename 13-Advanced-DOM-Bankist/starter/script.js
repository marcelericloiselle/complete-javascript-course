'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelectorAll(
  '.operations__tab-container'
)[0];
const tabsContent = document.querySelectorAll('.operations__content');

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

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//--Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////
//Page navigation

//One copy of the function for each element
// document.querySelectorAll('.nav__link').forEach(function (btn) {
//   btn.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//Event delegation, 1 event code for all
//1. Add event listener to a common parent element
//2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed component

//tabs.forEach(t => t.addEventListener('click', console.log('TAB')));
tabsContainer.addEventListener('click', function (e) {
  //mathing strategy
  const clicked = e.target.closest('.operations__tab');

  //Gard clause, if click is not null
  if (!clicked) return;

  //Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //Activate content area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu fade animation
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    //console.log(this, e.currentTarget);

    const link = e.target;
    //nav 2nd level parent
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//mouserenter doesn't bubble, use mouseover
//passing an "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

/*
// Sticky navigation
const initialCoords = section1.getBoundingClientRect();

//addEventListener('scroll doesn't work!?
//window.addEventListener('scroll', function () {
window.onscroll = function () {
  console.log('aaa');
  console.log(window.scrollY);

  if (this.window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
*/

// Sticky navigation Intersection Observer API
//More performant the be call for each scolling events

// //entry for each treshold triggered
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, //null -> viewport
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('header');
const navHeigth = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries; //entries[0]
  //console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObbserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  //rootMargin: '-90px',
  rootMargin: `-${navHeigth}px`,
});
headerObbserver.observe(header);

// Reveal section
const allSection = document.querySelectorAll('section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  //Temporary commented
  //section.classList.add('section--hidden');
});

//------------ Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
//console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);

  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  //Because the large image is load in the backround. Wait for the loading to complete
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

//----------------- Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  //Functions
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
    createDots();
    activateDot(0);
    goToSlide(0);
  };
  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide(); //Short circuit evaluation
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      //Destructuring
      const { slide } = e.target.dataset; //.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
/*
//Selcting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

document.querySelector('.header'); //1st element matching, (. => class)
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');

//----- LIVE HTMLColection, update when you update the DOM
const allButtons = document.getElementsByTagName('button'); //Return LIVE HTMLCollection
console.log(allButtons);

document.getElementsByClassName('btn'); //LIVE HTMLColection
*/

//Creating and inserting elements
// also see .insertAdjacentHTML
/* 
const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved functionality and analitycs';
message.innerHTML = `We use cookies for improved functionality and analitycs 
<button class="btn btn--close-cookie">Got it!<button>`;
const header = document.querySelector('.header');
//header.prepend(message);
//header.append(message);//MOVE to the last child, can only be at one place
//header.append(message.cloneNode(true));

//header.before(message);
header.after(message);

//Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    //Old way
    //message.parentElement.removeChild(message);
  });

//188 Styles, attibutes and classes
//Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
//Work only for the inline style
console.log(message.style.height);
console.log(message.style.backgroundColor);
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  //parseFloat Get the value without the px
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

//CSS style
//CSS roots = document.documentElement
document.documentElement.style.setProperty('--color-primary', 'orangered');

//--- Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);
logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt);

//non standard attrigutes of the image
console.log(logo.designer); //=> doesn't work
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src); //absolute URL, instead of the relative that in the HTML
console.log(logo.getAttribute('src')); //What is in the HTML

const link = document.querySelector('.nav__link--btn');
console.log(link.href); //absolute URL
console.log(link.getAttribute('href'));

//Data attributes
//HTML attributes data-version-number
console.log(logo.dataset.versionNumber);

//Classes
logo.classList.add('c', 'j');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

//Do not use, override all classes
logo.className = 'jonas';
 */

/*
//--Smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect()); //x, y relative to the visible portion of the page (viewport)

  //offset from the viewport
  console.log('Current scroll (x,y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'Height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  //---- Old school
  //Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  //New way
  section1.scrollIntoView({ behavior: 'smooth' });
});
*/

/*
const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function (e) {
//   alert('adEventListener: Great! you are reading the header');
// });

//Events refeence https://developer.mozilla.org/en-US/docs/Web/Events
//Mouse events: https://www.w3schools.com/jsref/obj_mouseevent.asp

//old way:
// h1.onmouseenter = function (e) {
//   alert('onMouseEnter: Great! you are reading the header');
// };

const alertH1 = function (e) {
  alert('adEventListener: Great! you are reading the header');

  //h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// Can be done directly in the HTML:
// <h1 onclick="alert('HTML alert')">
*/

//Bubbling an capturing

//Bubbling phase
/* const randomInt = (min, max) => Math.floor(Math.random() * max - min + 1 + 1);
const randomCOlor = () =>
  //rgb(255,255,255)
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomCOlor();
  //The e.target is the .nav_Link
  //e.currentTarget is  .nav_Link
  console.log('LINK', e.target, e.currentTarget);

  //Stop the propagation
  //e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomCOlor();
  //The e.target is the .nav_Link
  //e.currentTarget is  .nav_Links
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomCOlor();
  //The e.target is the .nav_Link
  //e.currentTarget is  .nav
  console.log('NAV', e.target, e.currentTarget);
});

document.querySelector('.header').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomCOlor();
    console.log('HEADER', e.target, e.currentTarget);
  },
  true //Capturing phase, first event to be triggered
);
 */

/*
const h1 = document.querySelector('h1');

//going downwards: childs
console.log(h1.querySelectorAll('.highlight')); //Work however deep the element are, NodeList
console.log(h1.childNodes); //NodeList
console.log(h1.children); //direct child elements, HTMLCollection
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

//Upwards: parents
console.log(h1.parentNode); //Direct parent
console.log(h1.parentElement); //Direct parent

//return Element, no matter how far up it is
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)'; //Select itself

//Going sideway: siblink
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling); //node
console.log(h1.nextSibling); //node

//Return HTMLCollection
console.log(h1.parentElement.children); //All sibling, includin h1 itself
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/

/* 
//HTML completly parsed, script loaded and executed
// before loading image an external content
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML Parsed and DOM tree built!', e);
});

//Everything is loaded
// after loading image an external content
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault(); //require by some browser, not Chrome
//   console.log(e);
//   e.returnValue = true;
// });
 */
