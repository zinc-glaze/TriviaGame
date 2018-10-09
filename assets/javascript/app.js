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
//Restarts game, resets variables, clears divs
function restart() {
    correct = 0;
    wrong = 0;
    cardNum = 0;
    clockRunning = false;
    $("#timer").empty();
    $("#box1").empty();
    $("#box2").empty();
    var startButton = $("<button>");
    startButton.text("Start!");
    startButton.addClass("start-button");
    $("#box1").append(startButton);
    //shuffles deck
    shuffle();
    //when start button is clicked, first question is drawn
    $(".start-button").on("click", nextCard);
}

//Shuffles deck    
function shuffle() {
    triviaDeck.cards.sort(function() {
        return 0.5 - Math.random();
    });
}

//Draws the next question card
function nextCard() {
    //if there are no more questions left, go to end screen
    if (cardNum == triviaDeck.cards.length) {
        timer.stop();
        endScreen();
    }
    else {
        //clear previous multiple choice
        $("#box2").empty();
        //restart timer
        $("#timer").text(15);
        timer.reset();
        timer.start();
        //print question
        $("#box1").text(triviaDeck.cards[cardNum].question);
        //print multiple choice
        var multipleChoice = $("<ul>");
        for (i = 0; i < 4; i++) {
            var choice = $("<li>");
            choice.text(triviaDeck.cards[cardNum].choices[i]);
            choice.attr("data-choice", i);
            choice.addClass("answer-button");
            multipleChoice.append(choice);
        }
        $("#box2").append(multipleChoice);
    }
}

//Checks user guess against correct answer, sends to next screen
function checkAnswer() {
    timer.stop();
    if ($(this).attr("data-choice") == triviaDeck.cards[cardNum].validAnswer) {
        winScreen();
    }
    else {
        loseScreen();
    }
}

//On correct guess
function winScreen() {
    $("#box1").text("Correct! The answer was " + triviaDeck.cards[cardNum].choices[triviaDeck.cards[cardNum].validAnswer] + ".");
    $("#box2").text("Insert Image Here");
    correct++;
    cardNum++;
    setTimeout(nextCard, 3000);
}

//On incorrect guess
function loseScreen() {
    $("#box1").text("Wrong! The answer was " + triviaDeck.cards[cardNum].choices[triviaDeck.cards[cardNum].validAnswer] + ".");
    $("#box2").text("Insert Image Here");
    wrong++;
    cardNum++;
    setTimeout(nextCard, 3000);
}

//On timer = 0
function timeUpScreen() {
    $("#box1").text("Time's Up! The answer was " + triviaDeck.cards[cardNum].choices[triviaDeck.cards[cardNum].validAnswer] + ".");
    $("#box2").text("Insert Image Here");
    wrong++;
    cardNum++;
    setTimeout(nextCard, 3000);
}

//When there are no more questions
function endScreen() {
    $("#timer").empty();
    $("#box2").empty();
    $("#box1").text("Game Over! Correct: " + correct + "  Wrong: " + wrong);
    //creates replay button
    var replayButton = $("<button>");
    replayButton.text("Play Again?");
    replayButton.addClass("replay-button");
    $("#box2").append(replayButton);
    //when user clicks replay button, game restarts
    $(".replay-button").on("click", restart);
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
        question: "Which Jackson sibling gained 'Control' of the #1 spot on the album charts with this 1986 album?",
        choices: ["Michael", "Janet", "Jermaine", "La Toya"],
        image:  "",
        validAnswer: 1
        }, {
        question: "Which artist released a tribute to autoerotic stimulation titled 'She Bop' in 1984?",
        choices: ["Belinda Carlisle", "Cindy Lauper", "Madonna", "Prince"],
        image:  "",
        validAnswer: 1
        }],
}

//QUESTION TIMER OBJECT
var timer = {

    time: 15,

    reset: function() {
        timer.time = 15;
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
        if (timer.time === 0) {
            timer.stop();
            timeUpScreen();
        }
    }
}

//MAIN PROCESS
window.onload = function() {
    restart();    
    $(document).on("click", ".answer-button", checkAnswer);
};

