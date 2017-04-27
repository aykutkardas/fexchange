var game = new GameBoard('game', {
    x: 8,
    y: 8,
    target: "body",
    typeSize: 8,
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
