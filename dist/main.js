/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: startGame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startGame\", function() { return startGame; });\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\r\nconst GameBoard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\r\nconst Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\r\nconst playerField = document.querySelector('#player-field');\r\nconst aiField = document.querySelector('#ai-field');\r\nconst playerShips = document.querySelector('div#ships-frame');\r\nconst tempDiv = document.querySelector('div#temp-div');\r\nlet tempShip;\r\nlet size;\r\nlet isDown = false;\r\nlet isVert = false;\r\n\r\n// create two different functions for two states: preparing for the game and game itself\r\n\r\nfunction startGame() {\r\n    const newBoard = GameBoard();\r\n    const playerBoard = GameBoard();\r\n    const player1 = Player(newBoard);\r\n\r\n    newBoard.createAiShips();\r\n    /*\r\n    newBoard.createShip([0,1,2,3]);    // create automatic ship rendering\r\n    newBoard.createShip([25,35]);\r\n    newBoard.createShip([86]);\r\n    newBoard.createShip([23,33,43]);\r\n\r\n    playerBoard.createShip([15,25,35,45]);\r\n    playerBoard.createShip([67]);\r\n    playerBoard.createShip([8,9]);\r\n    playerBoard.createShip([95,96,97]);\r\n    */\r\n\r\n    renderPlayerField(playerBoard, playerField);\r\n    renderAIField(newBoard, player1, playerBoard, aiField); \r\n\r\n    playerShips.addEventListener('mousedown', (e) => {\r\n        isDown = true;\r\n        tempShip = document.querySelector(`#shadow-${e.target.parentNode.id}`);\r\n        tempShip.classList.add('temp-ship');\r\n        size = parseInt(e.target.parentNode.dataset.size);\r\n    });\r\n    \r\n    document.body.addEventListener('mouseup', (e) => {\r\n        if (!isDown) return;\r\n        isDown = false;\r\n        tempShip.classList.remove('temp-ship');\r\n    });\r\n\r\n    playerField.addEventListener('mouseup', (e) => {\r\n        if (!isDown) return;\r\n        let notAllowed = false;\r\n        const id = parseInt(e.target.id);\r\n        let position = [];\r\n        if (id % 10 > 6 && (id + size - 1) % 10 < 3 && size > 1) return;  // should be in gameboard.js \r\n        for (let i = 0; i < size; i++) {\r\n            if (isVert) {\r\n                position.push(id+i*10)\r\n            } else {\r\n                position.push(id+i); \r\n            }\r\n        }\r\n        position.forEach(pos => {\r\n            if (playerBoard.gameBoard[pos] === 'S' || playerBoard.gameBoard[pos] === 'U') notAllowed = true;\r\n        });\r\n        if (notAllowed) return;\r\n        playerBoard.createShip(position);  \r\n        changePlayerRender(playerBoard);  \r\n    });\r\n\r\n    document.body.addEventListener('keypress', (e) => {\r\n        if (!isDown) return;\r\n        if (e.keyCode === 32) {\r\n            if (isVert) {\r\n                tempShip.style.flexDirection = 'row';\r\n            } else {\r\n                tempShip.style.flexDirection = 'column';\r\n            }\r\n            isVert = !isVert;\r\n        }\r\n    });\r\n\r\n    // add to field big ships\r\n    // allow only determined number of ships to create\r\n    \r\n    document.body.addEventListener('mouseleave', () => {\r\n        if (!isDown) return;\r\n        isDown = false;\r\n        tempShip.classList.remove('temp-ship');\r\n    });\r\n    \r\n    document.body.addEventListener('mousemove', (e) => {\r\n        if (!isDown) return;\r\n        tempShip.style.transform = `translate(${e.pageX}px, ${e.pageY-480}px)`;  // Y coodinate is wrong\r\n    });\r\n    /*\r\n    playerField.childNodes.forEach(node => {\r\n        node.addEventListener('mouseenter', (e) => {\r\n            if (!isDown) return;\r\n            e.preventDefault();\r\n            console.log(e.target);\r\n            const id = e.target.id;\r\n            if (playerBoard.gameBoard[id] !== 'S') {\r\n                e.target.classList.add('hovered');\r\n            }\r\n        });\r\n        node.addEventListener('mouseout', (e) => {\r\n            if (!isDown) return;\r\n            const id = e.target.id;\r\n            e.target.style.backgroundColor = 'aqua';\r\n            if (playerBoard.gameBoard[id] !== 'S') {\r\n                \r\n            }\r\n        });\r\n    });\r\n    */\r\n}\r\n\r\nfunction renderAIField(gameBoard, player, playerBoard, parent) {\r\n    gameBoard.gameBoard.forEach((cell, index) => {   // abstract forEach\r\n        let renderCell = document.createElement('div');\r\n        renderCell.id = index;\r\n        if (cell === 'S') {\r\n            renderCell.className = 'ship';\r\n        } else if (cell === 'E') {\r\n            renderCell.className = 'empty'\r\n        }\r\n        renderCell.addEventListener('click', (e) => attack(e, renderCell, gameBoard, player, playerBoard, parent));\r\n        parent.appendChild(renderCell);\r\n    });\r\n}\r\n\r\n// change two functions below\r\nfunction attack(event, renderCell, gameBoard, player, playerBoard, parent) {\r\n    player.playerAttack(parseInt(event.target.id));\r\n    checkAndChange(gameBoard, aiField);   // target id as argument\r\n    renderCell.removeEventListener('click', (e) => attack(e, renderCell, playerBoard, player, gameBoard, parent));\r\n    if (gameBoard.shipsDestroyed()) {\r\n        console.log('You win!');\r\n    }\r\n    playerBoard.turnAI();\r\n    checkAndChange(playerBoard, playerField);   // use global for now\r\n    if (playerBoard.shipsDestroyed()) {\r\n        console.log('You lost!');\r\n    }\r\n};\r\n\r\nfunction renderPlayerField(gameBoard, parent) {\r\n    gameBoard.gameBoard.forEach((cell, index) => {\r\n        let renderCell = document.createElement('div');\r\n        renderCell.id = index;\r\n        if (cell === 'S') {\r\n            renderCell.className = 'ship';\r\n        } else if (cell === 'E') {\r\n            renderCell.className = 'empty'\r\n        }\r\n        parent.appendChild(renderCell);\r\n    });\r\n}\r\n\r\nfunction changeCellRender(number, gameBoard, parent) {\r\n    const cell = parent.querySelector(`#${number}`);\r\n    const cellType = gameBoard[number];\r\n    if (cellType === 'H') {\r\n        cell.className = 'hit';\r\n    } else if (cellType === 'M') {\r\n        cell.className = 'miss';\r\n    }\r\n}\r\n\r\nfunction changePlayerRender(gameBoard) {\r\n    let cellType;\r\n    let nodeList = Array.from(playerField.children);\r\n    nodeList.forEach((cell) => {\r\n        cellType = gameBoard.gameBoard[parseInt(cell.id)];\r\n        if (cellType === 'S') {\r\n            cell.className = 'ship';\r\n        } else if  (cellType === 'E') {\r\n            cell.className = 'empty';\r\n        } else if (cellType === 'U') {\r\n            cell.className = 'unavailable';\r\n        }\r\n    });\r\n}\r\n\r\nfunction checkAndChange(gameBoard, parent) {\r\n    const cells = parent.querySelectorAll('div');\r\n    let cellType;\r\n    cells.forEach((cell) => {\r\n        cellType = gameBoard.gameBoard[parseInt(cell.id)];\r\n        if (cellType === 'H') {\r\n            cell.className = 'hit';\r\n        } else if  (cellType === 'M') {\r\n            cell.className = 'miss';\r\n        }\r\n    });\r\n}\r\n\r\n\r\n\r\n// player can choose position of the ship\r\n// automatically mark unavailable cells after hit\r\n// automatically and randomly put ships on the field for AI\r\n// stop game after win/lose\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// game board logic\r\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\r\n\r\nconst Gameboard = () => {\r\n    const _limits = [4, 3, 2, 1];\r\n    let _currentShips = [];\r\n    let gameBoard = new Array(100).fill('E');\r\n\r\n    function createShip(position) {\r\n        if (checkShipsNumber(position.length)) return;\r\n        const newShip = Ship(position.length, position);\r\n        position.forEach((pos) => {\r\n            gameBoard[pos] = 'S';\r\n        });\r\n        position.forEach(position => {     // change neighbours so they are unavailable \r\n            getNeighbours(position).forEach(pos => {\r\n                if (gameBoard[pos] !== 'S') {\r\n                    gameBoard[pos] = 'U';\r\n                }\r\n            });\r\n        });\r\n        _currentShips.push(newShip);   \r\n        return newShip;\r\n    };\r\n\r\n    function checkShipsNumber(shipLength) {\r\n        // not allow ship to create if already max number by type\r\n        let counter = 0;\r\n        _currentShips.forEach(ship => {\r\n            if (ship.length === shipLength) {\r\n                counter = counter + 1;\r\n            }\r\n        });\r\n        return counter === _limits[shipLength-1];\r\n    }\r\n\r\n    function createAiShips() {\r\n        // main method for auto creating AI ships\r\n        autoCreateShip(4);\r\n        autoCreateShip(3);\r\n        autoCreateShip(3);\r\n        autoCreateShip(2);\r\n        autoCreateShip(2);\r\n        autoCreateShip(2);\r\n        autoCreateShip(1);\r\n        autoCreateShip(1);\r\n        autoCreateShip(1);\r\n        autoCreateShip(1);\r\n        gameBoard.map((pos, index) => {\r\n            if (pos !== 'S') {\r\n                gameBoard[index] = 'E';\r\n            }\r\n        });\r\n    }\r\n\r\n    function autoCreateShip(length) {\r\n        // automatically create one ship on random positions\r\n        let shipPosition = [];\r\n        let availablePos = gameBoard.map((pos, index) => {\r\n            if (pos !== 'S' && pos !== 'U') {\r\n                return index;\r\n            } else return -1;\r\n        }).filter(pos => pos >= 0); // choose only available fields\r\n        let randomPos = Math.round(Math.random() * (availablePos.length - 1)); // choose random\r\n        shipPosition.push(availablePos[randomPos]);\r\n        gameBoard[availablePos[randomPos]] = 'S';\r\n        // set full set of positions\r\n        if (length > 1) {\r\n            getIndirectNeighbours(availablePos[randomPos]).forEach(pos => {\r\n                if (gameBoard[pos] !== 'S') {\r\n                    gameBoard[pos] = 'U';\r\n                }\r\n            });\r\n            shipPosition = _createLongShip(length, shipPosition);\r\n        }\r\n        shipPosition.forEach(position => {\r\n            getNeighbours(position).forEach(pos => {\r\n                if (gameBoard[pos] !== 'S') {\r\n                    gameBoard[pos] = 'U';\r\n                }\r\n            });\r\n        });   // check unavailable positions  \r\n        createShip(shipPosition);\r\n    }\r\n\r\n    function _createLongShip(length, shipPosition) {\r\n        let choosen;\r\n        for (let i=0; i < (length - 1); i++) {\r\n            let available = getDirectNeighbours(shipPosition[i]).filter(pos => gameBoard[pos] !== 'S' && gameBoard[pos] !== 'U');\r\n            if (available.length === 0) {\r\n                available = getDirectNeighbours(shipPosition[0]).filter(pos => gameBoard[pos] !== 'S' && gameBoard[pos] !== 'U');\r\n            } // even now available.length can be 0, what to do in that case\r\n            if (available.length === 1) choosen = available[0];\r\n            else {\r\n                let randomPos = Math.round(Math.random() * (available.length - 1));\r\n                choosen = available[randomPos];  \r\n            }\r\n            shipPosition.push(choosen);\r\n            gameBoard[choosen] = 'S'; \r\n            getIndirectNeighbours(choosen).forEach(pos => {\r\n                if (gameBoard[pos] !== 'S') {\r\n                    gameBoard[pos] = 'U';\r\n                }\r\n            });\r\n        }\r\n        return shipPosition;\r\n    }\r\n\r\n    function getNeighbours(position) {   \r\n        let all = [\r\n            position % 10 === 0 ? -1 : position-11,  // not to choose cells on the wrong side of the field\r\n            position-10,\r\n            position % 10 === 9 ? -1 : position-9,\r\n            position % 10 === 0 ? -1 : position-1,\r\n            position % 10 === 9 ? -1 : position+1,\r\n            position % 10 === 0 ? -1 : position+9,\r\n            position+10,\r\n            position % 10 === 9 ? -1 : position+11]\r\n            .filter(pos => pos >= 0 && pos < 100);\r\n        return all;\r\n    }\r\n\r\n    function getDirectNeighbours(position) {\r\n      let all = [\r\n        position-10,\r\n        position+10,\r\n        position % 10 === 0 ? -1 : position-1,\r\n        position % 10 === 9 ? -1 : position+1]\r\n        .filter(pos => pos >= 0 && pos < 100);\r\n      return all;\r\n    }\r\n\r\n    function getIndirectNeighbours(position) {\r\n      let all = [\r\n        position % 10 === 0 ? -1 : position-11,\r\n        position % 10 === 9 ? -1 : position-9,\r\n        position % 10 === 0 ? -1 : position+9,\r\n        position % 10 === 9 ? -1 : position+11]\r\n        .filter(pos => pos >= 0 && pos < 100);\r\n    return all;\r\n    }\r\n\r\n    function changeNeighboursAfterDestroy(position) {\r\n      // helper function to change all neighbours after destroy\r\n      getNeighbours(position).forEach((pos) => {\r\n        if (gameBoard[pos] !== 'H') {\r\n          gameBoard[pos] = 'M';\r\n          } \r\n        }); \r\n      }\r\n\r\n    function changeNeighboursAfterHit(position) {\r\n      getIndirectNeighbours(position).forEach((pos) => {\r\n        gameBoard[pos] = 'M';\r\n      });\r\n    }\r\n\r\n    function turnAI() {\r\n        let available = gameBoard.map((cell, index) => {  // map available positions\r\n            if (cell !== 'M' && cell !== 'H') {   \r\n                return index;\r\n            } else return -1;\r\n        }).filter(cell => cell > 0);\r\n        const randompos = Math.floor(Math.random() * available.length);\r\n        receiveAttack(available[randompos]);\r\n        return available[randompos];\r\n    }\r\n\r\n    function receiveAttack(position) {\r\n        if (gameBoard[position] === 'S') {\r\n            _currentShips.forEach(ship => {\r\n                ship.hit(position);\r\n                if (ship.sunk) { \r\n                    _currentShips.splice(_currentShips.indexOf(ship), 1);\r\n                    ship.position.forEach(pos => {\r\n                        changeNeighboursAfterDestroy(pos);\r\n                    });\r\n                }\r\n            });\r\n            gameBoard[position] = 'H'\r\n            changeNeighboursAfterHit(position); \r\n            return 'hit';\r\n        } else if (gameBoard[position] === 'E') {\r\n            gameBoard[position] = 'M';\r\n            return 'miss';\r\n        } else return;\r\n    }\r\n\r\n    function shipsDestroyed() {\r\n        return _currentShips.length === 0 ? true : false;\r\n    }\r\n\r\n    return {\r\n        createShip,\r\n        receiveAttack,\r\n        shipsDestroyed,\r\n        gameBoard,\r\n        turnAI,\r\n        createAiShips,\r\n        getNeighbours\r\n    }\r\n};\r\n\r\nconst Coord = (type, ship=false, id=0) => {\r\n    const _currShip = ship ? ship : null;\r\n    let _type = type;     // change coordinate system to two numbers row and col\r\n    let _id = id;\r\n\r\n    return {\r\n        get currShip() {\r\n            return _currShip;\r\n        },\r\n        get type() {\r\n            return _type;\r\n        },\r\n        set type(letter) {\r\n            _type = letter;\r\n        },\r\n        get id() {\r\n            return _id;\r\n        },\r\n        set id(number) {\r\n            _id = number;\r\n        }\r\n    }\r\n}\r\n// create helper class Coordinate for helping to deal with position?\r\n\r\nmodule.exports = Gameboard;\n\n//# sourceURL=webpack:///./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n// main project file\r\n\r\n\r\nconst startButton = document.querySelector('#start-game');\r\n\r\nObject(_game__WEBPACK_IMPORTED_MODULE_0__[\"startGame\"])();\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Player = (board) => {\r\n    let _active = false;\r\n    const activeBoard = board;\r\n\r\n    function changeTurn() {\r\n        _active = !_active;\r\n    }\r\n\r\n    function playerAttack(position) {\r\n      activeBoard.receiveAttack(position);\r\n    }\r\n\r\n    return {\r\n        get active() {\r\n            return _active;\r\n        },\r\n        changeTurn,\r\n        playerAttack,\r\n    }\r\n}\r\n\r\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// factory function for ships\r\nconst Ship = (length, position) => {\r\n    let _hits = new Array(length).fill(false);\r\n    let _sunk = false;\r\n    let _shipLength = length;\r\n    let _position = position.sort();\r\n\r\n    function hit(number) {\r\n      if (_position.includes(number)) {\r\n        _hits[_position.indexOf(number)] = true;\r\n        isSunk();\r\n      } else {\r\n        return\r\n      }\r\n    }\r\n\r\n    function isSunk() {\r\n      if (_hits.every(pos => pos === true)) {\r\n        _sunk = true;\r\n      }\r\n    }\r\n\r\n    return {\r\n      get position() {  \r\n        return _position;\r\n      },\r\n      get sunk() {\r\n        return _sunk;\r\n      },\r\n      get length() {\r\n        return _shipLength;\r\n      },\r\n      hit, \r\n      isSunk\r\n    }\r\n}\r\n\r\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ })

/******/ });