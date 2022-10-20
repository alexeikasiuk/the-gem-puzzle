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
    (this.hasSound = true), (this.isMove = false);
  }

  init() {
    console.log('-------------------------game init----------------------');

    this.createPage();
    this.setButtonsBehavior();
    this.fillField();
    this.setPuzzleItemsBehavior();
    this.setCurPageData();
    this.startGame();
  }
  startGame() {
    console.log('start game');

    if (this.timerId) clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      this.time.s++;
      this.showCurTime();
    }, 1000);
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
  showCurTime() {
    // console.log('show current time');

    if (this.time.s === 60) {
      this.time.s = 0;
      this.time.m++;
    }
    if (this.time.m === 60) {
      this.time.m = 0;
      this.time.h++;
    }
    let curH = this.time.h < 10 ? `0${this.time.h}` : this.time.h,
      curM = this.time.m < 10 ? `0${this.time.m}` : this.time.m,
      curS = this.time.s < 10 ? `0${this.time.s}` : this.time.s;
    this.timeNode.innerHTML = `${curH}:${curM}:${curS}`;
  }
  //reset moves counter & game time & kill timer
  resetGameScore() {
    console.log('reset game score');

    this.time = {
      h: 0,
      m: 0,
      s: 0,
    };
    this.movesCount = 0;
    if (this.timerId) clearInterval(this.timerId);
  }
  changeGameLevel() {
    console.log('change game level', this.level);
    // if (confirm('Do you want to save this game?')) this.saveGame();
    this.init();
  }
  toggleSound() {
    console.log('toggle sound');
    this.hasSound = !this.hasSound;
    this.soundButton.classList.toggle('disabled');
    console.log(this.hasSound ? 'sound ON' : 'sound OFF');
  }
  //set actual state page(count moves, level, time & disabled buttons)
  setCurPageData() {
    console.log('set current page data');

    this.resetGameScore();

    this.showMovesCount();
    this.showGameLevel();
    this.showCurTime();

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
    console.log('show current count', this.movesCount);
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
  }
  // set puzzle items behavior
  setPuzzleItemsBehavior() {
    console.log('set cells behavior');
    //on click
    this.puzzleItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        console.log('item click', item.innerHTML);
        this.moveCellByClick(e.target);
      });
    });

    // //on drug&drop
    // this.puzzleItems.forEach((item)=>{});

    // // add cells behavior
    // this.puzzleItems.forEach((cell) =>
    //   cell.addEventListener('click', this.moveCellByClick)
    // );
  }
  // try to move cell
  moveCellByClick(puzzleItem) {
    console.log('try to move cell');

    if (this.isMove) return;

    let cell = puzzleItem,
      zeroCell = document.querySelector('.zero-cell'),
      cellPosition = {
        x: Math.round(cell.getBoundingClientRect().x),
        y: Math.round(cell.getBoundingClientRect().y),
      },
      zeroCellPosition = {
        x: Math.round(zeroCell.getBoundingClientRect().x),
        y: Math.round(zeroCell.getBoundingClientRect().y),
      },
      deltaX = cellPosition.x - zeroCellPosition.x,
      deltaY = cellPosition.y - zeroCellPosition.y,
      deltaMax = cell.offsetWidth * 1.5;
    if (deltaY == 0 && Math.abs(deltaX) <= deltaMax) {
      if (cellPosition.x > zeroCellPosition.x) {
        this.replaceCells(cell, zeroCell, 'to-left');
      } else {
        this.replaceCells(cell, zeroCell, 'to-right');
      }
    } else if (deltaX == 0 && Math.abs(deltaY) <= deltaMax) {
      if (cellPosition.y > zeroCellPosition.y) {
        this.replaceCells(cell, zeroCell, 'to-top');
      } else {
        this.replaceCells(cell, zeroCell, 'to-bottom');
      }
    }
  }
  //replace current cee & zero cell
  replaceCells(cell, zero, animation) {
    console.log('replace cells', cell, zero, animation);
    let _self = this;

    this.movesCount++;
    this.showMovesCount();
    this.isMove = true;
    cell.classList.add(animation);
    cell.addEventListener('animationend', changeItemData);

    function changeItemData(e) {
      _self.isMove = false;
      console.log('end animation');
      cell.classList.add('zero-cell');
      cell.classList.remove(animation);
      zero.classList.remove('zero-cell');
      zero.innerHTML = cell.innerHTML;
      cell.innerHTML = '0';
      e.target.removeEventListener('animationend', changeItemData);
    }
  }
  // shuffle array
  shuffle(array) {
    console.log('shuffle array of puzzle items');

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
