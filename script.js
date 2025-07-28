//owner : rajat ulhas kinlekar

class Cell {
  constructor(row, column) {
    this.row = row;
    this.column = column;
  }

  getRow() {
    return this.row;
  }

  getColumn() {
    return this.column;
  }

  getOption() {
    return this.option;
  }

  setRow(row) {
    this.row = row;
  }

  setColumn(column) {
    this.column = column;
  }

  setOption(option) {
    this.option = option;
  }
}

class Canvas {
  constructor() {
    this.cellArray = [[], [], []];
    this.cellElementContainerArray = [[], [], []];
  }

  getCellArray() {
    return this.cellArray;
  }

  getCellElementContainerArray() {
    return this.cellElementContainerArray;
  }

  updateCellArray(cell) {
    if (cell) {
      // fetch cells row and column, also check if the row or column is out of bound > 2 or < 0
      // check if this index already has value in that case return false;
      // else update the array

      // 1) Fetch cell and row from the cell and parse it to integer
      let row = parseInt(cell.getRow());
      let column = parseInt(cell.getColumn());

      // 2) Row or column out of bound check
      if (row < 0 || row > 2 || column < 0 || column > 2) {
        console.log("trying to access incorrect canvas index");
        return false;
      }

      // 3) check if the cell being accessed already contains value
      if (this.cellArray[row][column]) {
        console.log(
          "trying to access the canvas index which is already filled"
        );
        return false;
      }

      // 4) if row/col index is in bound and the cell is empty, update the cell array and return true
      this.cellArray[row][column] = cell;
      return true;
    }
  }

  updateCellElementContainerArray(cell, cellContainer) {
    if (cell) {
      // fetch cells row and column, also check if the row or column is out of bound > 2 or < 0
      // check if this index already has value in that case return false;
      // else update the array

      // 1) Fetch cell and row from the cell and parse it to integer
      let row = parseInt(cell.getRow());
      let column = parseInt(cell.getColumn());

      // 2) Row or column out of bound check
      if (row < 0 || row > 2 || column < 0 || column > 2) {
        console.log("trying to access incorrect canvas index");
        return false;
      }

      // 3) check if the cell being accessed already contains value
      if (this.cellElementContainerArray[row][column]) {
        console.log(
          "trying to access the canvas index which is already filled"
        );
        return false;
      }

      // 4) if row/col index is in bound and the cell is empty, update the cell array and return true
      this.cellElementContainerArray[row][column] = cellContainer;
      return true;
    }
  }

  resetArrays() {
    this.cellArray = [[], [], []];
    //this.cellElementContainerArray = [[], [], []];
  }
}

class UIManager {
  constructor(canvas, moves) {
    this.cellArray = canvas.getCellArray();
    this.cellContainerArray = canvas.getCellElementContainerArray();
    this.moves = moves;

    let activeClass = "bg-gradient-to-b from-yellow-400 to-orange-400";

    activeClass.split(" ").forEach((cls) => {
      playerA.classList.toggle(cls);
    });
  }

  renderClickAnimation(cellContainerElement) {
    cellContainerElement.style.transform = "scale(0.8)";
    setTimeout(() => {
      cellContainerElement.style.transform = "scale(1)";
    }, 100);
  }

  renderCell(cell) {
    // create the paragraph element
    const p = document.createElement("p");

    // fetch the option of the cell
    let option = cell.getOption();

    // cehck if the option is X or O and accordinly apply the style class
    if (option && option === "X") {
      p.setAttribute(
        "class",
        "text-[#66ff00] font-bold p-5 rounded-full sm:text-stroke text-stroke2 sm:text-8xl text-4xl"
      );
    } else if (option && option === "O") {
      p.setAttribute(
        "class",
        "text-[#20A7DB] font-bold p-5 rounded-full sm:text-stroke text-stroke2 sm:text-8xl text-4xl"
      );
    }

    // set the inner text of the paragraph element with the value of the option
    p.innerText = option;

    // get row and column from the cell
    let row = parseInt(cell.getRow());
    let column = parseInt(cell.getColumn());

    // get the cell container element using row and cell
    let cellContainerElement = this.cellContainerArray[row][column];

    console.log(cellContainerElement);

    // append the paragraph element inside the container cell only if it doesnt contain existing value
    //console.log("innerhtml = " + cellContainerElement.innerHTML);
    if (cellContainerElement.innerHTML.trim().length === 0) {
      //console.log("hello");
      cellContainerElement.append(p);
    }
  }

  renderActivePlayer(playerA, playerB, active) {
    let activeClass = "bg-gradient-to-b from-yellow-400 to-orange-400";

    if (active) {
      activeClass.split(" ").forEach((cls) => {
        playerA.classList.toggle(cls);
      });

      activeClass.split(" ").forEach((cls) => {
        playerB.classList.toggle(cls);
      });
    }
  }

  renderWinnerAnimation(cellContainer, flag) {
    //let parentElement = cellContainer.parentElement;

    console.log(flag);

    if (flag) {
      console.log("column render");
      cellContainer.classList.remove("border-white");
      cellContainer.classList.remove("border-2");
      cellContainer.classList.add("border-7");
      cellContainer.classList.add("border-green-600");
    } else {
      cellContainer.classList.add("border-white");
      cellContainer.classList.add("border-2");
      cellContainer.classList.remove("border-7");
      cellContainer.classList.remove("border-green-600");
    }
  }

  renderModalWindow(flag, modalWindowInput) {
    // this.blurScreen(flag);

    console.log(modalWindowInput);

    let timeout = flag ? 1000 : 0;

    if (flag) {
      setTimeout(() => {
        this.blurScreen(flag);
        modalWindowInput.classList.remove("hidden");
      }, timeout);
    } else {
      setTimeout(() => {
        this.blurScreen(flag);
        modalWindowInput.classList.add("hidden");
      }, timeout);
    }
    globalStatePause = false;
  }

  blurScreen(flag) {
    if (flag) {
      containerBox.classList.add("blur-2xl");
      playerBox.classList.add("blur-2xl");
    } else {
      containerBox.classList.remove("blur-2xl");
      playerBox.classList.remove("blur-2xl");
    }
  }

  renderWinnerRow(rowInput, flag, modalWindowInput) {
    console.log(rowInput, flag, modalWindowInput);
    //console.log("hello world")
    for (let row = 0; row < 3; row++) {
      console.log(row === rowInput);
      if (row === rowInput) {
        for (let col = 0; col < 3; col++) {
          console.log(this.cellContainerArray[row][col]);
          this.renderWinnerAnimation(this.cellContainerArray[row][col], flag);
          this.renderModalWindow(flag, modalWindowInput);
          //this.renderWinnerAnimation(this.cellContainerArray[row][col], false);
        }
      }
      // break;
    }
  }

  renderWinnerColumn(colInput, flag, modalWindowInput) {
    //canvasBox.classList.add("blur-2xl");
    for (let col = 0; col < 3; col++) {
      let row = 0;
      if (col === colInput) {
        while (row < 3) {
          this.renderWinnerAnimation(this.cellContainerArray[row][col], flag);
          this.renderModalWindow(flag, modalWindowInput);
          //this.renderWinnerAnimation(this.cellContainerArray[row][col], false);
          row++;
        }
        //break;
      }
    }
  }

  renderWinnerLeftDiagonal(flag, modalWindowInput) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (row === col) {
          this.renderWinnerAnimation(this.cellContainerArray[row][col], flag);
          this.renderModalWindow(flag, modalWindowInput);
        }
      }
    }
  }

  renderWinnerRightDiagonal(flag, modalWindowInput) {
    let row = 0;
    let col = 2;

    while (row < 3 && col >= 0) {
      this.renderWinnerAnimation(this.cellContainerArray[row][col], flag);
      this.renderModalWindow(flag, modalWindowInput);

      row++;
      col--;
    }
  }

  drawGame(moves) {
    let xResult = gameManager.getWinner(canvas.getCellArray(), "X");
    let oResult = gameManager.getWinner(canvas.getCellArray(), "O");

    if (moves === 9 && !xResult && !oResult) {
      globalStatePause = true;
      canvasBox.classList.remove("sm:border-2");
      canvasBox.classList.add("sm:border-5");
      canvasBox.classList.add("border-green-500");
      setTimeout(() => {
        this.blurScreen(true);
        modalWindowDraw.classList.remove("hidden");
      }, 1000);
    }

    return true;
  }

  clearCellContainers() {
    this.cellContainerArray.forEach((containerArray) => {
      containerArray.forEach((container) => {
        if (container && container.hasChildNodes()) {
          container.removeChild(container.firstChild);
        }
      });
    });
  }
}

class GameManager {
  // getWinner()

  getWinner(cellArray, option) {
    // check rows
    let row = this.checkRows(cellArray, option);

    // check columns
    let col = this.checkColumns(cellArray, option);

    // check left diagonal
    let leftDiagonal = this.checkLDiagonal(cellArray, option);

    // check right diagonal
    let rightDiagonal = this.checkRDiagonal(cellArray, option);

    if (row !== -1) {
      return { row };
    }

    if (col !== -1) {
      return { col };
    }

    if (leftDiagonal !== -1) {
      return { leftDiagonal };
    }

    if (rightDiagonal !== -1) {
      return { rightDiagonal };
    }
  }

  // rows
  checkRows(cellArray, option) {
    let row;
    for (let i = 0; i < 3; i++) {
      row = i;
      let flag = true;

      for (let j = 0; j < 3; j++) {
        if (!cellArray[i][j] || cellArray[i][j].getOption() !== option) {
          row = -1;
          flag = false;
          break;
        }
      }

      if (flag) {
        return row;
      }
    }

    return row;
  }

  // columns
  checkColumns(cellArray, option) {
    for (let col = 0; col < cellArray.length; col++) {
      let flag = true;

      for (let row = 0; row < cellArray.length; row++) {
        if (
          cellArray[row][col] === undefined ||
          cellArray[row][col].getOption() !== option
        ) {
          flag = false;
          break;
        }
      }

      if (flag) {
        return col;
      }
    }

    return -1;
  }

  // left diagonal
  checkLDiagonal(cellArray, option) {
    for (let i = 0; i < 3; i++) {
      if (!cellArray[i][i] || cellArray[i][i].getOption() !== option) {
        return -1;
      }
    }

    return 0;
  }

  // right diagonal
  checkRDiagonal(cellArray, option) {
    let row = 0;
    let col = cellArray.length - 1;

    while (row < cellArray.length && col < cellArray.length) {
      if (!cellArray[row][col] || cellArray[row][col].getOption() !== option) {
        return -1;
      }

      row++;
      col--;
    }

    return 0;
  }
}

const cells = document.querySelectorAll(".cell");
const playerA = document.getElementById("playerA");
const playerB = document.getElementById("playerB");
const modalWindow = document.getElementById("modalWindow");
const containerBox = document.querySelector(".containerBox");
const playerBox = document.getElementById("playerBox");
const canvasBox = document.getElementById("canvas");
const playAgainBtn = document.getElementById("playAgainBtn");
const modalWindowDraw = document.getElementById("drawModalWindow");
const playAgainDrawBtn = document.getElementById("playAgainBtn2");

let globalStatePause = false;

let moves = 0;

let canvas = new Canvas();
let uIManager = new UIManager(canvas, moves);
let gameManager = new GameManager();

let winnerXObj = {};
let winnerOObj = {};

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    if (globalStatePause) {
      return;
    }

    if (moves < 9) {
      let canvasCell = new Cell(cell.parentElement.id, cell.id);
      if (moves % 2 === 0) {
        canvasCell.setOption("X");
      } else {
        canvasCell.setOption("O");
      }

      //console.log(canvasCell);
      //console.log(canvasCell.constructor.name)
      let active = canvas.updateCellArray(canvasCell);
      canvas.updateCellElementContainerArray(canvasCell, cell);

      uIManager.renderClickAnimation(cell);

      console.log(canvasCell, cell, "r=bruh");
      uIManager.renderCell(canvasCell);
      uIManager.renderActivePlayer(playerA, playerB, active);

      winnerXObj = gameManager.getWinner(canvas.getCellArray(), "X");
      winnerOObj = gameManager.getWinner(canvas.getCellArray(), "O");

      //console.log(winnerXObj)

      // check for X winner
      if (winnerXObj) {
        if ("row" in winnerXObj) {
          console.log("row number(X) : " + winnerXObj.row);
          uIManager.renderWinnerRow(winnerXObj.row, true, modalWindow);
          //globalStatePause = true;
        }

        if ("col" in winnerXObj) {
          uIManager.renderWinnerColumn(winnerXObj.col, true, modalWindow);
          console.log("col number(X) : " + winnerXObj.col, true, modalWindow);
        }

        if ("leftDiagonal" in winnerXObj) {
          uIManager.renderWinnerLeftDiagonal(true, modalWindow);
          console.log("left diagonal");
        }

        if ("rightDiagonal" in winnerXObj) {
          console.log("right diagonal");
          uIManager.renderWinnerRightDiagonal(true, modalWindow);
        }
        globalStatePause = true;
      }

      // check for O winner
      if (winnerOObj) {
        if ("row" in winnerOObj) {
          console.log("row number(O) : " + winnerOObj.row);
          uIManager.renderWinnerRow(winnerOObj.row, true, modalWindow);
        }

        if ("col" in winnerOObj) {
          uIManager.renderWinnerColumn(winnerOObj.col, true, modalWindow);
          console.log("col number(O) : " + winnerOObj.col);
        }

        if ("leftDiagonal" in winnerOObj) {
          uIManager.renderWinnerLeftDiagonal(true, modalWindow);
          console.log("left diagonal");
        }

        if ("rightDiagonal" in winnerOObj) {
          console.log("right diagonal");
          uIManager.renderWinnerRightDiagonal(true, modalWindow);
        }
        globalStatePause = true;
      }

      if (!active) {
        moves--;
      }

      moves++;

      console.log(moves);
      console.log(uIManager.drawGame(moves));
    } else if (moves === 9) {
      window.alert("game over nigga!");
      console.log(gameManager.getWinner(canvas.getCellArray(), "X"));
    }
  });
});

playAgainBtn.addEventListener("click", () => {
  closeModalWindow(modalWindow, false);
});

playAgainDrawBtn.addEventListener("click", () => {
  console.log("close draw");
  closeModalWindow(modalWindowDraw, true);
});

//<div class="tenor-gif-embed" data-postid="7313575077068622147" data-share-method="host" data-aspect-ratio="1" data-width="100%"><a href="https://tenor.com/view/spongebob-spongebob-confetti-confetti-cortico-confetti-spongebob-spongebob-smile-gif-7313575077068622147">Spongebob Spongebob Confetti Sticker</a>from <a href="https://tenor.com/search/spongebob-stickers">Spongebob Stickers</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>

function closeModalWindow(modalWindowInput, flag) {
  if (flag) {
    canvasBox.classList.add("sm:border-2");
    canvasBox.classList.remove("sm:border-5");
    canvasBox.classList.remove("border-green-500");
    uIManager.blurScreen(false);
    modalWindowInput.classList.add("hidden");
  }

  if (winnerXObj) {
    if ("row" in winnerXObj) {
      console.log("row number(X) : " + winnerXObj.row);
      uIManager.renderWinnerRow(winnerXObj.row, false, modalWindowInput);
      //globalStatePause = true;
    }

    if ("col" in winnerXObj) {
      uIManager.renderWinnerColumn(winnerXObj.col, false, modalWindowInput);
      console.log("col number(X) : " + winnerXObj.col, false, modalWindowInput);
    }

    if ("leftDiagonal" in winnerXObj) {
      uIManager.renderWinnerLeftDiagonal(false, modalWindowInput);
      console.log("left diagonal");
    }

    if ("rightDiagonal" in winnerXObj) {
      console.log("right diagonal");
      uIManager.renderWinnerRightDiagonal(false, modalWindowInput);
    }
  }

  // check for O winner
  if (winnerOObj) {
    if ("row" in winnerOObj) {
      console.log("row number(O) : " + winnerOObj.row);
      uIManager.renderWinnerRow(winnerOObj.row, false, modalWindowInput);
    }

    if ("col" in winnerOObj) {
      console.log("column");
      uIManager.renderWinnerColumn(winnerOObj.col, false, modalWindowInput);
      console.log("col number(O) : " + winnerOObj.col);
    }

    if ("leftDiagonal" in winnerOObj) {
      uIManager.renderWinnerLeftDiagonal(false, modalWindowInput);
      console.log("left diagonal");
    }

    if ("rightDiagonal" in winnerOObj) {
      console.log("right diagonal");
      uIManager.renderWinnerRightDiagonal(false, modalWindowInput);
    }
    globalStatePause = true;
  }

  canvas.resetArrays();

  uIManager.clearCellContainers();

  uIManager.renderActivePlayer(playerA, playerB, (moves % 2 !== 0))

  moves = 0;

  winnerXObj = {};
  winnerOObj = {};

  globalStatePause = false;
}
