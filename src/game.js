const Ship = require('./ship');
const GameBoard = require('./gameboard');
const Player = require('./player');
const playerField = document.querySelector('#player-field');
const aiField = document.querySelector('#ai-field');
const playerShips = document.querySelector('div#ships-frame');
const startButton = document.querySelector('button#start-game');
const autoPlaceButton = document.querySelector('button#auto-place');
let tempShip;
let size;
let isDown = false;
let isVert = false;
let hasFinished = false;
let prepStage = true;

// create two different functions for two states: preparing for the game and game itself

function startGame() {
    const newBoard = GameBoard();
    const playerBoard = GameBoard();
    const player1 = Player(newBoard);

    newBoard.createAiShips();

    renderPlayerField(playerBoard, playerField);
    renderAIField(newBoard, aiField); 

    playerPrep(playerBoard);
    autoPlaceButton.addEventListener('click', () => {
        if (!prepStage) return;
        playerBoard.gameBoard.forEach((cell, index) => {
            playerBoard.gameBoard[index] = 'E';
        });
        
        playerBoard.createAiShips();
        changePlayerRender(playerBoard);
    });

    startButton.addEventListener('click', () => startSession(playerBoard, aiField, 
        newBoard, player1));  
}

function startSession(playerBoard, aiField, newBoard, player) {
    if (playerBoard.currShips.length < 10) return;
    prepStage = false;
    playerBoard.gameBoard.forEach((cell, index) => {
        if (cell !== 'S') {
            playerBoard.gameBoard[index] = 'E';
        }
    });
    startButton.textContent = 'Playing';
    changePlayerRender(playerBoard);
    beginGame(aiField, newBoard, player, playerBoard);
}

function playerPrep(playerboard) {
    playerShips.addEventListener('mousedown', (e) => {
        if (!prepStage) return;
        e.preventDefault();
        isDown = true;
        tempShip = document.querySelector(`#shadow-${e.target.parentNode.id}`);
        tempShip.classList.add('temp-ship');
        if (isVert) {
            tempShip.style.flexDirection = 'column';
        } else {
            tempShip.style.flexDirection = 'row';
        }
        tempShip.style.transform = `translate(${e.pageX}px, ${e.pageY-550}px)`;  // change coordinates
        size = parseInt(e.target.parentNode.dataset.size);
    });
    
    document.body.addEventListener('mouseup', (e) => {
        if (!isDown) return;
        isDown = false;
        tempShip.classList.remove('temp-ship');
    });

    playerField.addEventListener('mouseup', (e) => {
        if (!isDown) return;
        let notAllowed = false;
        const id = parseInt(e.target.id);
        let position = [];
        if (!isVert && id % 10 > 6 && (id + size - 1) % 10 < 3 && size > 1) return;  // should be in gameboard.js 
        if (isVert && id >= 70 && (id+size*10-10) > 99 && size > 1) return;  // change
        for (let i = 0; i < size; i++) {
            if (isVert) {
                position.push(id+i*10)
            } else {
                position.push(id+i); 
            }
        }
        position.forEach(pos => {
            if (playerboard.gameBoard[pos] === 'S' || playerboard.gameBoard[pos] === 'U') notAllowed = true;
        });
        if (notAllowed) return;
        playerboard.createShip(position);  
        changePlayerRender(playerboard);  
    });

    document.body.addEventListener('keypress', (e) => {
        if (!isDown) return;
        if (e.keyCode === 32) {
            if (isVert) {
                tempShip.style.flexDirection = 'row';
            } else {
                tempShip.style.flexDirection = 'column';
            }
            isVert = !isVert;
        }
    });
    
    document.body.addEventListener('mouseleave', () => {
        if (!isDown) return;
        isDown = false;
        tempShip.classList.remove('temp-ship');
    });
    
    document.body.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        tempShip.style.transform = `translate(${e.pageX}px, ${e.pageY-550}px)`;  // Y coodinate is wrong
    });

    // add hovering ???
    /*
    playerField.childNodes.forEach(node => {
        node.addEventListener('mouseenter', (e) => {
            if (!isDown) return;
            e.preventDefault();
            console.log(e.target);
            const id = e.target.id;
            if (playerBoard.gameBoard[id] !== 'S') {
                e.target.classList.add('hovered');
            }
        });
        node.addEventListener('mouseout', (e) => {
            if (!isDown) return;
            const id = e.target.id;
            e.target.style.backgroundColor = 'aqua';
            if (playerBoard.gameBoard[id] !== 'S') {
                
            }
        });
    });
    */
}

function renderAIField(gameBoard, parent) {
    gameBoard.gameBoard.forEach((cell, index) => {   // abstract forEach
        let renderCell = document.createElement('div');
        renderCell.id = index;
        renderCell.className = 'empty';
        /* 
        development code, position of enemy ships is shown
        if (cell === 'S') {
            renderCell.className = 'ship';
        } else if (cell === 'E') {
            renderCell.className = 'empty'
        }
        */
        parent.appendChild(renderCell);
    });
}

function beginGame(parent, gameBoard, player, playerBoard) {
    let nodeList = Array.from(parent.children);
    nodeList.forEach(node => {
        node.addEventListener('click', (e) => {
            attack(e, gameBoard, player, playerBoard)
        });    
    });
}

// change two functions below
function attack(event, gameBoard, player, playerBoard) {
    const attackedCell = parseInt(event.target.id);
    if (gameBoard.gameBoard[attackedCell] === 'M' || gameBoard.gameBoard[attackedCell] === 'H' || hasFinished) return; // to gameboard logic
    player.playerAttack(attackedCell);
    checkAndChange(gameBoard, aiField);   // target id as argument
    if (gameBoard.shipsDestroyed()) {
        hasFinished = true;  // add logic to end the game
        startButton.textContent = 'You win!';  // display in another div element
        return;
    }
    let aiHit = playerBoard.turnAI();
    changeCellRender(playerField, aiHit, playerBoard)   // use global for now
    if (playerBoard.shipsDestroyed()) {
        hasFinished = true;
        startButton.textContent = 'You lost!';
        return;
    }
};

function renderPlayerField(gameBoard, parent) {
    gameBoard.gameBoard.forEach((cell, index) => {
        let renderCell = document.createElement('div');
        renderCell.id = index;
        if (cell === 'S') {
            renderCell.className = 'ship';
        } else if (cell === 'E') {
            renderCell.className = 'empty'
        }
        parent.appendChild(renderCell);
    });
}

function changePlayerRender(gameBoard) {
    let cellType;
    let nodeList = Array.from(playerField.children);
    nodeList.forEach((cell) => {
        cellType = gameBoard.gameBoard[parseInt(cell.id)];
        if (cellType === 'S') {
            cell.className = 'ship';
        } else if  (cellType === 'E') {
            cell.className = 'empty';
        } else if (cellType === 'U') {
            cell.className = 'unavailable';
        }
    });
}

function checkAndChange(gameBoard, parent) {
    const cells = parent.querySelectorAll('div');
    let cellType;
    cells.forEach((cell) => {
        cellType = gameBoard.gameBoard[parseInt(cell.id)];
        if (cellType === 'H') {
            cell.className = 'hit';
        } else if  (cellType === 'M') {
            cell.className = 'miss';
        }
    });
}

function changeCellRender(board, id, gameBoard) {
    const cell = board.getElementById(id);
    const cellType = gameBoard.gameBoard[id];
    if (cellType === 'H') {
        cell.className = 'hit';
    } else if (cellType === 'M') {
        cell.className = 'miss';
    }
}

export { startGame };

// don't change neighbouring cells after hit on player field
// stop game after win/lose
// disable buttons and drag and drop system after beginning of the game