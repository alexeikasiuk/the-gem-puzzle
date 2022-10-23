import './style.css';
import moveSound from './assets/sounds/move.mp3';

if (process.env.NODE_ENV !== 'production') {
  // console.log('Looks like we are in development mode!');
}

class PuzzleGame {
  constructor() {
    this.level = 4;
    this.movesCount = 0;
    this.time = {
      m: 0,
      s: 0,
    };
    this.puzzleItems = [];
    this.hasSound = true;
    this.isMove = false;
    this.savedPuzzleItemsOrder = null;
    this.isWin = false;
    this.isHelped = false;
  }

  init() {
    this.savedGame = JSON.parse(localStorage.getItem('game'));

    if (this.savedGame) this.createPage();
    else this.loadGame();
  }

  loadGame() {
    this.createPage();
    this.setButtonsBehavior();
    this.startGame();
  }

  startGame() {
    this.fillField();
    this.setPuzzleItemsBehavior();
    this.setCurPageData();
    this.timerId = setInterval(() => {
      this.time.s++;
      this.showCurTime();
    }, 1000);
  }

  restartGame() {
    if (!this.isWin && this.movesCount > 0) {
      this.puzzle.innerHTML = `
        <div class="save-modal">
          <h3>Do you want to save this game?</h3>
          <div>
          <button id="save-this-game">YES</button>
          <button id="remove-game">NO</button>
          </div>
      </div>
      `;
      document.getElementById('save-this-game').onclick = () => {
        this.saveGame();
        this.clearGameState();
        this.loadGame();
      };

      document.getElementById('remove-game').onclick = () => {
        localStorage.removeItem('game');
        this.clearGameState();
        this.loadGame();
      };
    } else {
      this.clearGameState();
      this.loadGame();
    }
  }

  saveGame() {
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
    let results = localStorage.getItem('results');
    let frame = document.createElement('table');
    frame.classList.add('table-results');
    this.modalResults.classList.add('show');

    if (!results) {
      frame.innerHTML = "You have no saved game's results";
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
      for (let key in results) {
        if (results[key].length == 0) continue;
        let level = document.createElement('tr');
        level.insertAdjacentHTML(
          'afterbegin',
          `
          <td colspan="5"><h3>Game Level: ${key}x${key}</h3></td>
        `
        );
        frame.append(level);

        results[key].forEach((e, i) => {
          let result = document.createElement('tr');
          let date = new Date(e.date),
            month =
              date.getMonth() + 1 < 10
                ? '0' + (date.getMonth() + 1)
                : date.getMonth() + 1,
            day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            hours =
              date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
            minutes =
              date.getMinutes() < 10
                ? '0' + date.getMinutes()
                : date.getMinutes(),
            weekDay;
          switch (date.getDay()) {
            case 0:
              weekDay = 'вс';
              break;
            case 1:
              weekDay = 'пн';
              break;
            case 2:
              weekDay = 'вт';
              break;
            case 3:
              weekDay = 'ср';
              break;
            case 4:
              weekDay = 'чт';
              break;
            case 5:
              weekDay = 'пт';
              break;
            case 6:
              weekDay = 'сб';
              break;
          }
          result.insertAdjacentHTML(
            'afterbegin',
            `
              <td>${i + 1}</td>
              <td>${day}.${month} ${weekDay}, ${hours}:${minutes}</td>
              <td>${e.help ? 'yes' : 'no'}</td>
              <td>${e.moves}</td>
              <td>${e.time.m}:${e.time.s}</td>
          `
          );
          frame.append(result);
        });
      }
    }
    let modalBody = document
      .querySelector('.modal-results')
      .querySelector('.modal-content');
    modalBody.innerHTML = '';
    modalBody.append(frame);
  }

  showCurTime() {
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

  //set actual state page(count moves, level, time & disabled buttons)
  setCurPageData() {
    this.movesCountNode.innerHTML = this.movesCount;
    this.levelNode.innerHTML = `${this.level}&times;${this.level}`;
    this.showCurTime();
    this.levelButtons.forEach((e) =>
      +e.getAttribute('data-size') === this.level
        ? e.classList.add('disabled')
        : e.classList.remove('disabled')
    );
  }

  //create base page layout
  createPage() {
    document.body.innerHTML = '';
    document.body.insertAdjacentHTML(
      'afterbegin',
      `
    <div class="container">
      <h1>RSS Gem Puzzle</h1>
      <div class="game-window">
        <div class="controls">
          <button class="control-btn" id="start-game">Restart</button>
          <button class="control-btn" id="help">Let's win!</button>
          <button class="control-btn" id="save-game">Save</button>
          <button class="control-btn" id="get-result">Result</button>
          <button class="sound" id="sound"></button>       
        </div>
        <div class="info">
          <div class=""moves>
            <span>Moves:</span>
            <span id="moves-count">-</span>
          </div>
          <div class="field-size">
            <span>Level:</span>
            <span id="cells-size">-&times;-</span>
          </div>
          <div class="duration">
            <span>Time:</span>
            <span id="time">--:--</span>
          </div>
        </div>
        <div class="field-window">
          <div class="field">
            <div class="saved-game">
              <h2>Do you want to continue the last saved game?</h2>
              <div>
                <button id="play-last-game">YES</button>
                <button id="remove-saved-game">NO</button>
              </div>
            </div>
          </div>
        </div>
        <div class="levels">
          <button data-size="3">3&times;3</button>
          <button data-size="4">4&times;4</button>
          <button data-size="5">5&times;5</button>
          <button data-size="6">6&times;6</button>
          <button data-size="7">7&times;7</button>
          <button data-size="8">8&times;8</button>
        </div>
        <div class="modal modal-results">
          <div class="modal-body">
          <button class="modal-close-btn"id="modal-results-close">&times;</button>
            <h2 class="modal-title">Top-10 results</h2>
            <button class="clear-results" id="clear-results">Clear</button>
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
    this.saveButton = document.getElementById('save-game');
    this.showResultButton = document.getElementById('get-result');
    this.soundButton = document.getElementById('sound');
    this.helpButton = document.getElementById('help');
    this.clearResults = document.getElementById('clear-results');

    //game info data
    this.movesCountNode = document.getElementById('moves-count');
    this.levelNode = document.getElementById('cells-size');
    this.timeNode = document.getElementById('time');

    // saved game buttons behavior
    document.getElementById('play-last-game').onclick = (e) => {
      this.setSavedGameData();
      this.loadGame();
    };
    document.getElementById('remove-saved-game').onclick = (e) => {
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
    this.levelButtons.forEach((btn) => {
      btn.onclick = () => {
        if (btn.classList.contains('disabled')) return;
        if (!this.isWin && this.movesCount > 0) {
          this.puzzle.innerHTML = `
        <div class="save-modal">
          <h3>Do you want to save this game?</h3>
          <div>
          <button id="save-this-game">YES</button>
          <button id="remove-game">NO</button>
          </div>
      </div>
      `;
          document.getElementById('save-this-game').onclick = () => {
            this.saveGame();
            this.clearGameState();
            this.level = +btn.getAttribute('data-size');
            this.loadGame();
          };

          document.getElementById('remove-game').onclick = () => {
            localStorage.removeItem('game');
            this.clearGameState();
            this.level = +btn.getAttribute('data-size');
            this.loadGame();
          };
        } else {
          this.clearGameState();
          this.level = +btn.getAttribute('data-size');
          this.loadGame();
        }
      };
    });
    this.restartButton.onclick = () => {
      if (this.restartButton.classList.contains('disabled')) return;
      this.restartGame();
    };
    this.helpButton.onclick = () => {
      if (this.helpButton.classList.contains('disabled')) return;
      this.helpMe();
    };
    this.saveButton.onclick = () => this.saveGame();
    this.showResultButton.onclick = () => this.showResults();
    this.soundButton.onclick = () => {
      this.hasSound = !this.hasSound;
      this.soundButton.classList.toggle('disabled');
    };
    this.clearResults.onclick = () => {
      localStorage.removeItem('results');
      this.showResults();
    };
  }

  //fill field after start game
  fillField() {
    this.puzzle = document.querySelector('.field');
    this.puzzleCoord = {
      left: Math.round(this.puzzle.getBoundingClientRect().x),
      top: Math.round(this.puzzle.getBoundingClientRect().y),
      width: this.puzzle.offsetWidth,
      height: this.puzzle.offsetHeight,
    };
    this.puzzle.classList.add(`grid-${this.level}`);
    this.puzzleItems = [];
    if (this.savedPuzzleItemsOrder) {
      for (let i = 0; i < this.level * this.level; i++) {
        let item = document.createElement('div');
        item.innerHTML = this.savedPuzzleItemsOrder[i];
        if (this.savedPuzzleItemsOrder[i] === 0)
          item.classList.add('zero-cell');
        item.classList.add('cell');
        this.puzzleItems.push(item);
      }
    } else {
      for (let i = 0; i < this.level * this.level; i++) {
        let item = document.createElement('div');
        item.innerHTML = i;
        if (i === 0) item.classList.add('zero-cell');
        item.classList.add('cell');
        this.puzzleItems.push(item);
      }
      this.puzzleItems = this.shuffle(this.puzzleItems);
    }
    this.savedPuzzleItemsOrder = null;
    this.puzzle.innerHTML = '';
    this.puzzleItems.forEach((cell) => this.puzzle.append(cell));
  }

  // set puzzle items behavior
  setPuzzleItemsBehavior() {
    this.puzzleItems.forEach((item) => {
      item.addEventListener('mousedown', (e) => {
        e.preventDefault();
        let _self = this;

        if (this.isMove || this.isStopped || this.draggedItem) {
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
      if (!this.draggedItem || !this.isMove) {
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
        this.playSound(moveSound);
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
          this.movesCount++;
          this.movesCountNode.innerHTML = this.movesCount;
          this.checkGameState();
        }, 100);
      } else {
        this.draggedItem.style.top = '0';
        this.draggedItem.style.left = '0';
        this.timerMoveBack = setTimeout(() => {
          this.draggedItem.classList.remove('slow');
          this.draggedItem.style.zIndex = '0';
          this.draggedItem.style.position = 'static';
          this.draggedItem = null;
          this.isMove = false;
          this.playSound(moveSound);
          clearTimeout(this.timerMoveBack);
        }, 100);
      }
    };

    document.onmousemove = (e) => {
      this.mouseCurCoord = {
        x: e.clientX,
        y: e.clientY,
      };
    };
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

  //play sound
  playSound(audioFile) {
    if (this.hasSound) {
      let sound = new Audio(audioFile);
      sound.play();
    }
  }

  clearGameState() {
    this.time = {
      m: 0,
      s: 0,
    };
    this.movesCount = 0;
    this.isHelped = false;
    this.puzzleItems = [];
    this.isWin = false;
    this.puzzle.innerHTML = '';
    if (this.timerId) clearInterval(this.timerId);
  }

  setSavedGameData() {
    this.level = this.savedGame.level;
    this.movesCount = this.savedGame.moves;
    this.time = this.savedGame.time;
    this.savedPuzzleItemsOrder = this.savedGame.puzzle;
  }

  checkGameState() {
    let curField = this.puzzleItems.map((e) => +e.innerHTML);

    curField = [].concat(
      curField.slice(curField.length - 1),
      curField.slice(0, curField.length - 1)
    );

    let winField = [].concat(curField).sort((a, b) => a - b);

    if (curField.join('') != winField.join('')) return;
    this.isWin = true;
    this.saveWinGame();
    clearInterval(this.timerId);
    this.saveButton.classList.add('disabled');
    this.helpButton.classList.add('disabled');
    this.showWinMessage();
  }

  // let's cheat
  helpMe() {
    this.isHelped = true;
    this.puzzleItems = this.puzzleItems.sort(
      (a, b) => +a.innerHTML - +b.innerHTML
    );
    let zero = this.puzzleItems[0];

    this.puzzleItems = this.puzzleItems.slice(1);
    this.puzzleItems.splice(this.puzzleItems.length - 1, 0, zero);
    this.puzzle.innerHTML = '';
    this.puzzleItems.forEach((e) => this.puzzle.append(e));
    this.movesCount++;
    this.movesCountNode.innerHTML = this.movesCount;
  }

  saveWinGame() {
    let storage = localStorage.getItem('results')
      ? JSON.parse(localStorage.getItem('results'))
      : { '3': [], '4': [], '5': [], '6': [], '7': [], '8': [] };

    let game = {
      date: Date.now(),
      help: this.isHelped,
      moves: this.movesCount,
      time: this.time,
    };
    if (!game.help) storage[this.level.toString()].unshift(game);
    else storage[this.level.toString()].push(game);

    // sort by using helpMe function, when equals - by moves, when  equals - by time, when equals - by date
    storage[this.level.toString()].sort((a, b) => {
      if (!a.help && b.help) return -1;
      else if (a.help && !b.help) return 1;
      else {
        if (a.moves > b.moves) return 1;
        else if (a.moves < b.moves) return -1;
        else {
          let t1 = a.time.m * 60 + a.time.s;
          let t2 = b.time.m * 60 + b.time.s;
          if (t1 > t2) return 1;
          else if (t1 < t2) return -1;
          else {
            return b.date - a.date;
          }
        }
      }
    });

    // last 10 best result
    if (storage[this.level.toString()].length > 10) {
      storage[this.level.toString()] = storage[this.level.toString()].slice(
        0,
        10
      );
    }

    localStorage.setItem('results', JSON.stringify(storage));
  }

  showWinMessage() {
    this.puzzle.innerHTML = `
    <div class="win-modal">
      <h3>
        <p>Hooray!</p>
        
      </h3>
      <p>
          You solved the puzzle in ${
            this.time.m < 10 ? '0' + this.time.m : this.time.m
          }:${this.time.s < 10 ? '0' + this.time.s : this.time.s} and ${
      this.movesCount
    } moves!</p>
      <p>${this.isHelped ? 'Unfortunately, You cheated!!!' : ''}</p>
    </div>
    `;
  }
}

let game = new PuzzleGame();
game.init();

window.onunload = () => {
  if (!game.isWin && game.movesCount > 0) game.saveGame();
};
