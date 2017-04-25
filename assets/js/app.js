var game = new GameBoard('game', {
    x: 5,
    y: 5,
    target: "body",
    typeSize: 9,
    item: {
        width: 80,
        height: 80
    }
});

var mach = new GameMachine(game.x, game.y);

mach.createPosition();
game.createBoard();
