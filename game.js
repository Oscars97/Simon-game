
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
    var num = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[num];
    gamePattern.push(randomChosenColour); //here we are filling the array with the pattern
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
    audio.play();
};
$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    animatePress(userChosenColour);
    var audio = new Audio("./sounds/"+userChosenColour+".mp3");
    audio.play();
});

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass('pressed');
    }, 100);
};

document.addEventListener("keydown", function(event){ 
    if(!started){
        nextSequence();
        started=true;
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
    if(userClickedPattern.length===gamePattern.length){
            setTimeout( function(){
                nextSequence();
            }, 1000);
        }

        }else{
            console.log("wrong");
            var audio = new Audio ("./sounds/wrong.mp3");
            audio.play();
            $("body").addClass("game-over");
            $("h1").text("Game Over, press any key to restart");
            startOver();
            setTimeout(function (){
                $("body").removeClass("game-over");
            },200);
        }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}