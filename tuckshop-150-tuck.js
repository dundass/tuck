var TwinklGame = TwinklGame || {};

(function (tw, manifest) {

    // SPEND // SAVE // DONATE // INVEST // - colour code each question/story based on which category it fits

    // SAVE - BANKER - deposit during end of day screen - plus interest

    // teacha= about scams ?? person with obv disguise asking for investment or saying u have been left money etcetc

    // SALES ?!!!!!?!!!!!?!!!

    // QUEST LOG ?

    // wanted to setTimeout(spawn, 30000) or so but if already serving, could miss the recurrence ... need a concrete queue maybe or a way to respawn them if missed
    // for 'quest' ones (and maybe standard ones ??), have a counter that, after first appearance, increases, and it represents the likelihood of the person turning up again (Joe roll)
    // approaches: chained setTimeouts, track all words spoken so far and ref nested object, full {requires:,stages:,people:} object system, Joe roll (then pick greatest)
    // timing: limit main story questions to 1 per day
    // TODO - add time delay in days option for stories // finish with woodcutter = cheaper wood, & similar changes at end
    // also - tie quest stages to areas

    // TODO - animation loader - CSS or JS ?  scroll dims = 1248 x 404

    // TODO - nail reactive questions !!! poss just implement func for story text: .
    //  eg diff people turning up and offering quests / diff speech based on day/night

    // extra ?

    // were questions going to have 'init' props ? poss only to solve the dynamic question problem

    // bubbles + maybe a bubble that denizens say after walking away post-serve

    // hirelings // bodyguards - stands beside stall, and scare away some folks
    //           // courier - lets you get items from far off areas (in a duration of time)
    //           // bookkeeper - info about buy / sell prices in other areas (corner of UI) - maybe unlocks info on the map also

    // extra - avatar creator - not mvp
    // extra - hi score & achievements - not mvp

    // extra - higher reputation = more likely to call by name ?

    // extra - denizen interaction - denizens have friends/enemies and compete with / get annoyed by their rivals

    // buying shop upgrade = more likely for denizens to buy the thing

    // also game reacts to ur perk choices by eg presenting ppl asking for herbalist items (die roll when item pick + check items in area)
    // activate perk choice when pass that rep level (but fall below don't remove) // max / min / respec

    // WHAT IF --- tapping on the person to try and bring them over, if fail checks, they throw it back at ya - poss even choose an item to offer them then decide whether they like - learn about what people want

    var world = tw.tuck.data.world;

    var player = {
        location: 'roadside',
        stats: {    // niceness, evil, charitable etc
            currency: 50,
            savings: 0,
            reputation: {
                'roadside': 0,
                'village': 0,
                'city walls': 0
            },
            perks: [],
            upgrades: [],
            perksPerArea: {},
            locationsVisited: [],
            activeStories: [],
            completedStories: [],
            today: {
                currency: 0,
                outgoings: 0,
                reputation: 0,
                hired: 0,
                sold: []
            },
            hasPaidDaily: false
        },
        inventory: {
            'Bottles and Vials': 50,
            'Dungeoneering Kits': 25,
            'Baskets': 15,
            'Herbal Potion':5,
            'Camping Gear':5
        },
        hirelings: []   // post mvp
    };

    var worldState = {
        day: 1,
        time: 0,
        activeEvents: [],
        denizenPool: [],
        denizensActive: [],
        savedLocationPools: {},
        dynamics: {
            denizenFrequency: 1,
            corrupted: false
            // others ?
        },
        customer: null,   // string, the name of the cust
        customerQuestionType: 'purchase',
        customerText: 'ello m8 gimme some stuff',
        customerBuys: {
            item: 'Baskets',
            amount: 1,
            value: 5
        },
        questionAnswered: '',
        mainQuestAnsweredToday: false,
        endOfDay: false,
        dailyQueue: [   // TODO - daily queue for delay(action, days)
            { actions: [], dayCountdown: 1 }
        ],
        dailyTax: 20
    };

    var uiState = {
        endOfDayCategory: '',
        endOfDayCategoryItems: [],
        restocking: false,
        inventoring: false,
        mapping: false,
        restockItem: '',
        restockAmount: 1,
        restockWarehouse: true,
        restockUpgrades: false,
        choosingPerks: false,
        animationState: {}
    };

    var sounds = {
        'click': new Howl({src: [manifest.soundClick.src]}),
        'coins': new Howl({src: [manifest.soundCoins.src]}),
        'close-shop': new Howl({src: [manifest.soundCloseShop.src]}),
        'whoosh': new Howl({src: [manifest.soundWhoosh.src]}),
        'rep-up': new Howl({src: [manifest.soundRepUp.src]}),
        'rep-down': new Howl({src: [manifest.soundRepDown.src]}),
        'forest': new Howl({src: [manifest.soundForest.src], loop: true, volume: 0.5}),
        'stamp': new Howl({src: [manifest.soundStamp.src], volume: 0.33}),
        'cock': new Howl({src: [manifest.soundCock.src]}),
        'shop-bell': new Howl({src: [manifest.soundBell.src]})
    };

    // var animationNames = Object.keys(tw.tuck.data.animationData);
    // for(var i = 0; i < animationNames.length; i++) uiState.animationState[animationNames[i]] = {frame: 0, loopId: null};

    console.log(worldState)

    tw.tuck.data.player = player;
    // tw.tuck.data.world = world;
    tw.tuck.data.worldState = worldState;
    tw.tuck.data.uiState = uiState;

    tw.tuck.methods = {
        spawnNewDenizen: function () {

            setTimeout(this.spawnNewDenizen, (3 + Math.random() * 3) * 1000 * (1 / worldState.dynamics.denizenFrequency));

            if(worldState.endOfDay) return;

            var denizenData = this.randomDenizen();

            if(typeof denizenData === 'undefined') {
                console.error('help ! we\'re all out of denizens !');
                return;
            }

            var side = Math.random() > 0.5 ? 'left' : 'right';

            worldState.denizensActive.push({
                denizenData: denizenData,
                returnToPool: true,
                approachesFrom: side,
                x: side === 'left' ? -10 : 100  // %
            });

            /*var el = document.createElement('div');
            el.className = 'denizen';
            el.className += Math.random() > 0.5 ? ' left' : ' right';
            el.style.backgroundImage = 'url(' + denizenData.image + ')';

            el.setAttribute('data-name', denizenData.name);*/

                // var bub = document.createElement('div');
                // bub.className = 'thought-bubble';
                // bub.innerHTML = tw.tuck.data.bubbles[tw.Utils.randomInt(0, tw.tuck.data.bubbles.length)] + '<span></span><span></span>';
                // el.appendChild(bub);
                // bub.setAttribute('style', 'opacity: 0');

            /*document.getElementById('characterFrame').appendChild(el);

            setTimeout(function () {
                el.style.left = el.className.includes('left') ? '101%' : '-11%';
            }, 100);*/

        },
        startDenizenLoop: function () {

            var scope = this;

            setTimeout(this.spawnNewDenizen, 3000);

            setInterval(function () {

                if(worldState.time >= 120 && worldState.customer === null) {
                    if(!worldState.endOfDay) {
                        scope.endDay();
                    }
                    return;
                } else if(worldState.time < 120 && worldState.customer !== null) {
                    worldState.time += 0.0333;    // maybe increase ?
                } else if(uiState.choosingPerks) {
                    // do not advance time !!
                } else {
                    worldState.time += 0.1;
                }

                //var containerStyle = getComputedStyle(document.getElementById('wrapper'));
                //var containerWidth = parseFloat(containerStyle.width);
                //var denizenElements = document.getElementsByClassName('denizen');   // TODO - move to v-for and a denizens[] array, use transitionend callback to delete + re add to pool

                var boundaryLeft, boundaryRight;
                var customerX = 46;

                for(var i = worldState.denizensActive.length - 1; i >= 0; i--) {

                    var denizen = worldState.denizensActive[i];

                    var denizenName = denizen.denizenData.name;

                    if(denizenName !== worldState.customer) {
                        worldState.denizensActive[i].x += worldState.denizensActive[i].approachesFrom === 'left' ? 2 : -2;
                    }

                    // check if denizen should be deleted
                    if(denizen.x > 100 || denizen.x < -10) {
                        if(denizen.returnToPool) {
                            scope.addDenizenToPool(denizenName);
                        }
                        worldState.denizensActive.splice(i, 1);
                        continue;
                    }

                    // set detection boundaries
                    if(denizen.approachesFrom === 'left') {
                        boundaryLeft = 35;  // old=35
                        boundaryRight = 40; // old=40
                        customerX = 41;
                    } else {
                        boundaryLeft = 60;  // old=65
                        boundaryRight = 65; // old=70
                        customerX = 59;
                    }

                    // check if denizen should be served
                    if(worldState.customer === null && scope.sufficientReputation(denizenName) && !uiState.choosingPerks
                        && (denizen.x > boundaryLeft && denizen.x < boundaryRight)) {

                        var denizenData = denizen.denizenData;

                        if(denizenData.story && !player.stats.completedStories.includes(denizenData.story)) {
                            var storyStage = scope.getStoryStage(denizenData.story);
                            if(storyStage.denizen && storyStage.denizen !== denizenName) return;
                            else if(!storyStage.denizen && scope.questions[denizenData.story].denizen !== denizenName) return;
                        } else if(!denizenData.asks && player.stats.completedStories.includes(denizenData.story)) {
                            return;
                        }

                        //denizenElements[i].style.left = '46%';
                        worldState.denizensActive[i].x = customerX;
                        scope.serveDenizen(denizenName, i);
                        //tw.Utils.addClass(denizenElements[i], 'customer');
                        setTimeout(function () {
                            tw.Utils.addClass(document.getElementById('worldFrame'), 'blurred');    // todo - :class="{blurred: customer !== null}"
                        }, 1000);

                    }
                }

            }, 100);

        },
        playSound: function (id) {
            sounds[id].play();
        },
        // loadAnimations: function () {
        //     var names = Object.keys(tw.tuck.data.animationData);
        //     for(var i = 0; i < names.length; i++) {
        //         animations[names[i]] = new Image();
        //     }
        // },
        // playAnimation: function (name, forwards) {
        //     forwards = typeof forwards === 'undefined' ? true : forwards;
        //     // var idx = Object.keys(tw.tuck.data.animationData).indexOf(name);
        //     // if(idx !== -1) {
        //     //     uiState.animationState[idx]
        //     // }
        //     var el = document.getElementsByClassName(tw.tuck.data.animationData[name].className)[0],
        //         frameWidth = tw.tuck.data.animationData[name].frameWidth,
        //         frameHeight = tw.tuck.data.animationData[name].frameHeight,
        //         width = parseFloat(getComputedStyle(el).backgroundSize.split('% ')[0]),
        //         height = parseFloat(getComputedStyle(el).backgroundSize.split('% ')[0]),
        //         numFrames = (width / frameWidth) * (height / frameHeight);
        //     console.log(getComputedStyle(el).backgroundSize, numFrames)
        //     // uiState.animationState[name].loopId = setInterval(function () {
        //     //     el.style.backgroundPosition;
        //     // }, 20);
        // },
        spawnGlitzyBit: function (name, assetId, startCallback, endCallback) {

            var wrapper = document.getElementById('wrapper'),
                glitz = document.createElement('span');

            glitz.className = 'ui backgrounded ' + name;

            glitz.style.backgroundImage = 'url(' + manifest[assetId].src + ')';

            wrapper.appendChild(glitz);

            glitz.addEventListener('transitionend', function () {

                if(endCallback) endCallback.bind(this)(glitz);
                if(glitz.parentNode) glitz.parentNode.removeChild(glitz);

            }.bind(this), false);

            setTimeout(function () {

                tw.Utils.addClass(glitz, 'glitz-target');

                if(startCallback) startCallback.bind(this)(glitz);

            }, 50);

        },
        tapToHide: function () {
            // q has been answered
            tw.Utils.removeClass(document.getElementById('worldFrame'), 'blurred');
            worldState.customer = null;
            worldState.questionAnswered = '';
            uiState.inventoring = false;
        },
        selectRestockItem: function (e) {
            if(e.target.tagName === 'SPAN' && tw.Utils.hasClass(e.target, 'restock-item')) {    // todo - what is this mess ... data attributes ? SPAN ???
                var itemName = e.target.getAttribute('data-item'),
                    isInWarehouse = e.target.getAttribute('data-stock') === 'warehouse';
                uiState.restockItem = itemName;
                uiState.restockWarehouse = isInWarehouse;
                uiState.restockAmount = 1;
            }
        },
        closeRestockScreen: function () {
            uiState.restocking = false;
            uiState.restockUpgrades = false;
            uiState.restockItem = '';
        },
        // resetRestockScreen
        loadArea: function (name) {
            var oldLocation = player.location;

            this.returnDenizensToPool();    // are there any denizens left? this gets called after endDay ...
            this.saveDenizenPool();

            player.location = name;
            if(!player.stats.locationsVisited.includes(name)) player.stats.locationsVisited.push(name);

            uiState.mapping = false;
            var area = this.getArea(name);
            if(area.backgroundAudioId) this.playSound(area.backgroundAudioId);  // TODO - stop old audio

            this.loadDenizenPool();
            if(name !== oldLocation) this.newDay();
        },
        newDay: function () {

            this.updateEvents();
            worldState.day++;
            worldState.time = 0;
            worldState.endOfDay = false;
            uiState.restocking = false;
            uiState.restockItem = '';
            uiState.restockUpgrades = false;
            this.resetDailyStats();
            this.saveGame();

            this.playSound('cock');

            // setTimeout(this.spawnNewDenizen, 3000);
        },
        endDay: function () {
            worldState.endOfDay = true;
            uiState.inventoring = false;

            worldState.dailyTax = Math.ceil(10 + Math.random() * 30);
            if(this.canAfford(worldState.dailyTax)) this.payDailyTax();
            else player.stats.hasPaidDaily = false;

            // cleanup - return the activeDenizens to the pool
            this.returnDenizensToPool();

            if(Math.random() < this.getPerkEffect('Scrounger')) {
                var itemsInArea = this.getItemsInArea();
                var item = tw.Utils.randomFromArray(itemsInArea);
                this.addItemToInventory(item.name);
                if(Math.random() < 0.25) this.addItemToInventory(item.name);
                if(Math.random() < 0.125) this.addItemToInventory(item.name);
            }
        },
        closeShop: function () {
            // doesn't call endDay, leaves that to the denizenLoop
            worldState.time = 120;
            this.playSound('close-shop');
        },
        toRestock: function () {
            uiState.restocking = true;
            this.playSound('shop-bell');
        },
        randomDenizen: function () {
            var denizenPool = worldState.denizenPool;

            return denizenPool.splice(tw.Utils.randomInt(0, denizenPool.length), 1)[0];
        },
        randomQuestion: function (denizenName) {

            worldState.customerBuys.value = 0;

            var denizen = this.getDenizen(denizenName);

            var roll = Math.random();
            if(denizen.asks && !denizen.story) roll = 0;
            else if(!denizen.asks && denizen.story) roll = 1;

            if(roll && denizen.story && !player.stats.completedStories.includes(denizen.story)) {

                var question = tw.tuck.data.questions[denizen.story];

                if(player.stats.activeStories.indexOf(player.stats.activeStories.filter(function (story) { return story.name === denizen.story })[0]) === -1) {
                    player.stats.activeStories.push({name: denizen.story, stage: 0, responses: []});
                }

                question = this.getStoryStage(denizen.story);

                worldState.customerText = question.text[0];
                worldState.customerQuestionType = 'story';

            } else if(denizen.asks) {

                var questionType = denizen.asks[tw.Utils.randomInt(0, denizen.asks.length)];
                worldState.customerQuestionType = questionType;
                var question = tw.tuck.data.questions[questionType];

                if(question.text.constructor === Array) {
                    worldState.customerText = question.text[tw.Utils.randomInt(0, question.text.length)];
                }
                else if(question.text.constructor === Function) {
                    var text = question.text(player, worldState, tw.tuck.methods);
                    worldState.customerText = text[tw.Utils.randomInt(0, text.length)];
                }

                if(questionType === 'purchase') {

                    var randomItem,
                        area = this.getArea(),
                        randomItemName = area.items[tw.Utils.randomInt(0, area.items.length)];  // fallback if no 'buys'

                    if(denizen.buys) {
                        // approach 1 - random item from denizen buys array
                        // randomItemName = denizen.buys[tw.Utils.randomInt(0, denizen.buys.length)];

                        // approach 2 - filter denizen buys list to get ones in current area
                        // var buysInArea = denizen.buys.filter(function (itemName) {
                        //     return area.items.includes(itemName);       // caution - still breaks if char is in area containing none of their items - joe's fault tho
                        // });
                        // randomItemName = buysInArea[tw.Utils.randomInt(0, buysInArea.length)];

                        // approach 3 - only ask for things in other areas once you've visited them - todo - is this gonna be frustrating when revisiting old areas ? yes
                        var scope = this;
                        var itemsKnown = player.stats.locationsVisited.reduce(function (acc, areaName) {
                            return acc.concat(scope.getArea(areaName).items);
                        }, []);
                        var buysInKnownAreas = denizen.buys.filter(function (itemName) {
                            return itemsKnown.includes(itemName)
                        });
                        if(buysInKnownAreas.length > 0) randomItemName = buysInKnownAreas[tw.Utils.randomInt(0, buysInKnownAreas.length)];

                    }

                    randomItem = this.getItem(randomItemName);

                    worldState.customerBuys.item = randomItemName;
                    //worldState.customerBuys.amount = 100 / tw.tuck.methods.getItem(randomItem).value.sell;
                    var max = 100 / (randomItem.value[player.location] ? randomItem.value[player.location].sell : randomItem.returns * 3);
                    worldState.customerBuys.amount = 1 + Math.round(Math.random()*max);
                    worldState.customerBuys.value = this.getRandomItemValue(randomItem);

                    worldState.customerText += (worldState.customerBuys.amount + ' ' + worldState.customerBuys.item + ' for ' + ((worldState.customerBuys.value * worldState.customerBuys.amount)|0) + ' gold?');

                    uiState.inventoring = true;
                }
                // below are hacks - some questions as for money, but must use customerBuys.value to make sure that player has enough (grey out green button)
                else if(questionType === 'charity') {
                    worldState.customerBuys.value = (Math.ceil(Math.random() * 5) + 1) * this.getPerkEffect('Philanthropist');
                }
                else if(questionType === 'goodwords' || questionType === 'theft') {
                    worldState.customerBuys.value = 20;
                }
                else if(questionType === 'blackmail') {
                    worldState.customerBuys.value = 25;
                }
                // else if(questionType === 'to-village') {
                //     worldState.customerBuys.value = 15;
                // }

            } else {
                worldState.customerQuestionType = '?';
                worldState.customerText = tw.tuck.data.questions['?'].text[tw.Utils.randomInt(0, tw.tuck.data.questions['?'].text.length)];
                console.warn('no further questions from ' + worldState.customer);
                if(denizen.asks) console.warn('should ask: ' + denizen.asks.toString());
                if(denizen.story) console.warn('should regale the tale of ' + denizen.story);
            }

        },
        serveDenizen: function (denizenName) {
            worldState.customer = denizenName;
            this.randomQuestion(denizenName);
            var scope = this;
            setTimeout(function () {
                scope.playSound('whoosh');
            }, 400);
        },
        answerQuestion: function (e) {

            if(worldState.questionAnswered.length > 0) {
                this.tapToHide();
                return;
            }

            var answer = '';

            if(e.target.className.includes('yes')) answer = 'yes';
            else if(e.target.className.includes('no')) answer = 'no';
            else return;

            this.playSound('stamp');

            // var custElement = document.getElementsByClassName('customer')[0]
            var question;

            if(worldState.customerQuestionType === 'story') {

                var cust = this.getDenizen(worldState.customer);

                // find the current stage of the story

                question = this.getStoryStage(cust.story);

                // advance the story
                var activeStoryIdx = player.stats.activeStories.indexOf(player.stats.activeStories.filter(function (story) { return story.name === cust.story })[0]);
                player.stats.activeStories[activeStoryIdx].stage++;
                player.stats.activeStories[activeStoryIdx].responses.push(answer);

                // check to see if story over - is there still a stageYes / stageNo at the end of the current chain ?
                var nextStage = this.getStoryStage(cust.story);

                if(nextStage === undefined) {
                    // story's over :(
                    player.stats.activeStories.splice(activeStoryIdx, 1);
                    player.stats.completedStories.push(cust.story);
                    if(!cust.asks) this.removeDenizenFromPool(cust.name);
                }

            }
            else if(worldState.customerQuestionType === 'purchase' && answer === 'no') {

                // haggle - to and fro

                var haggleChance = 0.5 * this.getPerkEffect('Haggler');

                if(Math.random() < haggleChance && this.checkInventory(worldState.customerBuys.item, worldState.customerBuys.amount)) {

                    // haggle
                    // worldState.customerBuys.value = this.getRandomItemValue(this.getItem(worldState.customerBuys.item));
                    var valBefore = worldState.customerBuys.value;
                    worldState.customerBuys.value *= (0.95 + (Math.random() / 3));   // poss needs to inverse scale to item sell price
                    worldState.customerBuys.value *= this.getPerkEffect('Charismatic');
                    if(worldState.customerBuys.value === valBefore) worldState.customerBuys.value++;

                    var haggles = ['Alright, how about ', 'Ok, what about ', 'Fair enough. What if I wanted '];
                    worldState.customerText = haggles[tw.Utils.randomInt(0, haggles.length)] + worldState.customerBuys.amount + ' ' + worldState.customerBuys.item + ' for ' + ((worldState.customerBuys.value * worldState.customerBuys.amount)|0) + ' gold?';
                    return;
                } else {
                    // end
                    question = this.questions[worldState.customerQuestionType];
                }
            }
            else {
                question = this.questions[worldState.customerQuestionType];
            }

            if(question[answer]) question[answer](player, worldState, tw.tuck.methods);

            if(question.resYes.constructor === Function) question.resYes = question.resYes(player, worldState, tw.tuck.methods);
            if(question.resNo.constructor === Function) question.resNo = question.resNo(player, worldState, tw.tuck.methods);

            worldState.customerText = answer === 'yes' ? question.resYes[tw.Utils.randomInt(0, question.resYes.length)] : question.resNo[tw.Utils.randomInt(0, question.resNo.length)];

            worldState.questionAnswered = answer;

        },
        sufficientReputation: function (denizenName) {
            return (player.stats.reputation[player.location] >= this.getDenizen(denizenName).standing);
        },
        updateEvents: function () { // call every new day
            for(var i = worldState.activeEvents.length - 1; i >= 0; i--) {
                if(worldState.activeEvents[i].hasOwnProperty('time')) {
                    if(worldState.activeEvents[i].time < worldState.activeEvents[i].duration - 1) {
                        // if not done, advance in time
                        worldState.activeEvents[i].time++;
                    } else {
                        // if done, remove
                        console.log(worldState.activeEvents[i].name + ' ended !');
                        if(worldState.activeEvents[i].effects && worldState.activeEvents[i].effects.end) worldState.activeEvents[i].effects.end(player, worldState, tw.tuck.methods);
                        worldState.activeEvents.splice(i, 1);
                    }
                }
            }

            if(worldState.activeEvents.length < 2) {    // only 2 events allowed simultaneously

                var chanceForNewEvent = Math.random();  // TODO - make this based on other events as well as chance ?
                // console.log(chanceForNewEvent)
                if(chanceForNewEvent < 0.2) {   // joe roll ?

                    worldState.activeEvents.push(world.events[tw.Utils.randomInt(0, world.events.length)]);
                    var newEvent = worldState.activeEvents[worldState.activeEvents.length - 1];

                    if(newEvent.effects && newEvent.effects.start) newEvent.effects.start(player, worldState, tw.tuck.methods);

                    // cancel other events based on new event
                    if(newEvent.cancels) {
                        for(var i = 0; i < newEvent.cancels.length; i++) {
                            var idx = worldState.activeEvents.indexOf(worldState.activeEvents.filter(function (event) {
                                return event.name === newEvent.cancels[i]
                            })[0]);

                            if(idx !== -1) {
                                console.log(worldState.activeEvents[idx].name + ' cancelled !');
                                if(worldState.activeEvents[idx].effects && worldState.activeEvents[idx].effects.end) worldState.activeEvents[idx].effects.end(player, worldState, tw.tuck.methods);
                                worldState.activeEvents.splice(idx, 1);
                            }
                        }
                    }

                    // give the event 'time' property, init to 0
                    newEvent.time = 0;
                    console.log(newEvent.name + ' started !');

                    // TODO - push to UI
                }
            }
        },
        getEventEffect: function (effectName) {
            // combine all event vals eg for effectName = 'itemMultipliers', sum up all modifiers (avg?), then return the modifiers object
        },
        checkInventory: function (item, amount) {
            return player.inventory[item] >= amount;
        },
        addItemToInventory: function (item, amount) {
            amount = amount || 1;
            if(!player.inventory[item]) player.inventory[item] = 0;
            player.inventory[item] += amount;
        },
        itemIsUnlocked: function (name) {
            var isUnlocked = true;
            for(var i = 0; i < world.upgrades.length; i++) {
                if(world.upgrades[i].unlocks === name && !player.stats.upgrades.includes(world.upgrades[i].name)) isUnlocked = false;
            }
            return isUnlocked;
        },
        buyItem: function (item, amount, vendor) {
            amount = amount || 1;
            // vendor = vendor || world.vendors[0];
            this.addItemToInventory(item, amount);
            if(vendor) {
                vendor.inventory[item] -= amount;
                if(vendor.inventory[item] < 0) vendor.inventory[item] = 0;
            }
            if(this.getPerkEffect('Smooth Talker') && Math.random() < 0.05 + (amount / 100)) {
                // var itemsInArea = this.getItemsInArea();
                this.addItemToInventory(item);
            }
            var value = this.getPurchasePrice(item, amount);
            this.modifyCurrency(-value);
        },
        sellItem: function (item, amount, priceEach) {
            // validate
            if(player.inventory[item] === 0 || (player.inventory[item] === Infinity && uiState.restocking)) return;
            amount = amount || player.inventory[item];
            // check zero boundary + adjust amounts
            if(player.inventory[item] - amount < 0) amount = player.inventory[item];
            player.inventory[item] -= amount;
            // get price and adjust $$$
            var value = priceEach === undefined ? this.getSalePrice(item, amount) : ((priceEach * amount)|0);
            this.modifyCurrency(value);
            // update daily stats
            var index = player.stats.today.sold.indexOf(player.stats.today.sold.filter(function (itemObj) { return itemObj.item === item })[0]);
            if(index === -1) {
                var it = this.getItem(item);
                player.stats.today.sold.push({item: item, amount: amount, value: value, type: it.type});
            }
            else {
                player.stats.today.sold[index].amount += amount;
                player.stats.today.sold[index].value += value;
            }
            // if none left, delete inventory item
            if(player.inventory[item] === 0) delete player.inventory[item];
        },
        canAfford: function (amount) {  // TODO - incorporate into modifyCurrency (?) and ui checks
            return (player.stats.currency - amount >= 0);
        },
        modifyCurrency: function (amount) {
            // amount *= (this.getPerkEffect('currency') || 1);
            player.stats.currency += amount;

            if(amount > 0) player.stats.today.currency += amount;
            else player.stats.today.outgoings += amount;

            if(amount > 0) {
                for(var i = 0; i < Math.max(1, (amount/10)|0); i++) {
                    setTimeout(function () {
                        this.spawnGlitzyBit('glitz-coin','coin',null, function () {
                            this.playSound('coins');
                        }.bind(this));
                    }.bind(this), i * 40);
                }
            }
            else if(amount < 0) {
                for(var i = 0; i < Math.max(1, Math.abs(amount/10)|0); i++) {
                    setTimeout(function () {
                        this.spawnGlitzyBit('glitz-coin-down','coin', function (glitz) {
                            glitz.style.left = tw.Utils.randomInt(-3, 7) + "%";
                            this.playSound('coins');
                        }.bind(this));
                    }.bind(this), i * 40);
                }
            }
        },
        modifyReputation: function (amount, area) {
            area = area || player.location;
            var prev = player.stats.reputation[area];
            amount *= this.getPerkEffect('Marketing');
            // TODO - OR - if(this.getPerkEffect('reputation')) { amount *= that; activateUI; } // or activate ui inside getPerkEffect ??
            player.stats.reputation[area] += amount;
            player.stats.today.reputation += amount;
            if(player.stats.reputation[area] <= 0) player.stats.reputation[area] = 1;
            else if(player.stats.reputation[area] > 100) player.stats.reputation[area] = 100;

            if(amount > 0) {
                // this.playSound('rep-up');
                for(var i = 0; i < Math.max(1, (amount/10)|0); i++) {
                    setTimeout(function () {
                        this.spawnGlitzyBit('glitz-star', 'star',null, function () {
                            this.playSound('rep-up');
                        }.bind(this));
                    }.bind(this), i * 40);
                }
            }
            else {
                for(var i = 0; i < Math.max(1, (amount/10)|0); i++) {
                    setTimeout(function () {
                        this.spawnGlitzyBit('glitz-star-down','star', function (glitz) {
                            glitz.style.left = tw.Utils.randomInt(15, 25) + "%";
                            this.playSound('rep-down');
                        }.bind(this));
                    }.bind(this), i * 40);
                }
            }

            if(prev < 40 && player.stats.reputation[area] >= 40) {
                if(!player.stats.perksPerArea[player.location]) {
                    player.stats.perksPerArea[player.location] = 1;
                    uiState.choosingPerks = true;
                }
            } else if ( (prev < 100 && player.stats.reputation[area] === 100)) {
                if(player.stats.perksPerArea[player.location] < 2) {
                    player.stats.perksPerArea[player.location] = 2;
                    uiState.choosingPerks = true;
                }
            }
        },
        canSaveCurrency: function (amount) {
            return player.stats.currency - amount >= 0;
        },
        saveCurrency: function(amount) {
            if(this.canSaveCurrency(amount)) {
                player.stats.currency -= amount;
                player.stats.savings += amount;
            }
        },
        withdrawCurrency: function () {
            player.stats.currency += player.stats.savings;
            player.stats.savings = 0;
        },
        payDailyTax() {
            player.stats.hasPaidDaily = true;
            this.modifyCurrency(-worldState.dailyTax);
        },
        addTrait: function (name) {

        },
        removeTrait: function (name) {

        },
        choosePerk: function (name) {
            // event handler
            this.addPerk(name);
            uiState.choosingPerks = false;
        },
        addPerk: function (name) {
            player.stats.perks.push(name);
            var perk = this.getPerk(name);
            if(perk.start) perk.start(player, worldState, tw.tuck.methods);
        },
        removePerk: function (name) {
            var idx = player.stats.perks.indexOf(player.stats.perks.filter(function (perkName) { return perkName === name })[0]);
            player.stats.perks.splice(idx, 1);
            var perk = this.getPerk(name);
            if(perk.end) perk.end(player, worldState, tw.tuck.methods);
        },
        // getPerkEffect: function (effect) {
        //     var sum = 0;
        //     for(var i = 0; i < player.stats.perks.length; i++) {
        //         if(player.stats.perks[i].effects && player.stats.perks[i].effects[effect]) {
        //             if(!sum) sum = player.stats.perks[i].effects[effect];
        //             else sum *= player.stats.perks[i].effects[effect];
        //         }
        //     }
        //     return sum;
        // },
        getPerkEffect: function (perkName) {
            switch (perkName) {
                // roadside
                case 'Advertising':
                    // start()
                    break;
                case 'Herbalist':
                    return (player.stats.perks.includes('Herbalist') ? 1.2 : 1); // * prices offered for herbalist items
                case 'Weaver':
                    // start()
                    break;
                case 'Outfitter':
                    return (player.stats.perks.includes('Outfitter') ? 0.8 : 1); // * cost of clothing upgrades

                // village
                case 'Charismatic':
                    return (player.stats.perks.includes('Charismatic') ? 1.1 : 1); // * better haggle offer (haggle amt not chance)
                case 'Marketing':
                    return (player.stats.perks.includes('Marketing') ? 1.1 : 1); // * all rep gain amounts
                case 'Smooth Talker':
                    return player.stats.perks.includes('Smooth Talker'); // chance to get extra item while restocking
                case 'Haggler':
                    return (player.stats.perks.includes('Haggler') ? 1.3 : 1); // * chance to haggle

                // city walls
                case 'Scrounger':
                    return (player.stats.perks.includes('Scrounger') ? 0.3 : 0); // chance to get 1 free item at end of day
                case 'Mysterious Benefactor':
                    // start()
                    break;
                case 'Philanthropist':
                    return (player.stats.perks.includes('Philanthropist') ? 2 : 1); // * amount of money given to charity, * rep gains from charity
                case 'Well Mannered':
                    return !player.stats.perks.includes('Well Mannered'); // no rep loss for decline sale
            }
        },
        addUpgrade: function (name) {
            player.stats.upgrades.push(name);
            var cost = this.getUpgradePrice(name);
            this.modifyCurrency(-cost);
        },
        // hireDenizen: function (name) {  // not mvp, potentially remove
        //     var denizen = world.denizens.filter(function (denizen) {
        //         return denizen.name === name;
        //     })[0];
        //     player.hirelings.push(worldState.denizenPool.splice(worldState.denizenPool.indexOf(denizen), 1)); // should i rly be splicing denizens from world array ?? NO -> use denizenPool
        //     player.stats.today.hired++;
        //     // reputation shift ? other effect ?
        // },
        addDenizenToPool: function (name) {
            worldState.denizenPool.push(this.getDenizen(name));
        },
        removeDenizenFromPool: function (name) {
            // flag them for not re-adding
            for(var i = 0; i < worldState.denizensActive.length; i++) {
                if(worldState.denizensActive[i].denizenData.name === name) {
                    worldState.denizensActive[i].returnToPool = false;
                    return;
                }
            }
        },
        returnDenizensToPool: function () {
            for(var i = worldState.denizensActive.length - 1; i >= 0; i--) {
                var denizen = worldState.denizensActive.splice(i, 1)[0];
                if(denizen.returnToPool) {
                    this.addDenizenToPool(denizen.denizenData.name);
                }
            }
        },
        saveDenizenPool: function () {
            worldState.savedLocationPools[player.location] = worldState.denizenPool;
        },
        loadDenizenPool: function () {
            worldState.denizenPool = (worldState.savedLocationPools[player.location] && worldState.savedLocationPools[player.location].length > 0) ? worldState.savedLocationPools[player.location] : this.getDenizensInArea(player.location);
        },
        resetDailyStats: function () {
            player.stats.today.reputation = 0;
            player.stats.today.currency = 0;
            player.stats.today.outgoings = 0;
            player.stats.today.hired = 0;
            player.stats.today.sold = [];
        },
        // unlockArea
        getArea: function (name) {
            name = name || player.location;
            return world.areas.filter(function (area) {
                return area.name === name;
            })[0];
        },
        getAreas: function () {
            return world.areas;
        },
        getDenizen: function (name) {
            return world.denizens.filter(function (denizen) {
                return denizen.name === name;
            })[0];
        },
        getDenizensInArea: function (name) {
            name = name || player.location;
            var area = this.getArea(name);
            return world.denizens.filter(function (d) {
                return area.denizens.includes(d.name);
            })//.concat(this.getDenizen('Comic Sans'));  // hehe
        },
        getPerk: function (name) {
            return world.perks.filter(function (perk) {
                return perk.name === name;
            })[0];
        },
        getPerksInArea: function (name) {
            name = name || player.location;
            var area = this.getArea(name);
            return world.perks.filter(function (perk) {
                return (perk.location === area.name) && !player.stats.perks.includes(perk.name);
            });
        },
        // getAvailablePerksInArea ?
        getUpgrade: function (name) {
            return world.upgrades.filter(function (upgrade) {
                return upgrade.name === name;
            })[0];
        },
        getUpgrades: function () {
            return world.upgrades.filter(function (upgrade) {
                return !player.stats.upgrades.includes(upgrade.name);
            });
        },
        getItem: function (name) {
            return world.items.filter(function (item) {
                return item.name === name;
            })[0];
        },
        getItems: function (names) {
            return world.items.filter(function (item) {
                return names.includes(item.name);
            });
        },
        getItemsInArea: function (name) {
            name = name || player.location;
            var area = this.getArea(name);
            return world.items.filter(function (item) {
                return area.items.includes(item.name);
            });
        },
        getSalePrice: function (itemName, amount, location) {
            amount = amount || 1;
            location = location || player.location;
            // this.getPerkEffect(getItem().type) //  ?? send that in?????????
            var item = this.getItem(itemName);
            var price = (amount * item.value[location].sell);
            if(item.type === 'herbalism') price *= this.getPerkEffect('Herbalist');
            if(worldState.day > 1 && !player.stats.hasPaidDaily) price *= 0.85;
            return price;
        },
        getPurchasePrice: function (itemName, amount, location) {
            amount = amount || 1;
            location = location || player.location;
            return (amount * this.getItem(itemName).value[location].buy);
        },
        getRandomItemValue: function (itemObject) { // checks to see if item has val in current loc, but if not, uses the return price as base
            if(itemObject.value[player.location]) {
                var buyValue = (itemObject.value[player.location].buy || itemObject.value[player.location].sell);
                return Math.max(1, (buyValue * 0.9) + (Math.random() * (itemObject.value[player.location].sell - (buyValue * 0.9))));
            }
            else {
                return itemObject.returns;
            }
            // return itemObject.value[player.location] ?
            //     Math.max(1, (itemObject.value[player.location].buy * 0.9) + (Math.random() * (itemObject.value[player.location].sell - (itemObject.value[player.location].buy * 0.9))))
            //     : itemObject.returns;
        },
        getUpgradePrice: function (name) {
            var upgrade = this.getUpgrade(name);
            var cost = upgrade.cost;
            if(upgrade.type === 'clothing') cost *= this.getPerkEffect('Outfitter');
            return cost;
        },
        getStoryStage: function (storyName) {
            var activeStoryIdx = player.stats.activeStories.indexOf(player.stats.activeStories.filter(function (story) { return story.name === storyName })[0]);
            var responses = activeStoryIdx === -1 ? [] : player.stats.activeStories[activeStoryIdx].responses;
            var chainQuestion = this.questions[storyName];
            for(var i = 0; i < responses.length; i++) {
                chainQuestion = responses[i] === 'yes' ? chainQuestion.stageYes : chainQuestion.stageNo;
            }
            return chainQuestion;
        },
        showItemCategory: function (categoryItems, categoryName) {
            uiState.endOfDayCategory = categoryName;
            uiState.endOfDayCategoryItems = categoryItems;
        },
        saveGame: function () {
            var saveObject = JSON.stringify({player: player, worldState: worldState}, null, 2);     // TODO - JSON.stringify() doesn't know how to deal with Infinity .......
            localStorage.setItem('tucksave', saveObject);
            // saveDenizenPool() ? if so, fix to loop thru activeDenizens too
            console.log('game saved !');
            // send ??
        },
        loadGame: function (saveObject) {
            // poss problems: JSON.stringify not serialising Vue reactive props (necessary?)

            if(localStorage.tucksave) {
                var loadObject = JSON.parse(localStorage.tucksave);

                var tempWorldState = loadObject.worldState;
                var tempPlayer = loadObject.player;

                for(var prop in tempWorldState) {
                    if(worldState.hasOwnProperty(prop)) {
                        worldState[prop] = tempWorldState[prop];
                    }
                }

                for(var prop in tempPlayer) {
                    if(player.hasOwnProperty(prop)) {
                        player[prop] = tempPlayer[prop];
                    }
                }

                if(player.inventory['Baskets'] === null) player.inventory['Baskets'] = Infinity;    // TODO - NOT long term solution ........

                if(worldState.customer !== null) this.tapToHide();

                worldState.customer = null;
                worldState.time = 121;
                worldState.endOfDay = true;

                console.log('game loaded !')
            } else {
                console.error('could not find tuck save in local storage ! starting new game ...');
                this.newGame();
            }
            // request ??
        }
    };

    tw.tuck.computed = {
        getSoldTodayCategorised: function () {
            var categorised = {'adventure':[], 'herbalism':[], 'crafting':[], 'music':[], 'clothing':[], 'unique':[]}, itemNames = player.stats.today.sold.map(function(item) { return item.item });
            var inventoryItems = tw.tuck.methods.getItems(itemNames);
            // console.log(inventoryItems);
            for(var i = 0; i < inventoryItems.length; i++) {
                var todayIdx = player.stats.today.sold.indexOf(player.stats.today.sold.filter(function(item) { return item.item === inventoryItems[i].name })[0]);
                categorised[inventoryItems[i].type].push({name: inventoryItems[i].name, amount: player.stats.today.sold[todayIdx].amount, value: player.stats.today.sold[todayIdx].value});
            }
            return categorised;
        },
        getAreaCached: function () {
            return tw.tuck.methods.getArea();
        },
        getItemsInAreaCached: function () {
            return tw.tuck.methods.getItemsInArea();
        },
        getPerksInAreaCached: function () {
            return tw.tuck.methods.getPerksInArea();
        },
        getUpgradesCached: function () {
            return tw.tuck.methods.getUpgrades();
        },
        getActiveEventsCached: function () {
            return worldState.activeEvents.map(function(event) {return event.name});
        },
        yesCheck: function () {
            switch(this.worldState.customerQuestionType) {
                case 'purchase':
                    return this.checkInventory(this.worldState.customerBuys.item, this.worldState.customerBuys.amount);
                default:
                    if(worldState.customerBuys.value > 0 && !this.canAfford(worldState.customerBuys.value)) return false;
                    return true;
            }
        }
    };

})(TwinklGame, lib.manifest);