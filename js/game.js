var loadingMenu = function() {
    var loadingScreen = new Kinetic.Layer({});
    var wait = new Kinetic.Text({text: "LOADING...", fontSize: 50, x: 50, y: 50, fill: "white", fontStyle: "bold"});
    wait.setWidth(wait.getTextWidth());
    wait.setHeight(wait.getTextHeight());
    wait.position({x: WIDTH / 2 - wait.getWidth() / 2, y: HEIGHT / 2 - wait.getHeight() / 2});
    //var waitBg = new Kinetic.Rect({width: WIDTH, height: HEIGHT, x: 0, y: 0, fill: "black"});
    var loadingBar = new Kinetic.Rect({
        width: 0,
        height: 25,
        x: WIDTH / 2 - wait.getWidth() / 2,
        y: HEIGHT / 2 - 25 / 2 + wait.getHeight() + 50,
        fill: "white"
    });
    var loadingBarPercent = new Kinetic.Text({
        fill: "#888888",
        text: "0%",
        fontSize: 20
    });
    loadingBarPercent.setWidth(loadingBarPercent.getTextWidth());
    loadingBarPercent.setHeight(loadingBarPercent.getTextHeight());
    loadingBarPercent.position({x: WIDTH / 2 - loadingBarPercent.getTextWidth() / 2, y: loadingBar.getAttr("y") + loadingBar.getHeight() / 2 - loadingBarPercent.getHeight() / 2});
    //loadingScreen.add(waitBg);
    loadingScreen.add(wait);
    loadingScreen.add(loadingBar);
    loadingScreen.add(loadingBarPercent);
    STAGE.add(loadingScreen);
    STAGE.draw();

    var loadingLoop = function () {
        //console.log("Looping with values: " + loadedImageCount + " / " + imageCount);
        setTimeout(function () {
            if (loadedImageCount < imageCount) {
                loadingBar.setWidth((loadedImageCount / imageCount) * wait.getWidth());
                loadingBarPercent.setText(Math.round(loadedImageCount / imageCount * 100) + "%");
                loadingBarPercent.setWidth(loadingBar.getWidth());
                loadingBarPercent.position({x: WIDTH / 2 - loadingBarPercent.getTextWidth() / 2, y: loadingBar.getAttr("y") + loadingBar.getHeight() / 2 - loadingBarPercent.getHeight() / 2});
                //console.log(loadingBarPercent);
                STAGE.draw();
                loadingLoop();
            } else {
                //console.log("Quitting with values: " + loadedImageCount + " / " + imageCount);
                loadingScreen.destroy();
                //initializePlayer();
                if (WIDTH < HEIGHT) {
                    recommendTurnScreen();
                } else {
                    titleMenu();
                }
                //titleMenu();
            }
        }, 250);
    };
    loadingLoop();

}();

var recommendTurnScreen = function() {
    var black = new Kinetic.Layer({fill: 'black'});
    var text = new Kinetic.Text({width: WIDTH, height: HEIGHT, align: "center", text: "Landscape mode is recommended\n\nWait 5 seconds to ignore...", fill: "white", fontSize: 20});
    var textHeight = text.getTextHeight() * (text.attrs.text.split("\n").length);
    text.offsetY((-1 * HEIGHT / 2) + (textHeight / 2));

    black.add(text);
    STAGE.add(black);

    var waitTime = 0;

    var waitLoop = function () {
        //console.log("Waiting for screen turn...");
        setTimeout(function () {
            if (waitTime >= 5000) {
                black.destroy();
                titleMenu();
            } else if (WIDTH > HEIGHT) {
                black.destroy();
                titleMenu();
            } else {
                waitTime += 250;
                waitLoop();
            }
        }, 250);
    };
    waitLoop();
};

var titleMenu = function() {
    //console.log("Continuing on...");
    var titleScreen = new Kinetic.Layer({});

    var titleBg = new Kinetic.Image({image: IMAGES["titleBackground.jpg"], x: 0, y: 0});
    fitImageFullscreen(titleBg);

    titleScreen.add(titleBg);

    var bEnglish = new Button({
        width: 200,
        height: 75,
        text: "ENGLISH",
        fill: "#44FF44",
        fontSize: 30,
        y: HEIGHT / 2 + 50 - 50 - 75 / 2,
        layer: titleScreen
    });
    var bEspanol = new Button({
        width: 200,
        height: 75,
        text: "ESPAÑOL",
        fill: "#FF4444",
        fontSize: 30,
        y: HEIGHT / 2 + 50 + 50 - 75 / 2,
        layer: titleScreen
    });

    var title = new Kinetic.Text({text: "MIGRANT", fontSize: 50, x: 50, y: 50, fill: "black", fontStyle: "bold"});
    title.setWidth(title.getTextWidth());
    title.setHeight(title.getTextHeight());
    title.position({x: WIDTH / 2 - title.getWidth() / 2, y: HEIGHT / 2 - title.getHeight() / 2 - 100});
    titleScreen.add(title);

    STAGE.add(titleScreen);

    bEnglish.onActivate = function () {
        LANGUAGE = 0;
        initializePlayer();
        titleScreen.destroy();
        backgroundMenu();
        STAGE.draw();
    };

    bEspanol.onActivate = function () {
        LANGUAGE = 1;
        initializePlayer();
        titleScreen.destroy();
        backgroundMenu();
        STAGE.draw();
    };
};

var backgroundMenu = function() {
    var bgselect = new Kinetic.Layer({});
    var b1 = new Button({width: 50, height: (HEIGHT - 10)/5, x: 5, y: ((HEIGHT - 10) / 5) * 0 + 5, text: "1", fontSize: 30, layer: bgselect});
    var b2 = new Button({width: 50, height: (HEIGHT - 10)/5, x: 5, y: ((HEIGHT - 10) / 5) * 1 + 5, text: "2", fontSize: 30, layer: bgselect});
    var b3 = new Button({width: 50, height: (HEIGHT - 10)/5, x: 5, y: ((HEIGHT - 10) / 5) * 2 + 5, text: "3", fontSize: 30, layer: bgselect});
    var b4 = new Button({width: 50, height: (HEIGHT - 10)/5, x: 5, y: ((HEIGHT - 10) / 5) * 3 + 5, text: "4", fontSize: 30, layer: bgselect});
    var b5 = new Button({width: 50, height: (HEIGHT - 10)/5, x: 5, y: ((HEIGHT - 10) / 5) * 4 + 5, text: "5", fontSize: 30, layer: bgselect});

    var highlightButton = function(button) {
        b1.base.setAttrs({stroke: "black", strokeWidth: 1});
        b2.base.setAttrs({stroke: "black", strokeWidth: 1});
        b3.base.setAttrs({stroke: "black", strokeWidth: 1});
        b4.base.setAttrs({stroke: "black", strokeWidth: 1});
        b5.base.setAttrs({stroke: "black", strokeWidth: 1});
        button.base.setAttrs({stroke: "red", strokeWidth: 3});
        button.moveToTop();
        bgselect.draw();
    };

    b1.onActivate = function() { info.message.text(DIALOG.background1[LANGUAGE]); highlightButton(this); BACKGROUND = 1; };
    b2.onActivate = function() { info.message.text(DIALOG.background2[LANGUAGE]); highlightButton(this); BACKGROUND = 2; };
    b3.onActivate = function() { info.message.text(DIALOG.background3[LANGUAGE]); highlightButton(this); BACKGROUND = 3; };
    b4.onActivate = function() { info.message.text(DIALOG.background4[LANGUAGE]); highlightButton(this); BACKGROUND = 4; };
    b5.onActivate = function() { info.message.text(DIALOG.background5[LANGUAGE]); highlightButton(this); BACKGROUND = 5; };

    var go = new Button({width: 150, height: 50, fill: "#44FF44", text: DIALOG.continue[LANGUAGE], x: WIDTH - 160, y: HEIGHT - 60});
    go.onActivate = function() {
        switch (BACKGROUND) {
            case 1:
                REGION = REGIONS.EL_SALVADOR;
                ORIGIN = REGIONS.EL_SALVADOR;
                US_DOLLARS = 440;
                break;
            case 2:
                REGION = REGIONS.MEXICO;
                ORIGIN = REGIONS.MEXICO;
                PESOS = 6500;
                AILMENTS.push(AILMENT_TYPES.BROKEN_LIMB);
                //addEffect(AILMENT_TYPES.BROKEN_LIMB, AILMENTS);
                break;
            case 3:
                REGION = REGIONS.HONDURAS;
                ORIGIN = REGIONS.HONDURAS;
                LEMPIRAS = 9850;
                PERKS.push(PERK_TYPES.OUTDOORSMAN);
                //addEffect(PERK_TYPES.OUTDOORSMAN, PERKS);
                break;
            case 4:
                REGION = REGIONS.GUATEMALA;
                ORIGIN = REGIONS.GUATEMALA;
                QUETZALES = 3000;
                AILMENTS.push(AILMENT_TYPES.TUBERCULOSIS);
                //addEffect(AILMENT_TYPES.TUBERCULOSIS, AILMENTS);
                break;
            case 5:
                REGION = REGIONS.EL_SALVADOR;
                ORIGIN = REGIONS.EL_SALVADOR;
                US_DOLLARS = 400;
                PERKS.push(PERK_TYPES.LIGHTWEIGHT);
                //addEffect(PERK_TYPES.LIGHTWEIGHT, PERKS);
                break;
        }
        updateGroundColor();
        storeMenu();
        bgselect.destroy();
    };

    var info = new Pane({width: WIDTH - 10 - 50, height: HEIGHT - 10, x: 55, y: 5, title: DIALOG.backgroundTitle[LANGUAGE], center: false});
    info.button.destroy();
    info.setDraggable(false);
    info._onDown = function() {};

    bgselect.add(b1);
    bgselect.add(b2);
    bgselect.add(b3);
    bgselect.add(b4);
    bgselect.add(b5);
    bgselect.add(info);
    bgselect.add(go);

    STAGE.add(bgselect);

    b1.onActivate();
};

var storeMenu = function() {
    var store = new Kinetic.Layer({});
    var bg = new Kinetic.Rect({width: WIDTH, height: HEIGHT, x: 0, y: 0, fill:"black"});
    store.add(bg);
    var title = new Annotation({width: 100, height: 50, x: WIDTH - 100 - 10, y: 10,fontSize: 30, text: DIALOG.store[LANGUAGE], layer: store, fill: "black", fontColor: "white"});
    var embark;
    if (GAME_STARTED == false) {
        embark = new Button({width: 100, height: 50, x: WIDTH - 100 - 10, y: HEIGHT - 50 - 10, text: DIALOG.embark[LANGUAGE], layer: store, fill: "#44FF44"});
    } else {
        embark = new Button({width: 100, height: 50, x: WIDTH - 100 - 10, y: HEIGHT - 50 - 10, text: DIALOG.leave[LANGUAGE], layer: store, fill: "#44FF44"});
    }

    // Should apply some random deviation to standard price, for the heck of realism..!
    var getLocalPrice = function(usdPrice) {
        switch (REGION) {
            case REGIONS.HONDURAS:
                return roundTwoPlaces(usdPrice * 21);
            case REGIONS.GUATEMALA:
                return roundTwoPlaces(usdPrice * 7.65);
            case REGIONS.MEXICO:
                return roundTwoPlaces(usdPrice * 14.57);
            case REGIONS.SONORAN_DESERT:
            case REGIONS.EL_SALVADOR:
            default:
                return usdPrice;
        }
    };

    var getLocalWallet = function() {
        switch (REGION) {
            case REGIONS.HONDURAS:
                return LEMPIRAS;
            case REGIONS.GUATEMALA:
                return QUETZALES;
            case REGIONS.MEXICO:
                return PESOS;
            case REGIONS.SONORAN_DESERT:
            case REGIONS.EL_SALVADOR:
            default:
                return US_DOLLARS;
        }
    };

    var setLocalWallet = function (amount) {
        switch (REGION) {
            case REGIONS.HONDURAS:
                LEMPIRAS = amount; break;
            case REGIONS.GUATEMALA:
                QUETZALES = amount; break;
            case REGIONS.MEXICO:
                PESOS = amount; break;
            case REGIONS.SONORAN_DESERT:
            case REGIONS.EL_SALVADOR:
            default:
                US_DOLLARS = amount; break;
        }
    };

    var getSign = function() {
        switch (REGION) {
            case REGIONS.HONDURAS:
                return "L";
            case REGIONS.GUATEMALA:
                return "Q";
            case REGIONS.MEXICO:
            case REGIONS.SONORAN_DESERT:
            case REGIONS.EL_SALVADOR:
            default:
                return "$";
        }
    };

    var getAccronym = function() {
        switch (REGION) {
            case REGIONS.HONDURAS:
                return "HNL";
            case REGIONS.GUATEMALA:
                return "GTQ";
            case REGIONS.MEXICO:
                return "MXN";
            case REGIONS.SONORAN_DESERT:
            case REGIONS.EL_SALVADOR:
            default:
                return "USD";
        }
    };

    // Buy food, buy water, exchange currencies.
    // 1kg food = 27.36 Quetzales -> 3.91 USD (2.22)
    // 1L water = 4.85 Quetzales -> 0.63 USD (0.56)
    var foodPrice = Math.random() * (2.50 - 1.50) + 1.50;
    var waterPrice = Math.random() * (0.7 - 0.3) + 0.3;

    var updateLabels = function() {
        usdLabel.text.setText(DIALOG.usdollar[LANGUAGE] + "\n" + roundTwoPlaces(US_DOLLARS) + " USD");

        lempiraLabel.text.setText(DIALOG.honduranLempira[LANGUAGE] + "\n" + roundTwoPlaces(LEMPIRAS) + " HNL");
        quetzalLabel.text.setText(DIALOG.guatemalanQuetzal[LANGUAGE] + "\n" + roundTwoPlaces(QUETZALES) + " GTQ");
        pesoLabel.text.setText(DIALOG.mexicanPeso[LANGUAGE] + "\n" + roundTwoPlaces(PESOS) + " MXN");

        waterLabel.text.setText(DIALOG.water[LANGUAGE] + ": " + roundTwoPlaces(getLocalPrice(waterPrice)) + " " + getAccronym() + "\n" + roundTwoPlaces(WATER) + "L");
        foodLabel.text.setText(DIALOG.food[LANGUAGE] + ": " + roundTwoPlaces(getLocalPrice(foodPrice)) + " "  + getAccronym() + "\n" + roundTwoPlaces(FOOD) + "kg");
        store.draw();
    };

    var buttonHeight = (HEIGHT - (10 * 6)) / 5;
    var buttonWidth = ((WIDTH - (10 * 5)) / 8) * 3;

    var waterLabel = new Annotation({x: 10, y: buttonHeight * 0 + 10, height: buttonHeight, width: buttonWidth, text: DIALOG.water[LANGUAGE] + ": " + getLocalPrice(waterPrice) + " " + getAccronym() + "\n" + roundTwoPlaces(WATER) + "L", layer: store});
    var buyWater = new Button({x: waterLabel.base.getWidth() + 20, y: 10, width: buttonWidth / 3, height: buttonHeight / 2, fill: "green", text: "+ 1L", layer: store});
    var sellWater = new Button({x: waterLabel.base.getWidth() + 20, y: buyWater.base.getHeight() + 10, width: buttonWidth / 3, height: buttonHeight /2, fill: "red", text: "- 1L", layer: store});

    var foodLabel = new Annotation({x: 10, y: buttonHeight * 1 + 10 * 2, height: buttonHeight, width: buttonWidth, text: DIALOG.food[LANGUAGE] + ": " + getLocalPrice(foodPrice) + " "  + getAccronym() + "\n" + roundTwoPlaces(FOOD) + "kg", layer: store});
    var buyFood = new Button({x: foodLabel.base.getWidth() + 20, y: foodLabel.getAttr("y"), width: buttonWidth / 3, height: buttonHeight / 2, fill:"green", text: "+ 1kg", layer: store});
    var sellFood = new Button({x: foodLabel.base.getWidth() + 20, y: foodLabel.getAttr("y") + buyFood.base.getHeight(), width: buttonWidth / 3, height: buttonHeight / 2, fill: "red", text: "- 1kg", layer: store});

    var overEncumbered = null;

    buyWater.onActivate = function() {
        if (getLocalWallet() >= getLocalPrice(waterPrice) && (FOOD + WATER) < MAX_CARRY_WEIGHT) {
            setLocalWallet(getLocalWallet() - getLocalPrice(waterPrice));
            WATER++;
            updateLabels();
        }
        if ((FOOD + WATER) >= MAX_CARRY_WEIGHT && (overEncumbered == null || overEncumbered == undefined || overEncumbered.parent == null)) {
            if (overEncumbered == null || overEncumbered == undefined) {
                overEncumbered = new Pane({message: DIALOG.overEncumbered[LANGUAGE], center: true, height: 100, width: 200, layer: store});
            } else if(overEncumbered.parent == null) {
                overEncumbered = null;
                overEncumbered = new Pane({message: DIALOG.overEncumbered[LANGUAGE], center: true, height: 100, width: 200, layer: store});
            }
        }
    };
    sellWater.onActivate = function() {
        if (WATER > 0) {
            setLocalWallet(getLocalWallet() + getLocalPrice(waterPrice));
            WATER--;
            updateLabels();
        }
    };

    buyFood.onActivate = function() {
        if (getLocalWallet() >= getLocalPrice(foodPrice) && (FOOD + WATER) < MAX_CARRY_WEIGHT ) {
            setLocalWallet(getLocalWallet() - getLocalPrice(foodPrice));
            FOOD++;
            updateLabels();
        }
        if ((FOOD + WATER) >= MAX_CARRY_WEIGHT && (overEncumbered == null || overEncumbered == undefined || overEncumbered.parent == null)) {
            if (overEncumbered == null || overEncumbered == undefined) {
                overEncumbered = new Pane({message: DIALOG.overEncumbered[LANGUAGE], center: true, height: 100, width: 200, layer: store});
            } else if(overEncumbered.parent == null) {
                overEncumbered = null;
                overEncumbered = new Pane({message: DIALOG.overEncumbered[LANGUAGE], center: true, height: 100, width: 200, layer: store});
            }
        }
    };
    sellFood.onActivate = function() {
        if (FOOD > 0) {
            setLocalWallet(getLocalWallet() + getLocalPrice(foodPrice));
            FOOD--;
            updateLabels();
        }
    };

    // Mexico. 1 USD = 14.57 Pesos.         MXN
    // Guatemala. 1 USD = 7.65 Quetzales.   GTQ
    // Honduras. 1 USD = 21 Lempiras.       HNL
    // San Salvador. (They use the USD.)    USD
    // Each foreign currency will be convertible to USD
    // USD will be centralized (since its accepted just about everywhere) and will convert to foreign
    var lempiraLabel = new Annotation({x: 10, y: (HEIGHT - (10 * 6)) / 5 * 4 + 10 * 5, width: buttonWidth, height: buttonHeight, text: DIALOG.honduranLempira[LANGUAGE] + "\n" + roundTwoPlaces(LEMPIRAS) + " HNL", layer: store});
    var lempiraToUsd = new Button({x: lempiraLabel.getAttr("x") + lempiraLabel.getWidth() + 10, y: lempiraLabel.getAttr("y"), width: buttonWidth / 3, height: buttonHeight, text: DIALOG.to[LANGUAGE] + " USD", fill: "green", layer: store});
    var quetzalLabel = new Annotation({x: 10, y: lempiraLabel.getAttr("y") - (10 + buttonHeight), width: buttonWidth, height: buttonHeight, text: DIALOG.guatemalanQuetzal[LANGUAGE] + "\n" + roundTwoPlaces(QUETZALES) + " GTQ", layer: store});
    var quetzalToUsd = new Button({x: quetzalLabel.getAttr("x") + quetzalLabel.getWidth() + 10, y: quetzalLabel.getAttr("y"), width: buttonWidth / 3, height: buttonHeight, text: DIALOG.to[LANGUAGE] + " USD", fill: "green", layer: store});
    var pesoLabel = new Annotation({x: 10, y: quetzalLabel.getAttr("y") - (10 + buttonHeight), width: buttonWidth, height: buttonHeight, text: DIALOG.mexicanPeso[LANGUAGE] + "\n" + roundTwoPlaces(PESOS) + " MXN",layer: store});
    var pesoToUsd = new Button({x: pesoLabel.getAttr("x") + pesoLabel.getWidth() + 10, y: pesoLabel.getAttr("y"), width: buttonWidth / 3, height: buttonHeight, text: DIALOG.to[LANGUAGE] + " USD", fill: "green", layer: store});

    var usdLabel = new Annotation({x: 40 + buttonWidth + buttonWidth / 3 * 2, y: quetzalLabel.getAttr("y"), width: buttonWidth, height: buttonHeight, text: DIALOG.usdollar[LANGUAGE] + "\n" + roundTwoPlaces(US_DOLLARS) + " USD", layer: store});
    var usdToPeso = new Button({x: pesoLabel.getAttr("x") + pesoLabel.getWidth() + pesoToUsd.getWidth() + 20, y: pesoLabel.getAttr("y"), width: buttonWidth / 3, height: buttonHeight, text: DIALOG.to[LANGUAGE] + " MXN", fill: "blue", layer: store});
    var usdToQuetzal = new Button({x: quetzalLabel.getAttr("x") + quetzalLabel.getWidth() + quetzalToUsd.getWidth() + 20, y: quetzalLabel.getAttr("y"), width: buttonWidth / 3, height: buttonHeight, text: DIALOG.to[LANGUAGE] + " GTQ", fill: "yellow", layer: store});
    var usdToLempira = new Button({x: lempiraLabel.getAttr("x") + lempiraLabel.getWidth() + lempiraToUsd.getWidth() + 20, y: lempiraLabel.getAttr("y"), width: buttonWidth / 3, height: buttonHeight, text: DIALOG.to[LANGUAGE] + " HNL", fill: "red", layer: store});

    updateLabels();

    var exchange = function(from, to, rate, increment) {
        increment = increment || 10;
        var amount = 0;
        if (from >= increment) {
            from -= increment;
            amount += increment;
        } else {
            amount = from;
            from = 0;
        }
        to += amount * rate;
        return [from, to];
    };

    lempiraToUsd.onActivate = function() {
        var vals = exchange(LEMPIRAS, US_DOLLARS, 1/21, 210);
        LEMPIRAS = vals[0]; US_DOLLARS = vals[1];
        updateLabels();
    };
    usdToLempira.onActivate = function() {
        var vals = exchange(US_DOLLARS, LEMPIRAS, 21, 10);
        US_DOLLARS = vals[0]; LEMPIRAS = vals[1];
        updateLabels();
    };

    quetzalToUsd.onActivate = function() {
        var vals = exchange(QUETZALES, US_DOLLARS, 1/7.65, 77);
        QUETZALES = vals[0]; US_DOLLARS = vals[1];
        updateLabels();
    };
    usdToQuetzal.onActivate = function() {
        var vals = exchange(US_DOLLARS, QUETZALES, 7.65, 10);
        US_DOLLARS = vals[0]; QUETZALES = vals[1];
        updateLabels();
    };

    pesoToUsd.onActivate = function() {
        var vals = exchange(PESOS, US_DOLLARS, 1/14.57, 150);
        PESOS = vals[0]; US_DOLLARS = vals[1];
        updateLabels();
    };
    usdToPeso.onActivate = function() {
        var vals = exchange(US_DOLLARS, PESOS, 14.57, 10);
        US_DOLLARS = vals[0]; PESOS = vals[1];
        updateLabels();
    };

    if (GAME_STARTED == false) {
        embark.onActivate = function () {
            GAME_STARTED = true;
            store.destroy();
            main();
        };
    } else {
        embark.onActivate = function () {
            store.destroy();
            //main();
        };
    }

    STAGE.add(store);
    STAGE.draw();
};

var main = function() {
    var sky = new Kinetic.Rect({x:0, y: 0, width: WIDTH, height: HEIGHT, fill: "#a8d8fc"}); // new Kinetic.Image({image: IMAGES["sky.jpg"], x: 0, y: 0});
    fitImageFullscreen(sky);
    var ground = new Kinetic.Rect({x: 0, y: HEIGHT / 3 * 2, width: WIDTH, height: HEIGHT / 3, fill: GROUND_COLOR}); // new Kinetic.Image({image: IMAGES["horizon.png"], x: 0, y: 0});
    //fitImageFullscreen(ground);
    //ground.position({x: 0, y: HEIGHT / 4});

    var stars = new Kinetic.Group({width: WIDTH + HEIGHT / 3, height: HEIGHT, x:  -1 * HEIGHT / 3, y:  -1 * HEIGHT / 3});
    for (var i = 0; i < 200; i++) {
        var star = new Kinetic.Star({x: Math.random() * stars.getWidth(), y: Math.random() * stars.getHeight(), numPoints: Math.round(Math.random() * (8 - 4) + 4), innerRadius: Math.random() * 1.5, outerRadius: Math.random() * (5 - 1) + 1, fill: "rgb(" + (Math.round(Math.random() * (255 - 192) + 192)) + ", " + (Math.round(Math.random() * (255 - 192) + 192)) + ", " + (Math.round(Math.random() * (255 - 192) + 192)) + ")"});
        star.angularSpeed = Math.random() * (0.5 + 0.5) - 0.5;
        stars.add(star);
    }


    CHARACTER = new Kinetic.Sprite({
        width: 150,
        height: 250,
        x: 0,
        y: 0,
        image: IMAGES["walkingMan.png"],
        animation: "walking",
        animations:
        {
            walking: [
                //X, Y, Width, Height
                0, 0, 150, 250,
                0, 250, 150, 250,
                0, 500, 150, 250,
                0, 750, 150, 250
            ],
            idle: [
                0, 1000, 150, 250
            ]
        },
        frameRate: 5,
        frameIndex: 0
    });

    CHARACTER.scaleX(HEIGHT * 0.25 / CHARACTER.getHeight());
    CHARACTER.scaleY(HEIGHT * 0.25 / CHARACTER.getHeight());
    CHARACTER.setWidth(150 * CHARACTER.scaleX());
    CHARACTER.setHeight(250 * CHARACTER.scaleY());
    CHARACTER.position({x: WIDTH / 2 - CHARACTER.getWidth() / 2, y: HEIGHT / 6 * 4 - CHARACTER.getHeight() / 2});

    var bInventory = new Button({text: DIALOG.inventory[LANGUAGE], width: 100, height: 50, x: WIDTH - 100 - 10, y: HEIGHT - 50 - 10, layer: ui});
    bInventory.onActivate = function() {
        openInventory();
    };

    var bStatus = new Button({text: DIALOG.status[LANGUAGE], width: 75, height: 50, x: bInventory.x() - 75 - 10, y: HEIGHT - 50 - 10, layer: ui});
    bStatus.onActivate = function() {
        openStatus();
    };

    var bMap = new Button({text: DIALOG.map[LANGUAGE], width: 50, height: 50, x: bStatus.x() - 50 - 10, y: bInventory.y(), layer: ui});
    bMap.onActivate = function() {

        var mapScreen = new Kinetic.Layer({});
        var black = new Kinetic.Rect({width: WIDTH, height: HEIGHT, fill: "black"});
        mapScreen.add(black);

        var map = new Kinetic.Image({image: IMAGES["map.jpg"], x: 0, y: 0});
        fitImageMostScreen(map);
        mapScreen.add(map);

        var bClose = new Button({text: DIALOG.close[LANGUAGE], width: 100, height: 50, x: WIDTH - 100 - 10, y: 10, layer: mapScreen});
        bClose.onActivate = function () {
            mapScreen.destroy();
        };

        STAGE.add(mapScreen);
        STAGE.draw();
    };

    var hungerBar = new Kinetic.Rect({width: 150, height: 20, x: 10, y: HEIGHT - 20 - 10, fill: "#CC4444"});
    var hungerLabel = new Kinetic.Text({width: 150, height: 15, x: 10, y: HEIGHT - 20 + 5 - 10, fill: "black", text: DIALOG.hunger[LANGUAGE], align: "center"});
    var bEat = new Button({x: 10, y: 10, width: 50, height: 50, fill: "red", text: DIALOG.eat[LANGUAGE], layer: ui});

    var thirstBar = new Kinetic.Rect({width: 150, height: 20, x: 10, y: HEIGHT - 40 - 15, fill: "#4444CC"});
    var thirstLabel = new Kinetic.Text({width: 150, height: 15, x: 10, y: HEIGHT - 40 + 5 - 15, fill: "black", text: DIALOG.thirst[LANGUAGE], align: "center"});
    var bDrink = new Button({x: 20 + 50, y: 10, width: 50, height: 50, fill: "blue", text: DIALOG.drink[LANGUAGE], layer: ui});

    var energyBar = new Kinetic.Rect({width: 150, height: 20, x: 10, y: HEIGHT - 60 - 20, fill: "#DDDD44"});
    var energyLabel = new Kinetic.Text({width: 150, height: 15, x: 10, y: HEIGHT - 60 + 5 - 20, fill: "black", text: DIALOG.energy[LANGUAGE], align: "center"});

    var temperatureBar = new Kinetic.Rect({width: 150 / 2, height: 20, x: 10, y: HEIGHT - 80 - 25, fill: "#44CC44"});
    var temperatureLabel = new Kinetic.Text({width: 150, height: 15, x: 10, y: HEIGHT - 80 + 5 - 25, fill: "black", text: DIALOG.temperature[LANGUAGE], align: "center"});
    var bRestWidth = 50;
    if (LANGUAGE == 1) {
        bRestWidth = 75;
    }
    var bRest = new Button({x: 30 + 100, y: 10, width: bRestWidth, height: 50, fill: "yellow", text: DIALOG.rest[LANGUAGE], layer: ui});

    var barLimit = new Kinetic.Line({x: 0, y: 0, points: [10 + 150, HEIGHT - 80 - 25, 10 + 150, HEIGHT - 10], stroke: "black", strokeWidth: 1, tension: 1});

    var bNextCycle = new Button({x: WIDTH - 100 - 10, y: 10, text: DIALOG.nextDay[LANGUAGE], fill: "#44FF44", layer: ui});

    ui.add(hungerBar);
    ui.add(hungerLabel);
    ui.add(thirstBar);
    ui.add(thirstLabel);
    ui.add(energyBar);
    ui.add(energyLabel);
    ui.add(temperatureBar);
    ui.add(temperatureLabel);
    ui.add(barLimit);

    updateBars = function() {
        if (HUNGER <= 0) {
            hungerBar.setWidth(0);
            die(DIALOG.diedOfHunger[LANGUAGE]);
        } else {
            HUNGER = Math.min(HUNGER, 100);
            if (HUNGER < 25) {
                addEffect(AILMENT_TYPES.MALNUTRITION, AILMENTS);
            } else if (HUNGER >= 25) {
                removeEffect(AILMENT_TYPES.MALNUTRITION);
            }
            hungerBar.setWidth((Math.min(HUNGER, 100) / 100) * 150);
        }
        if (THIRST <= 0) {
            thirstBar.setWidth(0);
            die(DIALOG.diedOfThirst[LANGUAGE]);
        } else {
            THIRST = Math.min(THIRST, 100);
            if (THIRST < 25) {
                addEffect(AILMENT_TYPES.DEHYDRATION, AILMENTS);
            } else if (THIRST >= 25) {
                removeEffect(AILMENT_TYPES.DEHYDRATION);
            }
            thirstBar.setWidth((Math.min(THIRST, 100) / 100) * 150);
        }
        if (ENERGY <= 0) {
            energyBar.setWidth(0);
            if (Math.random() > 0.5) {
                die(DIALOG.diedOfExhaustion[LANGUAGE]);
            } else {
                die(DIALOG.diedOfHeartAttack[LANGUAGE]);
            }
        } else {
            ENERGY = Math.min(ENERGY, 100);
            if (ENERGY < 25) {
                addEffect(AILMENT_TYPES.EXHAUSTION, AILMENTS);
            } else if (ENERGY >= 25) {
                removeEffect(AILMENT_TYPES.EXHAUSTION);
            }
            energyBar.setWidth((Math.min(ENERGY, 100) / 100) * 150);
        }
        if (TEMPERATURE <= 32) {
            temperatureBar.setWidth(0);
            temperatureBar.fill("#4488CC");
            die(DIALOG.diedOfHypothermia[LANGUAGE]);
        } else if (TEMPERATURE >= 42) {
            temperatureBar.setWidth(150);
            temperatureBar.fill("#CC8844");
            die(DIALOG.diedOfHyperthermia[LANGUAGE]);
        } else {
            temperatureBar.setWidth(((TEMPERATURE - 32) / 10) * 150);
            if (TEMPERATURE >= 39) {
                temperatureBar.fill("#CC8844");
            } else if (TEMPERATURE <= 35) {
                temperatureBar.fill("#4488CC");
            } else {
                temperatureBar.fill("#44CC44");
            }
        }
        ui.draw();
    };

    updateBars();

    bEat.onActivate = function() {
        if (FOOD >= 1.8) {
            FOOD -= 1.8;
            HUNGER = Math.min(HUNGER + 14.3, 100);
        } else if (FOOD > 0) {
            HUNGER = Math.min(HUNGER + ((FOOD / 1.8) * 14.3), 100);
            FOOD = 0;
        } else {
            new Pane({title: DIALOG.food[LANGUAGE].toUpperCase(), message: DIALOG.outOfFood[LANGUAGE], center: true, layer: ui});
        }
        updateInventory();
        updateBars();
    };

    bDrink.onActivate = function() {
        if (WATER >= 1.5) {
            WATER -= 1.5;
            THIRST = Math.min(THIRST + 25, 100);
            if (TEMPERATURE >= 37.25) {
                TEMPERATURE -= 0.25;
            } else if (TEMPERATURE <= 36.75) {
                TEMPERATURE += 0.25;
            } else {
                TEMPERATURE = 37;
            }
        } else if (WATER > 0) {
            THIRST = Math.min(THIRST + ((WATER / 1.5) * 25), 100);
            WATER = 0;
        } else {
            new Pane({title: DIALOG.water[LANGUAGE].toUpperCase(), message: DIALOG.outOfWater[LANGUAGE], center: true, layer: ui});
        }
        updateInventory();
        updateBars();
    };

    bRest.onActivate = function() {
        var verify = new Pane({width: 300, height: 100, title: DIALOG.rest[LANGUAGE].toUpperCase(), message: DIALOG.verifyRest[LANGUAGE], center: true, buttons: 2, layer: ui});
        verify.button.destroy();
        verify.option1.text.setText(DIALOG.yes[LANGUAGE]);
        verify.option2.text.setText(DIALOG.no[LANGUAGE]);
        verify.option1.base.fill("#44FF44");
        verify.option2.base.fill("#FF4444");
        verify.option1.refreshColors();
        verify.option2.refreshColors();

        verify.option1.onActivate = function() {
            if (!toDay.isRunning() && !toNight.isRunning()) {
                RESTING = true;
                cycle();
                verify.close();
            }
        };

        verify.option2.onActivate = function() {
            verify.close();
        };
        verify.draw();
    };

    var originalColor = ground.fill();

    var toNight = new Kinetic.Animation(function(frame) {
        var percentage = frame.time / 3000;
        if (percentage < 0 || percentage > 1) {
            toNight.stop();
            sky.fill("#001848");
            ground.fill(shadeColor(GROUND_COLOR, -50));
            originalColor = shadeColor(GROUND_COLOR, -50);
            stars.opacity(1);
            if (CHARACTER.animation() == "idle") {
                CHARACTER.animation("walking");
            }
            frame.time = 0;
        } else {
            if (!stars.visible())
                stars.visible(true);
            if (!spinStars.isRunning())
                spinStars.start();
            sky.fill(blendColors("#a8d8fc", "#001848", percentage));
            ground.fill(blendColors(originalColor, shadeColor(GROUND_COLOR, -50), percentage));
            stars.opacity(percentage);
        }
    }, background);

    var toDay = new Kinetic.Animation(function(frame) {
        var percentage = frame.time / 3000;
        if (percentage < 0 || percentage > 1) {
            toDay.stop();
            sky.fill("#a8d8fc");
            ground.fill(GROUND_COLOR);
            originalColor = GROUND_COLOR;
            stars.opacity(0);
            stars.visible(false);
            spinStars.stop();
            if (CHARACTER.animation() == "idle") {
                CHARACTER.animation("walking");
            }
            moveStars();
            frame.time = 0;
        } else {
            sky.fill(blendColors("#001848", "#a8d8fc", percentage));
            ground.fill(blendColors(originalColor, GROUND_COLOR, percentage));
            stars.opacity(1 - percentage);
        }
    }, background);

    var spinStars = new Kinetic.Animation(function(frame) {
        if (stars.visible()) {
            stars.move({x: 0.001 * frame.timeDiff, y: 0.001 * frame.timeDiff});
            //stars.position({x: stars.x() + 0.001 * frame.timeDiff, y: stars.y() + 0.001 * frame.timeDiff});
            for (var i = 0; i < stars.children.length / 4; i++) {
                //var s = Math.round(Math.random() * stars.children.length);
                stars.children[i].rotate(stars.children[i].angularSpeed * 360 * frame.timeDiff / 1000);
            }
            if (stars.x() > 0 || stars.y() > 0) {
                stars.position({x: -1 * HEIGHT / 3, y: -1 * HEIGHT / 3});
                moveStars();
            }
        } else {
            frame.time = 0;
            if (stars.x() != 0 || stars.y() != 0) {
                stars.position({x: -1 * HEIGHT / 3, y: -1 * HEIGHT / 3});
            }
        }
    }, background);

    var moveStars = function() {
        for (var i = 0; i < stars.children.length; i++) {
            stars.children[i].position({x: Math.random() * stars.getWidth(), y: Math.random() * stars.getHeight()});
        }
    };

    bNextCycle.onActivate = function() {
        if (toDay.isRunning() == false && toNight.isRunning() == false) {
            cycle();
        }
    };

    nextCycle = function() {
        if (toDay.isRunning() == false && toNight.isRunning() == false) {
            cycle();
        }
    };

    inTransition = function () {
        if (toDay.isRunning() || toNight.isRunning()) {
            return true;
        }
    };

    stars.visible(false);
    background.add(sky);
    background.add(stars);
    background.add(ground);
    foreground.add(CHARACTER);
    CHARACTER.start();

    STAGE.draw();

    var cycle = function() {
        var exhaust = function() {
            HUNGER -= (Math.random() * (3 + 3) - 2) + (14.3 / 2);
            THIRST -= (Math.random() * (5 + 5) - 5) + (25 / 2);
            ENERGY -= (Math.random() * (2 + 2) - 2) + (9 / 2);
            // Food decay (Altered from .143)
            FOOD -= FOOD * 0.015385;
            if (BIOME == BIOMES.DESERT) {
                // Average Diurnal Variation: 15 C
                if (CYCLE == TIME_OF_DAY.NIGHT) {
                    // Day has passed.
                    ENVIRONMENTAL_TEMPERATURE += Math.random() * (30 - 10) + 10; // 55+ means gameOver
                } else {
                    ENVIRONMENTAL_TEMPERATURE -= Math.random() * (30 - 10) + 10; // -11- means gameOver
                }
            } else if (BIOME == BIOMES.SAVANNA) {
                if (CYCLE == TIME_OF_DAY.NIGHT) {
                    // Day has passed.
                    ENVIRONMENTAL_TEMPERATURE += Math.random() * (15 - 5) + 5;
                } else {
                    ENVIRONMENTAL_TEMPERATURE -= Math.random() * (15 - 5) + 5;
                }
            } else if (BIOME == BIOMES.TROPICAL) {
                if (CYCLE == TIME_OF_DAY.NIGHT) {
                    // Day has passed.
                    ENVIRONMENTAL_TEMPERATURE += Math.random() * (8 - 3) + 3;
                } else {
                    ENVIRONMENTAL_TEMPERATURE -= Math.random() * (8 - 3) + 3;
                }
            }
            TEMPERATURE = ((1 - (THIRST / 100)) + 1) * (0.0001113 * Math.pow(ENVIRONMENTAL_TEMPERATURE, 3) + -0.007346 * Math.pow(ENVIRONMENTAL_TEMPERATURE, 2) + 0.1919 * ENVIRONMENTAL_TEMPERATURE) + 35.15;


            if (hasEffect(AILMENT_TYPES.TUBERCULOSIS) || hasEffect(AILMENT_TYPES.DENGUE_FEVER)) {
                THIRST -= Math.random() * 2;
            }

            if (hasEffect(AILMENT_TYPES.DIARRHEA)) {
                THIRST -= Math.random() * 5;
            }

            if (hasEffect(AILMENT_TYPES.MALNUTRITION)) {
                ENERGY -= Math.random() * 2;
            }

            if (RESTING) {
                CHARACTER.animation("idle");
                ENERGY += (Math.random() * (2 + 2) - 2) + 9;

                if (hasEffect(AILMENT_TYPES.SCABIES)) {
                    ENERGY -= Math.random() * 2;
                }
                TEMPERATURE -= 1;
            } else {
                TEMPERATURE += 1;
            }

            updateBars();
            updateInventory();
        };

        var randomEvent = function() {
            var sum = 0;
            for (var s = 0; s < PROBABILITIES.length; s++) {
                sum += PROBABILITIES[s][0];
            }

            if (Math.random() <= 0.25) {
                console.log("Nothing interesting happened this day.");
            } else {
                var response = false;
                while (response == false) {
                    var seed = Math.random() * sum;
                    var i = 0;
                    var total = 0;
                    for (i = 0; i < PROBABILITIES.length - 1; i++) {
                        total += PROBABILITIES[i][0];
                        if (seed <= total) {
                            break;
                        }
                    }
                    response = PROBABILITIES[i][1]();
                }
            }
        };
        if(!RESTING && !RIDING_LA_BESTIA && !WITH_COYOTE) {
            if (CYCLE == TIME_OF_DAY.NIGHT) {
                toDay.start();
                CYCLE = TIME_OF_DAY.DAY;
                DAYS++;
            } else {
                toNight.start();
                CYCLE = TIME_OF_DAY.NIGHT;
            }
            exhaust();

            if (hasEffect(AILMENT_TYPES.BROKEN_LIMB)) {
                STEP += roundTwoPlaces(Math.random() * (50 - 30) + 30);
            } else if (hasEffect(AILMENT_TYPES.SPRAIN) || hasEffect(AILMENT_TYPES.EXHAUSTION) || hasEffect(AILMENT_TYPES.TUBERCULOSIS)) {
                STEP += roundTwoPlaces(Math.random() * (60 - 40) + 40);
            } else {
                STEP += roundTwoPlaces(Math.random() * (70 - 50) + 50);
            }
            if (hasEffect(PERK_TYPES.LIGHTWEIGHT)) {
                STEP += roundTwoPlaces(Math.random() * (30 - 10) + 10);
            }
            randomEvent();
        } else {
            if (CYCLE == TIME_OF_DAY.NIGHT) {
                toDay.start();
                CYCLE = TIME_OF_DAY.DAY;
                DAYS++;
            } else {
                toNight.start();
                CYCLE = TIME_OF_DAY.NIGHT;
            }
            exhaust();
            if (RESTING && RIDING_LA_BESTIA) {
                if (Math.random() <= 0.5) {
                    die(DIALOG.chanceLaBestiaFallOffDie[LANGUAGE]);
                } else {
                    addEffect(AILMENT_TYPES.BROKEN_LIMB, AILMENTS);
                    new Pane({message: DIALOG.chanceLaBestiaFallOff[LANGUAGE], height: 150, title: DIALOG.laBestia[LANGUAGE], layer: ui});
                    RIDING_LA_BESTIA = false;
                }
            } else if (RIDING_LA_BESTIA) {
                if (Math.random() <= 0.1) {
                    die(DIALOG.chanceLaBestiaFallOffDie[LANGUAGE]);
                } else if (Math.random() <= 0.1) {
                    addEffect(AILMENT_TYPES.BROKEN_LIMB, AILMENTS);
                    new Pane({message: DIALOG.chanceLaBestiaFallOff[LANGUAGE], height: 150, title: DIALOG.laBestia[LANGUAGE], layer: ui});
                    RIDING_LA_BESTIA = false;
                } else if (REPORTED_TO_AUTHORITIES && Math.random() <= 0.2) {
                    if (Math.random() <= 0.5) {
                        die(DIALOG.chanceLaBestiaApprehended[LANGUAGE]);
                    } else {
                        if (Math.random() <= 0.5) {
                            addEffect(AILMENT_TYPES.BROKEN_LIMB, AILMENTS);
                        } else {
                            addEffect(AILMENT_TYPES.SPRAIN, AILMENTS);
                        }
                        new Pane({message: DIALOG.chanceLaBestiaScaredOff[LANGUAGE], height: 150, title: DIALOG.laBestia[LANGUAGE], layer: ui});
                        RIDING_LA_BESTIA = false;
                    }
                } else if (Math.random() <= 0.1) {
                    if (Math.random() <= 0.5) {
                        die(DIALOG.chanceLaBestiaGangPushOffDie[LANGUAGE]);
                    } else {
                        if (Math.random() <= 0.5) {
                            addEffect(AILMENT_TYPES.BROKEN_LIMB, AILMENTS);
                        } else {
                            addEffect(AILMENT_TYPES.SPRAIN, AILMENTS);
                        }
                        new Pane({message: DIALOG.chanceLaBestiaGangPushOffInjure[LANGUAGE], height: 150, title: DIALOG.laBestia[LANGUAGE], layer: ui});
                        RIDING_LA_BESTIA = false;
                    }
                } else {
                    STEP += roundTwoPlaces(Math.random() * (300 - 250) + 250);
                }
            }
            if (WITH_COYOTE) {
                WITH_COYOTE = false;
            }
            RESTING = false;
        }
        updateStatus();
        updateRegions();
        updateGroundColor();
    };
};