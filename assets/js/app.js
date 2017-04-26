var game = new GameBoard('game', {
    x: 4,
    y: 4,
    target: "body",
    typeSize: 6,
    item: {
        width: 50,
        height: 50
    }
});

var mach = new GameMachine(game.x, game.y);

var ctrl = new GameControl(mach);

mach.createPosition();
game.createBoard();
ctrl.createGrids();
