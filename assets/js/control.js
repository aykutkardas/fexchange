function GameControl(machine) {

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

    this.createGrids = function () {

        var x = machine.x;
        var y = machine.y;

        for (var i = 0; i < y; i++) {
            this.grids.horizon[i] = [];
            for (var k = (i * x); k < ((i * x) + x); k++) {
                this.grids.horizon[i].push(k);
            }
        }

        for (var i = 0; i < x; i++) {
            this.grids.vertical[i] = [];
            for (var k = i; k < (x * y) + i; k += x) {
                this.grids.vertical[i].push(k);
            }
        }

    }

    this.whichGrid = function (index) {

        var whichPack = {}

        for (var i = 0; i < this.grids.horizon.length; i++) {

            var result = this.grids.horizon[i].indexOf(index);

            if (result > -1) {
                whichPack.horizon = this.grids.horizon[i];
            }

        }

        for (var i = 0; i < this.grids.vertical.length; i++) {

            var result = this.grids.vertical[i].indexOf(index);

            if (result > -1) {
                whichPack.vertical = this.grids.vertical[i];
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

        var boolStorage = [];
        var controlMemory = [];
        for (var i = 0; i < temp.length; i++) {
            for (var j = 0; j < temp[i].length; j++) {
                var tempItem = document.querySelector('.slot').firstChild().getAttribute('class').split(' ')[1];
                controlMemory.push(tempItem);
                if (controlMemory.length > 0) {
                    if (controlMemory.indexOf(tempItem)) {
                        boolStorage.push(true);
                    }
                }

                if (i0 === i1) {
                    return true;
                } else {
                    return false;
                }


            }
        }



        return temp;

    }


}
