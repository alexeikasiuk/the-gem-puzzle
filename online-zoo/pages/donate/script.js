for (let elem of document.querySelectorAll('.activeMenu')) {
  elem.onclick = (e) => {
    e.preventDefault();
    console.log('activeMenu click');
  };
}
