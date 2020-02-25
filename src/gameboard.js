// game board logic
const Ship = require('./ship');

const Gameboard = () => {
    const _limits = [4, 3, 2, 1];
    let _currentShips = [];
    let gameBoard = new Array(100).fill('E');

    function createShip(position) {
        if (checkShipsNumber(position.length)) return;
        const newShip = Ship(position.length, position);
        position.forEach((pos) => {
            gameBoard[pos] = 'S';
        });
        position.forEach(position => {     // change neighbours so they are unavailable 
            getNeighbours(position).forEach(pos => {
                if (gameBoard[pos] !== 'S') {
                    gameBoard[pos] = 'U';
                }
            });
        });
        _currentShips.push(newShip);   
        return newShip;
    };

    function checkShipsNumber(shipLength) {
        // not allow ship to create if already max number by type
        let counter = 0;
        _currentShips.forEach(ship => {
            if (ship.length === shipLength) {
                counter = counter + 1;
            }
        });
        return counter === _limits[shipLength-1];
    }

    function createAiShips() {
        // main method for auto creating AI ships
        autoCreateShip(4);
        autoCreateShip(3);
        autoCreateShip(3);
        autoCreateShip(2);
        autoCreateShip(2);
        autoCreateShip(2);
        autoCreateShip(1);
        autoCreateShip(1);
        autoCreateShip(1);
        autoCreateShip(1);
        gameBoard.map((pos, index) => {
            if (pos !== 'S') {
                gameBoard[index] = 'E';
            }
        });
    }

    function autoCreateShip(length) {
        // automatically create one ship on random positions
        let shipPosition = [];
        let availablePos = gameBoard.map((pos, index) => {
            if (pos !== 'S' && pos !== 'U') {
                return index;
            } else return -1;
        }).filter(pos => pos >= 0); // choose only available fields
        let randomPos = Math.round(Math.random() * (availablePos.length - 1)); // choose random
        shipPosition.push(availablePos[randomPos]);
        gameBoard[availablePos[randomPos]] = 'S';
        // set full set of positions
        if (length > 1) {
            getIndirectNeighbours(availablePos[randomPos]).forEach(pos => {
                if (gameBoard[pos] !== 'S') {
                    gameBoard[pos] = 'U';
                }
            });
            shipPosition = _createLongShip(length, shipPosition);
        }
        shipPosition.forEach(position => {
            getNeighbours(position).forEach(pos => {
                if (gameBoard[pos] !== 'S') {
                    gameBoard[pos] = 'U';
                }
            });
        });   // check unavailable positions  
        createShip(shipPosition);
    }

    function _createLongShip(length, shipPosition) {
        let choosen;
        for (let i=0; i < (length - 1); i++) {
            let available = getDirectNeighbours(shipPosition[i]).filter(pos => gameBoard[pos] !== 'S' && gameBoard[pos] !== 'U');
            if (available.length === 0) {
                available = getDirectNeighbours(shipPosition[0]).filter(pos => gameBoard[pos] !== 'S' && gameBoard[pos] !== 'U');
            } // even now available.length can be 0, what to do in that case
            if (available.length === 1) choosen = available[0];
            else {
                let randomPos = Math.round(Math.random() * (available.length - 1));
                choosen = available[randomPos];  
            }
            shipPosition.push(choosen);
            gameBoard[choosen] = 'S'; 
            getIndirectNeighbours(choosen).forEach(pos => {
                if (gameBoard[pos] !== 'S') {
                    gameBoard[pos] = 'U';
                }
            });
        }
        return shipPosition;
    }

    function getNeighbours(position) {   
        let all = [
            position % 10 === 0 ? -1 : position-11,  // not to choose cells on the wrong side of the field
            position-10,
            position % 10 === 9 ? -1 : position-9,
            position % 10 === 0 ? -1 : position-1,
            position % 10 === 9 ? -1 : position+1,
            position % 10 === 0 ? -1 : position+9,
            position+10,
            position % 10 === 9 ? -1 : position+11]
            .filter(pos => pos >= 0 && pos < 100);
        return all;
    }

    function getDirectNeighbours(position) {
      let all = [
        position-10,
        position+10,
        position % 10 === 0 ? -1 : position-1,
        position % 10 === 9 ? -1 : position+1]
        .filter(pos => pos >= 0 && pos < 100);
      return all;
    }

    function getIndirectNeighbours(position) {
      let all = [
        position % 10 === 0 ? -1 : position-11,
        position % 10 === 9 ? -1 : position-9,
        position % 10 === 0 ? -1 : position+9,
        position % 10 === 9 ? -1 : position+11]
        .filter(pos => pos >= 0 && pos < 100);
    return all;
    }

    function changeNeighboursAfterDestroy(position) {
      // helper function to change all neighbours after destroy
      getNeighbours(position).forEach((pos) => {
        if (gameBoard[pos] !== 'H') {
          gameBoard[pos] = 'M';
          } 
        }); 
      }

    function changeNeighboursAfterHit(position) {
      getIndirectNeighbours(position).forEach((pos) => {
        gameBoard[pos] = 'M';
      });
    }

    function turnAI() {
        let available = gameBoard.map((cell, index) => {  // map available positions
            if (cell !== 'M' && cell !== 'H') {   
                return index;
            } else return -1;
        }).filter(cell => cell > 0);
        const randompos = Math.floor(Math.random() * available.length);
        receiveAttack(available[randompos]);
        return available[randompos];
    }

    function receiveAttack(position) {
        if (gameBoard[position] === 'S') {
            _currentShips.forEach(ship => {
                ship.hit(position);
                if (ship.sunk) { 
                    _currentShips.splice(_currentShips.indexOf(ship), 1);
                    ship.position.forEach(pos => {
                        changeNeighboursAfterDestroy(pos);
                    });
                }
            });
            gameBoard[position] = 'H'
            changeNeighboursAfterHit(position); 
            return 'hit';
        } else if (gameBoard[position] === 'E') {
            gameBoard[position] = 'M';
            return 'miss';
        } else return;
    }

    function shipsDestroyed() {
        return _currentShips.length === 0 ? true : false;
    }

    return {
        createShip,
        receiveAttack,
        shipsDestroyed,
        gameBoard,
        turnAI,
        createAiShips,
        getNeighbours
    }
};

const Coord = (type, ship=false, id=0) => {
    const _currShip = ship ? ship : null;
    let _type = type;     // change coordinate system to two numbers row and col
    let _id = id;

    return {
        get currShip() {
            return _currShip;
        },
        get type() {
            return _type;
        },
        set type(letter) {
            _type = letter;
        },
        get id() {
            return _id;
        },
        set id(number) {
            _id = number;
        }
    }
}
// create helper class Coordinate for helping to deal with position?

module.exports = Gameboard;