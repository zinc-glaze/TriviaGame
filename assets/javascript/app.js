//TRIVIA GAME

//GLOBAL VARIABLES

//Number of right and wrong guesses
var correct;
var wrong;
//holds setInterval that runs timer
var intervalId;
//whether timer is running or not
var clockRunning = false;
//stores question count
var cardNum = 0;

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
    startButton.addClass("start-button");
    $("#box1").append(startButton);
}

function nextCard() {
    $("#timer").text(30);
    timer.start();
    $("#box1").text(triviaDeck.cards[cardNum].question);
    var multipleChoice = $("<ul>");
    for (i = 0; i < 4; i++) {
        var choice = $("<li>");
        choice.text(triviaDeck.cards[cardNum].choices[i]);
        choice.attr("data-choice", i);
        choice.addClass("answer-button");
        multipleChoice.append(choice);
    }
    $("#box2").append(multipleChoice);
    cardNum++;
}

function pause() {

}


//TRIVIA DECK OBJECT
var triviaDeck = {
    //Cards
    cards: [{
        question: "Which singer made a comeback as a 'Private Dancer' in 1984?",
        choices: ["Diana Ross", "Steve Winwood", "Stevie Wonder", "Tina Turner"],
        image:  "",
        validAnswer: 3
        }, {
        question: "Which artist released a tribute to autoerotic stimulation titled 'She Bop' in 1984?",
        choices: ["Belinda Carlisle", "Cindy Lauper", "Madonna", "Prince"],
        image:  "",
        validAnswer: 1
        }],
    //Shuffle deck    
    shuffle: function() {
        cards.sort(function() {
            return 0.5 - Math.random();
        });
    }
}


//QUESTION TIMER OBJECT
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
    $(".start-button").on("click", nextCard);

 
};

