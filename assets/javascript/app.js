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

//Replay (similar to restart, but launches directly into questions)
function replay() {
    correct = 0;
    wrong = 0;
    cardNum = 0;
    clockRunning = false;
    $("#timer").empty();
    $("#box1").empty();
    $("#box2").empty();
    //shuffles deck
    shuffle();
    //draws question
    nextCard();
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
    $("#box1").text("CORRECT!");
    $("#box2").empty();
    var answerImage = $("<img>");
    answerImage.attr("src", triviaDeck.cards[cardNum].image);
    $("#box2").append(answerImage);
    correct++;
    cardNum++;
    setTimeout(nextCard, 3500);
}

//On incorrect guess
function loseScreen() {
    $("#box1").text("WRONG!  The answer was: " + triviaDeck.cards[cardNum].choices[triviaDeck.cards[cardNum].validAnswer]);
    $("#box2").empty();
    var answerImage = $("<img>");
    answerImage.attr("src", triviaDeck.cards[cardNum].image);
    $("#box2").append(answerImage);
    wrong++;
    cardNum++;
    setTimeout(nextCard, 3500);
}

//On timer = 0
function timeUpScreen() {
    $("#box1").text("TIME'S UP! The answer was: " + triviaDeck.cards[cardNum].choices[triviaDeck.cards[cardNum].validAnswer]);
    $("#box2").empty();
    var answerImage = $("<img>");
    answerImage.attr("src", triviaDeck.cards[cardNum].image);
    $("#box2").append(answerImage);
    wrong++;
    cardNum++;
    setTimeout(nextCard, 3500);
}

//When there are no more questions
function endScreen() {
    $("#timer").empty();
    $("#box2").empty();
    $("#box1").text("-- GAME OVER! -- Correct: " + correct + " -- Wrong: " + wrong + " --");
    //creates replay button
    var replayButton = $("<button>");
    replayButton.text("Play Again?");
    replayButton.addClass("replay-button");
    $("#box2").append(replayButton);
    //when user clicks replay button, game restarts
    $(".replay-button").on("click", replay);
}

//TRIVIA DECK OBJECT
var triviaDeck = {
    //Cards
    cards: [{
        question: "Which singer made a comeback as a 'Private Dancer' in 1984?",
        choices: ["Diana Ross", "Steve Winwood", "Stevie Wonder", "Tina Turner"],
        image:  "https://media.giphy.com/media/YxsVhh1HSoq6A/giphy-downsized.gif",
        validAnswer: 3
        }, {
        question: "Who produced Michael Jackson's mega-hit 1982 album 'Thriller'?",
        choices: ["Quincy Jones", "Berry Gordy", "George Martin", "P Diddy"],
        image:  "https://media.giphy.com/media/CCVWsXdnvYS9a/giphy-downsized.gif",
        validAnswer: 0
        }, {
        question: "Which singer who went by a one-word name was born with the last name 'Ciccone'",
        choices: ["Cher", "Apollonia", "Madonna", "Lisa Lisa"],
        image:  "https://media.giphy.com/media/7ezI6uAsF8wzS/giphy-downsized.gif",
        validAnswer: 2
        }, {
        question: "Which solo artist named his Minneapolis home and recording studio 'Paisley Park'?",
        choices: ["Billy Idol", "Bono", "Sting", "Prince"],
        image:  "https://media.giphy.com/media/s33IE5ZiQfha8/giphy.gif",
        validAnswer: 3
        }, {
        question: "What synth-pop group from Sheffield, England released the hit single 'Don't You Want Me' in 1981?",
        choices: ["Duran Duran", "Flock of Seagulls", "Depeche Mode", "The Human League"],
        image:  "https://media.giphy.com/media/SeW6r48pgFLfa/giphy-downsized.gif",
        validAnswer: 3
        }, {
        question: "What band was formed by the surviving 3 members of Joy Division after lead singer Ian Curtis' death?",
        choices: ["The Smiths", "New Order", "The Jesus and Mary Chain", "The Cure"],
        image:  "https://media.giphy.com/media/p29xnqfmtZzY4/giphy.gif",
        validAnswer: 1
        }, {
        question: "He was Andrew Ridgely's partner in the duo Wham!",
        choices: ["Boy George", "Rick Astley", "George Michael", "Gary Numan"],
        image:  "https://media.giphy.com/media/6oQQWzgnkWQxy/giphy-downsized.gif",
        validAnswer: 2
        }, {
        question: "Which prog-rock band was Phil Collins a part of before becoming a solo star in the '80s?",
        choices: ["Genesis", "Yes", "King Crimson", "Rush"],
        image:  "https://media.giphy.com/media/8YCQcGsJjG8Ug/giphy-downsized.gif",
        validAnswer: 0
        }, {
        question: "Which Jackson sibling gained 'Control' of the #1 spot on the album charts with this 1986 album?",
        choices: ["Michael", "Janet", "Jermaine", "La Toya"],
        image:  "https://media.giphy.com/media/BWJ5HDG6T5lK0/giphy-downsized.gif",
        validAnswer: 1
        }, {
        question: "Which artist released a tribute to self-love entitled 'She Bop' in 1984?",
        choices: ["Belinda Carlisle", "Cindy Lauper", "Madonna", "Prince"],
        image:  "https://media.giphy.com/media/gKgNfbONJH1ja/giphy.gif",
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

