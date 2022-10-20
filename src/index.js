import './style.css';

if (process.env.NODE_ENV !== 'production') {
  // console.log('Looks like we are in development mode!');
}

document.body.insertAdjacentHTML(
  'afterbegin',
  `
  <header class="header">
    <div class="container">
      <h2>Header</h2>
    </div>
  </header>
  <main class="main">
    <div class="container">
      <h1>RSS Gem Puzzle</h1>
      <div class="control">
        <button id="start-game">Shuffle and start</button>
        <button id="stop-game">Stop</button>
        <button id="save-game">Save</button>
        <button id="get-result">Result</button>
      </div>
      <div class="score">
        <span>Moves:</span>
        <span id="moves-count">0</span>
        <span>Time:</span>
        <span id="time">00:00</span>
      </div>
      <div class="field"></div>
      <div class="field-size">
        <span>Frame size:</span>
        <span id="cells-size"></span>
      </div>
      <div class="chose-size">
      <span>Other sizes:</span>
      <a href="#" data-size="3">3x3</a>
      <a href="#" data-size="4">4x4</a>
      <a href="#" data-size="5">5x5</a>
      <a href="#" data-size="6">6x6</a>
      <a href="#" data-size="7">7x7</a>
      <a href="#" data-size="8">8x8</a>
      </div>
    </div>
  </main>
  <footer class="footer">
    <div class="container">
      <h2>Footer</h2>
    </div>
  </footer>
`
);

const links = document.querySelectorAll('a');
let fieldSize = 4;
let cells = [];
let movesCounter = document.getElementById('moves-counter');
let timeCounter = document.getElementById('time');
let timerId;

document.getElementById('start-game').onclick = () => {
  if (timerId) {
    if (!confirm('Do you really want to finish this game?')) return;
    else clearInterval(timerId);
  }

  console.log(timerId);
  gameInit();
  let min = 0,
    sec = 0;
  timerId = setInterval(() => {
    if (sec == 59) {
      sec = 0;
      min++;
    } else sec++;

    if (min == 0 && sec == 59) {
      clearInterval(timerId);
      alert('game over!');
    }

    let str = `${min <= 9 ? '0' + min : min}:${sec <= 9 ? '0' + sec : sec}`;
    timeCounter.innerHTML = str;
  }, 1000);
};

document.getElementById('stop-game').onclick = () => {
  alert('Stop game!');
};

document.getElementById('save-game').onclick = () => {
  alert('Save game!');
};

document.getElementById('get-result').onclick = () => {
  alert('Show games results!');
};

links.forEach((a) => {
  a.onclick = (e) => {
    e.preventDefault();

    if (a.classList.contains('_active')) return;

    fieldSize = +a.getAttribute('data-size');
    // let isSave = confirm('do you really want to finish this game?');

    // if (!isSave) return;

    gameInit();
  };
});

function gameInit() {
  console.log(`game init, ${fieldSize}`);
  fieldInit(fieldSize);
  showCurFieldSize(fieldSize);
}

// fill field random cells
function fieldInit() {
  let cells = [];
  const field = document.querySelector('.field');
  console.log(`field grid init, ${fieldSize}`);

  for (let i = 1; i < fieldSize * fieldSize; i++) {
    let cell = document.createElement('div');
    cell.innerHTML = i;
    cell.classList.add('cell');
    cell.classList.add(`cell${fieldSize}`);
    cells.push(cell);
  }

  //random order for cells in field
  cells = shuffle(cells);

  // clear field
  field.innerHTML = '';

  //fill field
  cells.forEach((cell) => field.append(cell));
}

function showCurFieldSize() {
  console.log(`show current field size grid, ${fieldSize}`);

  let fieldSizeNode = document.getElementById('cells-size');
  fieldSizeNode.innerHTML = `${fieldSize}x${fieldSize}`;

  links.forEach((el) => {
    if (el.classList.contains('_active')) el.classList.remove('_active');
    if (+el.getAttribute('data-size') === fieldSize)
      el.classList.add('_active');
  });
}

// clear game time & moves count
function clearCounter() {
  movesCounter.innerHTML = 0;
  timeCounter.innerHTML = '00:00';
}

// shuffle array
function shuffle(array) {
  let arr = [].concat(array);
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
window.onload = gameInit();
