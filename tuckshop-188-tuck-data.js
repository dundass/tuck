var TwinklGame = TwinklGame || {};

// investment opps - return later with your share of profits if u do

// banker character - deposit some savings ? if so, will give it back to u later with a little interest

(function (tw, manifest) {
    tw.tuck = {
        data: {
            world: {
                areas: [
                    {
                        name: 'roadside',
                        backgroundImage: manifest.locationRoadside.src,
                        backgroundImageDark: manifest.locationRoadsideDark.src,
                        backgroundAudioId: 'roadside',
                        items: ['Baskets', 'Bottles and Vials', 'Dungeoneering Kits', 'Herbal Potion', 'Camping Gear'],
                        friends: ['village'],
                        enemies: ['swamp'],
                        denizens: ["Tilly and lil Bill", "Brother Gill", "Abigail Prinn", "The Fool", 'Hugh Molay', 'Samuel Barley', 'Harry Oldman', 'Almeric the Selfish','Uglalk','Sir Knight','Horald Stinkerby','Faelyn','Baba Yaga','Jess Hogglestonk']
                    },
                    {
                        name: 'village',
                        backgroundImage: manifest.locationVillage.src,
                        backgroundImageDark: manifest.locationVillageDark.src,
                        backgroundAudioId: 'village',
                        items: ['Dungeoneering Kits', 'Herbal Potion', 'Camping Gear', 'Armour', 'Writing Supplies', 'Pan Pipes'],
                        friends: ['roadside'],
                        enemies: ['city'],
                        denizens: ["Tilly and lil Bill", "Brother Gill", "Abigail Prinn", "The Fool", 'Tony Cryer', "Bee", 'Almeric the Selfish','Sir Knight','Mayor Jones','Shai','Fawkes','Jack Woodcutter','Gabriel Dragonlord','John Wolfman']
                    },
                    {
                        name: 'city walls',
                        backgroundImage: manifest.locationCityWalls.src,
                        backgroundImageDark: manifest.locationCityWallsDark.src,
                        backgroundAudioId: 'city',
                        items: ['Camping Gear', 'Armour', 'Writing Supplies', 'Pan Pipes', 'Metal Tools', 'Fishing Tackle', 'Lute', 'Fine Clothing'],
                        friends: [],
                        enemies: [],
                        denizens: ["Tilly and lil Bill", "Brother Gill", "Abigail Prinn", "The Fool", "Ruth Ordare", 'Tony Cryer', 'Vahn Dawnreaper', 'Almeric the Selfish','Sir Knight','Lady Virbella','Lord Bapple of Appleshire','Homenos Proudhoof']
                    }
                ],
                denizens: [ // global denizen pool - immutable !
                    {name: 'Horald Stinkerby',          standing: 0,        flipAsset: true, anim: manifest.animHorald.src,    image: manifest.custHorald.src,        asks: ['rockpaper', 'charity', 'random-neg', 'purchase'],                           buys: ['Baskets', 'Bottles and Vials']},
                    {name: 'Fawkes',                    standing: 0,        flipAsset: false, anim: manifest.animFawkes.src,    image: manifest.custFawkes.src,       asks: ['shopowner', 'random-pos', 'purchase', 'mushrooms'],                         buys: ['Baskets','Dungeoneering Kits', 'Herbal Potion'],                                                                        story: 'the letter'},
                    {name: 'Faelyn',                    standing: 20,       flipAsset: false, anim: manifest.animFaelyn.src,    image: manifest.custFaelyn.src,        asks: ['hiddentreasure', 'random-pos', 'random-neg', 'purchase'],                          buys: ['Herbal Potion','Baskets', 'Bottles and Vials']},
                    {name: 'Baba Yaga',                 standing: 5,        flipAsset: false, anim: manifest.animBaba.src,    image: manifest.custBaba.src,         asks: ['mushrooms', 'purchase'],                                                    buys: ['Baskets', 'Bottles and Vials', 'Herbal Potion'],                                                                        story: 'the letter'},
                    {name: 'Jack Woodcutter',           standing: 5,        flipAsset: true, anim: manifest.animJack.src,    image: manifest.custJack.src,       asks: ['purchase','charity'],                                                       buys: ['Dungeoneering Kits', 'Herbal Potion', 'Camping Gear'],                                                                  story: 'jack of all trades'},
                    {name: 'Lady Virbella',             standing: 30,       flipAsset: false, anim: manifest.animLady.src,    image: manifest.custLady.src,       asks: ['prize','purchase','charity'],                                               buys: ['Writing Supplies', 'Pan Pipes', 'Lute', 'Fine Clothing'],                                                               story: 'the letter'},
                    {name: 'Gabriel Dragonlord',        standing: 30,       flipAsset: false, anim: manifest.animGabriel.src,    image: manifest.custGabriel.src,       asks: ['random-pos','purchase'],                                                    buys: ['Armour', 'Writing Supplies', 'Pan Pipes', 'Baskets'],                                                                   story: 'dragons den'},
                    {name: 'John Wolfman',              standing: 30,       flipAsset: false, anim: manifest.animJohn.src,    image: manifest.custJohn.src,                                                                                                                                                                                                                          story: 'dragons den'},
                    {name: 'Jess Hogglestonk',          standing: 0,        flipAsset: false, anim: manifest.animJess.src,    image: manifest.custJess.src,     asks: ['purchase', 'random-pos', 'festivals'],                                      buys: ['Baskets', 'Bottles and Vials', 'Herbal Potion'],                                                                        story: 'desperate',},
                    {name: 'Jessica Hogglesworth',      standing: 0,        flipAsset: false, anim: manifest.animJessica.src,    image: manifest.custJessica.src,     asks: ['purchase', 'random-pos'],                                                   buys: ['Baskets', 'Bottles and Vials', 'Dungeoneering Kits', 'Herbal Potion', 'Camping Gear'],                                  story: 'cured'},
                    {name: 'Shai',                      standing: 0,        flipAsset: false, anim: manifest.animShai.src,    image: manifest.custShai.src,                                                                                                                                                                                                                              story: 'the silent'},
                    {name: 'Mayor Jones',               standing: 0,        flipAsset: false, anim: manifest.animMayor.src,    image: manifest.custMayor.src,        asks:['theft', 'beenbusy', 'random-pos','purchase', 'dailytax'],                    buys: ['Herbal Potion', 'Pan Pipes', 'Writing Supplies'],                                                                       story: 'the repair pt.1'},
                    {name: 'Lord Bapple of Appleshire', standing: 50,       flipAsset: false, anim: manifest.animLord.src,    image: manifest.custLord.src,        asks:['goodwords', 'purchase', 'dailytax'],                                         buys: ['Writing Supplies', 'Pan Pipes', 'Lute', 'Fine Clothing'],                                                               story: 'library'},
                    {name: 'Sir Knight',                standing: 55,       flipAsset: false, anim: manifest.animSir.src,    image: manifest.custSir.src,       asks:['knights', 'goodwords', 'purchase','random-pos'],                             buys: ['Dungeoneering Kits', 'Armour'],                                                                                         story: 'academy'},
                    {name: 'Uglalk',                    standing: 7,        flipAsset: false, anim: manifest.animUglalk.src,    image: manifest.custUglalk.src,         asks:['random-pos','random-neg', 'purchase'],                                       buys: ['Dungeoneering Kits', 'Herbal Potion']},
                    // WHY is he selfish ?? blackmail
                    {name: 'Almeric the Selfish',       standing: 2,        flipAsset: true, anim: manifest.animAlmeric.src,    image: manifest.custAlmeric.src,      asks:['knights', 'blackmail','charity','random-neg', 'purchase'],                   buys: ['Dungeoneering Kits', 'Herbal Potion', 'Camping Gear', 'Armour', 'Metal Tools'],                                         story: 'to-village'},

                    // {name: 'Renford of Swamptown',      standing: 5,        image: 'images/customers/warrior.png',      asks:['charity','purchase'],                                                        buys: ['Dungeoneering Kits', 'Armour', 'Bottles and Vials']},
                    {name: 'Harry Oldman',              standing: 0,        flipAsset: true, anim: manifest.animHarry.src,    image: manifest.custHarry.src,       asks:['charity','purchase'],                                                        buys: ['Bottles and Vials', 'Baskets']},
                    {name: 'Homenos Proudhoof',         standing: 10,       flipAsset: false, anim: manifest.animHomenos.src,    image: manifest.custHomenos.src,                                                                                                                                                                                                                           story: 'a horse voice'},
                    {name: 'Vahn Dawnreaper',           standing: 0,        flipAsset: false, anim: manifest.animVahn.src,    image: manifest.custVahn.src,      asks: ['trinkets', 'purchase'],                                                     buys: ['Dungeoneering Kits', 'Herbal Potion', 'Herbal Potion', 'Fine Clothing'],                                                story: 'demons'},
                    {name: 'Blue Beast',                standing: 0,        flipAsset: false, anim: manifest.animBlue.src,    image: manifest.custBlue.src,      asks: ['purchase'],                                                                 buys: ['Dungeoneering Kits', 'Baskets', 'Camping Gear', 'Armour', 'Writing Supplies', 'Pan Pipes']},
                    {name: 'Red Beast',               standing: 0,        flipAsset: false, anim: manifest.animRed.src,    image: manifest.custRed.src,      asks: ['purchase'],                                                                 buys: ['Dungeoneering Kits', 'Baskets', 'Camping Gear', 'Armour', 'Writing Supplies', 'Pan Pipes']},
                    {name: 'Pink Beast',                standing: 0,        flipAsset: false, anim: manifest.animPink.src,    image: manifest.custPink.src,      asks: ['purchase'],                                                                 buys: ['Dungeoneering Kits', 'Herbal Potion', 'Camping Gear', 'Armour', 'Writing Supplies']},
                    {name: 'Wrapped Beast',             standing: 0,        flipAsset: true, anim: manifest.animWrapped.src,    image: manifest.custWrapped.src,      asks: ['purchase'],                                                                 buys: ['Dungeoneering Kits', 'Herbal Potion', 'Camping Gear', 'Armour', 'Writing Supplies']},
                    {name: 'Sign Beast',                standing: 0,        flipAsset: false, anim: manifest.animSign.src,    image: manifest.custSign.src,      asks: ['purchase'],                                                                 buys: ['Dungeoneering Kits', 'Herbal Potion', 'Camping Gear', 'Metal Tools', 'Fishing Tackle', 'Lute', 'Fine Clothing']},
                    {name: 'Boss Beast',                standing: 0,        flipAsset: false, anim: manifest.animBoss.src,    image: manifest.custBoss.src,      asks: ['purchase'],                                                                 buys: ['Dungeoneering Kits', 'Herbal Potion', 'Camping Gear', 'Metal Tools', 'Fishing Tackle', 'Lute', 'Fine Clothing']},
                    {name: 'Hugh Molay',                standing: 0,        flipAsset: true, anim: manifest.animHugh.src,    image: manifest.custHugh.src,    asks: ['knights', 'purchase'],                                                      buys: ['Dungeoneering Kits', 'Herbal Potion', 'Camping Gear', 'Armour']},
                    // {name: 'Hans Bowman',               standing: 0,        image: 'images/customers/generic_2.png',    asks: ['purchase'],                                                                 buys: ['Dungeoneering Kits', 'Herbal Potion', 'Camping Gear', 'Armour']},
                    {name: 'Samuel Barley',             standing: 0,        flipAsset: false, anim: manifest.animSamuel.src,    image: manifest.custSamuel.src,    asks: ['purchase'],                                                                 buys: ['Baskets', 'Bottles and Vials', 'Dungeoneering Kits']},
                    {name: 'Tony Cryer',                standing: 0,        flipAsset: false, anim: manifest.animTony.src,    image: manifest.custTony.src,    asks: ['purchase', 'location'],                                                     buys: ['Herbal Potion', 'Writing Supplies', 'Metal Tools', 'Lute'],                                                             story: 'fireworks'},
                    // {name: 'Tommy Smith',               standing: 0,        image: 'images/customers/generic_5.png',    asks: ['purchase'],                                                                 buys: ['Armour', 'Metal Tools']},
                    {name: 'Bee',                       standing: 0,        flipAsset: false, anim: manifest.animBee.src,    image: manifest.custBee.src,    asks: ['bully', 'dolly', 'purchase', 'location'],                                   buys: ['Pan Pipes', 'Camping Gear', 'Writing Supplies']},
                    // {name: 'Charles Copley',            standing: 0,        image: 'images/customers/generic_7.png',    asks: ['purchase', 'random-pos'],                                                   buys: ['Herbal Potion', 'Camping Gear', 'Armour', 'Baskets']},
                    {name: 'Ruth Ordare',               standing: 0,        flipAsset: false, anim: manifest.animRuth.src,    image: manifest.custRuth.src,    asks: ['purchase', 'random-pos', 'location'],                                       buys: ['Lute', 'Fine Clothing', 'Baskets', 'Writing Supplies']},
                    // {name: 'Greta Grumbles',            standing: 0,        image: 'images/customers/generic_9.png',    asks: ['purchase', 'random-pos'],                                                   buys: ['Camping Gear', 'Writing Supplies', 'Fine Clothing', 'Pan Pipes']},
                    {name: 'Tilly and lil Bill',        standing: 0,        flipAsset: true, anim: manifest.animTilly.src,    image: manifest.custTilly.src,   asks: ['bully', 'purchase', 'random-pos', 'goodwords'],                             buys: ['Baskets', 'Bottles and Vials', 'Herbal Potion']},
                    {name: 'Brother Gill',              standing: 0,        flipAsset: false, anim: manifest.animBrother.src,    image: manifest.custBrother.src,   asks: ['goodwords', 'random-pos', 'purchase'],                                      buys: ['Bottles and Vials', 'Herbal Potion', 'Writing Supplies']},
                    {name: 'Abigail Prinn',             standing: 0,        flipAsset: false, anim: manifest.animAbigail.src,    image: manifest.custAbigail.src,   asks: ['purchase', 'random-pos', 'timeofday'],                                      buys: ['Baskets', 'Bottles and Vials']},
                    {name: 'The Fool',                  standing: 0,        flipAsset: false, anim: manifest.animFool.src,    image: manifest.custFool.src,      asks: ['littlegamered','littlegamegreen','fool_1','fool_2','fool_3', 'fool_4', 'purchase'],                                     buys: ['Baskets', 'Bottles and Vials', 'Herbal Potion', 'Writing Supplies', 'Lute', 'Fine Clothing', 'Pan Pipes']},
                    {name: 'The Stranger',              standing: 0,        flipAsset: false, anim: manifest.animStranger.src,    image: manifest.custStranger.src,     asks: ['stranger_1','stranger_2']},

                    // {name: 'Comic Sans', standing: 0, story: 'sans', image: manifest.custComic.src},
                    // {name: 'Death', standing: -666},
                    // {name: 'Loan Shark', standing: 1},    // an actual shark
                    // {name: 'Friar Tuck', standing: 30, hireling: true}, // and hirelingStats: {} ??
                    // {name: 'The Tooth Fairy', standing: 50, hireling: true}

                    // DLC - denizens of the Rock Kingdom
                    // Rock Man - rock giant comes in asking for stuff alluding to their size
                    // Rock Father - just a giant foot stomps in front of the shop, asking for where his son is - "i've heard he went to the village - is this true?" - then if u say yes, drops loads of rep in the village cuz he's crushed a bunch of houses heehee
                    // Rock Lobster
                    // Rock Starr

                ],
                // competitors: [
                //     {name: 'Bill Sykes', currency: 50, items: ['Bottles and Vials']}
                // ],
                // vendors: [
                //     {name: 'Billie Jen', inventory: {'Bottles and Vials': 1000, 'Dungeoneering Kits': 100, 'Herbal Potion': 10}}
                // ],
                items: [    // global item pool
                    {name: 'tat', value: {buy: 1, sell: 2}},            // for each location, multiple area-specific items plus a couple more unlockable + items from prev locations
                    {name: 'stuff', value: {buy: 7, sell: 10}},
                    {name: 'fancies', value: {buy: 80, sell: 100}},   // buying price = value * 0.666 \m/_ but based on reputation - based on location as well as global rep
                    {name: 'santa hats', value: {buy: 100000, sell: 10000000}, locked: true},

                    //actual
                    {name: 'Baskets',               image: manifest.itemBasket.src,         type:'adventure',   value: {'roadside': {buy: 2,sell: 4},        'village': {buy: 2, sell: 5},       'city walls': {sell: 6}},               'returns':1},
                    {name: 'Bottles and Vials',     image: manifest.itemBottles.src,        type:'herbalism',   value: {'roadside': {buy: 1,sell: 2},        'village': {sell: 2},               'city walls': {sell: 3}},               'returns':1},
                    {name: 'Dungeoneering Kits',    image: manifest.itemDungeoneering.src,  type:'adventure',   value: {'roadside': {buy: 5,sell: 10},       'village': {buy: 5, sell: 12},      'city walls': {sell: 18}},              'returns':1},
                    {name: 'Herbal Potion',         image: manifest.itemHerbal.src,         type:'herbalism',   value: {'roadside': {buy: 10,sell: 25},      'village': {buy: 6, sell: 15},      'city walls': {sell: 15}},              'returns':2},
                    {name: 'Camping Gear',          image: manifest.itemCamping.src,        type:'adventure',   value: {'roadside': {buy: 10,sell: 20},      'village': {buy: 8,sell: 20},       'city walls': {buy: 8,sell: 15}},       'returns':4},
                    {name: 'Armour',                image: manifest.itemArmour.src,         type:'clothing',    value: {'roadside': {sell: 28},              'village': {buy: 12,sell: 25},      'city walls': {buy: 12,sell: 25}},      'returns':6},
                    {name: 'Writing Supplies',      image: manifest.itemWriting.src,        type:'crafting',    value: {'roadside': {sell: 35},              'village': {buy: 22,sell: 40},      'city walls': {buy: 15,sell: 30}},      'returns':8},
                    {name: 'Pan Pipes',             image: manifest.itemPipes.src,          type:'music',       value: {'roadside': {sell: 65},              'village': {buy: 35,sell: 50},      'city walls': {buy: 20,sell: 60}},      'returns':8},
                    {name: 'Metal Tools',           image: manifest.itemTools.src,          type:'crafting',    value: {'roadside': {sell: 80},              'village': {sell: 75},              'city walls': {buy: 25,sell: 75}},      'returns':10},
                    {name: 'Fishing Tackle',        image: manifest.itemTackle.src,         type:'adventure',   value: {'roadside': {sell: 95},              'village': {sell: 95},              'city walls': {buy: 35,sell: 100}},     'returns':10},
                    {name: 'Lute',                  image: manifest.itemLute.src,           type:'music',       value: {'roadside': {sell: 100},             'village': {sell: 100},             'city walls': {buy: 38,sell: 120}},     'returns':12},
                    {name: 'Fine Clothing',         image: manifest.itemClothing.src,       type:'clothing',    value: {'roadside': {sell: 100},             'village': {sell: 130},             'city walls': {buy: 50,sell: 135}},     'returns':15},

                    //Unique Items, quest rewards etc.
                    {name: 'Cursed Amulet', image: manifest.itemLocket.src, type:'unique', value: {'roadside': {buy: 0,sell: 250}, 'village': {buy: 0, sell: 250}, 'city walls': {buy: 0,sell: 250}}, 'returns':250},
                    {name: 'Dragonscale Shield', image: manifest.itemShield.src, type:'unique', value: {'roadside': {buy: 0,sell: 500}, 'village': {buy: 0, sell: 500}, 'city walls': {buy: 0,sell: 500}}, 'returns':500},
                    {name: 'Lilac Tea', image: manifest.itemTea.src, type:'unique', value: {'roadside': {buy: 0,sell: 500}, 'village': {buy: 0, sell: 500}, 'city walls': {buy: 0,sell: 500}}, 'returns':500},
                    {name: 'Handmade Scrapbook', image: manifest.itemBook.src, type:'unique', value: {'roadside': {buy: 0,sell: 350}, 'village': {buy: 0, sell: 350}, 'city walls': {buy: 0,sell: 350}}, 'returns':350},
                ],
                events: [
                    {name: 'rain', duration: 2, cancels: ['monsoon', 'troupe'], effects: {start: function() {  }, end: function() {  }}},
                    {name: 'monsoon', duration: 3, cancels: ['rain', 'troupe', 'festival'], effects: {start: function() {  }, end: function() {  }}},
                    {name: 'war', duration: 6, cancels: ['troupe', 'festival'], effects: {itemMultipliers: {tat: 1.4, fancies: 0.01}, start: function() {}}},
                    {name: 'drought', duration: 4, cancels: ['rain', 'monsoon', 'festival', 'war'], effects: {start: function() {  }, end: function() {  }}},    // yellow bright visual effect, also less people ?
                    {name: 'plague', duration: 3, cancels: ['pirateAttack', 'festival', 'troupe'], effects: {start: function() {  }, end: function() {  }}},
                    {name: 'blockade', duration: 4, cancels: ['pirateAttack', 'war']},              // decreases denizen frequency
                    {name: 'pirateAttack', duration: 2, cancels: ['blockade', 'festival', 'troupe']},   // increase denizen freq, but add 10 pirates to pool
                    {name: 'troupe', duration: 2},                                                  // increase denizen frequency, decrease money per denizen
                    {name: 'festival', duration: 7, effects: {start: function(p, ws, m) { ws.dynamics.denizenFrequency *= 2 }, end: function(p, ws, m) { ws.dynamics.denizenFrequency /= 2 }}}  // diff types of festival ?
                ],
                upgrades: [ // banner !
                    {name: 'Potion Rack', desc: 'Sell potions, herbs, and herbal potions!', cost: 250, unlocks: 'Herbal Potion', image: manifest.upgradePotions.src, type: 'herbalism'},
                    {name: 'Wardrobe', desc: 'The finest of robes can\'t just be thrown on the floor!', cost: 600, unlocks: 'Fine Clothing', image: manifest.upgradeWardrobe.src, type: 'clothing'},
                    {name: 'Tackle Box', desc: 'Fishing equipment like rods, bait, and lures can be stored here.', cost: 550, unlocks: 'Fishing Tackle', image: manifest.upgradeTackle.src, type: 'adventure'},
                    {name: 'Stationery Storage', desc: 'From a humble quill to the finest vellum, you can sell it all.', cost: 400, unlocks: 'Writing Supplies', image: manifest.upgradeWriting.src, type: 'crafting'}
                ],
                perks: [
                    {name: 'Advertising', location:"roadside", desc:"Advertising in local papers and noticeboards promotes your shop, causing people to walk past more often.", image:manifest.perkAdvertising.src, start: function(p, ws, m) { ws.dynamics.denizenFrequency *= 1.5 }, end: function(p, ws, m) { ws.dynamics.denizenFrequency *= (2/3) }}, //effects: {'denizenFrequency': 1.2}},
                    {name: 'Herbalist', location:"roadside", desc:"Becoming a Herbalism specialist means that people pay 20% more for items in this class.", image:manifest.perkHerbalist.src, effects: {'herbalist': 1.2}},
                    {name: 'Weaver', location:"roadside", desc:"Making your own products means you don't have to rely on anyone to provide them for you. You'll never run out of baskets now.", image:manifest.perkBaskets.src, start: function(p, ws, m) { p.inventory['Baskets'] = Infinity }, end: function(p, ws, m) { p.inventory['Baskets'] = 0 }},
                    {name: 'Outfitter', location:"roadside", desc:"Becoming a dedicated seller of clothing ensures any future clothing related shop upgrades cost 20% less.", image:manifest.perkClothing.src, effects: {'clothingShop': 0.8}},

                    {name: 'Charismatic', location:"village", desc:"Being friendly, and having a good rapport with your customers means they are more likely to make better offers when haggling.", image:manifest.perkCharismatic.src, effects: {'haggle': 1.1}},
                    {name: 'Marketing', location:"village", desc:"Good marketing means customers spread the word of how great your shop is. Any reputation gains will increase by 10%.", image:manifest.perkMarketing.src, effects: {'reputation': 1.1}},
                    {name: 'Smooth Talker', location:"village", desc:"By being friendly with your stockist, they're more likely to help you. You gain a chance to get free items when restocking.", image:manifest.perkSmooth.src, effects: {'restockBonus': true}},
                    {name: 'Haggler', location:"village", desc:"Haggling or bargaining is commonplace in many markets around the world. Customers will now be more likely to make a counter-offer when you refuse them.", image:manifest.perkHaggler.src, effects: {'haggleChance': 0.6}},

                    {name: 'Scrounger', location:"city walls", desc:"You have a keen eye, and see opportunity everywhere. You have a small chance of finding special items at the end of each day.", image:manifest.perkScrounger.src, effects: {'endOfDayBonus': true}},
                    {name: 'Mysterious Benefactor', location:"city walls", desc:"Many businesses get a helping hand. This perk adds a unique person to the world who occasionally gives you money or reputation.", image:manifest.perkMysterious.src, start: function(p, ws, m) { m.addDenizenToPool('The Stranger') }},
                    {name: 'Philanthropist', location:"city walls", desc:"Giving back to the community is good for them, and good for your business. You give more money away to those in need, but they give you more reputation in return.", image:manifest.perkPhilanthropist.src, effects: {'charity': 1.2}},
                    {name: 'Well Mannered', location:"city walls", desc:"By being courteous and polite at all times, refusing a sale to customers now doesn't result in reputation loss.", image:manifest.perkManners.src, effects: {'declineSale': true}}
                ]
            },

            // animationData: {
            //     'scroll': { url: 'images/ui/ScrollSprite.png', className: 'question', frameWidth: 1248, frameHeight: 404 }
            // },

            questions: {
                'purchase': {                                                   // when purchasing, people ask for any item in current area as well as a few from neighbouring areas
                    text: ['Good day, may I buy ',
                        'Greetings, do you have ',
                        'Greetings, Tuck, do you have ',
                        'I\'d love ',
                        'Can I have ',
                        'Gimme ',
                        'Tuck! Gimme ',
                        'Let me get my hands on ',
                        'Hmmm... I\'ll buy ',
                        'Please, let me buy ',
                        'Please, Tuck, let me buy ',
                        'Hello there. Can I have ',
                        'I\'d like ',
                        'Hi Tuck! Can I buy ',

                        'So much choice! I\'d really like ',
                        'I\'d really like ',
                        'Quick! I need ',
                        'Do you have ',
                        'I\'ll take '
                        ],    // [{prefix: '', suffix: ''}] ?
                    yes: function (player, worldState, methods) {
                        // item + amount is already chosen when asking + before answering question -> see randomQuestion()
                        var item = worldState.customerBuys.item,
                            amount = worldState.customerBuys.amount,
                            value = worldState.customerBuys.value;

                        if(methods.checkInventory(item, amount)) {
                            methods.sellItem(item, amount, value);
                            var repChange = Math.round(Math.random() * 2) + 1;
                            if(worldState.dynamics.corrupted && player.location === 'village') repChange *= -1;
                            methods.modifyReputation(repChange);
                        } else {
                            this.no();
                            console.log('this shouldnt have happened ...');
                        }
                    },
                    no: function (player, worldState, methods) {
                        if(methods.getPerkEffect('Well Mannered'))
                            methods.modifyReputation((worldState.dynamics.corrupted && player.location === 'village') ? 1 : -1);
                    },
                    resYes: [   'Thanks! Exactly what I wanted!',
                                'Thanks Tuck! Exactly what I wanted!',
                                'It\'s wonderful!',
                                'Great! Thank you!',
                                'Great! Thank you, Tuck!',
                                'It\'s all I ever wanted!',
                                'Nice one!',
                                'Great! Cheers for that!',
                                'Thanks a lot.',
                                'Thanks a lot, Tuck.',
                                'Thanks!',
                                'Thanks, Tuck!',
                                'Thank you!',
                                'Amazing!',
                                'Fantastic!',
                                'Perfect! Thanks!',
                                'Wow! Even better than I expected!',
                                'This is the best shop in the realm!',
                                'What a shop!',
                                'I can\'t wait to come back soon!',
                                'I\'ll be back!',
                                'Such great value!',
                                'These prices are incredible',
                                'I owe you one, Tuck!',
                                'I love shopping here!',
                                'This shop is so great!',
                                'Tuck, you\'re a legend!'
                        ],
                    resNo: [    'Suit yourself...',
                                'Well I never!',
                                'Terrible!',
                                'I hate this...',
                                'It\'s not fair...',
                                '...but I wanted that...',
                                'Curses...',
                                'Tuck... Why..?',
                                'So rude...',
                                'Aaargh!',
                                'So annoying!',
                                'Tuck! You\'re so annoying!',
                                'That\'s not ideal...',
                                'How frustrating!',
                                'But... But...',
                                'Hmmph. Guess I\'ll go somewhere else!',
                                'I don\'t know why I bother...',
                                'Well...',
                                'Well then...',
                                'This is the worst shop in the realm!',
                                'This is supposed to be a shop isn\'t it?!',
                                'What kind of shop is this?!',
                                'Tuck!',
                                'Not like this...'
                        ]
                },
                'charity': {
                    text:['Please, I just need money for the bus.',
                          'I can eat for a day for just a few coins...',
                          'You have so much, and I have so little... Please share?',
                          'Would you give me a little coin? I\'m sure it would bring you luck...',
                          'It\'s my birthday today. Do you have a present for me?',
                          'A little coin would go a long way...',
                          'Please Tuck, I just want money!',
                          'I have a great business idea. I just need a bit of an investment!',
                          'Share the wealth, Tuck!',
                          'How about this: Give me a few coins now, I\'ll be back to spend them later, right?',
                          'Help me out would ya? A few coins is all I want!',
                          'Just a little pocket money. I promise not to waste it!',
                          'I\'m collecting money for... A good cause. Can I count on your support?',
                          'Taxes for the king! All must pay the King Tax!',
                          'Taxes for the queen! All must pay the Queen Tax!',
                          'A few coins is all I need. I could buy some Swamp Mushrooms, see what all the fuss is about!',
                          'With a few coins, I could buy some delicious treats for my family!',
                          'I almost have enough to buy myself a new hammer, could you help me out please?'],
                    yes: function (player, worldState, methods) {
                        if(player.stats.currency - worldState.customerBuys.value >= 0) methods.modifyCurrency(-worldState.customerBuys.value);
                        methods.modifyReputation(Math.ceil(Math.random() * 2) * methods.getPerkEffect('Philanthropist'));
                    },
                    no: function (player, worldState, methods) {
                        methods.modifyReputation(-1);
                    },
                    resYes: [   'You\'re a wonderful person, Tuck!',
                                'I shall tell all of your kindness!',
                                'Thank you!',
                                'So kind, yes!',
                                'Nice one!',
                                'I\'m eternally grateful!',
                                'Thanks a lot.',
                                'Thanks a lot, Tuck',
                                'Thanks!',
                                'Thanks Tuck!'
                    ],
                    resNo: [    'You deserve naught but misery...',
                                'Another night in the cold for me...',
                                'My life is misery!',
                                'I hate this...',
                                'It\'s not fair...',
                                'I guess you\'re too good for this...',
                                'You are so much more important than me I guess.',
                                'I hope you fail!',
                                'Aaargh!',
                                'You are a bad person, Tuck!'
                    ]
                },
                'random-pos': {
                    text:['Lovely day isn\'t it?',
                          'Are you a cat person?',
                          'Are you a dog person?',
                          'Are you enjoying the world of business?',
                          'Hey Tuck! Are you enjoying the world of business?',
                          'Should I head back and do my chores?',
                          'I shall sing your praises to the masses!',
                          'The roses look great this time of year, right?',
                          'Should I get myself a fancy new hat?',
                          'Do you think I could ever run a successful business?',
                          'Hey Tuck. Are we friends?',
                          'Is it all worth it?',
                          'Are you having a nice time, Tuck?',
                          'Are you enjoying the cool shade of these beautiful trees?',
                          'I\'m thinking of writing a novel. Should it be about wolves?',
                          'Should I ask my friends for their help?',
                          'Hey Tuck! Fancy meeting up for a game of dice later?',
                          'Those Rock-Kingdom folk seem nice don\'t they?',
                          'Do you think I can afford a boat?',
                          'Me and my partner have a had an argument. You think I\'m right don\'t you?',
                          'You trust me don\'t ya Tuck?',
                          'I think Swamp Mushrooms are gross. Do you?'
                    ],
                    yes: function (player, worldState, methods) {
                        methods.modifyReputation( 1 );
                    },
                    no: function (player, worldState, methods) {
                        methods.modifyReputation( -1 );
                    },
                    resYes: [   'Great!',
                                'Ha ha! Wonderful!',
                                'Great! Thank you!',
                                'That\'s great! Thank you!',
                                'That\'s right!',
                                'Nice one!',
                                'Great! Cheers for that!',
                                'Hmmm, I agree!',
                                'You are right! What a star!',
                                'Thank you!'
                    ],
                    resNo: [    'You are a fool, Tuck!',
                                'Well I never!',
                                'Awful person...',
                                'I hate this...',
                                'That\'s not kind at all...',
                                'Not good...',
                                'Curses...',
                                'So rude...',
                                'Aaargh!'
                    ]
                },
                'random-neg': {
                    text:['Is it a good idea to have slug sandwiches for dinner?',
                          'I\'m sure I could steal from the Mayor of the village. Should I?',
                          'Maybe I should set just a small fire...',
                          'I could open a rival shop, right next to yours. Good idea right?',
                          'A friend has dared me to drink from the Fountain of Poisons. Should I?',
                          'This town is ruined... You agree with me, right?',
                          'These trees could all be chopped down to build a bunch of warehouses. Great plan right?',
                          'Hi Tuck! Do you think it\'ll rain tomorrow?',
                          'I reckon I could win a fight with a bunch of were-bears. Should I do it?',
                          'Should I ask the Fae Princess where to find her buried treasure?',
                            ],
                    yes: function (player, worldState, methods) {
                        methods.modifyReputation( -1 );
                    },
                    no: function (player, worldState, methods) {
                        methods.modifyReputation( 1 );
                    },
                    resYes: [   'Bah!',
                                'Everything is awful!',
                                'Awful...',
                                'I hate this...',
                                'Not good...',
                                'Curses...',
                                'Aaargh!',
                                'Hmmm...',
                                'No no...'
                    ],
                    resNo: [    'Ah ha!',
                                'Hmmmm...',
                                'Yes yes...',
                                '...',
                                'That\'s just great...',
                                'I\'m not so sure!',
                                'Thanks, I guess.'
                    ]
                },
                'location': {   // dynamic question !
                    text: function (player, worldState, methods) {
                        // var areas = methods.getAreas();
                        // var areaOrder = areas.map(function (area) { // why ?
                        //     return area.name
                        // });
                        var visited = player.stats.locationsVisited.filter(function (area) {
                            return area !== player.location     // exclude current loc
                        });
                        // console.log(visited)
                        var areaSpecific = {
                            'roadside': [
                                'Why, you started out at the roadside, right? How does it feel to be moving up in life?',
                                'The roadside folks spoke well of you, do you get on well with them?',
                                '"Tuck is the greatest!" said the people of the roadside. Are they right?'
                            ],
                            'village': [
                                'The village people told me about your shop! Are you enjoying their company?',
                                'I heard that you\'ve been to the village! Are the rumours true, do they have beds there?',
                                'I heard that you\'ve been to the village! Do they really live in houses??'
                            ],
                            'city walls': [
                                'Wow, you\'re that big shot from the city! Can you sign my doublet?',
                                'Do you think I could be as successful as you one day?',
                                'Oh, I\'ve heard of you, you\'re from the city! How\'s life in the fast lane?'
                            ],
                            'none': [
                                'You should get out there, Tuck. Don\'t you want to see the world?',
                                'Take a look at your map some time, there\'s plenty to explore! Isn\'t that exciting??',
                                'I heard that there was a village ahead, maybe even a city! Wouldn\'t you like to visit?'
                            ]
                        };
                        return visited.length === 0 ? areaSpecific.none : areaSpecific[tw.Utils.randomFromArray(visited)];
                    },
                    yes: function (player, worldState, methods) {
                        methods.modifyReputation(1);
                    },
                    no: function (player, worldState, methods) {
                        methods.modifyReputation(-1);
                    },
                    resYes: ['Great!', 'Wonderful!', 'I\'m glad!', 'Amazing!', 'Great, keep it up!'],
                    resNo: ['Oh...', 'That\'s sad.', 'How disappointing.', 'Well then.']
                },
                'timeofday': {   // dynamic question !
                    text: function (player, worldState, methods) {
                        var timeSpecific = {
                            'daytime': [
                                'I feel fresh and ready for the day, how about you?',
                                'Oh my, I must have forgotten to eat lunch today! Have you been eating well, Tuck?',
                                'I love the buzz of the day, so many possibilities! Do you hope to get a lot done today?'
                            ],
                            'evening': [
                                'It\'s getting late, Tuck. Perhaps time to close up shop soon?',
                                'Ah, the night is young. Would you recommend a drink at one of the local taverns?',
                                'Oh, looks like it\'s getting dark! Should I head back home for the night?',
                                'Dear me, is that the time? The night can be spooky sometimes. Are you afraid of the dark, Tuck?'
                            ]
                        };

                        var rainEvent = worldState.activeEvents.filter(function (event) {
                            return event.name === 'rain' || event.name === 'monsoon';
                        });
                        if(rainEvent.length > 0) timeSpecific.daytime.push('Oh Tuck, I\'m getting soaked here! Don\'t you just hate the rain?');
                        else timeSpecific.daytime.push('I just love the daytime, it\'s so full of light and wonder! Wouldn\'t you agree?');

                        return worldState.time > 80 ? timeSpecific.evening : timeSpecific.daytime;
                    },
                    yes: function (player, worldState, methods) {
                        methods.modifyReputation(1);
                    },
                    no: function (player, worldState, methods) {
                        methods.modifyReputation(-1);
                    },
                    resYes: ['That\'s great!', 'Excellent!', 'I\'m glad!', 'Amazing!', 'Let\'s do this!'],
                    resNo: ['Oh...', 'Hmmm...', 'Well then.']
                },
                'dailytax': {   // dynamic question !
                    text: function (player, worldState, methods) {
                        var paySpecific = {
                            'paid': [
                                'You seem to be keeping up with paying your daily upkeep. Will you have enough for today\'s?',
                                'Inspection! Ah, looks like you\'ve paid your daily upkeep, can I expect the same today?',
                                'Good to see you\'re keeping up with your daily upkeep payments. Things are going well, then?',
                                'Inspectio- Oh! You\'ve paid the daily upkeep charge. Staying on top of things, eh?'
                            ],
                            'unpaid': [
                                'Oh dear Tuck, looks like you haven\'t paid your daily upkeep! Are you sorry?',
                                'My reports say that you haven\'t paid your daily upkeep, will you be paying today?',
                                'Tuck! You MUST make sure you have enough gold for the daily upkeep at the end of the day. Got it?'
                            ]
                        };

                        return player.stats.hasPaidDaily ? paySpecific.paid : paySpecific.unpaid;
                    },
                    yes: function (player, worldState, methods) {
                        if(player.stats.hasPaidDaily) methods.modifyReputation(2);
                    },
                    no: function (player, worldState, methods) {
                        methods.modifyReputation(-5);
                    },
                    resYes: ['Good to know.', 'Keep it up!', 'I am satisfied.'],
                    resNo: ['Oh dear...', 'Oh...', 'We\'ll see.', 'That\'s not good..']
                },
                '?': {
                    text: ["I'm sorry, Tuck, it must have slipped my mind!",
                        "You know, I think I've forgotten what I was going to say...",
                        "Wait, I think I've come to the wrong shop. Sorry!"],
                    resYes: ["Goodbye!", "Farewell.", "Enjoy the day!"],
                    resNo: ["Off I go!", "Maybe another day.", "Ah well..."],
                    yes: function (player, worldState, methods) {
                        console.error('u doofus, looks like you didnt give '+ worldState.customer + ' a real question !');
                    },
                    no: function (player, worldState, methods) {
                        console.error('u doofus, looks like you didnt give '+ worldState.customer + ' a real question !');
                    }
                },


                //JEKYLL AND HYDE



                //------------------------
                //    SPECIAL QUESTIONS   |
                //------------------------

                /*'fortune':{
                    text: ["This is a test question. Do you have more than 100 gold?"],
                    resYes: function(player) {
                        if( player.stats.currency > 100 ){
                            return ["That is correct. You do have more than 100 gold!"]
                        } else {
                            return ["This is the taste of a liar! You have less than 100 gold."]
                        }

                    },
                    resNo: function(player){
                        if( player.stats.currency > 100 ){
                            return ["This is the taste of one who is lying! You do actually have more than 100 gold!"]
                        } else {
                            return ["Correct. The gold you have is less than 100."]
                        }
                    }
                },*/

                'rockpaper':{
                    text: ["Hey, let's have a quick game of rock, paper, scissors! 3...2...1...GO!"],
                    resYes: ["Wait that's... That's not a rock, paper OR scissors! You're so bad at this..."],
                    resNo: ["Wait that's... That's not a rock, paper OR scissors! You're so bad at this..."]
                },

                'littlegamered':{
                    text: ["Here's a good game, a silly game! What colour am I thinking about? Take a guess, green or red! " +
                    "Get it right and I'll give you a prize! Hoohooooo! What a game!"],
                    resYes: ['Oof, ouch ow! No, no, no! The fool\'s ahead - he picked red! Better luck next time, silly-head!'],
                    resNo: ["Wow! We have a winner! Here you go Tuck, 20 gold to the luckiest shopowner in the realm!"],
                    no: function(player, worldState, methods){
                        methods.modifyCurrency(20);
                        methods.modifyReputation(5);
                    }
                },
                'littlegamegreen':{
                    text: ["Here's a good game, a silly game! What colour am I thinking about? Take a guess, green or red! " +
                    "If you\'re right, I'll give you a prize! Hoohooooo! What a game!"],
                    resYes: ["Wow! We have a winner! Here you go Tuck, 20 gold to the luckiest shopowner in the realm!"],
                    resNo: ["Oof, ouch ow! The fool is mean - He picked green! Better luck next time, little bean!"],
                    yes: function(player, worldState, methods){
                        methods.modifyCurrency(20);
                        methods.modifyReputation(5);
                    }
                },

                'hiddentreasure':{
                    text: ["You! Have you been telling people where to find my buried treasure?"],
                    resYes: ["Well stop it! I haven't had a moment's peace since you turned up!"],
                    resNo: ["Hmmm... Well wait 'till I get my hands on whoever has been!"]
                },

                'goodwords':{
                    text: ["Hello there! Nice place you have here! For a mere 20 gold I can tell people some good things about you. Interested?"],
                    resYes: ["You won\'t regret this! People will be flocking to you soon!"],
                    resNo: ["Suit yourself! I am a very influental person you know!"],
                    yes: function(player, worldState, methods){
                        methods.modifyCurrency(-20);
                        methods.modifyReputation(5);
                    },
                    requires: {gold: 20}
                },

                'blackmail':{   // todo - replace/remove blackmail ...
                    text: ["Hmmm... Nice place you have here. It\'d be a shame if something happened to it... You know, " +
                    "for 25 gold I could make sure your stuff is safe. A good price don\'t you think?"],
                    resYes: ["You\'re smart! You made the right choice. See you real soon, pal."],
                    resNo: ["Big mistake..."],
                    yes: function(player, worldState, methods){
                        methods.modifyCurrency(-25);
                    },
                    requires: {gold: 25}
                },

                'bully':{
                    text: ["Hello! Has that nasty bully been round yet? She'll try and make you give her money and threaten you."],
                    resYes: ["Don't listen to her! She's just mean!"],
                    resNo: ["Then be careful of her. Most importantly, don't listen to her! She's just a mean bully!"]
                },

                'mushrooms':{
                    text: ["Do you have a spare moment to talk about the amazing health benefits of locally sourced Swamp Mushrooms?"],
                    resYes: ["They're the best aren't they! Tasty, slimy, and great for lots of health problems! Thanks for listening!"],
                    resNo: ["No one cares about Swamp Mushrooms nowadays..."]
                },

                'festivals':{
                    text: ["Have you heard about all the great festivals we have here?"],
                    resYes: ["Oh OK! just checking! I can't wait for the next festival!"],
                    resNo: ["Oh wow they're super fun! Loads of people from all around turn up! I bet you'd make lots of money during a festival!"]
                },

                'shopowner':{
                    text: ["Did you know that I used to have a little shop of my own?"],
                    resYes: ["Ah yes, I probably already told you. Sorry!"],
                    resNo: ["Haha! It exploded! KaBOOM! Hahahaaa! Woooo! What a mess... I'm happier without it!"]
                },

                'beenbusy':{
                    text: ["Hi! Had a busy day so far?"],
                    resYes: ["Great! Be sure to make time for what's really important though won't you? Life shouldn't just " +
                    "be about making stacks of gold you know!"],
                    resNo: ["Ah well keep your chin up; There'll always be good days and bad days! Keep at it!"]
                },

                'trinkets':{
                    text: ["Idol, living doll, or lucky charm. I'm in the market for something... Special... Do you have anything for me?"],
                    resYes: ["No no no. This is not quite right. Maybe I'll stop by again soon."],
                    resNo: ["Well keep me in mind. Rarities and curios, I'll pay you handsomely."]
                },

                /*function(player) {
                    if( player.hasItem('dragonstooth') ){
                        return ["That is correct. You do have more than 100 gold!"]
                    } else if( player.hasItem('Houndstooth') ){
                        return ["This is the taste of a liar! You have less than 100 gold."]
                    } else if( player.hasItem('Cursed Amulet') ){
                        return ["This is the taste of a liar! You have less than 100 gold."]
                    } else if( player.hasItem('Dragonstooth') ){
                        return ["This is the taste of a liar! You have less than 100 gold."]
                    }

                }*/
                /*function(player){
                    if( player.stats.currency > 100 ){
                        return ["This is the taste of one who is lying! You do actually have more than 100 gold!"]
                    } else {
                        return ["Correct. The gold you have is less than 100."]
                    }
                }*/


                'knights':{
                    text: ["Ha! There's no-one as strong as me! I'm the strongest one of them all! Do you agree with me?"],
                    resYes: ["I'm so strong! Hahahaaaa!"],
                    resNo: ["I'm strong! and you're wrong! I'm strong! You're wrong!"],
                    yes: function (player, worldState, methods) {
                        methods.modifyReputation(5);
                    },
                    no: function (player, worldState, methods) {
                        methods.modifyReputation(-5);
                    }
                },

                'fool_1':{
                    text: ["Cheaper, cheaper, nice shopkeeper?"],
                    resYes: ["Cheep cheep!"],
                    resNo: ["... Not so nice to The Fool!"]
                },

                'fool_2':{
                    text: ["No questions today fair one. Just say \'yes\' and The Fool will be on his merry way!"],
                    resYes: ["Who is the fool now?"],
                    resNo: ["An independent mind! Tee hee!"]
                },

                'fool_3':{
                    text: ["A cruel fool puts jewels in the school gruel. Will you rule when The Fool\'s a ghoul?"],
                    resYes: ["Spooky spooky ghouls! Haha."],
                    resNo: ["It\'s a hard job being the fool all the time. I wanted to be an accountant..."]
                },

                'fool_4':{
                    text: ["Hee hee hee, sick of me?"],
                    resYes: ["The Fool shall always miss thee, fair Tuck!"],
                    resNo: ["Excellent, excellent. You'll always have The Fool! One lucky coin for Tuck!"],
                    yes: function(player, worldState, methods){
                        methods.removeDenizenFromPool('The Fool');
                    },
                    no: function(player, worldState, methods){
                        methods.modifyCurrency(1);
                    }
                },

                'stranger_1':{
                    text: ["Tuck. You need a few gold, little gift from me to you?"],
                    resYes: ["Here. See you 'round..."],
                    resNo: ["Fine."],
                    yes: function(player, worldState, methods){
                        methods.modifyCurrency(50);
                    },
                    no: function(player, worldState, methods){}
                },

                'stranger_2':{
                    text: ["Tuck. Good to see you. Shall I spread the word? Let 'em know how great you are?"],
                    resYes: ["Can do..."],
                    resNo: ["Suit yourself."],
                    yes: function(player, worldState, methods){
                        methods.modifyReputation(10);
                    },
                    no: function(player, worldState, methods){}
                },

                'dolly':{
                    text: ["Excuse me. I've lost Polly, my very special dolly. Have you seen her?"],
                    resYes: ["Oh! She's in my hand after all! Thank you so much! Have a shiny! Come along Polly!"],
                    resNo: ["Oh I shall never find my Polly dolly..."],
                    yes: function(player, worldState, methods){
                        methods.modifyCurrency(1);
                        methods.modifyReputation(1);
                    }
                },

                'theft':{
                    text: ["Someone has tried to steal trinkets and baubles from my fine coffers. Do you know anything about this?"],
                    resYes: ["Well I never! I expect better of you in the future. Perhaps a fine will straighten you out!"],
                    resNo: ["I've got my eye on you..."],
                    yes: function(player, worldState, methods){
                        methods.modifyCurrency(-20);
                    },
                    requires: {gold: 20}
                },

                'prize':{
                    text: ["Congratulations! You've won 'Tiny Little Business of the Week!' Your prize is a very tidy sum of 50 gold! Isn't that great?"],
                    resYes: ["You've earned it. Congratulations once again! Keep it up, I'm proud of you!"],
                    resNo: ["Well no need to be rude! Here, take it. May it bring you nothing but misery..."],
                    yes: function(player, worldState, methods){
                        methods.modifyCurrency(50);
                        methods.modifyReputation(5);
                    },
                    no: function(player, worldState, methods){
                        methods.modifyCurrency(50);
                        methods.modifyReputation(-3);
                    }
                },

                'sans': {
                    story: true,
                    denizen: 'Comic Sans',
                    text: ["Greetings, would you like to invest in my exquisite new writing style?"],
                    resYes: ["Enjoy the show!"],
                    resNo: ["Trust me, you're missing out."],
                    yes: function (player, worldState, methods) {
                        tw.Utils.addClass(document.body, 'comic');
                        methods.modifyCurrency(5);
                    },
                    stageYes: {
                        text: ["Hey! Are you enjoying your new lettering?"],
                        resYes: ["Great! I'm so glad you like it!"],
                        resNo: ["Nothing I can do about that, sorry."],
                        stageYes: {
                            text: ["Alright, I guess I've had my fun. I am a comic, after all. Want me to change it back?"],
                            resYes: ["Font face restored, humanity saved."],
                            resNo: ["R..really? Ok then, just make sure you don't regret that decision. Goodbye forever!"],
                            yes: function (player, worldState, methods) {
                                tw.Utils.removeClass(document.body, 'comic');
                                methods.removeDenizenFromPool('Comic Sans');
                            }
                        },
                        stageNo: {
                            text: ["Well, maybe there is something I can do... For 50 gold I can change it back. Deal?"],
                            resYes: ["There you go! Your sanity is now intact!"],
                            resNo: ["Well then. You may now persist in the doomed world you have created."],
                            yes: function (player, worldState, methods) {
                                methods.modifyCurrency(-50);
                                tw.Utils.removeClass(document.body, 'comic');
                                methods.removeDenizenFromPool('Comic Sans');
                            }
                        }
                    },
                    stageNo: {
                        text: ["Are you sure you don't want to sample my new writing script? I've been working on it all my life!"],
                        resYes: ["Excellent! Welcome to hell."],
                        resNo: ["Fair Enough, it's actually terrible."],
                        yes: function (player, worldState, methods) {
                            tw.Utils.addClass(document.body, 'comic');
                        },
                        no: function (player, worldState, methods) {
                            methods.removeDenizenFromPool('Comic Sans');
                        },
                        stageYes: {
                            text: ["Hmmm. Your eyes look a bit tired. Perhaps I can restore order to the world of typefaces for you?"],
                            resYes: ["Ah well, it was fun while it lasted..."],
                            resNo: ["How can you bear this???"],
                            yes: function (player, worldState, methods) {
                                tw.Utils.removeClass(document.body, 'comic');
                                methods.removeDenizenFromPool('Comic Sans');
                            }
                        }
                    }
                },

                //---------------------------
                // MAIN STORIES: LET'S GO!   |
                //---------------------------

                /*
                //TODO - HERE'S A NICE TNETENNBA
                'title':{
                    story: false,
                    denizen: 'babaYaga',
                    text: [],
                    resYes: [],
                    resNo: [],
                    yes: function(player, worldState, methods){

                    }, //GOTO - XX
                    no: function(player, worldState, methods){

                    }, //GOTO - YY
                    stageYes: { //XX

                    },
                    stageNo: { //YY

                    }
                },

                */

                'the letter':{
                    story: true,
                    denizen: 'Baba Yaga',
                    text: ["HEEEEEHEHEEEE! Please, Tuck. Would you help a poor, lovesick old fool?"],
                    resYes: ["YEEEEEES YES HEEHEEEE! Thank you, Tuck! Please, send word to my love in the " +
                    "nearby village. Let them know I still wait here, eternally. Be quick, HEEHEEEE!"],
                    resNo: ["BAAAAAH HAHAAA! My heart is doomed to ache forever..."],
                    yes: function(player, worldState, methods){
                        methods.modifyReputation(8);
                    },
                    no: function(player, worldState, methods){
                        methods.modifyReputation(-5);
                    },
                    stageYes: {
                        story: true,
                        denizen: 'Fawkes',
                        text: ["I say, a letter for me? How exquisite, Tuck. Let's see... Ah wonderful! A letter from my dear love! " +
                        "You've met her right? Will you go get her something nice from me?"],
                        resYes: ["Excellent! Thank you, Tuck. Something exotic would be perfect! Maybe one of Lady Virbella's finest dresses? " +
                        "You'll find her outside the City. Good luck finding her!"],
                        resNo: ["Please! You have to help me, Tuck. I'm too busy!"],
                        yes: function(player, worldState, methods){
                            methods.modifyReputation(4);
                        },
                        no: function(player, worldState, methods){
                            methods.modifyReputation(-3);
                        },
                        stageYes: {
                            story: true,
                            denizen: 'Lady Virbella',
                            text: ["So, you've come to find a fine dress have you? You've come to the right place. I " +
                            "only provide the finest fabrics, the most sublime stitching! 500 gold. Are you interested?"],
                            resYes: ["Of course you are. I've always said \"That Tuck is a true follower of fashion\"." +
                            "I hope Mr. Fawkes is pleased with this. Please make sure he sees it."],
                            resNo: ["Don't waste my time. I've always said \"That Tuck is no follower of fashion\". Seems " +
                            "like I was right!"],
                            requires: {gold: 500},
                            yes: function(player, worldState, methods){
                                methods.modifyReputation(10);
                                methods.modifyCurrency(-500);
                            },
                            no: function(player, worldState, methods){
                                methods.modifyReputation(-1);
                            },
                            stageYes: {
                                story: true,
                                denizen: 'Fawkes',
                                text: ["That dress! Incredible. Thank you for fetching this, Tuck, it must have cost so much! Let me guess: 1000 gold?"],
                                resYes: ["I knew it. Totally worth it though. You can\'t put a price on true quality! Please, take it " +
                                "to my lady love back by the roadside. Here is your 1000 gold!"],
                                resNo: ["No? Only 500 gold? Wow, thanks for your honesty, Tuck. Here, take 600, for the trouble. " +
                                "Please, take it back to my lady love back by the roadside."],
                                yes: function(player, worldState, methods){
                                    methods.modifyReputation(10);
                                    methods.modifyCurrency(1000);
                                },
                                no: function(player, worldState, methods){
                                    methods.modifyReputation(-1);
                                    methods.modifyCurrency(600);
                                },
                                stageYes: {
                                    story: true,
                                    denizen: 'Baba Yaga',
                                    text: ["HEEHEE! Oh, Tuck. You did all this. All this kindness, fetching things back " +
                                    "and forth, then lied to my Fawkes! Are you pleased with yourself?"],
                                    resYes: ["Oh dear, oh dear. Was it worth it. For a few hundred gold? Shame on you Tuck, shame on you!"],
                                    resNo: ["Oh dear, Tuck..."],
                                    yes: function(player, worldState, methods){
                                        methods.modifyReputation(-15);
                                    },
                                    no: function(player, worldState, methods){
                                        methods.modifyReputation(-5);
                                    }
                                },
                                stageNo: {
                                    story: true,
                                    denizen: 'Baba Yaga',
                                    text: ["HEEHEE! Oh, Tuck. Is this from Mr Fawkes? Is this beautiful dress for MEEEEEEE?!"],
                                    resYes: ["HEEEEHEEHEEE! What an amazing gift. Thank you! HEEHEEHEEEEEE!" +
                                    "Take this. It\'s not much, but it will hopefully help someone as much as you\'ve helped us!"],
                                    resNo: ["NOOOOOO! You got my hopes up there..."],
                                    yes: function(player, worldState, methods){
                                        methods.modifyReputation(15);
                                        methods.modifyCurrency(1000);
                                    },
                                    no: function(player, worldState, methods){
                                        methods.modifyReputation(-5);
                                    }
                                }
                            }
                        }
                    }
                },

                'the repair pt.1':{
                    // Ruin has come to this village. The venerable Town Hall, opulent and imperial, gazing proudly
                    // from its stoic perch above the moors. The Mayor lived all his years in that ancient, rumor shadowed manor,
                    // fattened by decadence and luxury. Now, we must bend every effort towards the excavation and recovery of this building,
                    // exhausting what remains of our family fortune on swarthy workmen and sturdy shovels.
                    //
                    // Now, it is a festering abomination! I beg you.
                    // Return from the city; claim your birthright, and deliver our family from the ravenous,
                    // clutching shadows...
                    //
                    // of the TOWN HALL.

                    story: true,
                    denizen: 'Mayor Jones',
                    text: ["Welcome to the Village, Tuck! Are you settling in alright? You have everything you need?"],
                    resYes: ["Excellent excellent! I'll check in with you soon. I may have a favour to ask of you. " +
                    "Well here is a small grant, get you on your feet!"], //GOTO R-1
                    resNo: ["Oh I am sorry! Hopefully things will pick up a little going forward. I'll check back in a while!"], //GOTO R-2
                    recurs: true,
                    yes: function(player, worldState, methods){
                        methods.modifyCurrency(50);
                    },
                    no: function(player, worldState, methods){},
                    stageYes: { //R1
                        story: true,
                        denizen: 'Mayor Jones',
                        text: ["Hello again! Things are still going well I trust? Since you have been here a while now, you may have seen " +
                        "our town hall, once opulent and imperial and now... Well, have you seen it?"],
                        resYes: ["Then you know. It's almost in ruins. The floor has holes, the chimney has fallen and the roof... Well there " +
                        "is no roof. I have other Mayoral tasks, but I will be back to speak more of this later."], //GOTO R-1
                        resNo: ["Ah, Tuck... It is in ruins! It once stood proudly in the centre of town. The beating heart of our community. " +
                        "Now it is a mess! We need help but no one has enough gold..."], //GOTO R-2
                        yes: function(player, worldState, methods){},
                        no: function(player, worldState, methods){},
                        stageYes: { //R3
                            story: true,
                            denizen: 'Mayor Jones',
                            text: ["Greetings once again. I have a request. This village is being good to you. Now it's time to" +
                            " be good to the village. Simply put, we need money. Do you think you could help us?"],
                            resYes: ["I don't know what to say. Wonderful! The repairs should cost 1000 gold. A trifling sum! " +
                            "I can't wait to see you again, Tuck!"],
                            resNo: ["How disappointing. Maybe once you see what this place has to offer, you might change your mind."],
                            recurs: true,
                            yes: function(player, worldState, methods){
                                methods.modifyReputation(5);
                                //methods.removeDenizenFromPool('Mayor Jones');
                            },
                            no: function(player, worldState, methods){
                                methods.modifyReputation(-5);
                            },
                            stageYes: {
                                story: true,
                                denizen: 'Mayor Jones',
                                text: ["Ah Tuck! You're back! How has the fundraising been going? Do you have the 1000 gold yet?"],
                                // resYes: function(player){
                                //     if(player.stats.currency >= 1000){
                                //         return ["Incredible! You truly are a pillar of the community. Thank you, Tuck, from the bottom of our " +
                                //         "hearts. Take this as a reward, you've really earned it!"]
                                //     } else {
                                //         return ["Whoops, doesn't look like you do have 1000 gold after all! Don't worry, I'm sure you'll get it in no time!"]
                                //     }
                                //
                                //     },
                                resYes: ["Incredible! You truly are a pillar of the community. Thank you, Tuck, from the bottom of our " +
                                         "hearts. Take this as a reward, you've really earned it!"],
                                resNo: ["Ah not to worry! I'm sure you'll get it in no time!"],
                                requires: {gold: 1000},
                                yes: function(player, worldState, methods){
                                    // if(player.stats.currency >= 1000) {
                                        methods.modifyCurrency(-1000);
                                        methods.modifyReputation(50);
                                    // }
                                },
                                no: function(player, worldState, methods){}
                            }
                        }
                    }
                },

                //----------------------
                //    SIDE STORY TIME   |
                //----------------------

                //-----------------
                //    STORY TIME   |
                //-----------------

                'to-village':{
                    story: false,   // (true)
                    denizen: 'Almeric the Selfish',
                    text: ["Bah! The road to the nearby village is blocked! We strong knights have been hired to clear the blockage. " +
                    "A few gold might really help us out... Wanna donate? Let's say... 15 gold?"],
                    resYes: ["Heh heh, nice one. I'll buy a new sturdy shovel! The road will be clear in no time!"],
                    resNo: ['Fair enough. Stay here all week, see how I care!'],
                    requires: {gold: 15},
                    yes: function(player, worldState, methods){
                        methods.modifyCurrency(-15);
                        // methods.unlockArea('village');
                    },
                    no: function(player, worldState, methods){},
                    stageNo: {
                        text: ["We still can't get to the village! Please Tuck, all we need is 15 gold and we can enjoy the riches of the village together!"],
                        resYes: ["Hahaa! Diggers of the Roadside, assemble!"],
                        resNo: ["Oh... You must really like this forest then, huh?"],
                        requires: {gold: 15},
                        yes: function (player, worldState, methods) {
                            methods.modifyCurrency(-15);
                            player.stats.mapUnlocked = true;
                        },
                        no: function (player, worldState, methods) {}
                    }
                },

                'demons':{
                    story: false,   // (true)
                    denizen: 'Vahn Dawnreaper',
                    text: ["Greetings mortal. I, the great Vahn Dawnreaper, shall bring you riches, bring you customers, bring you " +
                    "glory! All I need to do is open a tiny-weeny portal to the nether realm. Shall I go ahead?"],
                    resYes: ['Yes! Let\'s go! You\'ll be rich after this! Hope nothing too bad happens!'],
                    resNo: ['Bah, I\'ll be back if you change your mind!'],
                    //recurs: true, // ??
                    yes: function(player, worldState, methods){
                        worldState.dynamics.corrupted = true;
                        methods.modifyReputation(-20);
                        methods.returnDenizensToPool();
                        methods.saveDenizenPool();
                        var demons = ['Blue Beast',
                            'Red Beast',
                            'Pink Beast',
                            'Wrapped Beast',
                            'Sign Beast',
                            'Boss Beast'];
                        worldState.denizenPool = [];
                        for(var i = 0; i < 10; i++) {
                            methods.addDenizenToPool(demons[tw.Utils.randomInt(0, demons.length)]); // TODO - how about each demon deal decreases rep but get more gold than usual ?
                        }
                    },
                    no: function(player, worldState, methods){
                        methods.modifyReputation(2);
                    },
                    stageYes: {
                        text: ["Hmmm... Well I might have made a tiny error in my calculations. Looks like instead of opening a portal, " +
                        "I\'ve turned some people into stink-beasts instead. Easy mistake to make. Shall I switch them back?"],
                        resYes: ['Probably for the best. There might be one or two stink-beasts still hanging around, but ' +
                        'they are totally harmless.'],
                        resNo: ['Fine, I\'ll turn them back without your help. I got us into this mess, I\'ll get us out!'],
                        yes: function(player, worldState, methods){
                            worldState.dynamics.corrupted = false;
                            worldState.denizenPool = [];
                            methods.loadDenizenPool();
                        },
                        no: function(player, worldState, methods){
                            methods.modifyReputation(-10);
                            worldState.dynamics.corrupted = false;
                            worldState.denizenPool = [];
                            methods.loadDenizenPool();
                        }
                    }
                },

                'desperate':{
                    story: false,   // (true)
                    denizen: 'Jess Hogglestonk',
                    text: ['Hey! You want this super-secret-special item right? It\'s a good one!'],
                    resYes: ['Ha! You can\'t have it! HAHA!'],
                    resNo: ['What? But... It\'s special!'],
                    recurs: true,
                    yes: function(player, worldState, methods){
                    }, //GOTO - XX
                    no: function(player, worldState, methods){
                        methods.modifyReputation(-1);
                    },
                    stageNo: { //YY
                        text: ['Hey! Remember me, and my SUPER special item? It\'s SO rare! You want it? only 100 gold!'],
                        resYes: ['Fooled you again! I love it too much to sell it to you!'],
                        resNo: ['Bah, you have no taste at all, what\'s wrong with you?!'],
                        recurs: true,
                        yes: function(player, worldState, methods){
                        },
                        no: function(player, worldState, methods){
                            methods.modifyReputation(-1);
                        },
                        stageNo: { //YY
                            text: ['Fine, fine! 20 gold. It\'s SUPER SUPER SUPER special. You\'ll buy it right?'],
                            resYes: ['You... You do... *Ahem* Here, here! Take it. Enjoy!'],
                            resNo: ['Fine whatever! You\'ll be SO sorry though. It\'s a great item...'],
                            requires: {gold: 20},
                            yes: function(player, worldState, methods){
                                methods.removeDenizenFromPool('Jess Hogglestonk');
                                methods.addDenizenToPool('Jessica Hogglesworth');
                                methods.addItemToInventory('Cursed Amulet', 1);
                                methods.modifyCurrency(-20);
                            },
                            no: function(player, worldState, methods){
                                methods.modifyReputation(-1);
                            },
                            stageNo: {
                                text: ['TAKE THE ITEM, TUCK! PLEASE JUST TAKE IT I DON\'T WANT IT ANYMORE!'],
                                resYes: ['Really? You... You want it. I mean... of course you do! It\'s such a great ' +
                                'item! Enjoy!'],
                                resNo: ['I\'LL NEVER BE FREE FROM THIS HORROR, THIS MADNESS! AAARGH!'],
                                yes: function(player, worldState, methods){
                                    //GET ITEM - CURSED LOCKET
                                    methods.removeDenizenFromPool('Jess Hogglestonk');
                                    methods.addDenizenToPool('Jessica Hogglesworth');
                                    methods.addItemToInventory('Cursed Amulet', 1);
                                },
                                no: function(player, worldState, methods){
                                    methods.modifyReputation(-2);
                                }
                            }
                        }
                    }
                },

                'cured':{
                    story: false,   // (true)
                    denizen: 'Jessica Hogglesworth',
                    text: ["Hey Tuck! Remember me?"],
                    resYes: ["Really? I'm surprised! It's been a while since I gave you that amulet. I feel so much better now though... I do kind of miss it..."],
                    resNo: ["It's me, Jess. I gave you that lovely, shiny amulet! I feel so much better now though, and I look amazing! Thanks again, Tuck!"],
                    yes: function(player, worldState, methods){
                        methods.modifyReputation(4);
                    },
                    no: function(player, worldState, methods){}, //GOTO - YY
                    stageYes: {
                        story: false,
                        denizen: 'Jessica Hogglesworth',
                        text: ["*sigh* I do miss it you know... Do you think that maybe... I should try and find another one?"],
                        resYes: ["Yes... Yes... I think I will. I found it in a ruins far away. I'm sure there's another one..."],
                        resNo: ["No you're probably right. I'm better off without it. I think... Sure, sure I am..."],
                        yes: function(player, worldState, methods){
                            methods.modifyReputation(-2);
                        },
                        no: function(player, worldState, methods){
                            methods.modifyReputation(3);
                        }, //GOTO - YY
                        stageYes: { //XX
                            story: false,
                            denizen: 'Jessica Hogglesworth',
                            text: ["Tuck, I'm going to do it. I'm going to get another special amulet! Just like you told me to! " +
                            "I just need 100 gold to pay for the journey there. Can I have it? Please?"],
                            resYes: ["Oh thank you, Tuck. I hope this one won't be cursed too..."],
                            resNo: ["Fine. I'll make it on my own. Goodbye, Tuck!"],
                            requires: {gold: 100},
                            yes: function(player, worldState, methods){
                                methods.removeDenizenFromPool('Jessica Hogglesworth');
                                methods.addDenizenToPool("Jess Hogglestonk");
                                methods.modifyReputation(-20);
                                methods.modifyCurrency(-100);
                            }, //GOTO - XX
                            no: function(player, worldState, methods){
                                methods.removeDenizenFromPool('Jessica Hogglesworth');
                                methods.modifyReputation(-5);
                            }
                        },
                        stageNo: { //YY
                            story: false,
                            denizen: 'Jessica Hogglesworth',
                            text: ["Hey Tuck. Have you got a minute?"],
                            resYes: ["I wanted to thank you. You've helped me rid the curse, and kept me from going back there! " +
                            "I want to give you this. It's not much, but I am truly grateful!"],
                            resNo: ["Not to worry, I'll speak to you later!"],
                            yes: function(player, worldState, methods){
                                methods.modifyReputation(15);
                                methods.modifyCurrency(100);
                            },
                            no: function(player, worldState, methods){}
                        }
                    }
                },

                'the silent': {
                    story   : false,    // (true)
                    denizen : 'Shai',
                    text    : ['...?'],
                    resYes  : ['...!'],
                    resNo   : ['......'],
                    yes     : function (player, worldState, methods) {},//GOTO ts-1
                    no      : function (player, worldState, methods) {},
                    stageYes: { //ts-1
                        denizen: 'Shai',
                        text   : ['*sniff* ...?'],
                        resYes : ['He he...'],
                        resNo  : ['......'],
                        yes    : function (player, worldState, methods) {},//GOTO ts-2
                        no     : function (player, worldState, methods) {},
                        stageYes: { //ts-2
                            denizen: 'Shai',
                            text   : ['H... hi............ ...?'],
                            resYes : ['Bye!'],
                            resNo  : ['............'],
                            yes    : function (player, worldState, methods) {},//GOTO ts-3
                            no     : function (player, worldState, methods) {},
                            stageYes: { //ts-3
                                denizen: 'Shai',
                                text   : ['Hello again... *sniff*... Shall I...? *mumbles*'],
                                resYes : ['Haha! Maybe... Maybe...'],
                                resNo  : ['.................. why...?'],
                                yes    : function (player, worldState, methods) {},//GOTO ts-4
                                no     : function (player, worldState, methods) {
                                    methods.removeDenizenFromPool('Shai');
                                },
                                stageYes: { //ts-4
                                    denizen: 'Shai',
                                    text   : ['... Wow... You\'re such a great listener... Could I... Maybe give you something to show my... Appreciation?'],
                                    resYes : ['Great! See you around... Maybe....'],
                                    resNo  : ['......Well... Bye then...'],
                                    yes    : function (player, worldState, methods) { //end
                                        //GIVE ITEM
                                        methods.addItemToInventory('Handmade Scrapbook', 1);
                                        methods.removeDenizenFromPool('Shai');

                                    },
                                    no     : function (player, worldState, methods) {
                                        methods.removeDenizenFromPool('Shai');
                                    } //end
                                }
                            }
                        }
                    }
                },

                'dragons den':{
                    story: false,   // (true)
                    denizen: 'John Wolfman',
                    text: ['Arooo! You wanna know a secret?'],
                    resYes: ['*Sniff Snort* I\'ve seen a dragon! A real life dragon!'],
                    resNo: ['Suit yourrrrrrrself, aroooo!'],
                    yes: function(player, worldState, methods){}, //GOTO dd-1
                    no: function(player, worldState, methods){},
                    stageYes: { //dd-1
                        denizen: 'Gabriel Dragonlord',
                        text: ['Grrrr... I have seen something most... Disturbing. Our village is home to a terrifying werewolf! ' +
                        'Imagine that! Something must be done about him, right?'],
                        resYes: ['I shall sort this mess out, don\'t you worry!'],
                        resNo: ['Grrrr! Fair enough! This isn\'t the last you\'ll hear of this though.'],
                        yes: function(player, worldState, methods){}, //GOTO dd-2
                        no: function(player, worldState, methods){}, //GOTO dd-3
                        stageYes: { //dd-2
                            denizen: 'John Wolfman',
                            text: ["AROOO! He\'s after me! That Dragon thinks I'm a menace! You think I\'m a good pup, right?"],
                            resYes: ["Wow thanks! Arooo! Good to know someone\'s on my side!"],
                            resNo: ["*Whimper*"],
                            yes: function(player, worldState, methods){ //GOTO dd-4
                                methods.modifyReputation(-1);
                            }, //GOTO - XX
                            no: function(player, worldState, methods){ //GOTO dd-5
                                methods.modifyReputation(2);
                                methods.removeDenizenFromPool('John Wolfman');
                            },
                            stageYes: { //dd-4
                                denizen: 'Gabriel Dragonlord',
                                text: ["Bah! That cursed Wolfman says you're his friend now?! Is this true?"],
                                resYes: ["So he's not a menace after all? I'm so sorry! How could I be such a fool! RAAAARGH! " +
                                "I shall make this right, I swear it!"],
                                resNo: ["Then I shall be your friend, and this village's saviour! I will make sure that fiend " +
                                "never shows his muzzle around here again!"],
                                yes: function(player, worldState, methods){ //GOTO - XX
                                    methods.modifyReputation(3);
                                },
                                no: function(player, worldState, methods){
                                    methods.modifyReputation(3);
                                },
                                stageYes: { //XX
                                    denizen: 'Gabriel Dragonlord',
                                    text: ["I was a fool wasn't I?"],
                                    resYes: ["Oh I agree! John Wolfman is a true gent! We\'re becoming fast friends! I\'ve " +
                                    "learnt a valuable lesson. Take these, from both of us! Thank you!"],
                                    resNo: ["No need to flatter me, it\'s true... John Wolfman is a gent! We\'re becoming fast friends! I\'ve " +
                                    "learnt a valuable lesson. Take these, from both of us! Thank you!"],
                                    yes: function(player, worldState, methods){
                                        methods.modifyReputation(3);
                                        methods.addItemToInventory('Dragonscale Shield', 1);
                                        methods.addItemToInventory('Lilac Tea', 1);
                                    },
                                    no: function(player, worldState, methods){
                                        methods.modifyReputation(3);
                                        methods.addItemToInventory('Dragonscale Shield', 1);
                                        methods.addItemToInventory('Lilac Tea', 1);
                                    }
                                },
                                stageNo: {
                                    denizen: 'Gabriel Dragonlord',
                                    text: ["Have you got a minute? I have news."],
                                    resYes: ["The wolf has been driven off! He\'ll never bother these fine folk again. " +
                                    "Though in truth, I do feel bad. Was that the right thing to do? I guess we will never know..."],
                                    resNo: ["No worries, see you soon!"],
                                    //recurs: true,
                                    yes: function(player, worldState, methods){
                                        methods.modifyReputation(2);
                                        methods.addItemToInventory('Dragonscale Shield', 1);
                                    },
                                    no: function(player, worldState, methods){}
                                }
                            },
                            stageNo:{
                                denizen: 'Gabriel Dragonlord',
                                text: ["Nice work chasing off that wolfman. I doubt we'll see him around here again. Please, would you " +
                                "accept this as a token of my thanks?"],
                                resYes: ["Here, a precious artifact. Do with it what you will. " +
                                "I wonder if we did the right thing chasing him off..."], //GOTO dd-5
                                resNo: ["False modesty. You deserve a reward, though I do wonder if we did the right thing chasing him off..."],
                                yes: function(player, worldState, methods){ //end
                                    methods.addItemToInventory('Dragonscale Shield', 1);
                                },
                                no: function(player, worldState, methods){ //end
                                    methods.addItemToInventory('Dragonscale Shield', 1);
                                }
                            }
                        },
                        stageNo: { //dd-3
                            denizen: 'John Wolfman',
                            text: ["Arooo! Thanks for covering for me! That Dragon has it in for me. He\'s a menace! *WOOF!* Should " +
                            "I report him to the guards?"],
                            resYes: ["*Grrrrrrowl, yes! I shall see to this personally!"], //GOTO dd-5
                            resNo: ["AROOOOOOO! Fine, you know best I suppose! This is such a mess..."],
                            yes: function(player, worldState, methods){
                                methods.modifyReputation(2);
                            }, //GOTO - XX
                            no: function(player, worldState, methods){
                            },
                            stageYes: { //dd-5
                                denizen: 'John Wolfman',
                                text: ["Arooo! The guard needs a second opinion. Apparently that Dragon isn\'t a problem " +
                                "for anyone else. You think he\'s a bad guy too right?"],
                                resYes: ["Good good, the guard will surely kick him out now! *BARK*"], //GOTO dd-6
                                resNo: ["What? He really is a nice Dragon? What have I done... I\'m a bad pup after all... " +
                                "I shall make this right, I promise!"], //GOTO dd-7
                                yes: function(player, worldState, methods){
                                },
                                no: function(player, worldState, methods){
                                },
                                stageYes: { //dd-6
                                    denizen: 'John Wolfman',
                                    text: ["Arooo! Want to know something great?"],
                                    resYes: ["The Dragon has been sent away! No longer will he terrorise the village folk, and it\'s all thanks" +
                                    " to you! Here, take this! I'm sure you'll get a good price for it! Farewell! AROOOOOOOOO!"], //end
                                    resNo: ["After all this? Fine. I'll be back though, arroooo!"], //GOTO dd-7
                                    yes: function(player, worldState, methods){
                                        methods.modifyReputation(2);
                                        methods.addItemToInventory('Lilac Tea', 1);
                                    },
                                    no: function(player, worldState, methods){
                                        methods.modifyReputation(-1);
                                    }
                                },
                                stageNo:{
                                    //fiends now
                                    denizen: 'John Wolfman',
                                    text: ["I was a fool wasn't I?"],
                                    resYes: ["Oh I agree! Gabriel Dragonlord is a great guy! We\'re becoming fast friends! I\'ve " +
                                    "learnt a valuable lesson. Take these, from both of us! Thank you!"],
                                    resNo: ["No need to flatter me, it\'s true... Gabriel Dragonlord is a gent! We\'re becoming fast friends! I\'ve " +
                                    "learnt a valuable lesson. Take these, from both of us! Thank you!"],
                                    yes: function(player, worldState, methods){
                                        methods.modifyReputation(5);
                                        methods.addItemToInventory('Dragonscale Shield', 1);
                                        methods.addItemToInventory('Lilac Tea', 1);
                                    },
                                    no: function(player, worldState, methods){
                                        methods.modifyReputation(5);
                                        methods.addItemToInventory('Dragonscale Shield', 1);
                                        methods.addItemToInventory('Lilac Tea', 1);
                                    }
                                }
                            }
                        }
                    }
                },

                // another example, hehehe
                'a horse voice': {
                    story: true,
                    denizen: 'Homenos Proudhoof',
                    text: ['He-lo ther-, my v-ice is rat-er cr-cked at th- moment, c-uld y-u lend me y-ur cough sweets?'],
                    resYes: ['Ex-e-lent, t-anks! I\'ll b- right as rain i- no t-me.'],
                    resNo: ['Oh, b-t it h-rts!'],
                    yes: function (player, worldState, methods) {
                        methods.modifyReputation(1);
                        //methods.addStroke('fancies', 2)
                    },
                    no: function (player, worldState, methods) {
                        methods.modifyReputation(-1);
                    },
                    stageYes: {
                        denizen: 'Homenos Proudhoof',
                        text: ['Hey, remember me? Your cough sweets fixed my voice but I\'ve lost my charm, waaah! Make a fool out of yourself to make me look better, would ya?'],
                        resYes: ['Well I hope you’re happy. I guess I’d better pay you for those sweets though...'],
                        resNo: ['Neighhh! At least you meant well. Here, take this, my old lute. I can\'t play it with my hooves, anyway!'],
                        yes: function (player, worldState, methods) {
                            methods.modifyReputation(-3);
                            methods.modifyCurrency(50);
                        },
                        no: function (player, worldState, methods) {
                            methods.modifyReputation(3);
                            methods.addItemToInventory('Lute', 1);
                        }
                    },
                    stageNo: {
                        denizen: 'Homenos Proudhoof',
                        text: ['Neigh! I\'m st-ll ha-ing t-oubl- sp-akin-! C-n yo- sh-w me t- th- vets pl-ase?'],
                        resYes: ['Gr--t, t-ank-!'],
                        resNo: ['I\'l- mak- my own w-y. Tha-ks f-r n-thin-.'],
                        yes: function (player, worldState, methods) {
                            methods.modifyReputation(1);
                            methods.removeDenizenFromPool("Homenos Proudhoof");
                        },
                        no: function (player, worldState, methods) {
                            methods.modifyReputation(-2);
                            methods.removeDenizenFromPool("Homenos Proudhoof");
                        }
                    }
                },

                'academy': {
                    story: true,
                    denizen: "Sir Knight",
                    text: ["Greetings, denizen. I was thinking of starting up an academy for the strongest knights of the realm. All I need is 50 gold for rent, which I will surely repay you, are you interested?"],
                    resYes: ["That's wonderful! On behalf of the Order of the Giant Dragonlord, thank you Tuck!"],
                    resNo: ["Oh, what a shame. Us knights are bound to wander this land alone!"],
                    requires: {gold: 50},
                    yes: function (player, worldState, methods) {
                        methods.modifyReputation(5);
                        methods.modifyCurrency(-50);
                    },
                    no: function (player, worldState, methods) {
                        methods.modifyReputation(-2);
                    },
                    stageYes: {
                        text: ["Great news! The Order of the Giant Dragonlord is open and brimming with knights! Ah yes, your share of the profits - 100 gold. Aren't you glad you trusted me?"],
                        resYes: ["You can always trust a knight of the realm!"],
                        resNo: ["I say! I thought we were friends! Well, I'll be seeing you, and hopefully you will have changed your mind by then."],
                        yes: function (player, worldState, methods) {
                            methods.modifyCurrency(100);
                        },
                        no: function (player, worldState, methods) {
                            methods.modifyReputation(-5);
                        }
                    }
                },

                'library': {
                    story: true,
                    denizen: 'Lord Bapple of Appleshire',
                    text: ["Good day to you, fair Tuck. I was reading a dusty tome last night and completely lost track of time! Do you like to read?"],
                    resYes: ["Excellent! A fellow book lover. If only we had a place to relax with a book together, hmmm..."],
                    resNo: ["Well, I'd highly recommend it! There's a lot you can learn from old bits of paper."],
                    yes: function (player, worldState, methods) {
                        methods.modifyReputation(1);
                    },
                    no: function (player, worldState, methods) {},
                    stageYes: {
                        text: ["That's it! I've got it. We should build a library, for the good of the community! All I need from you is, hmm, 100 gold?"],
                        resYes: ["Splendid! I'll get my builders to work on some fabulous marble walls and the finest oak shelves! Thank you, Tuck."],
                        resNo: ["Alas, I will continue to read my books in the apple loft, alone...."],
                        requires: {gold: 100},
                        yes: function (player, worldState, methods) {
                            methods.modifyCurrency(-100);
                            methods.modifyReputation(5);
                        },
                        no: function (player, worldState, methods) {
                            methods.modifyReputation(-3);
                        },
                        stageYes: {
                            text: ["Tuck! Our library is a success, attracting wealthy scholars from across the land! They told me to give you this gold pile in return, for helping us out."],
                            resYes: ["Take care, Tuck. Now, back to this fascinating book on the time-stopping warrior princess, Lyra Steelwind!"],
                            resNo: ["Really? Well, I'll consider it a donation to the cause. Here's your initial 100 gold back, at least!"],
                            yes: function (player, worldState, methods) {
                                methods.modifyCurrency(250);
                            },
                            no: function (player, worldState, methods) {
                                methods.modifyCurrency(100);
                                methods.modifyReputation(1);
                            }
                        },
                        stageNo: {
                            text: ["Mark my words, this library will be a hub of excited minds! Maybe I could convince you to part with, say, 60 gold?"],
                            resYes: ["Why, thank you for your support Tuck! I'll get my builders to put up the finest canvas walls right away."],
                            resNo: ["Oh, bother. Well, I suppose I could build it myself out of sticks and leaves..."],
                            requires: {gold: 60},
                            yes: function (player, worldState, methods) {
                                methods.modifyCurrency(-60);
                                methods.modifyReputation(5);
                            },
                            no: function (player, worldState, methods) {
                                methods.modifyReputation(-1);
                            },
                            stageYes: {
                                text: ["Tuck! Our library is a success, attracting wealthy scholars from across the land! They told me to give you this gold pile in return, for helping us out."],
                                resYes: ["Enjoy it. Now, back to the book club! We're studying the great elven Ratriders of Arithmagic!"],
                                resNo: ["Really? Well, I'll consider it a kind donation. Here's your initial 60 gold back, at least!"],
                                yes: function (player, worldState, methods) {
                                    methods.modifyCurrency(150);
                                },
                                no: function (player, worldState, methods) {
                                    methods.modifyCurrency(60);
                                    methods.modifyReputation(1);
                                }
                            }
                        }
                    },
                    stageNo: {
                        text: ["Maybe if you don't like books, the community library may attract some wealthy visitors. If you gave 100 gold, you could get a share of the profits, what do you say?"],
                        resYes: ["That's great! Thank you, Tuck. I'll get started right away, you won't regret this!"],
                        resNo: ["Ah well, back to the cellar to read my mouldy tomes alone in the dark..."],
                        requires: {gold: 100},
                        yes: function (player, worldState, methods) {
                            methods.modifyCurrency(-100);
                            methods.modifyReputation(5);
                        },
                        no: function (player, worldState, methods) {
                            methods.modifyReputation(-1);
                        },
                        stageYes: {
                            text: ["Tuck! Our library is a success, attracting wealthy scholars from across the land! They told me to give you this gold pile in return, for helping us out."],
                            resYes: ["My pleasure. Now, back to this fascinating book on the great vampire Lord Malum!"],
                            resNo: ["Really? Well, I'll consider it a token of our friendship. Here's your initial 100 gold back, at least!"],
                            yes: function (player, worldState, methods) {
                                methods.modifyCurrency(250);
                            },
                            no: function (player, worldState, methods) {
                                methods.modifyCurrency(100);
                                methods.modifyReputation(1);
                            }
                        }
                    }
                },

                'fireworks': {
                    story: true,
                    denizen: 'Tony Cryer',
                    text: ["Hear ye! Hear ye! Oh, hello there Tuck! My friend Fawkes was telling me to start my own fireworks shop, totally safe, what could go wrong? All I need is 50 gold to get it started!!"],
                    resYes: ["Oh thank you, thank you most gracious Tuck! Hear ye, hear ye, fireworks this way!"],
                    resNo: ["Maybe you're right. Fawkes' shop didn't end well, as I recall..."],
                    requires: {gold: 50},
                    yes: function (player, worldState, methods) {
                        methods.modifyReputation(-2);
                        methods.modifyCurrency(-50);
                    },
                    no: function (player, worldState, methods) {
                        methods.modifyReputation(5);
                    },
                    stageYes: {
                        text: ["Oh Tuck, my fireworks shop... Ruined! I knew I shouldn't have listened to Fawkes and set it up next to the campfire. I suppose you want that gold back, don't you?"],
                        resYes: ["Yes yes, fair's fair. My apologies for misleading you! Hear ye, hear ye, I am a fool!"],
                        resNo: ["Thank you, Tuck. Easy come, easy go!"],
                        yes: function (player, worldState, methods) {
                            methods.modifyCurrency(50);
                        },
                        no: function (player, worldState, methods) {
                            methods.modifyReputation(5);
                        }
                    }
                },

                'jack of all trades': {
                    story: true,
                    denizen: 'Jack Woodcutter',
                    text: ['Hello there, Tuck. I\'m just trying to make my way in this busy world. I am but a simple farmer, or would like to be, but I have no farm, ' +
                    'no animals or crops. Please, just 50 gold would allow me to get started on my own empire!'],
                    resYes: ['Thank you, thank you! I shall not forget your kindness!'],
                    resNo: ['One day you will regret this, I\'m sure of it...'],
                    yes: function (player, worldState, methods) {//GOTO jat-1
                        methods.modifyReputation(1);
                        methods.modifyCurrency(-50);
                    },
                    no: function (player, worldState, methods) {//GOTO jat-2
                        methods.modifyReputation(-1);
                    },
                    stageYes: {
                        // jat-1
                        text: ['Me again! My farm is up and running, the crops are growing strong! Ah but... I wonder... Is farming my true calling? ' +
                        'Perhaps the life of a bard is the one for me! Could I trouble you for 50 gold for a lute?'],
                        resYes: ['Ah ha, wonderful! My tunes and tales will sing of your generosity and good will!'],
                        resNo: ['I do not hold this against you. You helped me once, I was a fool to ask again.'],
                        yes: function (player, worldState, methods) { //GOTO jat-3
                            methods.modifyReputation(2);
                            methods.modifyCurrency(-50);
                        },
                        no: function (player, worldState, methods) { //GOTO jat-4
                            methods.modifyReputation(-5);
                        },
                        // jat-3
                        stageYes:{
                            text: ['My life is a lie, my tunes are a mess, the choices I\'ve made, I strongly regret. ' +
                            'My songs make no sense, folk tell me to "shut up", for just 50 gold, I could be a woodcutter!'],
                            resYes: ['This is it, I\'m really feeling this one! I\'ll see you soon!'],
                            resNo: ['Maybe three times is not the charm, though I\'m sure I never did you any harm...'],
                            yes: function (player, worldState, methods) {
                                methods.modifyReputation(3);
                                methods.modifyCurrency(-50);
                            },
                            no: function (player, worldState, methods) {
                                methods.modifyReputation(-5);
                            },
                            stageYes:{      // back to being a woodcutter !
                                text: ['Hi again Tuck, it turns out, I was meant to be a woodcutter all along! What a silly tale. Still, it\'s good to try things out, isn\'t it?'],
                                resYes: ['Don\'t get stuck in a rut, if it doesn\'t work out, back to the wood I shall cut!'],
                                resNo: ['I disagree, make sure you try a few things out in life!'],
                                yes: function (player, worldState, methods) { //end
                                    methods.modifyReputation(20);
                                },
                                no: function (player, worldState, methods) { //end
                                    methods.modifyReputation(20);
                                }
                            },
                            stageNo:{
                                text: ['Greetings again, seller of wares, items so shiny and prices so fair; ' +
                                'My songs made me famous, all over the land, would you like some money, from out of my hand?'],
                                resYes: ['A huge golden coin, shiny and round. Hopefully soon I\'ll see you around'],
                                resNo: ['Always so humble, always so kind, being Tuck\'s friend? I would\'t mind!'],
                                yes: function (player, worldState, methods) { //end
                                    methods.modifyCurrency(120);
                                    methods.removeDenizenFromPool("Jack Woodcutter");
                                },
                                no: function (player, worldState, methods) { //end
                                    methods.modifyReputation(5);
                                    methods.removeDenizenFromPool("Jack Woodcutter");
                                }
                            }
                        },
                        // jat-4
                        stageNo:{
                            text: ['Me again! The farm is still going strong! I\'ve really taken to it recently. I\'d like to ' +
                            'give you a gift, to say thank you for your investment. What do you say, friend?'],
                            resYes: ['Ah ha, well, yes, here you go! 100 shiny gold pieces! Thanks again, friend.'],
                            resNo: ['So humble. So kind. I shall tell all of your fantastic shop!'],
                            yes: function (player, worldState, methods) { //end
                                methods.modifyCurrency(120);
                                methods.removeDenizenFromPool("Jack Woodcutter");
                            },
                            no: function (player, worldState, methods) { //end
                                methods.modifyReputation(10);
                                methods.removeDenizenFromPool("Jack Woodcutter");
                            }
                        }
                    },
                    // jat-2
                    stageNo: {
                        text: ['My dreams of being a farmer were foolish! You were right to deny me aid. I\'ve had a good, long ' +
                        'think about my life, and think with just 25 gold, I could maybe just get a small garden growing. How about that?'],
                        resYes: ['Ah ha! I knew that was great idea. You wait, I\'m going to be a great gardener!'],
                        resNo: ['A bad idea huh? I understand... I guess I\'ll see you around. Hope you make it big at least!'],
                        yes: function (player, worldState, methods) { //jat-5
                            methods.modifyReputation(+2);
                            methods.modifyCurrency(-25);
                        },
                        no: function (player, worldState, methods) { //jat-6
                            methods.modifyReputation(-5);
                        },
                        stageYes:{
                            // jat-5
                            text: ['The soil gives me no joy. Seeing the plants thrive puts me in a foul mood. I want to see' +
                            'them fall! I want to be a woodcutter! Please, just 25 gold for an axe!'],
                            resYes: ['Yes, YES! This is it I can tell! The trees will fall before me and my mighty axe! Whenever you ' +
                            'need wood for something, I\'ll make sure you get the best prices!'],
                            resNo: ['*Sigh* Back to the garden... Back to the dirt...'],
                            yes: function (player, worldState, methods) { //end
                                methods.modifyCurrency(-25);
                            },
                            no: function (player, worldState, methods) {} //end
                        },
                        // jat-6
                        stageNo:{
                            text: ['Well well well. Still here aye? I have been very lucky as of late. I made my own way without your ' +
                            'help! Want to know how I did it?'],
                            resYes: ['Ah ha, well, I bet you would. But why should I help you when you offered me none? ' +
                            'Figure things out yourself!'],
                            resNo: ['Stubborn to the core I see! So be it! I hope you learn one day that helping others can be ' +
                            'more rewarding than mere trinkets and baubles...'],
                            yes: function (player, worldState, methods) { //end
                                methods.removeDenizenFromPool("Jack Woodcutter");
                            },
                            no: function (player, worldState, methods) { //end
                                methods.removeDenizenFromPool("Jack Woodcutter");
                            }
                        }
                    }
                }
            },

            /*Trinkets and */ bubbles:[
                "What a great day!",
                "Hmmm...",
                "Haha!",
                "The Rock Kingdom is so nice this time of year!",
                "I wish somewhere sold swamp mushrooms...",
                "Lovely day!",
                "I'd like some more baskets...",
                "Hmmm?",
                "Excuse me...",
                "A new business! How exciting!",
                "Nothing there for the likes of me.",
                "Should be a nice day tomorrow!",
                "Good to see you, Tuck!",
                "I love this place.",
                "They have lovely dresses by the City Walls.",
                //"Phew, this heat!",
                //"Another hot one!",
                "The same every day...",
                "Back and forth, back and forth.",
                //"That Aztec makes me nervous...",
                //"The King! I saw the King!",
                "I can't wait for the next festival!",
                "How could I make a quick coin...",
                //"It's getting late. I think...",
                "Yes... Yes...",
                "*Mumble mumble*",
                "I like your haircut!",
                "*Sniff... Achoo!"
            ],
            
            traits: {

                // perks
                'Weaver': {
                    start: function (p, ws, m) { p.inventory['Baskets'] = Infinity },
                    end: function(p, ws, m) { p.inventory['Baskets'] = 0 }
                },
                'Advertising': {
                    start: function(p, ws, m) { ws.dynamics.denizenFrequency *= 1.5 },
                    end: function(p, ws, m) { ws.dynamics.denizenFrequency *= (2/3) }
                },
                'The Stranger': {
                    start: function(p, ws, m) { m.addDenizenToPool('The Stranger') }
                },

                // weather
                'rain': {   // monsoon trait is identical, just diff duration
                    start: function (p, ws, m) {
                        tw.Utils.addClass(document.getElementsByClassName('weather')[0], 'rain');
                    },
                    end: function (p, ws, m) {
                        tw.Utils.removeClass(document.getElementsByClassName('weather')[0], 'rain');
                    }
                },
                'war': {},  // clothing items worth less, music a little more, crafting and herbalism a lot more
                'drought': {
                    start: function (p, ws, m) {
                        tw.Utils.addClass(document.getElementsByClassName('weather')[0], 'drought');
                        // also less people
                    },
                    end: function (p, ws, m) {
                        tw.Utils.removeClass(document.getElementsByClassName('weather')[0], 'drought');
                    }
                },
                'plague': {
                    start: function (p, ws, m) {
                        tw.Utils.addClass(document.getElementsByClassName('weather')[0], 'plague');
                    },
                    end: function (p, ws, m) {
                        tw.Utils.removeClass(document.getElementsByClassName('weather')[0], 'plague');
                    }
                },
                'blockade': {}, // decrease denizen freq
                'pirates': {}, // increase denizen freq, but add 10 pirates to pool
                'troupe': {}, // might be a duplicate of festival w lower dur
                'festival': {
                    start: function (p, ws, m) {
                        tw.Utils.addClass(document.getElementsByClassName('weather')[0], 'festival');
                        ws.dynamics.denizenFrequency *= 2;
                    },
                    end: function (p, ws, m) {
                        tw.Utils.removeClass(document.getElementsByClassName('weather')[0], 'festival');
                        ws.dynamics.denizenFrequency /= 2;
                    }
                },

                // stories

            }


        }
    };

})(TwinklGame, lib.manifest);

/*
                                                                                    `````
                                                                ```.----......-::://+//+//:-.``
                                                           `.-://++ossyyssssssooossooooooooo++++//::-.`
                                                        `.:/++oooooo+osyyyyyhhyyyssyhyysssyyyyysssooo++/-`
                                                      `-/+++oooo+++ooooosssyhhyyhhhyyyhhhhhhhhhyyssssoooo+/.
                                                     -://++oo++++oosssooosoosysyyhddhdddhhyyyyyyyyysssssssso/`
                                                   `/+//+++++++osssssossyyyyssossyhddhhyyyyhddhhyyyyyyyyhhyyyo:`
                                                  .+o+/++++++osyyhddddddhddhhyyssoyhddhyhhdddhhhhyysyhddhhhhhyso:.
                                               `.-+oo++++oossssssyhyyyysyyyyyyyyssssyyyhdddhhhhhhyyhhhhyyyssssssoo:.`
                                             .:++ossoo+oosyyysooooossooooossooooosssssyhddhhhhhyyhhdhhyyssssssssoso++:`
                                         `./+ossyyyssooossooooooosssssssyyyyyssoosyyyhhhhyyyyyhdddddhyyyyyyysooosoyyo+/.
                                        -+syyyhhhyyssoooooooososssssssssyyyyyyhhysyyhhhhhhhhdddddddhyhhdddddhsoosssyho+/.
                                      .+oshddmddddhssoooossoooossossssssoooooosyyhysssssyhdddddddhyyhdmmmmmmmmdysyhsys+oo-
                                    `:yyhhhyhhhdmdyo+++oooooooooooooooossoo+++++osyyyssyyhhhhhhhyyyhmmmddhhhhhhdhyyhyho+o+.
                                    /yhyyyssyyhhyo+//////+++++++++++oooooooo+++++++oyyyssssyyyyhhhdmmmdmdhysyhhhyyyhdhyoss+.
                                   -yhhhhhyyhys++/////////////////+++++++++o+++++///+ssssssssssyhdmmmmdhhddhyshdhsoshdhssss+`
                                  `ohyhhhdhyo++++++////////////////++++++++ooooo+++++ooooooooosyyhddddddhyshdyoshdyooshyooso.
                                  -shddddyo++++++++///////////////////+++++++++oo+++oosooo++oooosyhhdddhhhyoshhooyhhs+oyso++-
                                  /yddmho+++++++++//////////////////////++++++++++++ooo++++++ooooosyhhhhssyyoosyooyhhoooso++:
                                 -shddy+++++++++//////////////////////////+////++++++++++++++oo+++osyyyyysssss+os+oshs++oso+:
                                `+yyyo+/++/////////////://///:////////////++///+++/////++++++++++++ossysssossso+++oosyo++o++:
                                /syy+////////////////:::///////////////////////++////+++++++++++//++ooosoooosyyso/ooooso+o++:
                               -sys+///////////:::://::::/://///////////////////////+++++/+++//////++++osoo+oshhs+oosssoso++/`
                               :ys+////////:::::::::::::::://::///:://////////////////////+///////////++ooo++ohhyo+syyysosos+`
                              `:s+///////////::::::::::::://///////////////////////////////////////////+++++++yhys+hyhhysssyo.
                              -/+///////////////:::::::::://:/:///////////////////////////////////://://++/o++syyssdhyyyyyhho.
                             `++/::://///////:://::::::::::///////////////+//////////////////:///:::/:://+/+++sysyydhsyyhyhys-
                             .o+/::::/:///////::::::/::::://////////////////////////:////:://:///:::://:///+oossosydyshhhhyss-
                             .+/::/:::://:///::::::::::::::::::::::///:::/:///////////////::::///////://///+soossyhhysdhyysss-
                             .+/:/::::::/::::::::::::::::::::::::::::::::/:::::///////////::://///////////+osooosyhsyshhssssy-
                             `++::///::::::::::::::::::::::::::::::::::::::::://:::::://::///////////////++ooososyysyssyssyyy-
                             `/+:::://:::::::::::::::::::::::::::::::::::::://////:::/:::////////////////+ossososyysyossosyhy-
                              -/:::////::::::::///://::::::::/::::::://////////////////////////////////++ssyyyossyyssoosyhyyy.
                               ./////////++++++////++/:://+++///+++oo+ooooooosssssoooo+++++++++/////++osyhhhhhyhdhyysoosyyyss
                             `.-ossoossyyyhhyyyyysooo///+ooossyyhhhhhhhhhhdddddmmmNNMMNdhmmmmmmmmmmmmmmmmmmmmmNNmmdhysosssoo/
                         `:oyddhyhyyyyssssssyyyyyhhhmdydmmhhysssssosssssyhddhhhyhhhhdNMdyNMNMMMMMMMMMMMMMMMMMMMMMMNdhsoss+o+.
                         .hMmhhsssssoosoooosyyyyysshmMmNMmdyo+++ossssso/tuckNdddhhhhydMmyNNddmmmmmNmNNNmmddmmdhhddhyso++o++/`
                         `sNhdmmmmdyssssso/ysydhhysyddhhhdmhs++oososso+::ohddhdyyyyyssMmyooo++++++++++oyhhyhhs+ooo++o+osyhho/`
                          /mhooossssssooo//+yyyyysohy++++odmysooo+oooo+++++osoo+++ooooNho+/////////////+osyhyo+/++oys+/+osdds:
                           oh`    `+oso++++++++ooooy++++++smmhysoossssoo++++++++++//+oNy++//////////////+osys+//+/+oo+::+ohdh/`
                           .h-     :+o+++//+++ooo+ys+++++/+smmhsoooooo+++++++++//////sNs////:////////////+syo+//+o//+/:/+ohdy/`
                            +h-    :/++//////++++smo/+++///+omNdso+o+++++//////++osydms////::::///////////os+///ohdy+///+shyo.
                            `+ys/:-/+++++++++ooshmh++++//++++ohdddddhhyhyhhhhddhhhyso////////::://////////++////+sddys//+ss+-
                              `-/oyhhhhhhhhhhhyysoo//++++/+++++ooo+oooooo+++++++++///////////////////////+///:://+yhhyo/+o/.
                                 `-///++++++++++++++/+++++++++++++++//////////////////:://::////////////////:::+++shhyo/+/.
                                  -//////////////++++++++++++oo+o+oo+///::::////////::::::::///////////++///::+osyyyyo++/`
                                  -///////:::::///////+++++++++++++oso+/::::::::::::::::::///////////////////oyyso+++/+:`
                                  -//////::::////::::///+++/////+++syso+/::::::::::::::::://///////////////:/+o+/////+:`
                                  .//////::///+++++++++ooosyyysooosysso+///::::::::::/:::://///////////////://///////:`
                                  `://///::///++++ossssooosyyyyyyyysoo++////::::::::::////::////////////////////////:`
                                   -/////:://////+oossssssssssyysssooo++/////::::::::://///////////////////+//////+:`
                                   `//////////+++ooooo+ossssssssssoo+oo+++/////:::::::////////////////////+oo+++++-`
                                    -////////++++++++++osoo++++o+++++oo+++++/////::::::////////////////////+////++
                                    .///////+++++//////+++///////////++++++++//+/::::://////////////////////////+:
                                     -//////+++///++oo++++oooooooo+++++osoo+/////:::::///////////////////////////.
                                     .//////+++oosyyyyyyyyyyyyhyyyyyyyyyso+++////::::///////////////////////////:.
                                     `://///+++ossssssooosoooo++++oo++++///////:::::::////////////////+////://///.
                                      -//////+///+++o++++++++++++///////::::////:::://///////////////////////////.
                                       :///////////+++++++o+++///:::::::::::::////::////////////+++++//////////+/.
                                       `://///////////+++++++////::::::::::::::///////////////++++++//:::::////+/.
                                        `:///////////////++///////::::::::::::://////////+/+++++o+++//::::::///+/`
                                         `-//////////::////////::/:::::::::::://////////++++o++oo+////:///:////++.
                                           -/////////:/:////////:://////////////////++++++ooooo++///://///////+++:-..``
                                            .:+/////////////////:://///////////++++oooooooosoo++///////://////++++shhhys++:.
                                             `://////////////////////////+++++ooooooosssoooo+++////////:://///+/++ohmNNNNNmdy+.
                                               .//////////////////////++++++ooooosssssssooo+++/////////::///////+++sdNNNMMMNNds:
                                                `-+++++/+++++++/+++++++oossssssssssssssooo++++////////::://////++++osmNNNMNNmhyo-
                                                  -/ooooooooooooosssssyyyyyyssssssssssooooo++//////////://///+/+++oosymNNNNmyyyys-
                                                   .+ssyyyyyyyyyyyyyhhhyyyyysssssssssoooo++++////////::://///+/+++osyyhdNmdhhhhhys:`
                                                 `-sdy+syhhhhhhhhhhhhhhyyyyysssssoooooo++++++///////::////////++oosyyhddhhhhdhhhhys/`
                                              `.:odmmd+++osyyhhhhhhhhhyyyssssoooooo++oo+++++/////////////////++ossyhhddhhhhhyhhhhyyy/
                                         ``.:oyyddddmms/+/++ossyyyyyssssoooo++++++++++++++//////////////////+oosyyhhdhhhdhdhydhhdyhhy:
                                 ```.-/+shdmNddddddmmmh++////++++oooo++++++++++++++++++++//////////:///////+osyhhhhhhhdddhdhhdhhdhhhhs:
                           `-:+osyhdmmmNMMNmhdddddmmmmms++////////////+++++////+/++++++//////////////////+osyyhddhyhddhddhddhdhdhhhhyhy.
                      `.:+yhmmNNmmNNNMMMMNdhhdmddhdmmmmho++/////////////+++++/////////////////////////++ooyhhddhydhddhdddddddhdhhhhddmNs`
                 `-/oydmmNNNNNNNNNMMMMMNdyhhhdddddmmmmmNd++++//////+++++++++++//////////////////////++osyhdddhhhdddhdhdhddhhdhddddmmNNNNdo-`
              `-ohmNNNNNNNNNNNNNMMMMMMNhyhhhhddmmmmmmmNMMy+++++/++++++++++++////////////////////+++oosyhdddhhhddhdhddhdddmdddmmmmmNNNNNNNNNy+-`
            -odNMNNNNNNNNNNMMMMMMMMMNmhyyyhdddddmmmNNMMMMms+++ooooo++++////////////////////+++++oosyyhhhhhhhddddddddmdmdmmmNNNNMMMMMMNNNNNNNNNh:
          -ymMMMNNNNNNNNNMMMMMMMMMMMmyshhhhmmdhdmNMMMMMMMmhs++ooooo++++++++++//////////+++++ooossyyhhhhhdmmdmddddmmmNNNNMMMMMMMMMMMMNNNNNNNNNNNNo`
        `+mMMMMNNNNNNNNMMMMMMMMMMMMMdhyhhdddmmmmmNMMMNMMNmdso+++oo++++++/////+/////+++++oooossyyyhhhhdmmNmNmNNNNNNMMMMMMMMMMMMMMMMMMNNNNNNNNNNNNNy.
       -hNNMMMMNNNNNNMMMMMMMMMMMMMMMMNmdddmdmmmddmNMMMMMMNmyso+++++++///////////+++++oooosssyyhhhhhmmNNNNNNNMMMMMMMMMMMMMMMMMMMMMMMNNNNNNNNNNNNNNNd/.
      :mNNMMMMNNNNNNMMMMMMMMMMMMMMMMMNNNNdddmmmmmmmNMMMMMMmyoooo++++/////++++++++++ooosssyyyyyyhhmNNNNNNNMMMMMMMMMMMMMMMMMMMMMMMMMNNNNNNNMMNNNNNNNNNds
     /mNNMMMMMNNNNMMMMMMMMMMMMMMMMMMMNNNNNNddmdmdmmNMNNNNNdysoo+oo++++++++++++++++ooossyyyyyyhdmNMMNNMMMNMMMMMMMMMMMMMMMMMMMMMMMNNNNNNNNMMNNNNNNNNNNNN
    :dNNNMMMMMNNNMMMMMMMMMMMMMMMMMMNNNMNNNNNmddddmmmNNmmmhyso+++++++ooooooo+++++++ossyyhhydmdmNNNNNNMMMMMMMMMMMMMMMMMMMMMMMMMMMNNNNNNNMMMNNNNNNNNNNNNN

 */