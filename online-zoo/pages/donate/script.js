'user strict';
const desktopSize = 1250;
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

// disable links to this page
// for (let elem of document.querySelectorAll('.active-menu-item')) {
//   elem.onclick = (e) => {
//     e.preventDefault();
//   };
// }

//show subscribe info
document.querySelector('.subscribe').addEventListener('submit', (e) => {
  e.preventDefault();
  alert(
    `Success subscribe!!!\nemail: ${
      e.target.querySelector('[type="email"]').value
    }`
  );
});

// price input-range
let range = document.querySelector('[type="range"]');
let prices = [25, 50, 100, 250, 500, 1000, 2000, 5000];
let inputPrice = document.querySelector('[type="number"]');
let pricesList = [];
let priceUl;
let rangeWrap;
let rangeWrapList;
let currentPrice;

//set initial range wrapper
window.addEventListener('load', () => {
  let screenSize = document.documentElement.clientWidth;
  screenType = getCurScreenType();
  if (screenSize > desktopSize) {
    setInputRange(7);
    createPriceList(7);
    // createRangeWrapper(7);
    pricesList[5].classList.add('active_price');
    currentPrice = pricesList[5];
    range.value = 5;
    inputPrice.value = +pricesList[5].innerText;
  } else if (screenSize > tabletSize) {
    setInputRange(6);
    createPriceList(6);
    pricesList[4].classList.add('active_price');
    currentPrice = pricesList[4];
    range.value = 4;
    inputPrice.value = +pricesList[4].innerText;
  } else {
    setInputRange(4);
    createPriceList(4);
    pricesList[2].classList.add('active_price');
    currentPrice = pricesList[2];
    range.value = 2;
    inputPrice.value = +pricesList[2].innerText;
  }
});

// create price value section
function createPriceList(length) {
  if (!priceUl) {
    priceUl = document.createElement('ul');
    priceUl.classList.add('price');
  }
  priceUl.innerHTML = '';
  pricesList = [];

  for (i = length; i >= 0; i--) {
    let li = document.createElement('li');
    li.innerText = prices[i];
    pricesList.push(li);
    priceUl.insertAdjacentElement('beforeend', li);
  }

  range.after(priceUl);
}
//set input range
function setInputRange(i) {
  range.setAttribute('max', i);
}

// show chosen price
range.addEventListener('input', (e) => {
  let value = e.target.value;
  currentPrice.classList.remove('active_price');
  currentPrice = pricesList[value];
  currentPrice.classList.add('active_price');
  inputPrice.value = +currentPrice.innerText;
});

//get current screen type
function getCurScreenType() {
  let screenSize = document.documentElement.clientWidth;
  return screenSize > desktopSize
    ? 'desktop'
    : screenSize > tabletSize
    ? 'smallDesktop'
    : 'tablet';
}
// change chosen price after resize screen
window.addEventListener('resize', () => {
  let curScreenType = getCurScreenType();
  if (curScreenType == screenType) return;

  let i;
  if (screenType == 'desktop' && curScreenType == 'smallDesktop') {
    i = +range.value == 0 ? 4 : +range.value - 1;
    setInputRange(6);
    createPriceList(6);
  } else if (screenType == 'smallDesktop' && curScreenType == 'desktop') {
    i = +range.value + 1;
    setInputRange(7);
    createPriceList(7);
  } else if (screenType == 'smallDesktop' && curScreenType == 'tablet') {
    i = +range.value < 2 ? 2 : +range.value - 2;
    setInputRange(4);
    createPriceList(4);
  } else {
    i = +range.value + 2;
    setInputRange(6);
    createPriceList(6);
  }

  pricesList[i].classList.add('active_price');
  currentPrice = pricesList[i];
  range.value = i;
  inputPrice.value = +pricesList[i].innerText;
  screenType = curScreenType;
});

// check input value amount
inputPrice.addEventListener('input', (e) => {
  pricesList.forEach((el, i) => {
    if (el.innerText === e.target.value) {
      currentPrice.classList.remove('active_price');
      currentPrice = pricesList[i];
      currentPrice.classList.add('active_price');
      range.value = i;
    } else {
      // currentPrice.classList.remove('active_price');
    }
  });
});

//show submit donate data
document.querySelector('.amount').onsubmit = (e) => {
  e.preventDefault();
  const amount = document.querySelector('.input_price').value || 0;
  const period = e.target
    .querySelector('.period')
    .querySelector(':checked').value;
  alert(`Donate: ${amount}$ !!!\nPeriod: ${period} !`);
};
