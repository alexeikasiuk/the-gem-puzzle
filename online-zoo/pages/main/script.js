'user strict';

// get info about device
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};
if (isMobile.any()) {
  document.body.classList.add('_touch');
} else {
  document.body.classList.add('_pc');
}

// burger menu
const iconMenu = document.querySelector('.menu_icon');
if (iconMenu) {
  const menuBody = document.querySelector('.menu_body');
  const headerLogo = document.querySelector('header').querySelector('.logo');
  iconMenu.addEventListener('click', function (e) {
    iconMenu.classList.toggle('_active');
    document.body.classList.toggle('_lock');
    menuBody.classList.toggle('_active');
    headerLogo.classList.toggle('burger_logo');
  });
}
// for (let elem of document.querySelectorAll('.activeMenu')) {
//   elem.onclick = (e) => {
//     e.preventDefault();
//   };
// }

// document.onsubmit = (e) => {
//   e.preventDefault();
//   alert(
//     `Success subscribe!!!\nemail: ${
//       document.querySelector('[type="email"]').value
//     }`
//   );
// };
// document.getElementById('goToMap').onclick = () => {
//   document.location.href = '../map/index.html';
// };
// document.getElementById('btnDonate').onclick = () => {
//   document.location.href = '../donate/index.html';
// };

// document.getElementById('btnDonate2').onclick = () => {
//   document.location.href = '../donate/index.html';
// };

// document.querySelectorAll('[class="petCard"]').forEach((petCard) => {
//   petCard.onmouseover = (e) => {
//     const shadowDiv = document.createElement('div');
//     shadowDiv.className = 'petCardShadow';
//     petCard.before(shadowDiv);
//   };
//   petCard.onmouseout = (e) => {
//     const shaddowWrapper = petCard.previousElementSibling.remove();
//   };
// });

// show screen size, tmp code
// const screenSize = document.createElement('div');
// screenSize.setAttribute(
//   'style',
//   'position: fixed; left: 0; bottom: 0; font-size: 1.2rem; color: red; z-index: 10'
// );
// document.querySelector('body').prepend(screenSize);

// function showScreenSize() {
//   let width = document.documentElement.clientWidth;
//   screenSize.innerHTML = `${width}px`;
// }

// window.onload = () => {
//   setInterval(showScreenSize, 100);
// };
// end tmp code
