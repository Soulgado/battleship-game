const Gameboard = require('../src/gameboard');

test('Position of the ship', () => {
    const newBoard = Gameboard();
    newBoard.createShip([0, 1, 2, 3]);
    expect(newBoard.gameBoard[1].type).toBe('S');
});

test('Attack misses', () => {
    const newBoard = Gameboard();
    newBoard.receiveAttack(56);
    expect(newBoard.gameBoard[56].type).toBe('M')
});

test('Every ship destroyed', () => {
    const newBoard = Gameboard();
    newBoard.createShip([0, 1, 2, 3]);
    newBoard.receiveAttack(0);
    newBoard.receiveAttack(1);
    newBoard.receiveAttack(2);
    newBoard.receiveAttack(3);
    expect(newBoard.shipsDestroyed()).toBe(true);
});

