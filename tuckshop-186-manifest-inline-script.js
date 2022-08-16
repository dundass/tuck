// archive desc: Join Tuck on a journey through a rich, fantasy world filled with a huge cast of diverse and comedic characters. Learn to build a successful business, as you grow from almost nothing, to an empire of shops across the whole land! Every choice you make will have repercussions, both small scale and global, and a huge talent-tree of varied perks means no two playthroughs will ever be the same.
        // archive prev: TitlePreview.png in images folder.

        // TODO - animated title screen - falling leaves from roadside level but slight diagonal = less sway
        // assets - U:\#All Age\#Assets For Animation\Tuck Shop Empire\For_Animated_Title\Title_Seperates

        function init() {
            tuck = new Vue({
                el: '#wrapper',
                data: Object.assign({}, TwinklGame.tuck.data, {
                    manifest: lib.manifest,
                    stage: 'title',
                    titleTransitioning: false,
                    leaves: [lib.manifest.leafGeneric.src, lib.manifest.leafOak.src, lib.manifest.leafSycamore.src].reduce(function (a, x, i, arr) { return a.concat(arr.concat(arr)) }, []),
                    scrollFrame: 0,
                    loadedAnimations: [],
                    saveUID: 0,
                    existingSaves: []
                }),
                methods: Object.assign({}, TwinklGame.tuck.methods, {
                    capitalise: TwinklGame.Utils.capitalise,
                    // do_a_jquery: function () {
                    //     // << url validation logic here // diff between live / dev environments >>
                    //     $.post('https://local.twinkl.it/ajax/resource/track', {
                    //
                    //     }, function (data, xhr) {
                    //         console.log('game saved !')
                    //         console.log('also theres this bunch of stuff:')
                    //         console.log(data)
                    //         console.log(xhr)
                    //         // will be HTTP code -> more detailed than 'success' -> can handle each status code individually
                    //
                    //         // 3 typical form actions -> track (single events), state (overall info object), config (custom settings for resource)
                    //
                    //         // utils fn to handle this -> each of the above is an alias to the same function
                    //
                    //         // req: resourceId, type of event,
                    //     }, 'json');
                    // }
                }),
                computed: TwinklGame.tuck.computed,
                mounted: function () {

                    var totalAnims = TwinklGame.tuck.data.world.denizens.length,
                        loadedAnims = 0;

                    TwinklGame.tuck.data.world.denizens.forEach(function (denizen) {
                        this.loadedAnimations[denizen.name] = new Image();
                        this.loadedAnimations[denizen.name].onload = function () {
                            loadedAnims++;
                            if(loadedAnims === totalAnims) {
                                document.querySelector('.preloader').classList.add('loaded');
                                setTimeout(function () {
                                    this.titleTransitioning = true;
                                }.bind(this), 5);
                            }
                        }.bind(this);
                        this.loadedAnimations[denizen.name].src = denizen.anim;
                    }.bind(this));

                    var click = new Howl({src: ['tuckshop-185-click.mp3']});
                    document.querySelectorAll('.clickable').forEach(function (btn) {
                        btn.addEventListener('click', function() { click.play() });
                    });

                    Vue.nextTick(function () {

                        // document.querySelector('.preloader').classList.add('loaded');
                        // setTimeout(function () {
                        //     this.titleTransitioning = true;
                        // }.bind(this), 5);

                    }.bind(this));

                    // this.loadGame();
                },
                updated: function() {
                    // this.saveGame();
                }
            });
        }