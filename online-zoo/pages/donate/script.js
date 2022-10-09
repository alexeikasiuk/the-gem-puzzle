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

// disable links to this page
for (let elem of document.querySelectorAll('.active-menu-item')) {
  elem.onclick = (e) => {
    e.preventDefault();
  };
}

//show subscribe info
document.querySelector('.subscribe').addEventListener('submit', (e) => {
  e.preventDefault();
  alert(
    `Success subscribe!!!\nemail: ${
      e.target.querySelector('[type="email"]').value
    }`
  );
});

// const feedForm = document.getElementById('feedPeriod');
// feedForm.onsubmit = (e) => {
//   e.preventDefault();
//   const amount = document.getElementById('inputPrice').value || 0;
//   const period = feedForm
//     .querySelector('.period')
//     .querySelector(':checked').value;
//   alert(`Donate: ${amount}$ !!!\nPeriod: ${period} !`);
// };
