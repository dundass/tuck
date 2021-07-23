var TwinklGame = TwinklGame || {};

(function(twinkl) {

    var curQ = 1;
    var money = 0;
    var happiness = 20;

    var gameStarted = false;
    var yourScore=0;
    var woosh = new Audio('../tuckshop/images/Swoosh.mp3');
    var countdownSound = new Audio('../tuckshop/images/CountdownSound.mp3');


    var regularHelp = "<b>Can you solve the puzzle of Fibonacci's very unusual tuckshop?</b><br>" +
        "Add up the red and blue values to get the hours.<br>" +
        "Add the green and blue values and multiply by five to get the minutes.<br>" +
        "Click help at any time to view the rules. Good luck!<br>";

    var helpText = "The value of each box is shown above. <br> The hours are displayed using <span style=\"color:#DC215A\">red</span> and the minutes using <span style=\"color:#04984B\">green</span>. <br> " +
        "When a square is used to display both the hours and minutes it turns <span style=\"color:#2A97D4\">blue</span>.<br> " +
        "So to work out the hours just add up the values of the <span style=\"color:#DC215A\">red</span> and <span style=\"color:#2A97D4\">blue</span> boxes. <br>  "+
        "To work out the minutes, add up the values of the <span style=\"color:#04984B\">green</span> and <span style=\"color:#2A97D4\">blue</span> boxes and multiply by 5.";

    //[happiness :) , money $$$]
    var questions = [
        {},
        {text:"Hey you, wanna fight?", ansYes:"Let's get fighting then", ansNo:"Cowardice is a man's best friend!", resYes:[6,0], resNo:[-2,0]},
        {text:"Can I buy a nice treat?", ansYes:"I do enjoy a tasty treat!", ansNo:"My life remains treatless!", resYes:[2,4], resNo:[-5,0]},
        {text:"Let me do a steal?", ansYes:"I will take all that belongs to you!", ansNo:"Fair enough, I won't bother!", resYes:[3,-10], resNo:[-1,0]},
        {text:"Should I buy more?", ansYes:"I am a consumer's dream", ansNo:"You are turning down a king's ransom!", resYes:[10,15], resNo:[-1,0]},
        {text:"Want me to leave?", ansYes:"I am never wanted", ansNo:"Kind, but I will acquiesce!", resYes:[-5,0], resNo:[10,0]}
        ];
    //Let's go!
    window.onload = setup;

    function setup() {
        controls = twinkl.createUI({containerId: 'container'});

        $('#titleHolder').show();
        $('#gameHolder').hide();

        $('.top-btns').hide();
    }

    function showPopup(){

        /*$('.tuckshop-pop-text').html(regularHelp);
        if(!controls.getMuted())woosh.play();

        $('.tuckshop-pop').show().animate({
            'top':'16%'
        },500,'easeOutBack');*/

        $('.introText').hide();
        $('.title-logo').hide();
        $('#lets-go-button').hide();

        startGame();
    }

    function startGame(){

        $('#titleHolder').hide();
        $('#tuckshop-gameHolder').show();

        gameStarted = false;
        yourScore = 0;

        /*bgm.loop = true;
        bgm.volume = 0.1;
        if(!controls.getMuted())bgm.play();*/

        generateCustomer();
    }

    function generateCustomer() {

        $('.tuckshop-order').hide();

        $('.tuckshop-customer').css('transform','scaleX(1)').animate({
            'right':'30%'
        }, 1000, function(){
            generateOrder();
        });
    }

    function generateOrder(){
        $('.tuckshop-answer').show();
        $('.tuckshop-order').show();
        $('.tuckshop-order-arrow').css('left','12%');

        curQ = questions [Math.ceil( Math.random()*5 )];

        $('.tuckshop-order-text').text(curQ.text);
    }

    function answer(ans){

        $('.tuckshop-answer').hide();

        if(ans == 'yes'){
            $('.tuckshop-order-text').text(curQ.ansYes);

            happiness += curQ.resYes[0];
            money += curQ.resYes[1];
        } else {
            $('.tuckshop-order-text').text(curQ.ansNo);

            happiness += curQ.resNo[0];
            money += curQ.resNo[1];
        }

        $('.tuckshop-order-arrow').animate({
            'left':'90%'
        }, 1500);

        $('.tuckshop-customer').css('transform','scaleX(-1)').animate({
            'right':'-30%'
        }, 2000, function(){
            generateCustomer();
        });

        $('.tuckshop-happiness').text('Happiness: '+happiness+'/100')
        $('.tuckshop-money').text('Money: £'+money)

        console.log(money)
    }

    function countdown(){
        /*timeRem--;

        var quotient = Math.floor(timeRem/60);
        var remainder = timeRem % 60;

        if(timeRem <= 9){
            $('.tuckshop-score-timer').text('00:0'+remainder).css('color','#DC215A');
            if(!controls.getMuted()) countdownSound.play();
        } else {
            if(remainder<10){
                $('.tuckshop-score-timer').text('0'+quotient+':0'+remainder);
            } else {
                $('.tuckshop-score-timer').text('0'+quotient+':'+remainder);
            }
        }


        if(timeRem <=0){
            clearInterval(gameTimer);
            gameOver();
        }*/
    }

    function showHelp(){

        if(!helping && gameStarted) {

            //if(!bgm.paused) woosh.play();
            helping = true;

            clearInterval(gameTimer);

            $('.tuckshop-help').show().animate({
                'top': '13%'
            }, 500, 'easeOutBack');

            $('.tuckshop-the-tuckshop').animate({
                'top': '-100%'
            }, 500, 'easeOutBack');
        }
    }

    function removeHelp(){


        $('.tuckshop-help').show().animate({
            'top':'100%'
        },500,'easeOutBack', function(){
            $(this).hide();
        });

        $('.tuckshop-the-tuckshop').animate({
            'top':'15%'
        },500,'easeOutBack', function(){
            helping = false;
        });

        gameTimer = setInterval(countdown, 1000);
    }

    function gameOver(){

    }

    function showScore(){
        $('.tuckshop-end-text').html("Nice one! Your final score is:");
        $('.tuckshop-end-score').html(yourScore);
        if(!controls.getMuted()) woosh.play();


        $('.tuckshop-end-screen').show().animate({
            'top':'16%'
        },500,'easeOutBack');
    }
    function stopAllSounds(){
        if(!controls.getMuted()) bgm.play();
        else bgm.pause();
    }

    twinkl.setup = setup;
    twinkl.showPopup = showPopup;
    twinkl.startGame = startGame;
    twinkl.showHelp = showHelp;
    twinkl.removeHelp = removeHelp;
    twinkl.stopAllSounds = stopAllSounds;
    twinkl.answer = answer;

})(TwinklGame)