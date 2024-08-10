var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(event) {
    if(!started) {
        $("#level-title").text("Level "+level)
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var $userChosenColor = $(this).attr("id");
    userClickedPattern.push($userChosenColor);

    console.log(userClickedPattern);
    playSound($userChosenColor);
    animatePress($userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});


function playSound(color) {
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
    audio.onerror = function() {
        console.error("Error playing the audio file: " + color + ".mp3");
    }
}

function animatePress(color) {
    var $selectedButton = $("#"+color);
    $selectedButton.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $selectedButton.addClass("pressed");
    setTimeout(function() {
        $selectedButton.removeClass("pressed");
    }, 100)
}




function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        console.log(userClickedPattern);
        console.log(gamePattern);
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong")
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game, Over, Press Any Key to Restart")
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200)

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started  = false;
}

