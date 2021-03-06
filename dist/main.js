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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startGame\", function() { return startGame; });\nconst GameBoard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\r\nconst Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\r\nconst playerField = document.querySelector(\"#player-field\");\r\nconst aiField = document.querySelector(\"#ai-field\");\r\nconst playerShips = document.querySelector(\"div#ships-frame\");\r\nconst startButton = document.querySelector(\"button#start-game\");\r\nconst autoPlaceButton = document.querySelector(\"button#auto-place\");\r\nconst resetFieldButton = document.querySelector(\"button#reset-field\");\r\nconst restartButton = document.querySelector(\"button#restart-button\");\r\nlet tempShip;\r\nlet size;\r\nlet offset;\r\nlet isDown = false;\r\nlet isVert = false;\r\nlet hasFinished = false;\r\nlet prepStage = true;\r\n\r\nfunction startGame() {\r\n  const newBoard = GameBoard();\r\n  const playerBoard = GameBoard();\r\n  const player1 = Player(newBoard);\r\n\r\n  newBoard.createAiShips();\r\n\r\n  renderPlayerField(playerBoard, playerField);\r\n  renderAIField(newBoard, aiField);\r\n\r\n  playerPrep(playerBoard);\r\n  autoPlaceButton.addEventListener(\"click\", () => {\r\n    if (!prepStage) return;\r\n    playerBoard.resetBoard();\r\n    playerBoard.createAiShips();\r\n    changePlayerRender(playerBoard);\r\n  });\r\n\r\n  resetFieldButton.addEventListener(\"click\", () => {\r\n    if (!prepStage) return;\r\n    playerBoard.resetBoard();\r\n    changePlayerRender(playerBoard);\r\n  });\r\n\r\n  restartButton.addEventListener(\"click\", () => {\r\n    prepStage = true;\r\n    hasFinished = false;\r\n    startButton.textContent = \"Start Game!\";\r\n    playerBoard.resetBoard();\r\n    newBoard.resetBoard();\r\n    newBoard.createAiShips();\r\n    changePlayerRender(playerBoard); // re-render fields\r\n    while (aiField.firstChild) {\r\n      aiField.removeChild(aiField.firstChild);\r\n    }\r\n    renderAIField(newBoard, aiField);\r\n  });\r\n\r\n  startButton.addEventListener(\"click\", () =>\r\n    startSession(playerBoard, aiField, newBoard, player1)\r\n  );\r\n}\r\n\r\nfunction startSession(playerBoard, aiField, newBoard, player) {\r\n  if (playerBoard.currShips.length < 10) return;\r\n  prepStage = false;\r\n  playerBoard.gameBoard.forEach((cell, index) => {\r\n    if (cell !== \"S\") {\r\n      playerBoard.gameBoard[index] = \"E\";\r\n    }\r\n  });\r\n  startButton.textContent = \"Playing\";\r\n  changePlayerRender(playerBoard);\r\n  beginGame(aiField, newBoard, player, playerBoard);\r\n}\r\n\r\nfunction playerPrep(playerboard) {\r\n  playerShips.addEventListener(\"mousedown\", (e) => {\r\n    if (!prepStage) return;\r\n    e.preventDefault();\r\n\t\tisDown = true;\r\n\t\t// create new element for drag-and-drop ship\r\n    tempShip = document.querySelector(`#shadow-${e.target.parentNode.id}`);\r\n    tempShip.classList.add(\"temp-ship\");\r\n    if (isVert) {\r\n      tempShip.style.flexDirection = \"column\";\r\n      let divHeight = tempShip.offsetHeight / tempShip.dataset.size;\r\n      offset = tempShip.offsetTop - divHeight / 2;\r\n    } else {\r\n      tempShip.style.flexDirection = \"row\";\r\n      offset = tempShip.offsetTop - tempShip.offsetHeight / 2;\r\n    }\r\n    tempShip.style.transform = `translate(${e.pageX}px, ${e.pageY - offset}px)`; // change coordinates\r\n    size = parseInt(e.target.parentNode.dataset.size);\r\n  });\r\n\r\n  document.body.addEventListener(\"mouseup\", (e) => {\r\n    if (!isDown) return;\r\n    isDown = false;\r\n    tempShip.classList.remove(\"temp-ship\");\r\n  });\r\n\r\n  playerField.addEventListener(\"mouseup\", (e) => {\r\n    if (!isDown) return;\r\n    let notAllowed = false;\r\n    const id = parseInt(e.target.id);\r\n    let position = [];\r\n    // if size of ship is bigger than field - don't create\r\n    if (!isVert && id % 10 > 6 && (id + size - 1) % 10 < 3 && size > 1) return; \r\n    if (isVert && id >= 70 && id + size * 10 - 10 > 99 && size > 1) return; \r\n    for (let i = 0; i < size; i++) {\r\n      if (isVert) {\r\n        position.push(id + i * 10);\r\n      } else {\r\n        position.push(id + i);\r\n      }\r\n    }\r\n    position.forEach((pos) => {\r\n      if (\r\n        playerboard.gameBoard[pos] === \"S\" ||\r\n        playerboard.gameBoard[pos] === \"U\"\r\n      )\r\n        notAllowed = true;\r\n    });\r\n    if (notAllowed) return;\r\n    playerboard.createShip(position);\r\n    changePlayerRender(playerboard);\r\n  });\r\n\r\n  document.body.addEventListener(\"keypress\", (e) => {\r\n    // change orientation of the ship on 'space'\r\n    if (!isDown) return;\r\n    if (e.keyCode === 32) {\r\n      if (isVert) {\r\n        tempShip.style.flexDirection = \"row\";\r\n      } else {\r\n        tempShip.style.flexDirection = \"column\";\r\n      }\r\n      isVert = !isVert;\r\n    }\r\n  });\r\n\r\n  document.body.addEventListener(\"mouseleave\", () => {\r\n    if (!isDown) return;\r\n    isDown = false;\r\n    tempShip.classList.remove(\"temp-ship\");\r\n  });\r\n\r\n  document.body.addEventListener(\"mousemove\", (e) => {\r\n    if (!isDown) return;\r\n    tempShip.style.transform = `translate(${e.pageX}px, ${e.pageY - offset}px)`;\r\n  });\r\n}\r\n\r\nfunction renderAIField(gameBoard, parent) {\r\n  gameBoard.gameBoard.forEach((cell, index) => {\r\n    let renderCell = document.createElement(\"div\");\r\n    renderCell.id = index;\r\n    renderCell.className = \"empty\";\r\n    parent.appendChild(renderCell);\r\n  });\r\n}\r\n\r\nfunction beginGame(parent, gameBoard, player, playerBoard) {\r\n  let nodeList = Array.from(parent.children);\r\n  nodeList.forEach((node) => {\r\n    node.addEventListener(\"click\", (e) => {\r\n      attack(e, gameBoard, player, playerBoard);\r\n    });\r\n  });\r\n}\r\n\r\nfunction attack(event, gameBoard, player, playerBoard) {\r\n\t// on player attack event\r\n  const attackedCell = parseInt(event.target.id);\r\n  if (\r\n    gameBoard.gameBoard[attackedCell] === \"M\" ||\r\n    gameBoard.gameBoard[attackedCell] === \"H\" ||\r\n    hasFinished\r\n  )\r\n    return;\r\n  player.playerAttack(attackedCell);\r\n  checkAndChange(gameBoard, aiField); \r\n  if (gameBoard.shipsDestroyed()) {\r\n    hasFinished = true; \r\n    startButton.textContent = \"You win!\";\r\n    return;\r\n  }\r\n  playerBoard.turnAI();\r\n  checkAndChange(playerBoard, playerField);\r\n  if (playerBoard.shipsDestroyed()) {\r\n    hasFinished = true;\r\n    startButton.textContent = \"You lost!\";\r\n    return;\r\n  }\r\n}\r\n\r\nfunction renderPlayerField(gameBoard, parent) {\r\n  gameBoard.gameBoard.forEach((cell, index) => {\r\n    let renderCell = document.createElement(\"div\");\r\n    renderCell.id = index;\r\n    if (cell === \"S\") {\r\n      renderCell.className = \"ship\";\r\n    } else if (cell === \"E\") {\r\n      renderCell.className = \"empty\";\r\n    }\r\n    parent.appendChild(renderCell);\r\n  });\r\n}\r\n\r\nfunction changePlayerRender(gameBoard) {\r\n  let cellType;\r\n  let nodeList = Array.from(playerField.children);\r\n  nodeList.forEach((cell) => {\r\n    cellType = gameBoard.gameBoard[parseInt(cell.id)];\r\n    if (cellType === \"S\") {\r\n      cell.className = \"ship\";\r\n    } else if (cellType === \"E\") {\r\n      cell.className = \"empty\";\r\n    } else if (cellType === \"U\") {\r\n      cell.className = \"unavailable\";\r\n    }\r\n  });\r\n}\r\n\r\nfunction checkAndChange(gameBoard, parent) {\r\n\t// change cell render depending on the state \r\n  const cells = parent.querySelectorAll(\"div\");\r\n  let cellType;\r\n  cells.forEach((cell) => {\r\n    cellType = gameBoard.gameBoard[parseInt(cell.id)];\r\n    if (cellType === \"H\") {\r\n      cell.className = \"hit\";\r\n    } else if (cellType === \"M\") {\r\n      cell.className = \"miss\";\r\n    }\r\n  });\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// game board logic\r\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\r\n\r\nconst Gameboard = () => {\r\n  const _limits = [4, 3, 2, 1];\r\n  let _currentShips = [];\r\n  let gameBoard = new Array(100).fill(\"E\");\r\n\r\n  function resetBoard() {\r\n    _currentShips = [];\r\n    gameBoard.forEach((pos, index) => (gameBoard[index] = \"E\"));\r\n  }\r\n\r\n  function createShip(position) {\r\n    if (checkShipsNumber(position.length)) return;\r\n    const newShip = Ship(position.length, position);\r\n    position.forEach((pos) => {\r\n      gameBoard[pos] = \"S\";\r\n    });\r\n    position.forEach((position) => {\r\n      // change neighbours so they are unavailable\r\n      getNeighbours(position).forEach((pos) => {\r\n        if (gameBoard[pos] !== \"S\") {\r\n          gameBoard[pos] = \"U\";\r\n        }\r\n      });\r\n    });\r\n    _currentShips.push(newShip);\r\n    return newShip;\r\n  }\r\n\r\n  function checkShipsNumber(shipLength) {\r\n    // not allow ship to create if already max number by type\r\n    let counter = 0;\r\n    _currentShips.forEach((ship) => {\r\n      if (ship.length === shipLength) {\r\n        counter = counter + 1;\r\n      }\r\n    });\r\n    return counter === _limits[shipLength - 1];\r\n  }\r\n\r\n  function createAiShips() {\r\n    // main method for auto creating AI ships\r\n    autoCreateShip(4);\r\n    autoCreateShip(3);\r\n    autoCreateShip(3);\r\n    autoCreateShip(2);\r\n    autoCreateShip(2);\r\n    autoCreateShip(2);\r\n    autoCreateShip(1);\r\n    autoCreateShip(1);\r\n    autoCreateShip(1);\r\n    autoCreateShip(1);\r\n    gameBoard.map((pos, index) => {\r\n      if (pos !== \"S\") {\r\n        gameBoard[index] = \"E\";\r\n      }\r\n    });\r\n  }\r\n\r\n  function autoCreateShip(length) {\r\n    // automatically create one ship on random positions\r\n    let shipPosition = [];\r\n    let availablePos = gameBoard\r\n      .map((pos, index) => {\r\n        if (pos !== \"S\" && pos !== \"U\") {\r\n          return index;\r\n        } else return -1;\r\n      })\r\n      .filter((pos) => pos >= 0); // choose only available fields\r\n    let randomPos = Math.round(Math.random() * (availablePos.length - 1)); // choose random\r\n    shipPosition.push(availablePos[randomPos]);\r\n    gameBoard[availablePos[randomPos]] = \"S\";\r\n    // set full set of positions\r\n    if (length > 1) {\r\n      getIndirectNeighbours(availablePos[randomPos]).forEach((pos) => {\r\n        if (gameBoard[pos] !== \"S\") {\r\n          gameBoard[pos] = \"U\";\r\n        }\r\n      });\r\n      shipPosition = _createLongShip(length, shipPosition);\r\n    }\r\n    shipPosition.forEach((position) => {\r\n      // check unavailable positions\r\n      getNeighbours(position).forEach((pos) => {\r\n        if (gameBoard[pos] !== \"S\") {\r\n          gameBoard[pos] = \"U\";\r\n        }\r\n      });\r\n    });\r\n    createShip(shipPosition);\r\n  }\r\n\r\n  function _createLongShip(length, shipPosition) {\r\n    // function for creating ships longer than 1 cell\r\n    let choosen;\r\n    for (let i = 0; i < length - 1; i++) {\r\n      let available = getDirectNeighbours(shipPosition[i]).filter(\r\n        (pos) => gameBoard[pos] !== \"S\" && gameBoard[pos] !== \"U\"\r\n      );\r\n      if (available.length === 0) {\r\n        available = getDirectNeighbours(shipPosition[0]).filter(\r\n          (pos) => gameBoard[pos] !== \"S\" && gameBoard[pos] !== \"U\"\r\n        );\r\n      } \r\n      if (available.length === 1) choosen = available[0];\r\n      else {\r\n        let randomPos = Math.round(Math.random() * (available.length - 1));\r\n        choosen = available[randomPos];\r\n      }\r\n      shipPosition.push(choosen);\r\n      gameBoard[choosen] = \"S\";\r\n      getIndirectNeighbours(choosen).forEach((pos) => {\r\n        if (gameBoard[pos] !== \"S\") {\r\n          gameBoard[pos] = \"U\";\r\n        }\r\n      });\r\n    }\r\n    return shipPosition;\r\n  }\r\n\r\n  function getNeighbours(position) {\r\n    let all = [\r\n      position % 10 === 0 ? -1 : position - 11, // not to choose cells on the wrong side of the field\r\n      position - 10,\r\n      position % 10 === 9 ? -1 : position - 9,\r\n      position % 10 === 0 ? -1 : position - 1,\r\n      position % 10 === 9 ? -1 : position + 1,\r\n      position % 10 === 0 ? -1 : position + 9,\r\n      position + 10,\r\n      position % 10 === 9 ? -1 : position + 11,\r\n    ].filter((pos) => pos >= 0 && pos < 100);\r\n    return all;\r\n  }\r\n\r\n  function getDirectNeighbours(position) {\r\n    let all = [\r\n      position - 10,\r\n      position + 10,\r\n      position % 10 === 0 ? -1 : position - 1,\r\n      position % 10 === 9 ? -1 : position + 1,\r\n    ].filter((pos) => pos >= 0 && pos < 100);\r\n    return all;\r\n  }\r\n\r\n  function getIndirectNeighbours(position) {\r\n    let all = [\r\n      position % 10 === 0 ? -1 : position - 11,\r\n      position % 10 === 9 ? -1 : position - 9,\r\n      position % 10 === 0 ? -1 : position + 9,\r\n      position % 10 === 9 ? -1 : position + 11,\r\n    ].filter((pos) => pos >= 0 && pos < 100);\r\n    return all;\r\n  }\r\n\r\n  function changeNeighboursAfterDestroy(position) {\r\n    // helper function to change all neighbours after destroy\r\n    getNeighbours(position).forEach((pos) => {\r\n      if (gameBoard[pos] !== \"H\") {\r\n        gameBoard[pos] = \"M\";\r\n      }\r\n    });\r\n  }\r\n\r\n  function changeNeighboursAfterHit(position) {\r\n    getIndirectNeighbours(position).forEach((pos) => {\r\n      gameBoard[pos] = \"M\";\r\n    });\r\n  }\r\n\r\n  function turnAI() {\r\n    let available = gameBoard\r\n      .map((cell, index) => {\r\n        // map available positions\r\n        if (cell !== \"M\" && cell !== \"H\") {\r\n          return index;\r\n        } else return -1;\r\n      })\r\n      .filter((cell) => cell > 0);\r\n    const randompos = Math.floor(Math.random() * available.length);\r\n    receiveAttack(available[randompos]);\r\n    return randompos;\r\n  }\r\n\r\n  function receiveAttack(position) {\r\n    // change cell status depending on cell content\r\n    if (gameBoard[position] === \"S\") {\r\n      _currentShips.forEach((ship) => {\r\n        ship.hit(position);\r\n        if (ship.sunk) {\r\n          _currentShips.splice(_currentShips.indexOf(ship), 1);\r\n          ship.position.forEach((pos) => {\r\n            changeNeighboursAfterDestroy(pos);\r\n          });\r\n        }\r\n      });\r\n      gameBoard[position] = \"H\";\r\n      changeNeighboursAfterHit(position);\r\n      return \"hit\";\r\n    } else if (gameBoard[position] === \"E\") {\r\n      gameBoard[position] = \"M\";\r\n      return \"miss\";\r\n    } else return;\r\n  }\r\n\r\n  function shipsDestroyed() {\r\n    // check if any ships alive\r\n    return _currentShips.length === 0 ? true : false;\r\n  }\r\n\r\n  return {\r\n    resetBoard,\r\n    createShip,\r\n    receiveAttack,\r\n    shipsDestroyed,\r\n    gameBoard,\r\n    turnAI,\r\n    createAiShips,\r\n    getNeighbours,\r\n    get currShips() {\r\n      return _currentShips;\r\n    },\r\n  };\r\n};\r\n\r\nmodule.exports = Gameboard;\r\n\n\n//# sourceURL=webpack:///./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.sass */ \"./src/style.sass\");\n/* harmony import */ var _style_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_sass__WEBPACK_IMPORTED_MODULE_1__);\n// main project file\r\n\r\n\r\n\r\nconst startButton = document.querySelector('#start-game');\r\n\r\nObject(_game__WEBPACK_IMPORTED_MODULE_0__[\"startGame\"])();\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Player = (board) => {\r\n  let _active = false;\r\n  const activeBoard = board;\r\n\r\n  function changeTurn() {\r\n    _active = !_active;\r\n  }\r\n\r\n  function playerAttack(position) {\r\n    activeBoard.receiveAttack(position);\r\n  }\r\n\r\n  return {\r\n    get active() {\r\n      return _active;\r\n    },\r\n    changeTurn,\r\n    playerAttack,\r\n  };\r\n};\r\n\r\nmodule.exports = Player;\r\n\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// factory function for ships\r\nconst Ship = (length, position) => {\r\n  let _hits = new Array(length).fill(false);\r\n  let _sunk = false;\r\n  let _shipLength = length;\r\n  let _position = position.sort();\r\n\r\n  function hit(number) {\r\n    if (_position.includes(number)) {\r\n      _hits[_position.indexOf(number)] = true;\r\n      _isSunk();\r\n    } else {\r\n      return;\r\n    }\r\n  }\r\n\r\n  function _isSunk() {\r\n    if (_hits.every((pos) => pos === true)) {\r\n      _sunk = true;\r\n    }\r\n  }\r\n\r\n  return {\r\n    get position() {\r\n      return _position;\r\n    },\r\n    get sunk() {\r\n      return _sunk;\r\n    },\r\n    get length() {\r\n      return _shipLength;\r\n    },\r\n    hit,\r\n  };\r\n};\r\n\r\nmodule.exports = Ship;\r\n\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/style.sass":
/*!************************!*\
  !*** ./src/style.sass ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/style.sass?");

/***/ })

/******/ });