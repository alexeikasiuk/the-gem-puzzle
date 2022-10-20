import './style.css';

if (process.env.NODE_ENV !== 'production') {
  // console.log('Looks like we are in development mode!');
}

class PuzzleGame {
  constructor() {
    console.log('create game');
    this.level = 4;
    this.movesCount = 0;
    this.time = {
      h: 0,
      m: 0,
      s: 0,
    };
    this.puzzleItems = [];
    this.gameLocalStorage = null;
    this.hasSound = true;
  }

  init() {
    console.log('game init');

    this.createPage();
    this.setButtonsBehavior();
    this.fillField();
    this.setCurPageData();
  }
  startGame() {
    console.log('start game');
  }
  restartGame() {
    console.log('restart game');
  }
  stopGame() {
    console.log('stop game');
  }
  saveGame() {
    console.log('save game');
  }
  showResults() {
    console.log('show results');
  }
  changeGameLevel() {
    console.log('change game level', this.level);
    if (confirm('Do you want to save this game?')) this.saveGame();
    this.init();
  }
  clear() {
    console.log('clear data');
  }
  loadSavingState() {
    console.log('load saving game');
  }
  toggleSound() {
    console.log('toggle sound');
    this.hasSound = !this.hasSound;
    this.soundButton.classList.toggle('disabled');
    console.log(this.hasSound ? 'sound ON' : 'sound OFF');
  }
  setLevel() {
    console.log('set level');
  }

  //set actual state page(count moves, level, time & disabled buttons)
  setCurPageData() {
    console.log('set current page data');
    this.showMovesCount();
    this.showGameLevel();
    if (!localStorage.getItem('puzzleGame')) {
      this.continueButton.classList.add('disabled');
    }
    this.levelButtons.forEach((e) =>
      +e.getAttribute('data-size') === this.level
        ? e.classList.add('disabled')
        : e.classList.remove('disabled')
    );
  }

  showMovesCount() {
    console.log('show current count');
    this.movesCountNode.innerHTML = this.movesCount;
  }
  showGameLevel() {
    console.log('show current game level');
    this.levelNode.innerHTML = `${this.level}x${this.level}`;
  }
  //create base page layout
  createPage() {
    console.log('create base page layout');
    document.body.innerHTML = '';
    document.body.insertAdjacentHTML(
      'afterbegin',
      `
    <div class="container">
      <h1>RSS Gem Puzzle</h1>
      <div class="game-window">
        <div class="controls">
          <button class="control-btn" id="start-game">Restart</button>
          <button class="control-btn" id="continue-game">Continue</button>
          <button class="control-btn" id="stop-game">Stop</button>
          <button class="control-btn" id="save-game">Save</button>
          <button class="control-btn" id="get-result">Result</button>
          <button class="sound" id="sound" class=""></button>
        </div>
        <div class="info">
          <div class=""moves>
            <span>Moves:</span>
            <span id="moves-count"></span>
          </div>
          <div class="field-size">
            <span>Level:</span>
            <span id="cells-size"></span>
          </div>
          <div class="duration">
            <span>Time:</span>
            <span id="time"></span>
          </div>
        </div>
        <div class="field"></div>
          <div class="levels">
          <button data-size="3">3x3</button>
          <button data-size="4">4x4</button>
          <button data-size="5">5x5</button>
          <button data-size="6">6x6</button>
          <button data-size="7">7x7</button>
          <button data-size="8">8x8</button>
        </div>
      </div>
    </div>
  `
    );
    //all page buttons
    this.levelButtons = document
      .querySelector('.levels')
      .querySelectorAll('button');
    this.restartButton = document.getElementById('start-game');
    this.continueButton = document.getElementById('continue-game');
    this.stopButton = document.getElementById('stop-game');
    this.saveButton = document.getElementById('save-game');
    this.showResultButton = document.getElementById('get-result');
    this.soundButton = document.getElementById('sound');

    //game data
    this.movesCountNode = document.getElementById('moves-count');
    this.levelNode = document.getElementById('cells-size');
    this.timeNode = document.getElementById('time');
  }

  //set behavior for buttons
  setButtonsBehavior() {
    console.log('set buttons behavior');

    this.levelButtons.forEach((btn) => {
      btn.onclick = () => {
        if (btn.classList.contains('disabled')) return;
        this.level = +btn.getAttribute('data-size');
        this.changeGameLevel();
      };
    });
    this.restartButton.onclick = () => this.restartGame();
    this.continueButton.onclick = () => this.loadSavingState();
    this.stopButton.onclick = () => this.stopGame();
    this.saveButton.onclick = () => this.saveGame();
    this.showResultButton.onclick = () => this.showResults();
    this.soundButton.onclick = () => this.toggleSound();
  }

  //fill field after start game
  fillField() {
    console.log(`fill field, ${this.level}`);

    this.puzzle = document.querySelector('.field');
    this.puzzle.classList.add(`grid-${this.level}`);

    //clear puzzle items array
    this.puzzleItems = [];

    for (let i = 0; i < this.level * this.level; i++) {
      let item = document.createElement('div');
      item.innerHTML = i;
      if (i === 0) item.classList.add('zero-cell');
      item.classList.add('cell');
      this.puzzleItems.push(item);
    }

    //random order for cells in field
    this.puzzleItems = this.shuffle(this.puzzleItems);

    // clear field
    this.puzzle.innerHTML = '';

    //fill field
    this.puzzleItems.forEach((cell) => this.puzzle.append(cell));

    // add cells behavior
    this.puzzleItems.forEach((cell) =>
      cell.addEventListener('click', this.moveCellByClick)
    );
  }
  // try to move cell
  moveCellByClick() {
    console.log('move cell');
  }

  // shuffle array
  shuffle(array) {
    let arr = [].concat(array);
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

let game = new PuzzleGame();
game.init();

// const links = document.querySelectorAll('a');
// let fieldSize = 4;
// let cells = [];
// let movesCounter = document.getElementById('moves-counter');
// let timeCounter = document.getElementById('time');
// let timerId;

// document.getElementById('start-game').onclick = () => {
//   if (timerId) {
//     if (!confirm('Do you really want to finish this game?')) return;
//     else clearInterval(timerId);
//   }

//   console.log(timerId);
//   gameInit();
//   let min = 0,
//     sec = 0;
//   timerId = setInterval(() => {
//     if (sec == 59) {
//       sec = 0;
//       min++;
//     } else sec++;

//     if (min == 0 && sec == 59) {
//       clearInterval(timerId);
//       alert('game over!');
//     }

//     let str = `${min <= 9 ? '0' + min : min}:${sec <= 9 ? '0' + sec : sec}`;
//     timeCounter.innerHTML = str;
//   }, 1000);
// };

// links.forEach((a) => {
//   a.onclick = (e) => {
//     e.preventDefault();

//     if (a.classList.contains('_active')) return;

//     fieldSize = +a.getAttribute('data-size');
//     // let isSave = confirm('do you really want to finish this game?');

//     // if (!isSave) return;

//     gameInit();
//   };
// });

// function gameInit() {
//   console.log(`game init, ${fieldSize}`);
//   fieldInit(fieldSize);
//   showCurFieldSize(fieldSize);
// }

// function moveCellByClick() {
//   let cell = this,
//     zeroCell = document.querySelector('.zero-cell'),
//     cellPosition = {
//       x: Math.round(cell.getBoundingClientRect().x),
//       y: Math.round(cell.getBoundingClientRect().y),
//     },
//     zeroCellPosition = {
//       x: Math.round(zeroCell.getBoundingClientRect().x),
//       y: Math.round(zeroCell.getBoundingClientRect().y),
//     },
//     deltaX = Math.abs(cellPosition.x - zeroCellPosition.x),
//     deltaY = Math.abs(cellPosition.y - zeroCellPosition.y),
//     deltaMax = cell.offsetWidth * 1.5;
//   if (
//     (deltaY == 0 && deltaX <= deltaMax) ||
//     (deltaX == 0 && deltaY <= deltaMax)
//   )
//     replaceCells(cell, zeroCell);
// }

// //replace current cee & zero cell
// function replaceCells(cell, zero) {
//   zero.classList.remove('zero-cell');
//   zero.innerHTML = cell.innerHTML;

//   cell.classList.add('zero-cell');
//   cell.innerHTML = '0';
// }

// function showCurFieldSize() {
//   console.log(`show current field size grid, ${fieldSize}`);

//   let fieldSizeNode = document.getElementById('cells-size');
//   fieldSizeNode.innerHTML = `${fieldSize}x${fieldSize}`;

//   links.forEach((el) => {
//     if (el.classList.contains('_active')) el.classList.remove('_active');
//     if (+el.getAttribute('data-size') === fieldSize)
//       el.classList.add('_active');
//   });
// }

// // clear game time & moves count
// function clearCounter() {
//   movesCounter.innerHTML = 0;
//   timeCounter.innerHTML = '00:00';
// }
