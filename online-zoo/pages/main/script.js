'user strict';

const tabletSize = 755;
const mobileSize = 450;
let screenType;

// burger menu
const iconMenu = document.querySelector('.menu_icon');
const menuBody = document.querySelector('.menu_body');
const headerLogo = document.querySelector('header').querySelector('.logo');

// open/close burger menu by click on burger menu icon
iconMenu.addEventListener('click', function (e) {
  iconMenu.classList.toggle('_active');
  document.body.classList.toggle('_lock');
  menuBody.classList.toggle('_active');
  headerLogo.classList.toggle('burger_logo');
});
// close opened burger menu by click on free area burger menu
menuBody.addEventListener('click', (e) => {
  if (menuBody.classList.contains('_active')) {
    iconMenu.classList.toggle('_active');
    document.body.classList.toggle('_lock');
    menuBody.classList.toggle('_active');
    headerLogo.classList.toggle('burger_logo');
  }
});

const inputPetsArray = [
  {
    family: 'GIANT PANDAS',
    name: 'Panda',
    area: 'Native to Southwest China',
    location: 'Sichuan, China',
    type: 'banana_bamboo',
    src: '../../assets/images/pet_cards/giant_pandas.jpg',
  },
  {
    family: 'EAGLES',
    name: 'Eagle',
    area: 'Native to South America',
    location: 'Nevada, USA',
    type: 'meat_fish',
    src: '../../assets/images/pet_cards/eagles.jpg',
  },
  {
    family: 'CHEETAHS',
    name: 'Cheetah',
    area: 'Native Africa',
    location: 'Sahara, Africa',
    type: 'meat_fish',
    src: '../../assets/images/pet_cards/cheetahs.jpg',
  },
  {
    family: 'GORILLAS',
    name: 'Gorilla',
    area: 'Native to Central Africa',
    location: 'Congo, Africa',
    type: 'banana_bamboo',
    src: '../../assets/images/pet_cards/gorillas.jpg',
  },
  {
    family: 'ALLIGATORS',
    name: 'Alligator',
    area: 'Native to Southeastern USA',
    location: 'Florida, USA',
    type: 'meat_fish',
    src: '../../assets/images/pet_cards/alligators.jpg',
  },
  {
    family: 'PENGUINS',
    name: 'Penguin',
    area: 'Native Antarctica',
    location: 'Subantarctic region',
    type: 'meat_fish',
    src: '../../assets/images/pet_cards/penguins.jpg',
  },
  {
    family: 'MONKEYS',
    name: 'Monkey',
    area: 'Native to India',
    location: 'Maharashtra, India',
    type: 'banana_bamboo',
    src: '../../assets/images/pet_cards/monkeys.jpg',
  },
  {
    family: 'TWO-TOED SLOTHS',
    name: 'Two-toed Sloth',
    area: 'Native to Central America',
    location: 'Ecuador, America',
    type: 'banana_bamboo',
    src: '../../assets/images/pet_cards/two-toed_sloth.jpg',
  },
];
// shuffle array and return n length
function shuffle(array, n) {
  let pets = [].concat(array);
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [pets[i], pets[j]] = [pets[j], pets[i]];
  }
  return pets.slice(0, n);
}
// create html block for one pet
function createCard(pet) {
  return `<div class="pet_card">
            <figure class="pet_img">
              <img src="${pet.src}" />
              <figcaption class="pet_tooltip">
                <div class="tooltip_mark"></div>
                <h4>${pet.name}</h4>
                <p>${pet.location}</p>
                <button class="button_tooltip">Watch online</button>
              </figcaption>
            </figure>
            <div class="pet_info">
              <div class="pet_name">
                <h4>${pet.family}</h4>
                <p>${pet.area}</p>
              </div>
              <div class="pet_icon ${pet.type}"></div>
            </div>
          </div>`;
}
// create one row pets slide for desktop & tablet screen size
function createRow(pets) {
  return pets.reduce((sum, card) => (sum += createCard(card)), '');
}
// create one slide for desktop & tablet screen size
function createSlide(pets) {
  let half = pets.length / 2;
  return `<div class="slider_item slider_item_active">
            <div class="row_pet_cards">${createRow(pets.slice(0, half))}</div>
            <div class="row_pet_cards">${createRow(
              pets.slice(half, pets.length)
            )}</div>
          </div>`;
}
function createMobile(pets) {
  return `<div class="slider_item slider_item_active">
            <div class="row_pet_cards">${createRow(pets)}</div>
          </div>`;
}
// first create slide or fixed block pets after load page
window.addEventListener('load', function createSlider() {
  let screenSize = this.document.documentElement.clientWidth;
  let slider;

  if (screenSize > tabletSize) {
    slider = createSlide(shuffle(inputPetsArray, 6));
    screenType = 'desktop';
  } else if (screenSize > mobileSize) {
    slider = createSlide(shuffle(inputPetsArray, 4));
    screenType = 'tablet';
  } else {
    slider = createMobile(shuffle(inputPetsArray, 4));
    screenType = 'mobile';
  }

  document
    .querySelector('.slider_window')
    .insertAdjacentHTML('afterbegin', slider);
});
//check and change(rewrite) pets block after resize screen
window.addEventListener('resize', function rewriteSlider() {
  let screenSize = this.document.documentElement.clientWidth;
  let slider;
  let isChanged = false;

  if (screenSize > tabletSize && screenType != 'desktop') {
    slider = createSlide(shuffle(inputPetsArray, 6));
    isChanged = true;
    screenType = 'desktop';
  } else if (
    screenSize > mobileSize &&
    screenSize <= tabletSize &&
    screenType != 'tablet'
  ) {
    slider = createSlide(shuffle(inputPetsArray, 4));
    isChanged = true;
    screenType = 'tablet';
  } else if (screenSize <= mobileSize && screenType != 'mobile') {
    slider = createMobile(shuffle(inputPetsArray, 4));
    isChanged = true;
    screenType = 'mobile';
  }
  if (isChanged) {
    let parent = document.querySelector('.slider_window');
    parent.innerHTML = '';
    parent.insertAdjacentHTML('afterbegin', slider);
  }
});

// slider
let items;
let isEnabled = true;

function hideItem(direction) {
  isEnabled = false;
  ``;
  items[0].classList.add(direction);
  items[0].addEventListener('animationend', function () {
    this.remove();
  });
}
function showItem(direction) {
  items[1].classList.add('slider_item_next', direction);
  items[1].addEventListener('animationend', function () {
    this.classList.remove('slider_item_next', direction);
    this.classList.add('slider_item_active');
    isEnabled = true;
  });
}
function previousItem(n) {
  hideItem('to-right');
  showItem('from-left');
}
function nextItem(n) {
  hideItem('to-left');
  showItem('from-right');
}
document.querySelector('.prev').addEventListener('click', function () {
  if (isEnabled) {
    // add second slide with random pets
    let i = screenType == 'desktop' ? 6 : 4;
    let slider = createSlide(shuffle(inputPetsArray, i));

    slider = slider.replace(' slider_item_active', '');
    document
      .querySelector('.slider_window')
      .insertAdjacentHTML('beforeend', slider);
    items = document.querySelectorAll('.slider_item');
    previousItem();
  }
});
document.querySelector('.next').addEventListener('click', function () {
  if (isEnabled) {
    // add second slide with random pets
    let i = screenType == 'desktop' ? 6 : 4;
    let slider = createSlide(shuffle(inputPetsArray, i));

    slider = slider.replace(' slider_item_active', '');
    document
      .querySelector('.slider_window')
      .insertAdjacentHTML('beforeend', slider);
    items = document.querySelectorAll('.slider_item');
    nextItem();
  }
});

// testimonials range
let range = document.querySelector('input[type="range"]');
function showTestimonials() {
  let screenSize = document.documentElement.clientWidth;
  let area = document.querySelector('.stories').clientWidth;

  //30px - padding between stories
  //1250px - media query 3/4 visible stories
  let step =
    screenSize > 1250
      ? -((area - 30 * 3) / 4 + 30)
      : screenSize > 755
      ? -((area - 30 * 2) / 3 + 30)
      : 0;

  document.querySelector('.stories').style.left = `${step * range.value}px`;
}

range.addEventListener('input', showTestimonials);
window.addEventListener('resize', showTestimonials);

// modal window for testimonials
// open/close modal by click
let isModalReady = true;
document.querySelectorAll('.wrap_story').forEach((item) => {
  item.addEventListener('click', (e) => {
    if (document.documentElement.clientWidth > tabletSize) return;
    if (!isModalReady) return;

    isModalReady = false;
    item.classList.toggle('modal');
    // document.body.classList.toggle('_lock');

    item.addEventListener('transitionend', function () {
      isModalReady = true;
    });
    e.preventDefault();
  });
});

// // other
// disable links to this page
for (let elem of document.querySelectorAll('.active-menu-item')) {
  elem.onclick = (e) => {
    e.preventDefault();
  };
}

document.onsubmit = (e) => {
  e.preventDefault();
  alert(
    `Success subscribe!!!\nemail: ${
      document.querySelector('[type="email"]').value
    }`
  );
};

// hover pet card
// document.querySelectorAll('[class="petCard"]').forEach((petCard) => {
//   petCard.onmouseover = (e) => {
//     const shadowDiv = document.createElement('div');
//     shadowDiv.className = 'petCardShadow';
//     petCard.before(shadowDiv);
//   };
//   petCard.onmouseout = (e) => {
//     const shadowWrapper = petCard.previousElementSibling.remove();
//   };
// });

// // get info about device
// const isMobile = {
//   Android: function () {
//     return navigator.userAgent.match(/Android/i);
//   },
//   BlackBerry: function () {
//     return navigator.userAgent.match(/BlackBerry/i);
//   },
//   iOS: function () {
//     return navigator.userAgent.match(/iPhone|iPad|iPod/i);
//   },
//   Opera: function () {
//     return navigator.userAgent.match(/Opera Mini/i);
//   },
//   Windows: function () {
//     return navigator.userAgent.match(/IEMobile/i);
//   },
//   any: function () {
//     return (
//       isMobile.Android() ||
//       isMobile.BlackBerry() ||
//       isMobile.iOS() ||
//       isMobile.Opera() ||
//       isMobile.Windows()
//     );
//   },
// };
// if (isMobile.any()) {
//   document.body.classList.add('_touch');
// } else {
//   document.body.classList.add('_pc');
// }
