var PROBABILITIES = [
    [9, function() {
        if (!hasEffect(AILMENT_TYPES.BROKEN_LIMB)) {
            addEffect(AILMENT_TYPES.BROKEN_LIMB, AILMENTS);
            return true;
        }
        return false;
    }], // 0 Broken limb
    [23, function() {
        if (REGION != REGIONS.SONORAN_DESERT && hasEffect(AILMENT_TYPES.BROKEN_LIMB)) {
            removeEffect(AILMENT_TYPES.BROKEN_LIMB);
            new Pane({message: DIALOG.chanceGrupoBetaBrokenLimb[LANGUAGE], title: DIALOG.grupoBeta[LANGUAGE], layer: ui});
            return true;
        }
        return false;
    }], // 1 Grupo Beta heal broken limb
    [34, function() {
        if (REGION == REGIONS.SONORAN_DESERT && (hasEffect(AILMENT_TYPES.DENGUE_FEVER) || hasEffect(AILMENT_TYPES.DIARRHEA) || hasEffect(AILMENT_TYPES.TUBERCULOSIS) || hasEffect(AILMENT_TYPES.SCABIES))) {
            var encounter = new Pane({message: DIALOG.chanceDesertEncounter[LANGUAGE], title: DIALOG.encounter[LANGUAGE], height: 125, yesNo: true, noClose: true, layer: ui});

            encounter.option1.onActivate = function () {

                var american = new Pane({message: DIALOG.chanceFriendlyAmericanMedicine[LANGUAGE], title: DIALOG.friendlyAmerican[LANGUAGE], yesNo: true, layer: ui});

                american.option1.onActivate = function() {
                    removeEffect(AILMENT_TYPES.DENGUE_FEVER);
                    removeEffect(AILMENT_TYPES.DIARRHEA);
                    removeEffect(AILMENT_TYPES.TUBERCULOSIS);
                    removeEffect(AILMENT_TYPES.SCABIES);

                    if (Math.random() <= 0.2) {
                        REPORTED_TO_AUTHORITIES = true;
                    }

                    american.close();
                };

                encounter.close();
            };
            return true;
        }
        return false;
    }], // 2 American medicine desert encounter
    [4, function() {
        if (REGION != REGIONS.SONORAN_DESERT) {
            die(DIALOG.chanceLosZetasKill[LANGUAGE]);
            return true;
        }
        return false;
    }], // 3 Los Zetas gameOver encounter
    [30, function() {
        var cost = getLocalPrice(Math.random() * (300 - 100) + 100);
        if (getLocalWallet() >= cost) {
            var distance = Math.round(Math.random() * (200 - 50) + 50);
            var coyote = new Pane({
                message: DIALOG.chanceCoyote1[LANGUAGE] + distance + DIALOG.chanceCoyote2[LANGUAGE] + getLocalDisplayPrice(cost) + DIALOG.chanceCoyote3[LANGUAGE],
                title: DIALOG.coyote[LANGUAGE],
                yesNo: true,
                height: 125,
                layer: ui
            });
            coyote.option1.onActivate = function () {
                if (!inTransition()) {
                    WITH_COYOTE = true;
                    nextCycle();
                    setLocalWallet(getLocalWallet() - cost);

                    var seed = Math.random();

                    if (seed <= 0.25) {
                        new Pane({message: DIALOG.coyoteMislead[LANGUAGE], title: DIALOG.coyote[LANGUAGE], layer: ui});
                        STEP = Math.max(STEP - distance, 0);
                    } else if (seed <= 0.5) {
                        die(DIALOG.chanceCoyoteKill[LANGUAGE]);
                    } else {
                        STEP += distance;
                    }

                    coyote.close();
                }
            };
            return true;
        }
        return false;
    }], // 4 Coyote encounter
    [100, function() {
        if (REGION != REGIONS.SONORAN_DESERT) {
            var store = new Pane({
                message: DIALOG.chanceStore[LANGUAGE],
                title: DIALOG.store[LANGUAGE].toUpperCase(),
                buttons: 2,
                noClose: true,
                layer: ui
            });
            store.option1.base.fill("#44FF44");
            store.option2.base.fill("#FF4444");
            store.option1.refreshColors();
            store.option2.refreshColors();
            store.option1.text.setText(DIALOG.yes[LANGUAGE]);
            store.option2.text.setText(DIALOG.no[LANGUAGE]);
            store.option1.onActivate = function () {
                storeMenu();
                store.close();
            };
            store.option2.onActivate = function () {
                store.close();
            };
            store.draw();
            return true;
        }
        return false;
    }], // 5 Store
    [15, function() {
        if (!hasEffect(AILMENT_TYPES.DENGUE_FEVER)) {
            addEffect(AILMENT_TYPES.DENGUE_FEVER, AILMENTS);
            return true;
        }
        return false;
    }], // 6 Dengue Fever
    [6, function() {
        if (QUETZALES >= 2300) {
            QUETZALES = QUETZALES * (Math.random() * (0.8 - 0.6) + 0.6);
            new Pane({message: DIALOG.chanceMaraSalvatruchaRob[LANGUAGE], title: DIALOG.maraSalvatrucha[LANGUAGE], layer: ui});
            return true;
        } else if (US_DOLLARS >= 300) {
            US_DOLLARS = US_DOLLARS * (Math.random() * (0.8 - 0.6) + 0.6);
            new Pane({message: DIALOG.chanceMaraSalvatruchaRob[LANGUAGE], title: DIALOG.maraSalvatrucha[LANGUAGE], layer: ui});
            return true;
        } else if (PESOS >= 4400) {
            PESOS = PESOS * (Math.random() * (0.8 - 0.6) + 0.6);
            new Pane({message: DIALOG.chanceMaraSalvatruchaRob[LANGUAGE], title: DIALOG.maraSalvatrucha[LANGUAGE], layer: ui});
            return true;
        } else if (LEMPIRAS >= 6300) {
            LEMPIRAS = LEMPIRAS * (Math.random() * (0.8 - 0.6) + 0.6);
            new Pane({message: DIALOG.chanceMaraSalvatruchaRob[LANGUAGE], title: DIALOG.maraSalvatrucha[LANGUAGE], layer: ui});
            return  true;
        }
        return false;
    }], // 7 Mara Salvatrucha Rob
    [10, function() {
        if (REPORTED_TO_AUTHORITIES) {
            die(DIALOG.chanceApprehended[LANGUAGE]);
            return true;
        }
        return false;
    }], // 8 Reported to authorities
    [35, function() {
        var cost = getLocalPrice(Math.random() * (400 - 200) + 200);
        if (getLocalWallet() >= cost && RIDING_LA_BESTIA == false) {
            var bestia = new Pane({
                message: DIALOG.chanceLaBestia[LANGUAGE],
                title: DIALOG.laBestia[LANGUAGE],
                yesNo: true,
                layer: ui
            });

            bestia.option1.onActivate = function () {
                if (!inTransition()) {
                    if (Math.random() <= 0.5) {
                        RIDING_LA_BESTIA = true;
                        nextCycle();
                    } else {
                        var toll = new Pane({
                            message: DIALOG.chanceLaBestiaToll1[LANGUAGE] + getLocalDisplayPrice(cost) + DIALOG.chanceLaBestiaToll2[LANGUAGE],
                            title: DIALOG.laBestia[LANGUAGE],
                            height: 125,
                            yesNo: true,
                            layer: ui
                        });
                        toll.option1.onActivate = function () {
                            setLocalWallet(getLocalWallet() - cost);
                            updateInventory();
                            RIDING_LA_BESTIA = true;
                            nextCycle();
                            toll.close();
                        };
                    }

                    bestia.close();
                }
            };
            return true;
        }
        return false;
    }], // 9 La Bestia
    [55, function() {
        if (BIOME == BIOMES.TROPICAL) {
            var banana = new Pane({message: DIALOG.chanceBananaFarm[LANGUAGE], title: DIALOG.food[LANGUAGE], yesNo: true, layer: ui});
            banana.option1.onActivate = function() {
                if (Math.random() <= 0.75) {
                    var amount = Math.random() * 8;
                    FOOD = Math.min(MAX_CARRY_WEIGHT - WATER, FOOD + amount);
                    updateInventory();
                } else {
                    new Pane({message: DIALOG.chanceBananaFarmShoo[LANGUAGE], title: DIALOG.food[LANGUAGE], layer: ui});
                    if (Math.random() <= 0.25) {
                        REPORTED_TO_AUTHORITIES = true;
                    }
                }
                banana.close();
            };
            return true;
        }
        return false;
    }], // 10 Banana Farm
    [42, function() {
        new Pane({message: DIALOG.chanceSupplies[LANGUAGE], title: DIALOG.supplies[LANGUAGE], layer: ui});
        var amtWater = Math.random() * 8;
        var amtFood = Math.random() * 8;
        WATER = Math.min(MAX_CARRY_WEIGHT - FOOD, WATER + amtWater);
        FOOD = Math.min(MAX_CARRY_WEIGHT - WATER, FOOD + amtFood);
        updateInventory();
        return true;
    }], // 11 Supply Stash
    [48, function() {
        if (REGION != REGIONS.SONORAN_DESERT) {
            var payout = getLocalPrice(Math.random() * (80 - 60) + 60);
            var job = new Pane({message: DIALOG.chanceOddJob1[LANGUAGE] + getLocalDisplayPrice(payout) + DIALOG.chanceOddJob2[LANGUAGE], title: DIALOG.oddJob[LANGUAGE], yesNo: true, layer: ui});
            job.option1.onActivate = function() {
                if (!inTransition()) {
                    RESTING = true;
                    setLocalWallet(getLocalWallet() + payout);
                    if (Math.random() <= 0.25) {
                        REPORTED_TO_AUTHORITIES = true;
                    }
                    nextCycle();
                    job.close();
                }
            };
            return true;
        }
        return false;
    }], // 12 Odd Job
    [40, function() {
        if (REGION == REGIONS.SONORAN_DESERT) {
            var barrel = new Pane({message: DIALOG.chanceBarrels[LANGUAGE], title: DIALOG.water[LANGUAGE], yesNo: true, layer: ui});
            THIRST = 100;
            updateBars();
            updateStatus();

            barrel.option1.onActivate = function() {
                WATER = Math.min(MAX_CARRY_WEIGHT - FOOD, WATER + 6);
                updateInventory();
                barrel.close();
            };

            return true;
        }
        return false;
    }], // 13 Water Barrel
    [38, function() {
        if (REGION != REGIONS.SONORAN_DESERT) {
            var shelter = new Pane({message: DIALOG.chanceShelter[LANGUAGE], title: DIALOG.shelter[LANGUAGE], yesNo: true, layer: ui});

            shelter.option1.onActivate = function() {
                if (!inTransition()) {
                    if (Math.random() <= 0.15) {
                        die(DIALOG.chanceShelterRaid[LANGUAGE]);
                        shelter.close();
                    } else {
                        RESTING = true;
                        ENERGY = 100;
                        THIRST = 100;
                        HUNGER = 100;
                        TEMPERATURE = 37;
                        if (FOOD < 5) {
                            FOOD = 5;
                        }
                        if (WATER < 5) {
                            WATER = 5;
                        }
                        updateBars();
                        updateStatus();
                        updateInventory();
                        nextCycle();
                        shelter.close();
                    }
                }
            };
            return true;
        }
        return false;
    }], // 14 Community Shelter
    [15, function() {
        if (REGION == REGIONS.SONORAN_DESERT) {
            var encounter = new Pane({message: DIALOG.chanceDesertEncounter[LANGUAGE], title: DIALOG.encounter[LANGUAGE], height: 125, yesNo: true, noClose: true, layer: ui});

            encounter.option1.onActivate = function () {
                new Pane({message: DIALOG.chancePatriot[LANGUAGE], height: 125, title: DIALOG.patriot[LANGUAGE], layer: ui});
                REPORTED_TO_AUTHORITIES = true;
                encounter.close();
            };
            return true;
        }
        return false;
    }], // 15 Patriot
    [35, function() {
        if (hasEffect(PERK_TYPES.OUTDOORSMAN)) {
            if (Math.random() <= 0.5) {
                new Pane({message: DIALOG.chanceOutdoorsmanFindWater[LANGUAGE], title: DIALOG.outdoorsman[LANGUAGE], layer: ui});
                var amtWater = Math.random() * 8;
                WATER = Math.min(MAX_CARRY_WEIGHT - FOOD, WATER + amtWater);
            } else {
                new Pane({message: DIALOG.chanceOutdoorsmanFindFood[LANGUAGE], title: DIALOG.outdoorsman[LANGUAGE], layer: ui});
                var amtFood = Math.random() * 8;
                FOOD = Math.min(MAX_CARRY_WEIGHT - WATER, FOOD + amtFood);
            }
            updateInventory();
            return true;
        }
        return false;
    }], // 16 Outdoorsman food/water find
    [17, function() {
        if (!hasEffect(AILMENT_TYPES.DIARRHEA)) {
            addEffect(AILMENT_TYPES.DIARRHEA, AILMENTS);
            return true;
        }
        return false;
    }], // 17 Diarrhea
    [12, function() {
        if (!hasEffect(AILMENT_TYPES.SCABIES)) {
            addEffect(AILMENT_TYPES.SCABIES, AILMENTS);
            return true;
        }
        return false;
    }], // 18 Scabies
    [25, function() {
        if (!hasEffect(AILMENT_TYPES.SPRAIN)) {
            addEffect(AILMENT_TYPES.SPRAIN, AILMENTS);
            return true;
        }
        return false;
    }], // 19 Sprain
    [4, function() {
        die(DIALOG.chanceApprehended[LANGUAGE]);
        return true;
    }], // 20 Caught by authorities
    [20, function() {
        if (hasEffect(AILMENT_TYPES.DIARRHEA)) {
            removeEffect(AILMENT_TYPES.DIARRHEA);
            return true;
        }
        return false;
    }], // 21 Heal Diarrhea
    [45, function() {
        if (hasEffect(AILMENT_TYPES.SPRAIN)) {
            removeEffect(AILMENT_TYPES.SPRAIN);
            return true;
        }
        return false;
    }], // 22 Heal Sprain
    [35, function() {
        if (BIOME == BIOMES.DESERT && !hasEffect(PERK_TYPES.OUTDOORSMAN)) {
            var stream = new Pane({message: DIALOG.chanceDesertStream[LANGUAGE], title: DIALOG.water[LANGUAGE], yesNo: true, layer: ui});

            stream.option1.onActivate = function() {
                if (Math.random() <= 0.25) {
                    die(DIALOG.chanceDesertStreamDrown[LANGUAGE]);
                } else {
                    THIRST = 100;
                    updateBars();
                    updateStatus();
                    WATER = Math.min(MAX_CARRY_WEIGHT - FOOD, WATER + (Math.random() * 8));
                    updateInventory();
                    stream.close();
                }
            };
            return true;
        }
        return false;
    }], // 23 Desert water
    [27, function() {
        if (REGION != REGIONS.SONORAN_DESERT && hasEffect(AILMENT_TYPES.DENGUE_FEVER)) {
            removeEffect(AILMENT_TYPES.DENGUE_FEVER);
            new Pane({message: DIALOG.chanceGrupoBetaDengueFever[LANGUAGE], title: DIALOG.grupoBeta[LANGUAGE], layer: ui});
            return true;
        }
        return false;
    }] // 24 Grupo Beta heal Dengue Fever
];

// Method of scaling
// RARE: 1 <= x <= 10
// UNCOMMON: 10 <= x <= 40
// COMMON: 40 <= x <= 100

