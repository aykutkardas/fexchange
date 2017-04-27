var game = new GameBoard('game', {
    x: 5,
    y: 5,
    target: "body",
    typeSize: 7,
    item: {
        width: 150,
        height: 150
    }
});

var mach = new GameMachine(game.x, game.y);

var ctrl = new GameControl(mach);

mach.createPosition();
game.createBoard();
ctrl.createGrids();
