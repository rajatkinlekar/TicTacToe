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
    console.log("innerhtml = " + cellContainerElement.innerHTML);
    if (cellContainerElement.innerHTML.trim().length === 0) {
      console.log("hello");
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

  renderWinnerRow() {
   
  }
}

const cells = document.querySelectorAll(".cell");
const playerA = document.getElementById("playerA");
const playerB = document.getElementById("playerB");

let moves = 0;

let canvas = new Canvas();
let uIManager = new UIManager(canvas, moves);

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
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
      uIManager.renderWinnerRow();


      if (!active) {
        console.log("hellow");
        moves--;
      }

      moves++;
    } else {
      window.alert("game over nigga!");
    }
  });
});
