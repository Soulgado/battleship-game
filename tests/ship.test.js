const Ship = require('../src/ship');

test('Ship hit check', () => {
    const ship = Ship(1, [1]);
    ship.hit(1);
    expect(ship.sunk).toBe(true);
});

test('Ship position of hit check', () => {
    const ship = Ship(3, [1, 2, 3]);
    ship.hit(3);
    expect(ship.hits[2]).toBe(true);
});

test('Ship creation', () => {
    const ship = Ship(3, [1, 2, 3]);
    expect(ship.sunk).toBe(false);
});

test('Ship creation2', () => {
    const ship = Ship(4, [1, 2, 3, 4]);
    expect(ship.hits.length).toBe(4);
});

test('Ship creation 3', () => {
    const ship = Ship(4, [1, 2, 3, 4]);
    expect(ship.hits.every(hit => hit === false)).toBe(true);
});


