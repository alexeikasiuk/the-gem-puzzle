function showScreenSize() {
  let width = document.documentElement.clientWidth;
  let height = document.documentElement.clientHeight;
  document.getElementById('screenSize').innerHTML = `${width}:${height}`;
}

window.onload = setInterval(showScreenSize, 100);
window.resizeBy = showScreenSize;

for (let elem of document.querySelectorAll('.activeMenu')) {
  elem.onclick = (e) => {
    e.preventDefault();
  };
}

document.getElementById('subscribe').onclick = (e) => {
  e.preventDefault();
  alert('Subscribe!');
};

document.addEventListener('resize', showScreenSize);

document.getElementById('btnDonate').onclick = () => {
  document.location.href = '../donate/index.html';
};

document.getElementById('btnDonate2').onclick = () => {
  document.location.href = '../donate/index.html';
};
