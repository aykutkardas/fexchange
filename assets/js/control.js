function GameControl(machine) {

    // [OK!]
    function arrayElementCounter(arr) {

        var temp = {};
        for (var i = 0; i < arr.length; i++) {

            if (!(temp[arr[i]])) {
                temp[arr[i]] = 1;
            } else {
                temp[arr[i]]++;
            }
        }

        return temp;

    }

    // [OK!]
    function zeroStartRand(n) {
        return Math.round(Math.random() * 10) % n;
    }


    // [OK!]
    this.position = machine.position;


    this.dropControl = function (moveData) {

        var rulesSet = machine.getRulesSet(moveData.SECOND_STEP);
        var possibleSteps = machine.getExchanceRules(moveData.SECOND_STEP);
        var secondCircle = [];

        for (var i = 0; i < rulesSet.length; i++) {
            var result = possibleSteps[i] + rulesSet[i];
            secondCircle.push(result);
        }

        return secondCircle;




    }

    // [OK!]
    this.grids = {
        horizon: [],
        vertical: []
    };

    // [OK!]
    this.gridsIndex = {
        horizon: [],
        vertical: []
    };

    // [OK!]
    this.createGrids = function () {

        var x = machine.x;
        var y = machine.y;

        for (var i = 0; i < y; i++) {
            this.grids.horizon[i] = [];
            this.gridsIndex.horizon[i] = [];
            for (var k = (i * x); k < ((i * x) + x); k++) {
                this.grids.horizon[i].push(game.virtualBoard[k]);
                this.gridsIndex.horizon[i].push(k);
            }
        }

        for (var i = 0; i < x; i++) {
            this.grids.vertical[i] = [];
            this.gridsIndex.vertical[i] = [];
            for (var k = i; k < (x * y) + i; k += x) {
                this.grids.vertical[i].push(game.virtualBoard[k]);
                this.gridsIndex.vertical[i].push(k);
            }
        }

    }

    // [OK!]
    this.whichGrid = function (index) {

        var whichPack = {}

        for (var i = 0; i < this.gridsIndex.horizon.length; i++) {
            //            console.log("horizon", whichPack);
            var result = this.gridsIndex.horizon[i].indexOf(index);

            if (result > -1) {
                whichPack.horizon = this.gridsIndex.horizon[i];
            }

        }

        for (var i = 0; i < this.gridsIndex.vertical.length; i++) {
            //            console.log("vertical", whichPack);
            var result = this.gridsIndex.vertical[i].indexOf(index);

            if (result > -1) {
                whichPack.vertical = this.gridsIndex.vertical[i];
            }

        }
        console.log(whichPack);
        return whichPack;

    }

    // [OK!]
    this.isItDone = function (index) {

        var indexHorizon = this.whichGrid(index).horizon.indexOf(index);
        var indexVertical = this.whichGrid(index).vertical.indexOf(index);

        var temp = [[], [], [], [], [], []];


        for (var i = indexHorizon; i > indexHorizon - 3; i--) {
            temp[0].push(this.whichGrid(index).horizon[i]);
        }

        for (var i = indexHorizon; i < indexHorizon + 3; i++) {
            temp[1].push(this.whichGrid(index).horizon[i]);
        }

        for (var i = indexVertical; i > indexVertical - 3; i--) {
            temp[2].push(this.whichGrid(index).vertical[i]);
        }

        for (var i = indexVertical; i < indexVertical + 3; i++) {
            temp[3].push(this.whichGrid(index).vertical[i]);
        }

        for (var i = indexHorizon - 1; i < indexHorizon + 2; i++) {
            temp[4].push(this.whichGrid(index).horizon[i]);
        }

        for (var i = indexVertical - 1; i < indexVertical + 2; i++) {
            temp[5].push(this.whichGrid(index).vertical[i]);
        }

        console.log(temp);


        var targetItem = game.virtualBoard[index];
        //            document.querySelectorAll('.slot')[index]
        //            .children[0]
        //            .getAttribute('class')
        //            .split(' ')[1];


        // [OK!]
        for (var i = 0; i < temp.length; i++) {

            var controlMemory = [];

            for (var j = 0; j < temp[i].length; j++) {

                if (undefined !== temp[i][j]) {

                    if (temp[i][j] === index) {


                        var tempItem = game.virtualBoard[index];

                    } else {

                        var tempItem = game.virtualBoard[temp[i][j]];

                    }


                    controlMemory.push(tempItem);


                }


            }

            console.log(controlMemory);


            var result = arrayElementCounter(controlMemory);

            if (result[targetItem] === 3) {
                return true;
                break;
            }

        }



        return false;

    }


    this.boardAnalyze = function () {


        var a = this.grids.horizon;
        var horizonDefine = [];
        for (var i = 0; i < a.length; i++) {
            for (j = 0; j < a[i].length; j++) {

                if (a[i][j] == a[i][j + 1] && a[i][j] == a[i][j + 2]) {
                    horizonDefine.push([i, j, j + 1, j + 2]);

                    game.virtualBoard[(i * game.x) + j] = undefined;
                    game.virtualBoard[(i * game.x) + j + 1] = undefined;
                    game.virtualBoard[(i * game.x) + j + 2] = undefined;
                }
                //                console.log(a[i][j]);


            }
        }

        var b = this.grids.vertical;
        var verticalDefine = [];
        for (var i = 0; i < b.length; i++) {
            for (j = 0; j < b[i].length; j++) {

                if (b[i][j] == b[i][j + 1] && b[i][j] == b[i][j + 2]) {
                    verticalDefine.push([i, j, j + 1, j + 2]);
                    game.virtualBoard[(i * game.y) + j] = undefined;
                    game.virtualBoard[(i * game.y) + j + 1] = undefined;
                    game.virtualBoard[(i * game.y) + j + 2] = undefined;
                }
                //                console.log(b[i][j]);
            }
        }

        console.log(horizonDefine, verticalDefine);



        ctrl.createGrids();
    }

    this.isThereEmpty = function () {
        var dizi = this.grids.vertical[0].length;
        var tempGrid = [];
        var emptySlot = 0;

        this.frameStorage.push(game.virtualBoard);
        do {

            console.log("asd");
            for (var i = 0; i < dizi; i++) {
                var sira = this.grids.horizon[i].length;

                for (var k = 0; k < sira; k++) {

                    if (this.grids.horizon[i][k] == undefined) {

                        this.frameStorage.push(game.virtualBoard);

                        if (i == 0) {
                            var yeni = game.items[zeroStartRand(game.items.length)]
                            this.grids.horizon[i][k] = yeni;

                            this.frameStorage.push(game.virtualBoard);
                            //	console.log(game.virtualBoard);
                            //	console.log("ilk satır");
                            //							this.frameStorage.push(game.virtualBoard);

                        } else {
                            this.grids.horizon[i][k] = this.grids.horizon[i - 1][k];
                            this.grids.horizon[i - 1][k] = undefined;

                            this.frameStorage.push(game.virtualBoard);
                            //	console.log(game.virtualBoard);
                            //	console.log("sonraki satırlar");
                            //							this.frameStorage.push(game.virtualBoard);

                        }

                    }
                }

                //                for (var x = 0; x < this.grids.horizon.length; x++) {
                //                    temmpGrid = tempGrid.concat(this.grids.horizon[x]);
                //                }
                //                game.virtualBoard = tempGrid;
            }

            for (var q = 0; q < this.grids.horizon.length; q++) {
                if (arrayElementCounter(this.grids.horizon[q])[undefined] > 0) {
                    console.log('undefined bulundu');
                    emptySlot = 1;
                    break;
                } else {
                    emptySlot = 0;
                }

            }
        } while (emptySlot != 0);
        //		console.log("game.virtualBoard");
        //		console.log(game.virtualBoard);

        var tempGrid = [];

        for (var x = 0; x < this.grids.horizon.length; x++) {
            tempGrid = tempGrid.concat(this.grids.horizon[x]);
        }

        game.virtualBoard = tempGrid;
        ctrl.createGrids();

    }

    this.frameStorage = [];

}
