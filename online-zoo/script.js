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
  document.location.href = 'pages/map/index.html';
};
document.getElementById('btnDonate').onclick = () => {
  document.location.href = 'pages/donate/index.html';
};

document.getElementById('btnDonate2').onclick = () => {
  document.location.href = 'pages/donate/index.html';
};
