function GameControl(machine) {

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

    this.grids = {
        horizon: [],
        vertical: []
    };
    this.gridsIndex = {
        horizon: [],
        vertical: []
    }
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

    this.whichGrid = function (index) {

        var whichPack = {}

        for (var i = 0; i < this.gridsIndex.horizon.length; i++) {
            console.log("horizon", whichPack);
            var result = this.gridsIndex.horizon[i].indexOf(index);

            if (result > -1) {
                whichPack.horizon = this.gridsIndex.horizon[i];
            }

        }

        for (var i = 0; i < this.gridsIndex.vertical.length; i++) {
            console.log("vertical", whichPack);
            var result = this.gridsIndex.vertical[i].indexOf(index);

            if (result > -1) {
                whichPack.vertical = this.gridsIndex.vertical[i];
            }

        }

        return whichPack;

    }

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



        var boolStorage = [[], [], [], [], [], []];

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
                        //    var tempItem = document.querySelectorAll('.slot')[index]
                        //        .children[0]
                        //        .getAttribute('class')
                        //        .split(' ')[1];

                        var tempItem = game.virtualBoard[index];

                    } else {

                        var tempItem = game.virtualBoard[temp[i][j]];

                    }

                    //                    if (controlMemory.indexOf(tempItem) > -1) {
                    //                        boolStorage[i].push(true);
                    //                    }

                    controlMemory.push(tempItem);

                }


            }


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
                console.log(a[i][j]);


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
                console.log(b[i][j]);
            }
        }

        console.log(horizonDefine, verticalDefine);




    }


}
