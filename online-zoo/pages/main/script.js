for (let elem of document.querySelectorAll('.activeMenu')) {
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
document.getElementById('goToMap').onclick = () => {
  document.location.href = '../map/index.html';
};
document.getElementById('btnDonate').onclick = () => {
  document.location.href = '../donate/index.html';
};

document.getElementById('btnDonate2').onclick = () => {
  document.location.href = '../donate/index.html';
};

document.querySelectorAll('[class="petCard"]').forEach((petCard) => {
  petCard.onmouseover = (e) => {
    const shadowDiv = document.createElement('div');
    shadowDiv.className = 'petCardShadow';
    petCard.before(shadowDiv);
  };
  petCard.onmouseout = (e) => {
    const shaddowWrapper = petCard.previousElementSibling.remove();
  };
});

// show screen size, tmp code
const screenSize = document.createElement('div');
screenSize.setAttribute(
  'style',
  'position: fixed; left: 0; bottom: 0; font-size: 1.2rem; color: red; z-index: 10'
);
document.querySelector('body').prepend(screenSize);

function showScreenSize() {
  let width = document.documentElement.clientWidth;
  screenSize.innerHTML = `${width}px`;
}

window.onload = () => {
  setInterval(showScreenSize, 100);
};
// end tmp code
