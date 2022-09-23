function showScreenSize() {
  let width = document.documentElement.clientWidth;
  let height = document.documentElement.clientHeight;
  document.getElementById('screenSize').innerHTML = `${width}:${height}`;
}

window.onload = setInterval(showScreenSize, 100);
window.resizeBy = showScreenSize;
document.getElementById('activePage').onclick = (e) => {
  e.preventDefault();
  console.log(window.width);
};
document.addEventListener('resize', showScreenSize);
