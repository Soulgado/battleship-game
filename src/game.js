const GameBoard = require("./gameboard");
const Player = require("./player");
const playerField = document.querySelector("#player-field");
const aiField = document.querySelector("#ai-field");
const playerShips = document.querySelector("div#ships-frame");
const startButton = document.querySelector("button#start-game");
const autoPlaceButton = document.querySelector("button#auto-place");
const resetFieldButton = document.querySelector("button#reset-field");
const restartButton = document.querySelector("button#restart-button");
let tempShip;
let size;
let offset;
let isDown = false;
let isVert = false;
let hasFinished = false;
let prepStage = true;

function startGame() {
  const newBoard = GameBoard();
  const playerBoard = GameBoard();
  const player1 = Player(newBoard);

  newBoard.createAiShips();

  renderPlayerField(playerBoard, playerField);
  renderAIField(newBoard, aiField);

  playerPrep(playerBoard);
  autoPlaceButton.addEventListener("click", () => {
    if (!prepStage) return;
    playerBoard.resetBoard();
    playerBoard.createAiShips();
    changePlayerRender(playerBoard);
  });

  resetFieldButton.addEventListener("click", () => {
    if (!prepStage) return;
    playerBoard.resetBoard();
    changePlayerRender(playerBoard);
  });

  restartButton.addEventListener("click", () => {
    prepStage = true;
    hasFinished = false;
    startButton.textContent = "Start Game!";
    playerBoard.resetBoard();
    newBoard.resetBoard();
    newBoard.createAiShips();
    changePlayerRender(playerBoard); // re-render fields
    while (aiField.firstChild) {
      aiField.removeChild(aiField.firstChild);
    }
    renderAIField(newBoard, aiField);
  });

  startButton.addEventListener("click", () =>
    startSession(playerBoard, aiField, newBoard, player1)
  );
}

function startSession(playerBoard, aiField, newBoard, player) {
  if (playerBoard.currShips.length < 10) return;
  prepStage = false;
  playerBoard.gameBoard.forEach((cell, index) => {
    if (cell !== "S") {
      playerBoard.gameBoard[index] = "E";
    }
  });
  startButton.textContent = "Playing";
  changePlayerRender(playerBoard);
  beginGame(aiField, newBoard, player, playerBoard);
}

function playerPrep(playerboard) {
  playerShips.addEventListener("mousedown", (e) => {
    if (!prepStage) return;
    e.preventDefault();
		isDown = true;
		// create new element for drag-and-drop ship
    tempShip = document.querySelector(`#shadow-${e.target.parentNode.id}`);
    tempShip.classList.add("temp-ship");
    if (isVert) {
      tempShip.style.flexDirection = "column";
      let divHeight = tempShip.offsetHeight / tempShip.dataset.size;
      offset = tempShip.offsetTop - divHeight / 2;
    } else {
      tempShip.style.flexDirection = "row";
      offset = tempShip.offsetTop - tempShip.offsetHeight / 2;
    }
    tempShip.style.transform = `translate(${e.pageX}px, ${e.pageY - offset}px)`; // change coordinates
    size = parseInt(e.target.parentNode.dataset.size);
  });

  document.body.addEventListener("mouseup", (e) => {
    if (!isDown) return;
    isDown = false;
    tempShip.classList.remove("temp-ship");
  });

  playerField.addEventListener("mouseup", (e) => {
    if (!isDown) return;
    let notAllowed = false;
    const id = parseInt(e.target.id);
    let position = [];
    // if size of ship is bigger than field - don't create
    if (!isVert && id % 10 > 6 && (id + size - 1) % 10 < 3 && size > 1) return; 
    if (isVert && id >= 70 && id + size * 10 - 10 > 99 && size > 1) return; 
    for (let i = 0; i < size; i++) {
      if (isVert) {
        position.push(id + i * 10);
      } else {
        position.push(id + i);
      }
    }
    position.forEach((pos) => {
      if (
        playerboard.gameBoard[pos] === "S" ||
        playerboard.gameBoard[pos] === "U"
      )
        notAllowed = true;
    });
    if (notAllowed) return;
    playerboard.createShip(position);
    changePlayerRender(playerboard);
  });

  document.body.addEventListener("keypress", (e) => {
    // change orientation of the ship on 'space'
    if (!isDown) return;
    if (e.keyCode === 32) {
      if (isVert) {
        tempShip.style.flexDirection = "row";
      } else {
        tempShip.style.flexDirection = "column";
      }
      isVert = !isVert;
    }
  });

  document.body.addEventListener("mouseleave", () => {
    if (!isDown) return;
    isDown = false;
    tempShip.classList.remove("temp-ship");
  });

  document.body.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    tempShip.style.transform = `translate(${e.pageX}px, ${e.pageY - offset}px)`;
  });
}

function renderAIField(gameBoard, parent) {
  gameBoard.gameBoard.forEach((cell, index) => {
    let renderCell = document.createElement("div");
    renderCell.id = index;
    renderCell.className = "empty";
    parent.appendChild(renderCell);
  });
}

function beginGame(parent, gameBoard, player, playerBoard) {
  let nodeList = Array.from(parent.children);
  nodeList.forEach((node) => {
    node.addEventListener("click", (e) => {
      attack(e, gameBoard, player, playerBoard);
    });
  });
}

function attack(event, gameBoard, player, playerBoard) {
	// on player attack event
  const attackedCell = parseInt(event.target.id);
  if (
    gameBoard.gameBoard[attackedCell] === "M" ||
    gameBoard.gameBoard[attackedCell] === "H" ||
    hasFinished
  )
    return;
  player.playerAttack(attackedCell);
  checkAndChange(gameBoard, aiField); 
  if (gameBoard.shipsDestroyed()) {
    hasFinished = true; 
    startButton.textContent = "You win!";
    return;
  }
  playerBoard.turnAI();
  checkAndChange(playerBoard, playerField);
  if (playerBoard.shipsDestroyed()) {
    hasFinished = true;
    startButton.textContent = "You lost!";
    return;
  }
}

function renderPlayerField(gameBoard, parent) {
  gameBoard.gameBoard.forEach((cell, index) => {
    let renderCell = document.createElement("div");
    renderCell.id = index;
    if (cell === "S") {
      renderCell.className = "ship";
    } else if (cell === "E") {
      renderCell.className = "empty";
    }
    parent.appendChild(renderCell);
  });
}

function changePlayerRender(gameBoard) {
  let cellType;
  let nodeList = Array.from(playerField.children);
  nodeList.forEach((cell) => {
    cellType = gameBoard.gameBoard[parseInt(cell.id)];
    if (cellType === "S") {
      cell.className = "ship";
    } else if (cellType === "E") {
      cell.className = "empty";
    } else if (cellType === "U") {
      cell.className = "unavailable";
    }
  });
}

function checkAndChange(gameBoard, parent) {
	// change cell render depending on the state 
  const cells = parent.querySelectorAll("div");
  let cellType;
  cells.forEach((cell) => {
    cellType = gameBoard.gameBoard[parseInt(cell.id)];
    if (cellType === "H") {
      cell.className = "hit";
    } else if (cellType === "M") {
      cell.className = "miss";
    }
  });
}

export { startGame };
