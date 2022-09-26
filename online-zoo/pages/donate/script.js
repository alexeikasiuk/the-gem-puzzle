for (let elem of document.querySelectorAll('.activeMenu')) {
  elem.onclick = (e) => {
    e.preventDefault();
    console.log('activeMenu click');
  };
}

document.onsubmit = (e) => {
  e.preventDefault();
  let amount = document.querySelector('[type="number"]').value || 0,
    period = document.querySelector(':checked').value || 0;
  alert(`Donate: ${amount}$ !!!\nPeriod: ${period} !`);
};

document.getElementById('btnDonate2').onclick = () => {
  document.location.href = 'index.html';
};
