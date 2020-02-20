
var btnColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var  started= false;
$(document).keypress(function (e) {
    if(started === false){
        $('h1').text("Level" + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1);
});

function nextSequence() {
    level += 1;
    $('h1').text("Level "+ level);
    var randomNumber = Math.floor(Math.random()*4);
    /*
    randomNumber = randomNumber * 3;
    randomNumber = Math.floor(randomNumber + 1);
    */
    var randomChosenColour = btnColours[randomNumber];
    gamePattern.push(randomChosenColour);

    var ColorSelector = $("#" + randomChosenColour);
    ColorSelector.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);


}

function playSound(name) {
    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    },100);
}


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
                userClickedPattern = [];
            },1000);
        }


    }else{
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver()

    }

}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}
