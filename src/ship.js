// factory function for ships
const Ship = (length, position) => {
    let _hits = new Array(length).fill(false);
    let _sunk = false;
    let _shipLength = length;
    let _position = position.sort();

    function hit(number) {
      if (_position.includes(number)) {
        _hits[_position.indexOf(number)] = true;
        isSunk();
      } else {
        return
      }
    }

    function isSunk() {
      if (_hits.every(pos => pos === true)) {
        _sunk = true;
      }
    }

    return {
      get position() {  
        return _position;
      },
      get sunk() {
        return _sunk;
      },
      hit, 
      isSunk
    }
}

module.exports = Ship;