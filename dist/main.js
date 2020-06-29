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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startGame\", function() { return startGame; });\nconst GameBoard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\nconst Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst playerField = document.querySelector(\"#player-field\");\nconst aiField = document.querySelector(\"#ai-field\");\nconst playerShips = document.querySelector(\"div#ships-frame\");\nconst startButton = document.querySelector(\"button#start-game\");\nconst autoPlaceButton = document.querySelector(\"button#auto-place\");\nconst resetFieldButton = document.querySelector(\"button#reset-field\");\nconst restartButton = document.querySelector(\"button#restart-button\");\nlet tempShip;\nlet size;\nlet offset;\nlet isDown = false;\nlet isVert = false;\nlet hasFinished = false;\nlet prepStage = true;\n\nfunction startGame() {\n  const newBoard = GameBoard();\n  const playerBoard = GameBoard();\n  const player1 = Player(newBoard);\n\n  newBoard.createAiShips();\n\n  renderPlayerField(playerBoard, playerField);\n  renderAIField(newBoard, aiField);\n\n  playerPrep(playerBoard);\n  autoPlaceButton.addEventListener(\"click\", () => {\n    if (!prepStage) return;\n    playerBoard.resetBoard();\n    playerBoard.createAiShips();\n    changePlayerRender(playerBoard);\n  });\n\n  resetFieldButton.addEventListener(\"click\", () => {\n    if (!prepStage) return;\n    playerBoard.resetBoard();\n    changePlayerRender(playerBoard);\n  });\n\n  restartButton.addEventListener(\"click\", () => {\n    prepStage = true;\n    hasFinished = false;\n    startButton.textContent = \"Start Game!\";\n    playerBoard.resetBoard();\n    newBoard.resetBoard();\n    newBoard.createAiShips();\n    changePlayerRender(playerBoard); // re-render fields\n    while (aiField.firstChild) {\n      aiField.removeChild(aiField.firstChild);\n    }\n    renderAIField(newBoard, aiField);\n  });\n\n  startButton.addEventListener(\"click\", () =>\n    startSession(playerBoard, aiField, newBoard, player1)\n  );\n}\n\nfunction startSession(playerBoard, aiField, newBoard, player) {\n  if (playerBoard.currShips.length < 10) return;\n  prepStage = false;\n  playerBoard.gameBoard.forEach((cell, index) => {\n    if (cell !== \"S\") {\n      playerBoard.gameBoard[index] = \"E\";\n    }\n  });\n  startButton.textContent = \"Playing\";\n  changePlayerRender(playerBoard);\n  beginGame(aiField, newBoard, player, playerBoard);\n}\n\nfunction playerPrep(playerboard) {\n  playerShips.addEventListener(\"mousedown\", (e) => {\n    if (!prepStage) return;\n    e.preventDefault();\n\t\tisDown = true;\n\t\t// create new element for drag-and-drop ship\n    tempShip = document.querySelector(`#shadow-${e.target.parentNode.id}`);\n    tempShip.classList.add(\"temp-ship\");\n    if (isVert) {\n      tempShip.style.flexDirection = \"column\";\n      let divHeight = tempShip.offsetHeight / tempShip.dataset.size;\n      offset = tempShip.offsetTop - divHeight / 2;\n    } else {\n      tempShip.style.flexDirection = \"row\";\n      offset = tempShip.offsetTop - tempShip.offsetHeight / 2;\n    }\n    tempShip.style.transform = `translate(${e.pageX}px, ${e.pageY - offset}px)`; // change coordinates\n    size = parseInt(e.target.parentNode.dataset.size);\n  });\n\n  document.body.addEventListener(\"mouseup\", (e) => {\n    if (!isDown) return;\n    isDown = false;\n    tempShip.classList.remove(\"temp-ship\");\n  });\n\n  playerField.addEventListener(\"mouseup\", (e) => {\n    if (!isDown) return;\n    let notAllowed = false;\n    const id = parseInt(e.target.id);\n    let position = [];\n    // if size of ship is bigger than field - don't create\n    if (!isVert && id % 10 > 6 && (id + size - 1) % 10 < 3 && size > 1) return; \n    if (isVert && id >= 70 && id + size * 10 - 10 > 99 && size > 1) return; \n    for (let i = 0; i < size; i++) {\n      if (isVert) {\n        position.push(id + i * 10);\n      } else {\n        position.push(id + i);\n      }\n    }\n    position.forEach((pos) => {\n      if (\n        playerboard.gameBoard[pos] === \"S\" ||\n        playerboard.gameBoard[pos] === \"U\"\n      )\n        notAllowed = true;\n    });\n    if (notAllowed) return;\n    playerboard.createShip(position);\n    changePlayerRender(playerboard);\n  });\n\n  document.body.addEventListener(\"keypress\", (e) => {\n    // change orientation of the ship on 'space'\n    if (!isDown) return;\n    if (e.keyCode === 32) {\n      if (isVert) {\n        tempShip.style.flexDirection = \"row\";\n      } else {\n        tempShip.style.flexDirection = \"column\";\n      }\n      isVert = !isVert;\n    }\n  });\n\n  document.body.addEventListener(\"mouseleave\", () => {\n    if (!isDown) return;\n    isDown = false;\n    tempShip.classList.remove(\"temp-ship\");\n  });\n\n  document.body.addEventListener(\"mousemove\", (e) => {\n    if (!isDown) return;\n    tempShip.style.transform = `translate(${e.pageX}px, ${e.pageY - offset}px)`;\n  });\n}\n\nfunction renderAIField(gameBoard, parent) {\n  gameBoard.gameBoard.forEach((cell, index) => {\n    let renderCell = document.createElement(\"div\");\n    renderCell.id = index;\n    renderCell.className = \"empty\";\n    parent.appendChild(renderCell);\n  });\n}\n\nfunction beginGame(parent, gameBoard, player, playerBoard) {\n  let nodeList = Array.from(parent.children);\n  nodeList.forEach((node) => {\n    node.addEventListener(\"click\", (e) => {\n      attack(e, gameBoard, player, playerBoard);\n    });\n  });\n}\n\nfunction attack(event, gameBoard, player, playerBoard) {\n\t// on player attack event\n  const attackedCell = parseInt(event.target.id);\n  if (\n    gameBoard.gameBoard[attackedCell] === \"M\" ||\n    gameBoard.gameBoard[attackedCell] === \"H\" ||\n    hasFinished\n  )\n    return;\n  player.playerAttack(attackedCell);\n  checkAndChange(gameBoard, aiField); \n  if (gameBoard.shipsDestroyed()) {\n    hasFinished = true; \n    startButton.textContent = \"You win!\";\n    return;\n  }\n  playerBoard.turnAI();\n  checkAndChange(playerBoard, playerField);\n  if (playerBoard.shipsDestroyed()) {\n    hasFinished = true;\n    startButton.textContent = \"You lost!\";\n    return;\n  }\n}\n\nfunction renderPlayerField(gameBoard, parent) {\n  gameBoard.gameBoard.forEach((cell, index) => {\n    let renderCell = document.createElement(\"div\");\n    renderCell.id = index;\n    if (cell === \"S\") {\n      renderCell.className = \"ship\";\n    } else if (cell === \"E\") {\n      renderCell.className = \"empty\";\n    }\n    parent.appendChild(renderCell);\n  });\n}\n\nfunction changePlayerRender(gameBoard) {\n  let cellType;\n  let nodeList = Array.from(playerField.children);\n  nodeList.forEach((cell) => {\n    cellType = gameBoard.gameBoard[parseInt(cell.id)];\n    if (cellType === \"S\") {\n      cell.className = \"ship\";\n    } else if (cellType === \"E\") {\n      cell.className = \"empty\";\n    } else if (cellType === \"U\") {\n      cell.className = \"unavailable\";\n    }\n  });\n}\n\nfunction checkAndChange(gameBoard, parent) {\n\t// change cell render depending on the state \n  const cells = parent.querySelectorAll(\"div\");\n  let cellType;\n  cells.forEach((cell) => {\n    cellType = gameBoard.gameBoard[parseInt(cell.id)];\n    if (cellType === \"H\") {\n      cell.className = \"hit\";\n    } else if (cellType === \"M\") {\n      cell.className = \"miss\";\n    }\n  });\n}\n\n\n\n// don't change neighbouring cells after hit on player field\n// improve AI\n// handle error on click outside the ship\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// game board logic\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nconst Gameboard = () => {\n  const _limits = [4, 3, 2, 1];\n  let _currentShips = [];\n  let gameBoard = new Array(100).fill(\"E\");\n\n  function resetBoard() {\n    _currentShips = [];\n    gameBoard.forEach((pos, index) => (gameBoard[index] = \"E\"));\n  }\n\n  function createShip(position) {\n    if (checkShipsNumber(position.length)) return;\n    const newShip = Ship(position.length, position);\n    position.forEach((pos) => {\n      gameBoard[pos] = \"S\";\n    });\n    position.forEach((position) => {\n      // change neighbours so they are unavailable\n      getNeighbours(position).forEach((pos) => {\n        if (gameBoard[pos] !== \"S\") {\n          gameBoard[pos] = \"U\";\n        }\n      });\n    });\n    _currentShips.push(newShip);\n    return newShip;\n  }\n\n  function checkShipsNumber(shipLength) {\n    // not allow ship to create if already max number by type\n    let counter = 0;\n    _currentShips.forEach((ship) => {\n      if (ship.length === shipLength) {\n        counter = counter + 1;\n      }\n    });\n    return counter === _limits[shipLength - 1];\n  }\n\n  function createAiShips() {\n    // main method for auto creating AI ships\n    autoCreateShip(4);\n    autoCreateShip(3);\n    autoCreateShip(3);\n    autoCreateShip(2);\n    autoCreateShip(2);\n    autoCreateShip(2);\n    autoCreateShip(1);\n    autoCreateShip(1);\n    autoCreateShip(1);\n    autoCreateShip(1);\n    gameBoard.map((pos, index) => {\n      if (pos !== \"S\") {\n        gameBoard[index] = \"E\";\n      }\n    });\n  }\n\n  function autoCreateShip(length) {\n    // automatically create one ship on random positions\n    let shipPosition = [];\n    let availablePos = gameBoard\n      .map((pos, index) => {\n        if (pos !== \"S\" && pos !== \"U\") {\n          return index;\n        } else return -1;\n      })\n      .filter((pos) => pos >= 0); // choose only available fields\n    let randomPos = Math.round(Math.random() * (availablePos.length - 1)); // choose random\n    shipPosition.push(availablePos[randomPos]);\n    gameBoard[availablePos[randomPos]] = \"S\";\n    // set full set of positions\n    if (length > 1) {\n      getIndirectNeighbours(availablePos[randomPos]).forEach((pos) => {\n        if (gameBoard[pos] !== \"S\") {\n          gameBoard[pos] = \"U\";\n        }\n      });\n      shipPosition = _createLongShip(length, shipPosition);\n    }\n    shipPosition.forEach((position) => {\n      // check unavailable positions\n      getNeighbours(position).forEach((pos) => {\n        if (gameBoard[pos] !== \"S\") {\n          gameBoard[pos] = \"U\";\n        }\n      });\n    });\n    createShip(shipPosition);\n  }\n\n  function _createLongShip(length, shipPosition) {\n    // function for creating ships longer than 1 cell\n    let choosen;\n    for (let i = 0; i < length - 1; i++) {\n      let available = getDirectNeighbours(shipPosition[i]).filter(\n        (pos) => gameBoard[pos] !== \"S\" && gameBoard[pos] !== \"U\"\n      );\n      if (available.length === 0) {\n        available = getDirectNeighbours(shipPosition[0]).filter(\n          (pos) => gameBoard[pos] !== \"S\" && gameBoard[pos] !== \"U\"\n        );\n      } \n      if (available.length === 1) choosen = available[0];\n      else {\n        let randomPos = Math.round(Math.random() * (available.length - 1));\n        choosen = available[randomPos];\n      }\n      shipPosition.push(choosen);\n      gameBoard[choosen] = \"S\";\n      getIndirectNeighbours(choosen).forEach((pos) => {\n        if (gameBoard[pos] !== \"S\") {\n          gameBoard[pos] = \"U\";\n        }\n      });\n    }\n    return shipPosition;\n  }\n\n  function getNeighbours(position) {\n    let all = [\n      position % 10 === 0 ? -1 : position - 11, // not to choose cells on the wrong side of the field\n      position - 10,\n      position % 10 === 9 ? -1 : position - 9,\n      position % 10 === 0 ? -1 : position - 1,\n      position % 10 === 9 ? -1 : position + 1,\n      position % 10 === 0 ? -1 : position + 9,\n      position + 10,\n      position % 10 === 9 ? -1 : position + 11,\n    ].filter((pos) => pos >= 0 && pos < 100);\n    return all;\n  }\n\n  function getDirectNeighbours(position) {\n    let all = [\n      position - 10,\n      position + 10,\n      position % 10 === 0 ? -1 : position - 1,\n      position % 10 === 9 ? -1 : position + 1,\n    ].filter((pos) => pos >= 0 && pos < 100);\n    return all;\n  }\n\n  function getIndirectNeighbours(position) {\n    let all = [\n      position % 10 === 0 ? -1 : position - 11,\n      position % 10 === 9 ? -1 : position - 9,\n      position % 10 === 0 ? -1 : position + 9,\n      position % 10 === 9 ? -1 : position + 11,\n    ].filter((pos) => pos >= 0 && pos < 100);\n    return all;\n  }\n\n  function changeNeighboursAfterDestroy(position) {\n    // helper function to change all neighbours after destroy\n    getNeighbours(position).forEach((pos) => {\n      if (gameBoard[pos] !== \"H\") {\n        gameBoard[pos] = \"M\";\n      }\n    });\n  }\n\n  function changeNeighboursAfterHit(position) {\n    getIndirectNeighbours(position).forEach((pos) => {\n      gameBoard[pos] = \"M\";\n    });\n  }\n\n  function turnAI() {\n    let available = gameBoard\n      .map((cell, index) => {\n        // map available positions\n        if (cell !== \"M\" && cell !== \"H\") {\n          return index;\n        } else return -1;\n      })\n      .filter((cell) => cell > 0);\n    const randompos = Math.floor(Math.random() * available.length);\n    receiveAttack(available[randompos]);\n    return randompos;\n  }\n\n  function receiveAttack(position) {\n    // change cell status depending on cell content\n    if (gameBoard[position] === \"S\") {\n      _currentShips.forEach((ship) => {\n        ship.hit(position);\n        if (ship.sunk) {\n          _currentShips.splice(_currentShips.indexOf(ship), 1);\n          ship.position.forEach((pos) => {\n            changeNeighboursAfterDestroy(pos);\n          });\n        }\n      });\n      gameBoard[position] = \"H\";\n      changeNeighboursAfterHit(position);\n      return \"hit\";\n    } else if (gameBoard[position] === \"E\") {\n      gameBoard[position] = \"M\";\n      return \"miss\";\n    } else return;\n  }\n\n  function shipsDestroyed() {\n    // check if any ships alive\n    return _currentShips.length === 0 ? true : false;\n  }\n\n  return {\n    resetBoard,\n    createShip,\n    receiveAttack,\n    shipsDestroyed,\n    gameBoard,\n    turnAI,\n    createAiShips,\n    getNeighbours,\n    get currShips() {\n      return _currentShips;\n    },\n  };\n};\n\nmodule.exports = Gameboard;\n\n\n//# sourceURL=webpack:///./src/gameboard.js?");

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

eval("const Player = (board) => {\n  let _active = false;\n  const activeBoard = board;\n\n  function changeTurn() {\n    _active = !_active;\n  }\n\n  function playerAttack(position) {\n    activeBoard.receiveAttack(position);\n  }\n\n  return {\n    get active() {\n      return _active;\n    },\n    changeTurn,\n    playerAttack,\n  };\n};\n\nmodule.exports = Player;\n\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// factory function for ships\nconst Ship = (length, position) => {\n  let _hits = new Array(length).fill(false);\n  let _sunk = false;\n  let _shipLength = length;\n  let _position = position.sort();\n\n  function hit(number) {\n    if (_position.includes(number)) {\n      _hits[_position.indexOf(number)] = true;\n      _isSunk();\n    } else {\n      return;\n    }\n  }\n\n  function _isSunk() {\n    if (_hits.every((pos) => pos === true)) {\n      _sunk = true;\n    }\n  }\n\n  return {\n    get position() {\n      return _position;\n    },\n    get sunk() {\n      return _sunk;\n    },\n    get length() {\n      return _shipLength;\n    },\n    hit,\n  };\n};\n\nmodule.exports = Ship;\n\n\n//# sourceURL=webpack:///./src/ship.js?");

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