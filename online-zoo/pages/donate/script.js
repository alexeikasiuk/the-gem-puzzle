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
