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
                    scrollFrame: 0
                }),
                methods: Object.assign({}, TwinklGame.tuck.methods, {
                    newGame: function () {
                        this.stage = 'main';
                        this.loadArea('roadside');
                        this.startDenizenLoop();
                    },
                    loadInitialGame: function () {
                        this.stage = 'main';
                        this.loadGame();
                        this.loadArea(this.player.location);
                        this.startDenizenLoop();
                    },
                    capitalise: TwinklGame.Utils.capitalise,
                    // animateScroll: function (direction) {
                    //     var scope = this,
                    //         scroll = document.getElementsByClassName('question')[0];
                    //
                    //     var nextFrame = function () {
                    //
                    //         if(direction === 'forwards') {
                    //             if(scope.scrollFrame < 19) {
                    //                 scope.scrollFrame++;
                    //                 setTimeout(nextFrame, 10);
                    //             }
                    //         } else {
                    //             if(scope.scrollFrame > 0) {
                    //                 scope.scrollFrame--;
                    //                 setTimeout(nextFrame, 10);
                    //             }
                    //         }
                    //
                    //         scroll.style.backgroundPositionY = (scope.scrollFrame * 5.26) + '%';
                    //
                    //     };
                    //
                    //     setTimeout(nextFrame, 15);
                    // },
                    // openScroll: function () {
                    //     this.animateScroll('forwards');
                    // },
                    // closeScroll: function () {
                    //     this.animateScroll('backwards')
                    // },
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

                    var click = new Howl({src: ['tuckshop-151-click.mp3']});
                    document.querySelectorAll('.clickable').forEach(function (btn) {
                        btn.addEventListener('click', function() { click.play() });
                    });

                    Vue.nextTick(function () {

                        document.querySelector('.preloader').classList.add('loaded');
                        setTimeout(function () {
                            this.titleTransitioning = true;
                        }.bind(this), 5);

                    }.bind(this));

                    // this.loadGame();
                },
                updated: function() {
                    // this.saveGame();
                }
            });
        }