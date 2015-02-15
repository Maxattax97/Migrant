BACKGROUND = 0;
CHARACTER = undefined;

// Weights are in kg (1 kg water = 1 L water)
MAX_CARRY_WEIGHT = 25; // About 33% of an average 75kg man is rule of thumb carry weight
CARRY_WEIGHT = 0;
FOOD = 0; // Most people eat about 1.8 kg of food per day. Food decays at about 14.3% per day (100% / 7 days).
WATER = 0; // Most people drink about 1 L per day. 1.5L due to hot conditions is probably reasonable.
INVENTORY = undefined;
STATUS = undefined;

// Status
HUNGER = 100; // About 7 days without food will likely cause gameOver. (12.6 kg - 14.3% per eat)
THIRST = 100; // About 4 days without water will likely cause gameOver. (6 L - 25% per drink)
TEMPERATURE = 37; // Degrees C. Less than 32' and hypothermia kills you. More than 42' and hyperthermia kills you. (About 1 degree toward homeostasis per rest?)
ENERGY = 100; // About 11 days without sleep will likely cause gameOver. (~88 hrs - 18% per rest)

// Currencies
PESOS = 0;      // Mexico. 1 USD = 14.57 Pesos.
QUETZALES = 0;  // Guatemala. 1 USD = 7.65 Quetzales.
LEMPIRAS = 0;   // Honduras. 1 USD = 21 Lempiras.
US_DOLLARS = 0; // San Salvador. (They use the USD.)

// Geographic
REGIONS = {HONDURAS: "Honduras", SAN_SALVADOR: "San Salvador", GUATEMALA: "Guatemala", MEXICO: DIALOG.mexico[LANGUAGE], SONORAN_DESERT: DIALOG.sonoranDesert[LANGUAGE]};
REGION = REGIONS.SONORAN_DESERT;
BIOMES = {DESERT: DIALOG.desert[LANGUAGE], SAVANNA: DIALOG.savanna[LANGUAGE], TROPICAL: DIALOG.tropical[LANGUAGE]};
BIOME = BIOMES.DESERT;
STEP_MAX = {};
STEP_MAX[REGIONS.HONDURAS] = 290; // Kilometers
STEP_MAX[REGIONS.EL_SALVADOR] = 121;
STEP_MAX[REGIONS.GUATEMALA] = 511;
STEP_MAX[REGIONS.MEXICO] = 2576;
STEP_MAX[REGIONS.SONORAN_DESERT] = 756;
/*STEP_MAX[REGIONS.HONDURAS] = 309; // Kilometers
STEP_MAX[REGIONS.EL_SALVADOR] = 174;
STEP_MAX[REGIONS.GUATEMALA] = 1452;
STEP_MAX[REGIONS.MEXICO] = 1518;
STEP_MAX[REGIONS.SONORAN_DESERT] = 450;*/
STEP = 0;
BIOME_MARKERS = {};
BIOME_MARKERS[BIOMES.SAVANNA] = STEP_MAX[REGIONS.GUATEMALA] + 1300;
BIOME_MARKERS[BIOMES.DESERT] = STEP_MAX[REGIONS.GUATEMALA] + STEP_MAX[REGIONS.MEXICO];

// Stats
AILMENT_TYPES = {BROKEN_LIMB: DIALOG.brokenLimb[LANGUAGE], TUBERCULOSIS: DIALOG.tuberculosis[LANGUAGE], SCABIES: DIALOG.scabies[LANGUAGE], DENGUE_FEVER: DIALOG.dengueFever[LANGUAGE], DEHYDRATION: DIALOG.dehydration[LANGUAGE], EXHAUSTION: DIALOG.exhaustion[LANGUAGE], SPRAIN: DIALOG.sprain[LANGUAGE], DIARRHEA: DIALOG.diarrhea[LANGUAGE], MALNUTRITION: DIALOG.malnutrition[LANGUAGE]};
PERK_TYPES = {OUTDOORSMAN: DIALOG.outdoorsman[LANGUAGE], LIGHTWEIGHT: DIALOG.lightweight[LANGUAGE]};
AILMENTS = [];
PERKS = [];
DAYS = 0;

// Miscellaneous Information
TIME_OF_DAY = {DAY: DIALOG.day[LANGUAGE], NIGHT: DIALOG.night[LANGUAGE]};
CYCLE = TIME_OF_DAY.DAY;
ENVIRONMENTAL_TEMPERATURE = 22; // In celsius.
RESTING = false;
GAME_STARTED = false;
GROUND_COLOR = "#b9aa65";
REPORTED_TO_AUTHORITIES = false;
RIDING_LA_BESTIA = false;
WITH_COYOTE = false;

// Initialization required...
var initializePlayer = function() {
    //console.log("Player values initialized.");
    //console.log(DIALOG + " " + LANGUAGE);
    //console.log("Test: " + DIALOG.day[LANGUAGE]);
    REGIONS = {HONDURAS: "Honduras", EL_SALVADOR: "El Salvador", GUATEMALA: "Guatemala", MEXICO: DIALOG.mexico[LANGUAGE], SONORAN_DESERT: DIALOG.sonoranDesert[LANGUAGE]};
    REGION = REGIONS.SONORAN_DESERT;
    ORIGIN = REGIONS.HONDURAS;
    BIOMES = {DESERT: DIALOG.desert[LANGUAGE], SAVANNA: DIALOG.savanna[LANGUAGE], TROPICAL: DIALOG.tropical[LANGUAGE]};
    BIOME = BIOMES.TROPICAL;
    BIOME_MARKERS[BIOMES.SAVANNA] = STEP_MAX[REGIONS.GUATEMALA] + 1300;
    BIOME_MARKERS[BIOMES.DESERT] = STEP_MAX[REGIONS.GUATEMALA] + STEP_MAX[REGIONS.MEXICO];
    STEP_MAX[REGIONS.HONDURAS] = 290; // Kilometers
    STEP_MAX[REGIONS.EL_SALVADOR] = 121;
    STEP_MAX[REGIONS.GUATEMALA] = 511;
    STEP_MAX[REGIONS.MEXICO] = 2576;
    STEP_MAX[REGIONS.SONORAN_DESERT] = 756;
    AILMENT_TYPES = {BROKEN_LIMB: DIALOG.brokenLimb[LANGUAGE], TUBERCULOSIS: DIALOG.tuberculosis[LANGUAGE], SCABIES: DIALOG.scabies[LANGUAGE], DENGUE_FEVER: DIALOG.dengueFever[LANGUAGE], DEHYDRATION: DIALOG.dehydration[LANGUAGE], EXHAUSTION: DIALOG.exhaustion[LANGUAGE], SPRAIN: DIALOG.sprain[LANGUAGE], DIARRHEA: DIALOG.diarrhea[LANGUAGE], MALNUTRITION: DIALOG.malnutrition[LANGUAGE]};
    PERK_TYPES = {OUTDOORSMAN: DIALOG.outdoorsman[LANGUAGE], LIGHTWEIGHT: DIALOG.lightweight[LANGUAGE]};
    TIME_OF_DAY = {DAY: DIALOG.day[LANGUAGE], NIGHT: DIALOG.night[LANGUAGE]};
    CYCLE = TIME_OF_DAY.DAY;
};

// Functions

var inTransition = function() {
    // To be overloaded.
};

var nextCycle = function() {
    // To be overloaded
};

var triggerEvent = function(eventId) {
    var output = PROBABILITIES[eventId][1]();
    if (!output) {
        console.log("FAILURE: EVENT REQUIREMENTS NOT MET.");
    }
};

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
            return roundTwoPlaces(usdPrice);
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

var getLocalSign = function() {
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

var getLocalAccronym = function() {
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

var getLocalDisplayPrice = function(price) {
    switch (REGION) {
        case REGIONS.HONDURAS:
            return price + " HNL";
        case REGIONS.GUATEMALA:
            return price + " GTQ";
        case REGIONS.MEXICO:
            return price + " MXN";
        case REGIONS.SONORAN_DESERT:
        case REGIONS.EL_SALVADOR:
        default:
            return price + " USD";
    }
};

var updateGroundColor = function() {
    switch(BIOME) {
        case BIOMES.TROPICAL:
            GROUND_COLOR = "#388a47";
            break;
        case BIOMES.SAVANNA:
            GROUND_COLOR = "#b9aa65";
            break;
        case BIOMES.DESERT:
            GROUND_COLOR = "#eba581";
            break;
    }
};

var updateRegions = function() {
    if (ORIGIN == REGIONS.EL_SALVADOR || ORIGIN == REGIONS.HONDURAS) {
        if ((REGION == REGIONS.HONDURAS || REGION == REGIONS.EL_SALVADOR) && STEP >= STEP_MAX[REGION]) {
            REGION = REGIONS.GUATEMALA;
            new Pane({message: DIALOG.regionGuatemala[LANGUAGE], title: "GUATEMALA", layer: ui});
        } else if (REGION == REGIONS.GUATEMALA && STEP >= STEP_MAX[REGION] + STEP_MAX[ORIGIN]) {
            REGION = REGIONS.MEXICO;
            new Pane({message: DIALOG.regionMexico[LANGUAGE], title: DIALOG.mexico[LANGUAGE], layer: ui});
        } else if (REGION == REGIONS.MEXICO && STEP >= STEP_MAX[REGION] + STEP_MAX[REGIONS.GUATEMALA] + STEP_MAX[ORIGIN]) {
            REGION = REGIONS.SONORAN_DESERT;
            new Pane({message: DIALOG.regionSonora[LANGUAGE], title: DIALOG.sonoranDesert[LANGUAGE], layer: ui});
        } else if (REGION == REGIONS.SONORAN_DESERT && STEP >= STEP_MAX[REGION] + STEP_MAX[REGIONS.MEXICO] + STEP_MAX[REGIONS.GUATEMALA] + STEP_MAX[ORIGIN]) {
            win();
        }

        if (STEP >= BIOME_MARKERS[BIOMES.DESERT] + STEP_MAX[ORIGIN]) {
            BIOME = BIOMES.DESERT;
        } else if (STEP >= BIOME_MARKERS[BIOMES.SAVANNA] + STEP_MAX[ORIGIN]) {
            BIOME = BIOMES.SAVANNA;
        } else {
            BIOME = BIOMES.TROPICAL;
        }
    } else if (ORIGIN == REGIONS.GUATEMALA) {
        if (REGION == REGIONS.GUATEMALA && STEP >= STEP_MAX[REGION]) {
            REGION = REGIONS.MEXICO;
            new Pane({message: DIALOG.regionMexico[LANGUAGE], title: DIALOG.mexico[LANGUAGE], layer: ui});
        } else if (REGION == REGIONS.MEXICO && STEP >= STEP_MAX[REGION] + STEP_MAX[ORIGIN]) {
            REGION = REGIONS.SONORAN_DESERT;
            new Pane({message: DIALOG.regionSonora[LANGUAGE], title: DIALOG.sonoranDesert[LANGUAGE], layer: ui});
        } else if (REGION == REGIONS.SONORAN_DESERT && STEP >= STEP_MAX[REGION] + STEP_MAX[REGIONS.MEXICO] + STEP_MAX[ORIGIN]) {
            win();
        }

        if (STEP >= BIOME_MARKERS[BIOMES.DESERT]) {
            BIOME = BIOMES.DESERT;
        } else if (STEP >= BIOME_MARKERS[BIOMES.SAVANNA]) {
            BIOME = BIOMES.SAVANNA;
        } else {
            BIOME = BIOMES.TROPICAL;
        }
    } else if (ORIGIN == REGIONS.MEXICO) {
        if (REGION == REGIONS.MEXICO && STEP >= STEP_MAX[REGION]) {
            REGION = REGIONS.SONORAN_DESERT;
            new Pane({message: DIALOG.regionSonora[LANGUAGE], title: DIALOG.sonoranDesert[LANGUAGE], layer: ui});
        } else if (REGION == REGIONS.SONORAN_DESERT && STEP >= STEP_MAX[REGION] + STEP_MAX[ORIGIN]) {
            win();
        }

        if (STEP >= BIOME_MARKERS[BIOMES.DESERT] - STEP_MAX[REGIONS.GUATEMALA]) {
            BIOME = BIOMES.DESERT;
        } else if (STEP >= BIOME_MARKERS[BIOMES.SAVANNA] - STEP_MAX[REGIONS.GUATEMALA]) {
            BIOME = BIOMES.SAVANNA;
        } else {
            BIOME = BIOMES.TROPICAL;
        }
    }
    updateGroundColor();
    updateStatus();
};

var removeEffect = function(effect) {
    var typeArray;
    if (AILMENTS.indexOf(effect) != -1) {
        typeArray = AILMENTS;
        switch(effect) {
            case AILMENT_TYPES.BROKEN_LIMB:
                new Pane({message: DIALOG.loseBrokenLimb[LANGUAGE],  title: DIALOG.brokenLimb[LANGUAGE].toUpperCase(), layer: ui});
                break;
            case AILMENT_TYPES.TUBERCULOSIS:
                new Pane({message: DIALOG.loseTuberculosis[LANGUAGE],  title: DIALOG.tuberculosis[LANGUAGE].toUpperCase(), layer: ui});
                break;
            case AILMENT_TYPES.SCABIES:
                new Pane({message: DIALOG.loseScabies[LANGUAGE],  title: DIALOG.scabies[LANGUAGE].toUpperCase(), layer: ui});
                break;
            case AILMENT_TYPES.DENGUE_FEVER:
                new Pane({message: DIALOG.loseDengueFever[LANGUAGE],  title: DIALOG.dengueFever[LANGUAGE].toUpperCase(), layer: ui});
                break;
            case AILMENT_TYPES.DEHYDRATION:
                new Pane({message: DIALOG.loseDehydration[LANGUAGE], title: DIALOG.dehydration[LANGUAGE].toUpperCase(), layer: ui});
                break;
            case AILMENT_TYPES.EXHAUSTION:
                new Pane({message: DIALOG.loseExhaustion[LANGUAGE],  title: DIALOG.exhaustion[LANGUAGE].toUpperCase(), layer: ui});
                break;
            case AILMENT_TYPES.SPRAIN:
                new Pane({message: DIALOG.loseSprain[LANGUAGE],  title: DIALOG.sprain[LANGUAGE].toUpperCase(), layer: ui});
                break;
            case AILMENT_TYPES.DIARRHEA:
                new Pane({message: DIALOG.loseDiarrhea[LANGUAGE],  title: DIALOG.diarrhea[LANGUAGE].toUpperCase(), layer: ui});
                break;
            case AILMENT_TYPES.MALNUTRITION:
                new Pane({message: DIALOG.loseMalnourishment[LANGUAGE],  title: DIALOG.malnutrition[LANGUAGE].toUpperCase(), layer: ui});
                break;
        }
    } else if (PERKS.indexOf(effect) != -1) {
        typeArray = PERKS;
    }

    if (typeArray != null || typeArray != undefined) {
        var index = typeArray.indexOf(effect);
        if (index != -1) {
            typeArray.splice(index, 1);
        }
    }
    updateStatus();
};

var addEffect = function(effect, typeArray) {
    if (!hasEffect(effect)) {
    typeArray.push(effect);
        switch (effect) {
            case AILMENT_TYPES.BROKEN_LIMB:
                new Pane({message: DIALOG.gainBrokenLimb[LANGUAGE],  title: DIALOG.brokenLimb[LANGUAGE].toUpperCase(), layer: ui});
                break;
            case AILMENT_TYPES.TUBERCULOSIS:
                new Pane({message: DIALOG.gainTuberculosis[LANGUAGE],  title: DIALOG.tuberculosis[LANGUAGE].toUpperCase(), layer: ui});
                break;
            case AILMENT_TYPES.SCABIES:
                new Pane({message: DIALOG.gainScabies[LANGUAGE],  title: DIALOG.scabies[LANGUAGE].toUpperCase(), layer: ui});
                break;
            case AILMENT_TYPES.DENGUE_FEVER:
                new Pane({message: DIALOG.gainDengueFever[LANGUAGE],  title: DIALOG.dengueFever[LANGUAGE].toUpperCase(), layer: ui});
                break;
            case AILMENT_TYPES.DEHYDRATION:
                new Pane({message: DIALOG.gainDehydration[LANGUAGE], title: DIALOG.dehydration[LANGUAGE].toUpperCase(), layer: ui});
                break;
            case AILMENT_TYPES.EXHAUSTION:
                new Pane({message: DIALOG.gainExhaustion[LANGUAGE],  title: DIALOG.exhaustion[LANGUAGE].toUpperCase(), layer: ui});
                break;
            case AILMENT_TYPES.SPRAIN:
                new Pane({message: DIALOG.gainSprain[LANGUAGE],  title: DIALOG.sprain[LANGUAGE].toUpperCase(), layer: ui});
                break;
            case AILMENT_TYPES.DIARRHEA:
                new Pane({message: DIALOG.gainDiarrhea[LANGUAGE],  title: DIALOG.diarrhea[LANGUAGE].toUpperCase(), layer: ui});
                break;
            case AILMENT_TYPES.MALNUTRITION:
                new Pane({message: DIALOG.gainMalnourishment[LANGUAGE],  title: DIALOG.malnutrition[LANGUAGE].toUpperCase(), layer: ui});
                break;
        }
    }
    updateStatus();
};

var hasEffect = function(effect) {
    if (AILMENTS.indexOf(effect) != -1) {
        return true;
    } else if (PERKS.indexOf(effect) != -1) {
        return true;
    }
    return false;
};

var arrayToString = function(arr) {
    var line = "";
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != undefined || arr[i] != null) {
            line = line + arr[i];
            if (i != arr.length - 1) {
                line = line + ", ";
            }
        }
    }
    if (arr.length == 0 || arr == undefined) {
        line = DIALOG.none[LANGUAGE];
    }
    return line;
};

var updateInventory = function() {
    if (INVENTORY != undefined && INVENTORY.parent != null) {
        INVENTORY.message.setText(DIALOG.carryWeight[LANGUAGE] + ": \n" +
                                  DIALOG.food[LANGUAGE] + ": \n" +
                                  DIALOG.water[LANGUAGE] + ": \n\n" +
                                  DIALOG.usdollar[LANGUAGE] + ": \n" +
                                  DIALOG.mexicanPeso[LANGUAGE] + ": \n" +
                                  DIALOG.guatemalanQuetzal[LANGUAGE] + ": \n" +
                                  DIALOG.honduranLempira[LANGUAGE] + ": \n");
        INVENTORY.values.setText(roundTwoPlaces(FOOD + WATER) + " / " + MAX_CARRY_WEIGHT + " kg\n" +
                                  roundTwoPlaces(FOOD) + " kg\n" +
                                  roundTwoPlaces(WATER) + " L\n\n" +
                                  "$ " + roundTwoPlaces(US_DOLLARS) + "\n" +
                                  "$ " + roundTwoPlaces(PESOS) + "\n" +
                                  "Q " + roundTwoPlaces(QUETZALES) + "\n" +
                                  "L " + roundTwoPlaces(LEMPIRAS) + "\n");
        INVENTORY.draw();
    }
};

var openInventory = function() {
    if (INVENTORY == undefined || INVENTORY.parent == null) {
        INVENTORY = new Pane({width: 250, height: 150, center: false, title: DIALOG.inventory[LANGUAGE].toUpperCase(), layer: ui});
        INVENTORY.values = INVENTORY.message.clone();
        INVENTORY.values.setAttr("align", "right");
        INVENTORY.add(INVENTORY.values);
        updateInventory();
    } else {
        updateInventory();
    }
};

var updateStatus = function() {
    if (STATUS != undefined && STATUS.parent != null) {
        var mode = "";
        if (WITH_COYOTE) {
            mode = DIALOG.coyote[LANGUAGE];
        } else if (RIDING_LA_BESTIA) {
            mode = DIALOG.laBestia[LANGUAGE];
        } else {
            mode = DIALOG.walking[LANGUAGE];
        }

        STATUS.message.setText(DIALOG.distanceTraveled[LANGUAGE] + ": \n" +
                               DIALOG.region[LANGUAGE] + ": \n" +
                               DIALOG.biome[LANGUAGE] + ": \n" +
                               DIALOG.environmentalTemperature[LANGUAGE] + ": \n" +
                               DIALOG.modeOfTravel[LANGUAGE] + ": \n" +
                               DIALOG.day[LANGUAGE] + "s: \n" +
                               DIALOG.perks[LANGUAGE] + ": " + arrayToString(PERKS) + "\n" +
                               DIALOG.ailments[LANGUAGE] + ": " + arrayToString(AILMENTS) + "\n");
        STATUS.values.setText(roundTwoPlaces(STEP) + " km\n" +
                              REGION + "\n" +
                              BIOME + "\n" +
                              roundTwoPlaces(ENVIRONMENTAL_TEMPERATURE) + " °C\n" +
                              mode + "\n" +
                              DAYS + "\n");
        STATUS.draw();
    }
};

var openStatus = function() {
    if (STATUS == undefined || STATUS.parent == null) {
        STATUS = new Pane({width: 300, height: 175, center: false, title: DIALOG.status[LANGUAGE].toUpperCase(), layer: ui});
        STATUS.values = STATUS.message.clone();
        STATUS.values.setAttr("align", "right");
        STATUS.add(STATUS.values);
        updateStatus();
    } else {
        updateStatus();
    }
};

var die = function(reason) {
    var fade = new Kinetic.Rect({width: WIDTH, height: HEIGHT, x: 0, y: 0, fill: "#884444", opacity: 0.5});
    ui.add(fade);
    var diePane = new Pane({width: 300, height: 125, message: reason, title: DIALOG.gameOver[LANGUAGE].toUpperCase(), center: true, noClose: true, buttons: 1, layer: ui});
    diePane.option1.base.fill("red");
    diePane.option1.refreshColors();
    diePane.option1.text.setText(DIALOG.quit[LANGUAGE]);

    CHARACTER.stop();

    diePane.option1.onActivate = function() {
        location.reload();
        // END GAME.
    };

    fade.draw();
    diePane.draw();
};

var win = function() {
    var winScreen = new Kinetic.Layer({});

    var winBg = new Kinetic.Image({image: IMAGES["winBackground.jpg"], x: 0, y: 0});
    fitImageFullscreen(winBg);

    winScreen.add(winBg);

    var bQuit = new Button({
        width: 125,
        height: 75,
        text: DIALOG.quit[LANGUAGE].toUpperCase(),
        fill: "#44FF44",
        fontSize: 30,
        x: WIDTH - 135,
        y: HEIGHT - 85,
        layer: winScreen
    });

    var score = new Annotation({
        width: 150,
        height: 75,
        text: DIALOG.score[LANGUAGE] + ": 123456",
        fontSize: 20,
        x: 10,
        y: HEIGHT - 85,
        layer: winScreen
    });

    // Display score

    var title = new Kinetic.Text({text: DIALOG.winTitle[LANGUAGE], fontSize: 40, x: 10, y: 10, align: "center", fill: "black", fontStyle: "bold"});
    title.setWidth(WIDTH - 20);
    title.setHeight(100);
    title.position({y: HEIGHT / 3 - title.getHeight() / 2});
    winScreen.add(title);

    STAGE.add(winScreen);

    bQuit.onActivate = function () {
        location.reload();
    };
};