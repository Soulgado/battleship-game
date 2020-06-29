// factory function for ships
const Ship = (length, position) => {
  let _hits = new Array(length).fill(false);
  let _sunk = false;
  let _shipLength = length;
  let _position = position.sort();

  function hit(number) {
    if (_position.includes(number)) {
      _hits[_position.indexOf(number)] = true;
      _isSunk();
    } else {
      return;
    }
  }

  function _isSunk() {
    if (_hits.every((pos) => pos === true)) {
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
    get length() {
      return _shipLength;
    },
    hit,
  };
};

module.exports = Ship;
