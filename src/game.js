const Ship = require('./ship');
const GameBoard = require('./gameboard');
const Player = require('./player');
const playerField = document.querySelector('#player-field');
const aiField = document.querySelector('#ai-field');
const playerShips = document.querySelector('div#ships-frame');
const tempDiv = document.querySelector('div#temp-div');
let tempShip;
let size;
let isDown = false;
let isVert = false;

// create two different functions for two states: preparing for the game and game itself

function startGame() {
    const newBoard = GameBoard();
    const playerBoard = GameBoard();
    const player1 = Player(newBoard);

    newBoard.createAiShips();
    /*
    newBoard.createShip([0,1,2,3]);    // create automatic ship rendering
    newBoard.createShip([25,35]);
    newBoard.createShip([86]);
    newBoard.createShip([23,33,43]);

    playerBoard.createShip([15,25,35,45]);
    playerBoard.createShip([67]);
    playerBoard.createShip([8,9]);
    playerBoard.createShip([95,96,97]);
    */

    renderPlayerField(playerBoard, playerField);
    renderAIField(newBoard, player1, playerBoard, aiField); 

    playerShips.addEventListener('mousedown', (e) => {
        isDown = true;
        tempShip = document.querySelector(`#shadow-${e.target.parentNode.id}`);
        tempShip.classList.add('temp-ship');
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
        if (id % 10 > 6 && (id + size - 1) % 10 < 3 && size > 1) return;  // should be in gameboard.js 
        for (let i = 0; i < size; i++) {
            if (isVert) {
                position.push(id+i*10)
            } else {
                position.push(id+i); 
            }
        }
        position.forEach(pos => {
            if (playerBoard.gameBoard[pos] === 'S' || playerBoard.gameBoard[pos] === 'U') notAllowed = true;
        });
        if (notAllowed) return;
        playerBoard.createShip(position);  
        changePlayerRender(playerBoard);  
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

    // add to field big ships
    // allow only determined number of ships to create
    
    document.body.addEventListener('mouseleave', () => {
        if (!isDown) return;
        isDown = false;
        tempShip.classList.remove('temp-ship');
    });
    
    document.body.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        tempShip.style.transform = `translate(${e.pageX}px, ${e.pageY-480}px)`;  // Y coodinate is wrong
    });
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

function renderAIField(gameBoard, player, playerBoard, parent) {
    gameBoard.gameBoard.forEach((cell, index) => {   // abstract forEach
        let renderCell = document.createElement('div');
        renderCell.id = index;
        if (cell === 'S') {
            renderCell.className = 'ship';
        } else if (cell === 'E') {
            renderCell.className = 'empty'
        }
        renderCell.addEventListener('click', (e) => attack(e, renderCell, gameBoard, player, playerBoard, parent));
        parent.appendChild(renderCell);
    });
}

// change two functions below
function attack(event, renderCell, gameBoard, player, playerBoard, parent) {
    player.playerAttack(parseInt(event.target.id));
    checkAndChange(gameBoard, aiField);   // target id as argument
    renderCell.removeEventListener('click', (e) => attack(e, renderCell, playerBoard, player, gameBoard, parent));
    if (gameBoard.shipsDestroyed()) {
        console.log('You win!');
    }
    playerBoard.turnAI();
    checkAndChange(playerBoard, playerField);   // use global for now
    if (playerBoard.shipsDestroyed()) {
        console.log('You lost!');
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

function changeCellRender(number, gameBoard, parent) {
    const cell = parent.querySelector(`#${number}`);
    const cellType = gameBoard[number];
    if (cellType === 'H') {
        cell.className = 'hit';
    } else if (cellType === 'M') {
        cell.className = 'miss';
    }
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

export { startGame };

// player can choose position of the ship
// automatically mark unavailable cells after hit
// automatically and randomly put ships on the field for AI
// stop game after win/lose