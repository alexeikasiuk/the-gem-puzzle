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
    console.log('on');
    const shadowDiv = document.createElement('div');
    shadowDiv.className = 'petCardShadow';
    petCard.before(shadowDiv);
  };
  petCard.onmouseout = (e) => {
    console.log('off');
    const shaddowWrapper = petCard.previousElementSibling.remove();
  };
});
