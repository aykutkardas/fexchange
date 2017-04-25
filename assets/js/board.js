function GameBoard(name, opt) {
    var settings = {
        x: opt.x || 5,
        y: opt.y || 5,
        target: opt.target || "body",
        typeSize: opt.typeSize || 5,
        item: {
            width: opt.item.width || 100,
            height: opt.item.height || 100
        }
    }

    this.x = settings.x;
    this.y = settings.y;


    // 0 ile verilen parametre arasından random bir sayı döner.
    function zeroStartRand(n) {
        return Math.round(Math.random() * 10) % n;
    }

    // İtem class larını tutar.
    this.items = [];

    // Oyun tahtasını oluşturur.
    this.createBoard = function () {

        // İtem classlarını oluşturur.
        for (var i = 0; i < settings.typeSize; i++) {
            this.items.push('g-b-item' + i);
        }

        // Oyun tahtasını oluturma.
        var board = document.createElement('div');
        board.id = "board";
        board.style.width = settings.x * settings.item.width;
        board.style.height = settings.y * settings.item.height;
        document.querySelector(settings.target).appendChild(board);

        // Tahta içerisindeki slotları oluşturma.
        for (var i = 0; i < (settings.x * settings.y); i++) {

            var slot = document.createElement('div');
            slot.id = "s" + i;
            slot.className = "slot";
            slot.style.width = settings.item.width;
            slot.style.height = settings.item.height;
            document.querySelector("#board").appendChild(slot);

        }

        // Slot içerisindeki itemleri oluşturma.
        for (var i = 0; i < (settings.x * settings.y); i++) {

            var randomClassName = this.items[zeroStartRand(this.items.length)];
            var itemTemplate = "<div class='item " + randomClassName + "' id='item" + i + "'>.</div>";
            document.querySelector("#s" + i).innerHTML = itemTemplate;
        }

        // [Use Qirpi]
        _('.item')
            .css({
                width: settings.item.width,
                height: settings.item.height
            })
            .attr("draggable", "true")
            .attr("ondragstart", name + ".drag(event)");

        _('.slot')
            .attr('ondrop', name + '.drop(event)')
            .attr('ondragover', name + '.sweep(event)');





    }

    // Geçici veri deposu.
    this.tempStorage = {};

    // Sürüklemeye başlama fonksiyonu.
    this.drag = function (e) {

        var targetElemenetPosition = parseInt(e.target.parentElement.id.slice(1, 100));
        this.tempStorage['FIRST_STEP'] = targetElemenetPosition;
        this.tempStorage['NEXT_STEP'] = mach.getExchanceRules(targetElemenetPosition);
        e.dataTransfer.setData("TARGET_ID", e.target.id);


    }

    // Sürükleme fonksiyonu.
    this.sweep = function (e) {

        e.preventDefault();

    }

    // Sürükleme bitiş fonksiyonu.
    this.drop = function (e) {

        e.preventDefault();
        var targetElemenetPosition = parseInt(e.target.parentElement.id.slice(1, 100));
        this.tempStorage['SECOND_STEP'] = targetElemenetPosition;

        if (this.tempStorage['NEXT_STEP'].indexOf(targetElemenetPosition) > -1) {
            var targetItemID = e.dataTransfer.getData("TARGET_ID");
            e.target.parentElement.appendChild(document.querySelector("#" + targetItemID));

            document.querySelector("#s" + this.tempStorage['FIRST_STEP']).appendChild(e.target);
        }

    }

}
