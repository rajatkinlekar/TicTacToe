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
}

class UIManager {
  constructor(canvas, moves) {
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

    // append the paragraph element inside the container cell only if it doesnt contain existing value
    //console.log("innerhtml = " + cellContainerElement.innerHTML);
    if (cellContainerElement.innerHTML.trim().length === 0) {
      //console.log("hello");
      cellContainerElement.append(p);
    }
  }

  renderActivePlayer(playerA, playerB, active) {
    let activeClass = "bg-gradient-to-b from-yellow-400 to-orange-400";
    //let nonActiveClass = "bg-gradient-to-b from-gray-900 to-slate-600";

    if (active) {
      activeClass.split(" ").forEach((cls) => {
        playerA.classList.toggle(cls);
      });

      activeClass.split(" ").forEach((cls) => {
        playerB.classList.toggle(cls);
      });
    }
  }

  renderWinnerRowAnimation(cellContainer, flag) {
    let parentElement = cellContainer.parentElement;

    if (flag) {
      cellContainer.classList.add("transform");
      cellContainer.classList.add("scale-110");
      parentElement.classList.add("border-5");
      parentElement.classList.add("border-yellow-500");
      parentElement.classList.add("p-5");
      parentElement.classList.add("rounded-2xl");
    } else {
      cellContainer.classList.remove("transform");
      cellContainer.classList.remove("scale-110");
      parentElement.classList.remove("border-5");
      parentElement.classList.remove("border-yellow-500");
      parentElement.classList.remove("p-5");
      parentElement.classList.remove("rounded-2xl");
    }
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

  renderWinnerRow(row) {
    this.cellContainerArray.forEach((cellContainer) => {
      Object.entries(cellContainer).forEach(([key, element]) => {
        if (parseInt(element.parentElement.id) === row) {
          this.renderWinnerRowAnimation(element, true);
        }

        setTimeout(() => {
          this.renderWinnerRowAnimation(element, false);
          this.blurScreen(true);
          

          modalWindow.classList.remove("hidden");
          globalStatePause = false;
        }, 590);
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
let globalStatePause = false;

let moves = 0;

let canvas = new Canvas();
let uIManager = new UIManager(canvas, moves);
let gameManager = new GameManager();

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

      let active = canvas.updateCellArray(canvasCell);
      canvas.updateCellElementContainerArray(canvasCell, cell);

      uIManager.renderClickAnimation(cell);
      uIManager.renderCell(canvasCell, cell);
      uIManager.renderActivePlayer(playerA, playerB, active);

      let winnerXObj = gameManager.getWinner(canvas.getCellArray(), "X");
      let winnerOObj = gameManager.getWinner(canvas.getCellArray(), "O");

      //console.log(winnerXObj)

      // check for X winner
      if (winnerXObj) {
        if ("row" in winnerXObj) {
          console.log("row number(X) : " + winnerXObj.row);
          uIManager.renderWinnerRow(winnerXObj.row);
          globalStatePause = true;
        }

        if ("col" in winnerXObj) {
          console.log("col number(X) : " + winnerXObj.col);
        }

        if ("leftDiagonal" in winnerXObj) {
          console.log("left diagonal");
        }

        if ("rightDiagonal" in winnerXObj) {
          console.log("right diagonal");
        }
      }

      // check for O winner
      if (winnerOObj) {
        if ("row" in winnerOObj) {
          console.log("row number(O) : " + winnerOObj.row);
          uIManager.renderWinnerRow(winnerOObj.row);
        }

        if ("col" in winnerOObj) {
          console.log("col number(O) : " + winnerOObj.col);
        }

        if ("leftDiagonal" in winnerOObj) {
          console.log("left diagonal");
        }

        if ("rightDiagonal" in winnerOObj) {
          console.log("right diagonal");
        }
      }

      if (!active) {
        moves--;
      }

      moves++;
    } else {
      window.alert("game over nigga!");
    }
  });
});
