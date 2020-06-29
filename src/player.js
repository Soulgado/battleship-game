const Player = (board) => {
  let _active = false;
  const activeBoard = board;

  function changeTurn() {
    _active = !_active;
  }

  function playerAttack(position) {
    activeBoard.receiveAttack(position);
  }

  return {
    get active() {
      return _active;
    },
    changeTurn,
    playerAttack,
  };
};

module.exports = Player;
