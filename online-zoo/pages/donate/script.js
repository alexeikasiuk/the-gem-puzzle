for (let elem of document.querySelectorAll('.activeMenu')) {
  elem.onclick = (e) => {
    e.preventDefault();
    console.log('activeMenu click');
  };
}
const feedForm = document.getElementById('feedPeriod');
feedForm.onsubmit = (e) => {
  e.preventDefault();
  const amount = document.getElementById('inputPrice').value || 0;
  const period = feedForm.querySelector(':checked').value;
  alert(`Donate: ${amount}$ !!!\nPeriod: ${period} !`);
};
const subscribeAddress = document.getElementById('subscribe');
subscribeAddress.onsubmit = (e) => {
  e.preventDefault();
  const email = subscribeAddress.querySelector('[type="email"]').value;
  alert(`Subscribe address: ${email} !`);
};

document.getElementById('btnDonate2').onclick = () => {
  document.location.href = 'index.html';
};

// show sreen size, tmp code
const screenSize = document.createElement('div');
screenSize.setAttribute(
  'style',
  'position: fixed; left: 0; bottom: 0; font-size: 2rem; color: red; z-index: 10'
);
document.querySelector('body').prepend(screenSize);

function showScreenSize() {
  let width = document.documentElement.clientWidth;
  let height = document.documentElement.clientHeight;
  screenSize.innerHTML = `${width}:${height}`;
}

window.onload = () => {
  setInterval(showScreenSize, 100);
};
// end tmp code
