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


//TIMER OBJECT
var timer = {

    time: 30,

    reset: function() {
        timer.time = 30;
        $("#timer").text(timer.time);
    },

    start: function() {
        if (!clockRunning) {
            intervalId = setInterval(timer.count, 1000);
            clockRunning = true;
        }
    },

    stop: function() {
        clearInterval(intervalId);
        clockRunning = false;
    },

    count: function() {
        //decrement time by 1
        timer.time--;
        $("#timer").text(timer.time);
    }
}


//MAIN PROCESS

window.onload = function() {
    restart();
}
