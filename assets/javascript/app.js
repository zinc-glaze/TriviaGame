//TRIVIA GAME

//GLOBAL VARIABLES

//Number of right and wrong guesses
var correct;
var wrong;
//holds setInterval that runs timer
var intervalId;
//whether timer is running or not
var clockRunning = false;

//FUNCTIONS

function restart() {
    correct = 0;
    wrong = 0;
    clockRunning = false;
    $("#timer").empty();
    $("#box1").empty();
    $("#box2").empty();
    var startButton = $("<button>");
    startButton.text("Start!");
    startButton.addClass("startButton");
    $("#box1").append(startButton);
}

function startTimer() {

}

function stopTimer() {
    
}

//MAIN PROCESS

window.onload = function() {
    restart();
}
