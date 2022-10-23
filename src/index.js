import './style.css';
import moveSound from './assets/sounds/move.mp3';

if (process.env.NODE_ENV !== 'production') {
  // console.log('Looks like we are in development mode!');
}

class PuzzleGame {
  constructor() {
    console.log('create game');
    this.level = 4;
    this.movesCount = 0;
    this.time = {
      m: 0,
      s: 0,
    };
    this.puzzleItems = [];
    this.hasSound = true;
    this.isMove = false;
    this.isStopped = false;
    this.savedPuzzleItemsOrder = null;
    this.isWin = false;
    this.isHelped = false;
  }

  init() {
    console.log('init game----------------------');

    if (this.getSavedGame()) this.createPage();
    else this.loadGame();
  }

  loadGame() {
    console.log('load game', this.level);

    this.createPage();
    this.setButtonsBehavior();
    this.startGame();
  }

  startGame() {
    console.log('start game');

    this.fillField();
    this.setPuzzleItemsBehavior();
    this.setCurPageData();
    this.timerId = setInterval(() => {
      this.time.s++;
      this.showCurTime();
    }, 1000);
  }

  restartGame() {
    console.log('restart game');

    // popup!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (!this.isWin && confirm('Do you want to want to save this game?'))
      this.saveGame();
    // else localStorage.removeItem('game');

    this.clearGameState();
    this.loadGame();
    // this.startGame();
  }

  continueGame() {
    console.log('game continue');

    this.isStopped = false;
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      this.time.s++;
      this.showCurTime();
    }, 1000);
    this.stopButton.classList.remove('disabled');
    this.restartButton.classList.remove('disabled');
    this.continueButton.classList.add('disabled');
    this.puzzle.classList.remove('disabled');
  }

  stopGame() {
    console.log('game stop');

    this.isStopped = true;
    clearInterval(this.timerId);
    this.stopButton.classList.add('disabled');
    this.restartButton.classList.add('disabled');
    this.continueButton.classList.remove('disabled');
    this.puzzle.classList.add('disabled');
  }

  saveGame() {
    console.log('game save');

    let game = {
      moves: this.movesCount,
      time: this.time,
      level: this.level,
      puzzle: [],
    };
    this.puzzleItems.forEach((e) => game.puzzle.push(+e.innerHTML));
    localStorage.setItem('game', JSON.stringify(game));
  }

  showResults() {
    console.log('show results');

    let results = localStorage.getItem('results');
    let frame = document.createElement('table');
    frame.classList.add('table-results');
    // console.log(frame);

    this.modalResults.classList.add('show');

    if (!results) {
      frame.innerHTML = "You haven't saved game's results";
    } else {
      frame.insertAdjacentHTML(
        'afterbegin',
        `
        <tr>
          <th>№</th>
          <th>Date</th>
          <th>Help</th>
          <th>Moves</th>
          <th>Time</th>
        </tr>
      `
      );

      results = JSON.parse(results);
      // console.log(results);
      for (let key in results) {
        // console.log(results[key]);
        let level = document.createElement('tr');
        level.insertAdjacentHTML(
          'afterbegin',
          `
          <td colspan="5">Game Leve: ${key}x${key}</td>
        `
        );
        frame.append(level);

        results[key].forEach((e, i) => {
          // console.log(e);
          let result = document.createElement('tr');

          result.insertAdjacentHTML(
            'afterbegin',
            `
              <td>${i + 1}</td>
              <td>${e.date}</td>
              <td>${e.help}</td>
              <td>${e.moves}</td>
              <td>${e.time.m}min ${e.time.s}sec</td>
          `
          );
          frame.append(result);
        });
      }

      document
        .querySelector('.modal-results')
        .querySelector('.modal-content')
        .append(frame);
    }
  }

  showCurTime() {
    // console.log('show current time');

    if (this.time.s === 60) {
      this.time.s = 0;
      this.time.m++;
    }
    if (this.time.m === 60) {
      alert('game over');
    }
    let curM = this.time.m < 10 ? `0${this.time.m}` : this.time.m,
      curS = this.time.s < 10 ? `0${this.time.s}` : this.time.s;
    this.timeNode.innerHTML = `${curM}:${curS}`;
  }

  //reset moves counter & game time & kill timer
  resetGameScore() {
    console.log('reset game score');

    this.time = {
      m: 0,
      s: 0,
    };
    this.movesCount = 0;
    if (this.timerId) clearInterval(this.timerId);
  }

  toggleSound() {
    // console.log('toggle sound');

    this.hasSound = !this.hasSound;
    this.soundButton.classList.toggle('disabled');
    console.log(this.hasSound ? 'sound ON' : 'sound OFF');
  }

  //set actual state page(count moves, level, time & disabled buttons)
  setCurPageData() {
    console.log('set current page data');

    this.showMovesCount();
    this.showGameLevel();
    this.showCurTime();

    if (this.isStopped) this.continueButton.classList.remove('disabled');
    else this.continueButton.classList.add('disabled');
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
          <button class="sound" id="sound"></button>
          <button class="help" id="help">help</button>
        </div>
        <div class="info">
          <div class=""moves>
            <span>Moves:</span>
            <span id="moves-count">-</span>
          </div>
          <div class="field-size">
            <span>Level:</span>
            <span id="cells-size">-x-</span>
          </div>
          <div class="duration">
            <span>Time:</span>
            <span id="time">--:--</span>
          </div>
        </div>
        <div class="field-window">
          <div class="field">
            <div class="saved-game">
              <p>Do you want to continue the last saved game?</p>
              <div>
                <button id="play-last-game">YES</button>
                <button id="remove-saved-game">NO</button>
              </div>
            </div>
          </div>

        </div>
        <div class="levels">
          <button data-size="3">3x3</button>
          <button data-size="4">4x4</button>
          <button data-size="5">5x5</button>
          <button data-size="6">6x6</button>
          <button data-size="7">7x7</button>
          <button data-size="8">8x8</button>
        </div>
        <div class="modal modal-results">
          <div class="modal-body">
          <button class="modal-close-btn"id="modal-results-close">&times;</button>
            <h2 class="modal-title">Top-10 results</h2>
            <div class="modal-content"></div>
          </div>
        
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
    this.helpButton = document.getElementById('help');

    //game data
    this.movesCountNode = document.getElementById('moves-count');
    this.levelNode = document.getElementById('cells-size');
    this.timeNode = document.getElementById('time');

    // saved game buttons behavior
    document.getElementById('play-last-game').onclick = (e) => {
      console.log('load saved game');

      this.setSavedGameData();
      this.loadGame();
    };
    document.getElementById('remove-saved-game').onclick = (e) => {
      console.log('remove saved game');

      localStorage.removeItem('game');
      this.loadGame();
    };

    //modal window for results
    this.modalResults = document.querySelector('.modal-results');
    this.modalResultsBtnClose = document.getElementById('modal-results-close');
    this.modalResultsBtnClose.onclick = () =>
      this.modalResults.classList.remove('show');
  }

  //set behavior for buttons
  setButtonsBehavior() {
    console.log('set buttons behavior');

    this.levelButtons.forEach((btn) => {
      btn.onclick = () => {
        if (btn.classList.contains('disabled')) return;

        console.log('change game level from ', this.level);

        // popup!!!!!!!!!!!!!!!!!!!!!!!
        if (!this.isWin && confirm('Do you want to save this game?'))
          this.saveGame();
        else localStorage.removeItem('game');

        this.clearGameState();
        this.level = +btn.getAttribute('data-size');
        this.loadGame();
      };
    });
    this.restartButton.onclick = () => {
      if (this.restartButton.classList.contains('disabled')) return;
      this.restartGame();
    };
    this.continueButton.onclick = () => {
      if (this.continueButton.classList.contains('disabled')) return;
      this.continueGame();
    };
    this.stopButton.onclick = () => {
      if (this.stopButton.classList.contains('disabled')) return;
      this.stopGame();
    };
    this.helpButton.onclick = () => this.helpMe();
    this.saveButton.onclick = () => this.saveGame();
    this.showResultButton.onclick = () => this.showResults();
    this.soundButton.onclick = () => this.toggleSound();
  }

  //fill field after start game
  fillField() {
    console.log(`fill field`, this.level);
    // console.log(this.savedPuzzleItemsOrder);

    this.puzzle = document.querySelector('.field');
    this.puzzleCoord = {
      left: Math.round(this.puzzle.getBoundingClientRect().x),
      top: Math.round(this.puzzle.getBoundingClientRect().y),
      width: this.puzzle.offsetWidth,
      height: this.puzzle.offsetHeight,
    };
    this.puzzle.classList.add(`grid-${this.level}`);

    //clear puzzle items array
    this.puzzleItems = [];

    if (this.savedPuzzleItemsOrder) {
      console.log('saved field');

      for (let i = 0; i < this.level * this.level; i++) {
        let item = document.createElement('div');
        item.innerHTML = this.savedPuzzleItemsOrder[i];
        if (this.savedPuzzleItemsOrder[i] === 0)
          item.classList.add('zero-cell');
        item.classList.add('cell');
        this.puzzleItems.push(item);
      }
    } else {
      console.log('random field');

      for (let i = 0; i < this.level * this.level; i++) {
        let item = document.createElement('div');
        item.innerHTML = i;
        if (i === 0) item.classList.add('zero-cell');
        item.classList.add('cell');
        this.puzzleItems.push(item);
      }

      //random order for cells in field
      this.puzzleItems = this.shuffle(this.puzzleItems);
    }

    this.savedPuzzleItemsOrder = null;
    // clear field
    this.puzzle.innerHTML = '';

    //fill field
    this.puzzleItems.forEach((cell) => this.puzzle.append(cell));
  }
  // set puzzle items behavior
  setPuzzleItemsBehavior() {
    console.log('set cells behavior');

    this.puzzleItems.forEach((item) => {
      item.addEventListener('mousedown', (e) => {
        console.log('on mouse down');
        e.preventDefault();
        let _self = this;

        if (this.isMove || this.isStopped || this.draggedItem) {
          console.log('cancel mousedown');
          return;
        }

        let zeroCell = document.querySelector('.zero-cell');
        let cellPosition = {
          x: Math.round(item.getBoundingClientRect().x),
          y: Math.round(item.getBoundingClientRect().y),
          minLeft:
            _self.puzzleCoord.left - Math.round(item.getBoundingClientRect().x),
          maxLeft:
            _self.puzzleCoord.left +
            _self.puzzleCoord.width -
            item.offsetWidth -
            Math.round(item.getBoundingClientRect().x),
          minTop:
            _self.puzzleCoord.top - Math.round(item.getBoundingClientRect().y),
          maxTop:
            _self.puzzleCoord.top +
            _self.puzzleCoord.height -
            item.offsetHeight -
            Math.round(item.getBoundingClientRect().y),
          maxX: 0,
          maxY: 0,
        };
        let zeroCellPosition = {
            x: Math.round(zeroCell.getBoundingClientRect().x),
            y: Math.round(zeroCell.getBoundingClientRect().y),
          },
          deltaX = cellPosition.x - zeroCellPosition.x,
          deltaY = cellPosition.y - zeroCellPosition.y,
          deltaMax = item.offsetWidth * 1.5;

        //can move only next ones zero cell
        if (
          !(
            (deltaY == 0 && Math.abs(deltaX) <= deltaMax) ||
            (deltaX == 0 && Math.abs(deltaY) <= deltaMax)
          )
        ) {
          console.log("cancel mousedown, don't next one");
          return;
        }

        this.isMove = true;
        this.draggedItem = item;
        this.draggedItem.data = cellPosition;
        this.draggedItem.time = Date.now();
        this.draggedItem.position = {
          left: 0,
          top: 0,
        };
        this.draggedItem.style.position = 'relative';
        this.draggedItem.style.zIndex = '1000';
        let lastMouseCoord = this.mouseCurCoord;
        this.draggedTimer = setInterval(() => {
          this.draggedItem.position.left +=
            this.mouseCurCoord.x - lastMouseCoord.x;
          this.draggedItem.position.top +=
            this.mouseCurCoord.y - lastMouseCoord.y;

          //can move item only in puzzle field
          if (this.draggedItem.position.left < cellPosition.minLeft) {
            this.draggedItem.position.left = cellPosition.minLeft;
          } else if (this.draggedItem.position.left > cellPosition.maxLeft) {
            this.draggedItem.position.left = cellPosition.maxLeft;
          }
          if (this.draggedItem.position.top < cellPosition.minTop) {
            this.draggedItem.position.top = cellPosition.minTop;
          } else if (this.draggedItem.position.top > cellPosition.maxTop) {
            this.draggedItem.position.top = cellPosition.maxTop;
          }
          cellPosition.maxX = Math.max(
            cellPosition.maxX,
            Math.abs(this.draggedItem.position.left)
          );
          cellPosition.maxY = Math.max(
            cellPosition.maxY,
            Math.abs(this.draggedItem.position.left)
          );
          this.draggedItem.style.left = this.draggedItem.position.left + 'px';
          this.draggedItem.style.top = this.draggedItem.position.top + 'px';
          lastMouseCoord = this.mouseCurCoord;
        }, 10);
      });
    });
    document.onmouseup = (e) => {
      console.log('on mouse up');

      if (!this.draggedItem || !this.isMove) {
        console.log('cancel mouseup');
        return;
      }
      clearInterval(this.draggedTimer);

      let moveTime = Date.now() - this.draggedItem.time;
      let moveDist = Math.max(
        this.draggedItem.data.maxX,
        this.draggedItem.data.maxY
      );

      let zeroCell = document.querySelector('.zero-cell'),
        cellPosition = {
          x: Math.round(this.draggedItem.getBoundingClientRect().x),
          y: Math.round(this.draggedItem.getBoundingClientRect().y),
        },
        zeroCellPosition = {
          x: Math.round(zeroCell.getBoundingClientRect().x),
          y: Math.round(zeroCell.getBoundingClientRect().y),
        },
        deltaX = cellPosition.x - zeroCellPosition.x,
        deltaY = cellPosition.y - zeroCellPosition.y,
        deltaMax = this.draggedItem.offsetWidth;
      this.draggedItem.classList.add('slow');

      //can move only next ones zero cell, if less 0.3s & 10px - click  else drag&drop
      if (
        (Math.abs(deltaX) <= deltaMax && Math.abs(deltaY) <= deltaMax) ||
        (moveTime < 300 && moveDist < 20)
      ) {
        console.log('move to zero');

        this.draggedItem.style.left =
          parseInt(this.draggedItem.style.left) +
          zeroCellPosition.x -
          cellPosition.x +
          'px';
        this.draggedItem.style.top =
          parseInt(this.draggedItem.style.top) +
          zeroCellPosition.y -
          cellPosition.y +
          'px';

        setTimeout(() => {
          zeroCell.innerHTML = this.draggedItem.innerHTML;
          this.draggedItem.innerHTML = 0;
          this.draggedItem.classList.add('zero-cell');
          zeroCell.classList.remove('zero-cell');
          this.draggedItem.style.zIndex = '0';
          this.draggedItem.style.top = '0';
          this.draggedItem.style.left = '0';
          this.draggedItem.style.position = 'static';
          this.draggedItem.classList.remove('slow');
          this.draggedItem = null;
          this.isMove = false;
        }, 100);

        this.movesCount++;
        this.showMovesCount();
        this.checkGameState();
      } else {
        this.draggedItem.style.top = '0';
        this.draggedItem.style.left = '0';
        this.timerMoveBack = setTimeout(() => {
          this.draggedItem.classList.remove('slow');
          this.draggedItem.style.zIndex = '0';
          this.draggedItem.style.position = 'static';
          this.draggedItem = null;
          this.isMove = false;
          clearTimeout(this.timerMoveBack);
        }, 100);
      }
    };

    // document.onmousemove = (e) => {
    //   this.mouseCurCoord = {
    //     x: e.clientX,
    //     y: e.clientY,
    //   };
    // };
  }

  // try to move cell
  moveCellByClick(puzzleItem) {
    console.log('try to move cell');

    // if (this.isMove || this.isStopped) return;

    // let cell = puzzleItem,
    //   zeroCell = document.querySelector('.zero-cell'),
    //   cellPosition = {
    //     x: Math.round(cell.getBoundingClientRect().x),
    //     y: Math.round(cell.getBoundingClientRect().y),
    //   },
    //   zeroCellPosition = {
    //     x: Math.round(zeroCell.getBoundingClientRect().x),
    //     y: Math.round(zeroCell.getBoundingClientRect().y),
    //   },
    //   deltaX = cellPosition.x - zeroCellPosition.x,
    //   deltaY = cellPosition.y - zeroCellPosition.y,
    //   deltaMax = cell.offsetWidth * 1.5;
    // if (deltaY == 0 && Math.abs(deltaX) <= deltaMax) {
    //   if (cellPosition.x > zeroCellPosition.x) {
    //     this.replaceCells(cell, zeroCell, 'to-left');
    //   } else {
    //     this.replaceCells(cell, zeroCell, 'to-right');
    //   }
    // } else if (deltaX == 0 && Math.abs(deltaY) <= deltaMax) {
    //   if (cellPosition.y > zeroCellPosition.y) {
    //     this.replaceCells(cell, zeroCell, 'to-top');
    //   } else {
    //     this.replaceCells(cell, zeroCell, 'to-bottom');
    //   }
    // }
  }

  //replace current cee & zero cell
  replaceCells(cell, zero, animation) {
    console.log('replace cells');

    // let _self = this;

    // this.playSound(moveSound);
    // if (this.movesCount != Infinity) this.movesCount++;
    // this.showMovesCount();
    // this.isMove = true;
    // cell.classList.add(animation);
    // cell.addEventListener('animationend', changeItemData);

    // function changeItemData(e) {
    //   _self.isMove = false;
    //   console.log('end animation');
    //   cell.classList.add('zero-cell');
    //   cell.classList.remove(animation);
    //   zero.classList.remove('zero-cell');
    //   zero.innerHTML = cell.innerHTML;
    //   cell.innerHTML = '0';
    //   e.target.removeEventListener('animationend', changeItemData);

    // check game state
    //   _self.checkGameState();
    // }
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

  //play sound
  playSound(moveSound) {
    console.log('play sound');

    if (this.hasSound) {
      let sound = new Audio(moveSound);
      sound.play();
    }
  }

  clearGameState() {
    console.log('clear game state');

    this.resetGameScore();
    this.puzzleItems = [];
    this.isStopped = false;
    this.isWin = false;
    this.puzzle.innerHTML = '';
    if (this.timerId) clearInterval(this.timerId);
  }

  getSavedGame() {
    console.log('get saved game');

    return (this.savedGame = JSON.parse(localStorage.getItem('game')));
  }

  setSavedGameData() {
    console.log('set last saved game data');

    this.level = this.savedGame.level;
    this.movesCount = this.savedGame.moves;
    this.time = this.savedGame.time;
    this.savedPuzzleItemsOrder = this.savedGame.puzzle;
  }

  checkGameState() {
    console.log('check game state');

    let curField = this.puzzleItems.map((e) => +e.innerHTML);
    curField = [].concat(
      curField.slice(curField.length - 1),
      curField.slice(0, curField.length - 1)
    );
    let winField = [].concat(curField).sort((a, b) => a - b);
    if (curField.join('') == winField.join('')) {
      this.isWin = true;

      //popup!!!!!!!!!!!!!!!!!
      alert('win');

      this.saveWinGame();
      this.puzzle.classList.add('disabled');
      this.stopButton.classList.add('disabled');
      this.saveButton.classList.add('disabled');
    }
  }

  // let's cheat
  helpMe() {
    console.log("let's cheat");

    this.isHelped = true;
    this.puzzleItems = this.puzzleItems.sort(
      (a, b) => +a.innerHTML - +b.innerHTML
    );
    let zero = this.puzzleItems[0];

    this.puzzleItems = this.puzzleItems.slice(1);
    this.puzzleItems.splice(this.puzzleItems.length - 1, 0, zero);

    this.puzzle.innerHTML = '';
    this.puzzleItems.forEach((e) => this.puzzle.append(e));

    clearInterval(this.timerId);
    this.showMovesCount();
    this.showCurTime();
  }

  saveWinGame() {
    console.log('save wined game');

    let storage = localStorage.getItem('results')
      ? JSON.parse(localStorage.getItem('results'))
      : { '3': [], '4': [], '5': [], '6': [], '7': [], '8': [] };

    let game = {
      date: Date.now(),
      help: this.isHelped,
      moves: this.movesCount,
      time: this.time,
    };
    storage[this.level.toString()].push(game);

    // last 10 best results
    // first sort by moves, if equal then by time, if equal then by date
    if (storage[this.level.toString()].length > 10) {
      let arr = storage[this.level.toString()];
      // sort by moves
      arr.sort((a, b) => a.moves - b.moves);
    }

    localStorage.setItem('results', JSON.stringify(storage));
  }
}

let game = new PuzzleGame();
game.init();

// window.onunload = () => {
//   if (!game.isWin) game.saveGame();
// };
