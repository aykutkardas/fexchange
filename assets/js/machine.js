function GameMachine(x, y) {

    // [OK!]
    this.x = x;
    this.y = y;

    // [OK!]
    // Tüm pozisyon grupları tutucusu.
    this.position = {
        edgeTop: [],
        edgeLeft: [],
        edgeBottom: [],
        edgeRight: [],
        middle: [],
        allPositions: [],
        edgePositions: [],
        topLeft: [],
        topRight: [],
        bottomLeft: [],
        bottomRight: [],
        top: [],
        left: [],
        bottom: [],
        right: []
    };

    // [OK!]
    // Hareket kural formülleri.
    this.rulesFormule = {
        topLeft: [0, 1, x, 0],
        topRight: [0, 0, x, -1],
        bottomLeft: [-x, 1, 0, 0],
        bottomRight: [-x, 0, 0, -1],
        top: [0, 1, x, -1],
        left: [-x, 1, x, 0],
        bottom: [-x, 1, 0, -1],
        right: [-x, 0, x, -1],
        middle: [-x, 1, x, -1]
    }

    // [OK!]
    // Tüm pozisyonları gruplandır.
    this.createPosition = function () {

        var pos = this.position;
        // Tüm pozisyonları ekle.
        for (var i = 0; i < (this.x * this.y); i++) {
            pos.allPositions.push(i);
        }

        // Üst kenardaki pozisyonları ekle.
        for (var i = 0; i < (this.x); i++) {
            pos.edgeTop.push(i);
            pos.edgePositions.push(i);
        }

        // Sol kenardaki pozisyonları ekle.
        for (var i = 0; i < (this.x * this.y); i += this.x) {
            pos.edgeLeft.push(i);
            pos.edgePositions.push(i);
        }

        // Alt kenardaki pozsiyonları ekle.
        var bottomEdgeStartPosition = pos.edgeLeft[pos.edgeLeft.length - 1];
        for (var i = bottomEdgeStartPosition; i < bottomEdgeStartPosition + this.x; i++) {
            pos.edgeBottom.push(i);
            pos.edgePositions.push(i);
        }

        // Sağ kenardaki pozisyonları ekle.
        var rightEdgeStartPosition = pos.edgeTop[pos.edgeTop.length - 1];
        for (var i = rightEdgeStartPosition; i < (this.x * this.y); i += this.x) {
            pos.edgeRight.push(i);
            pos.edgePositions.push(i);
        }

        // Ortadaki pozsiyonları ekle.
        for (var i = 0; i < pos.allPositions.length; i++) {
            if (pos.edgePositions.indexOf(pos.allPositions[i]) == -1) {
                pos.middle.push(pos.allPositions[i]);
            }
        }

        pos.topLeft.push(pos.edgeTop[0]);
        pos.topRight.push(pos.edgeTop[pos.edgeTop.length - 1]);
        pos.bottomLeft.push(pos.edgeBottom[0]);
        pos.bottomRight.push(pos.edgeBottom[pos.edgeBottom.length - 1]);

        var top = pos.edgeTop.slice(1, pos.edgeTop.length - 1);
        var left = pos.edgeLeft.slice(1, pos.edgeLeft.length - 1);
        var bottom = pos.edgeBottom.slice(1, pos.edgeBottom.length - 1);
        var right = pos.edgeRight.slice(1, pos.edgeRight.length - 1);

        pos.top = top;
        pos.left = left;
        pos.bottom = bottom;
        pos.right = right;


    };

    // [OK!]
    // Verilen indexin hangi grupta olduğunu döndürür.
    this.whereIm = function (index) {
        var pos = this.position;
        var list = [pos.topLeft, pos.topRight, pos.bottomLeft, pos.bottomRight, pos.top, pos.left, pos.bottom, pos.right, pos.middle];

        for (var i = 0; i < list.length; i++) {
            var control = list[i].indexOf(index);
            if (control > -1) {
                switch (i) {

                    case 0:
                        return "topLeft";
                        break;
                    case 1:
                        return "topRight";
                        break;
                    case 2:
                        return "bottomLeft";
                        break;
                    case 3:
                        return "bottomRight";
                        break;
                    case 4:
                        return "top";
                        break;
                    case 5:
                        return "left";
                        break;
                    case 6:
                        return "bottom";
                        break;
                    case 7:
                        return "right";
                        break;
                    case 8:
                        return "middle";
                        break;
                    default:
                        console.log('Bug here: Function name: whereIm();');
                        break;

                }
            }
        }
    }

    // [OK!]
    // Verilen indexin hangi slotlara gidebileceğini döndürür.
    this.getExchanceRules = function (index) {

        var positionGroup = this.whereIm(index);
        var possibleSteps = [];
        for (var i = 0; i < 4; i++) {
            possibleSteps.push(index + this.rulesFormule[positionGroup][i]);
        }

        return possibleSteps;

    }

    // [OK!]
    this.getRulesSet = function (index) {
        var positionGroup = this.whereIm(index);
        return this.rulesFormule[positionGroup];
    }


}
