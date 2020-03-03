$(document).ready(function () {

    const allQuestions = [
        {
            question: "Who created the Matrix?",
            options: ["Morpheus", "Neo", "Agent Smith", "The Architect"],
            correctAnswer: "The Architect",
        },
        {
            question: "Where is Zion?",
            options: ["New York City", "Near The Earth's Core", "Below Machine City", "In The Matrix"],
            correctAnswer: "Near The Earth's Core",
        },
        {
            question: "About What Year Is It In The Ravaged Real World?",
            options: ["1999", "2066", "2155", "2199"],
            correctAnswer: "2199",
        },
        {
            question: "Why Does Seraph Fight Neo The First Time They Meet?",
            options: ["Seraph Is An Agent", "He's Protecting The Matrix", "Seraph Wants To Confirm Neo Is The One", "It's For The Good Of Zion"],
            correctAnswer: "Seraph Wants To Confirm Neo Is The One",
        },
        {
            question: "What Are The Machine's Use For Humans?",
            options: ["Slave Labor", "Energy", "Experiments", "To Help Them Live Longer"],
            correctAnswer: "Energy",
        },

    ];

    let countDown = 15;
    let currentQuestion = 0;
    let correctAnswer = 0;
    let incorrectAnswer = 0;
    let unanswered = 0;
    let answerOptions;
    let timer;
    let Question;

    //runs the timer, and loads next question if timer reaches 0 
    function timerCount() {
        countDown--;
        $("#display-time").text("Time Remaining : " + countDown);

        if (countDown === 0) {
            clearInterval(timer);
            unanswered++;
            nextQuestion();
        }
    }

    //on click the game starts 
    $("#start").on("click", function () {
        $("#intro").hide();
        // $("#codepage").hide();
        
        startgame();
    });

    // loads the questions and choices 
    function startgame() {
        clearInterval(timer);
        countDown = 15;
        timer = setInterval(timerCount, 1000);

        $("#display-time").text("Time Remaining : " + countDown);

        Question = allQuestions[currentQuestion].question;

        $("#display-question").text(Question);

        displayOptions();
    };

    function displayOptions() {
        answerOptions = allQuestions[currentQuestion].options;

        for (i = 0; i < answerOptions.length; i++) {
            var choices = $("<button id='start'>");
            choices.attr("data-answer", answerOptions[i]);
            choices.attr("class", "choices btn btn-primary");
            choices.text(answerOptions[i]);
            $("#display-options").append(choices);
        }
    };

    //event listener for chosen answer, and loads the next question 
    $(document).on("click", ".choices", function () {
        const selectedAnswer = $(this).attr("data-answer");
        if (selectedAnswer === allQuestions[currentQuestion].correctAnswer) {

            correctAnswer++;
            $(this).attr("class", "choices btn btn-success")
            clearInterval(timer);
            setTimeout(nextQuestion, 2000);
        } else {

            incorrectAnswer++;
            $(this).attr("class", "choices btn btn-danger")
            clearInterval(timer);
            setTimeout(nextQuestion, 1000);
        }
    });

    //loads the next question, if no more questions then ends the game 
    function nextQuestion() {

        if (currentQuestion === allQuestions.length - 1) {
            endGame();

        } else {

            currentQuestion++;
            $("#display-options").html("");
            startgame();
        }
    };

    // at the end of all questions, empties all html and stops the timer
    function endGame() {
        clearInterval(timer);
        $("#display-time").empty();
        $("#display-question").empty();
        $("#display-options").empty();

        displayResult();

    };
    //displays the final results 
    function displayResult() {
        const results = `
        <p> Correct Answers : ${correctAnswer} </p>
        <p> Incorrect Answers : ${incorrectAnswer} </p>
        <p> Unanswered Questions : ${unanswered} </p>
        <button id="resetbtn" class="btn btn-primary"> Reset Game </button>
        `;
        $("#display-result").html(results);
        $("#display-result").show();

    };

    $(document).on("click", "#resetbtn", function () {
        $("#display-result").hide();
        currentQuestion = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        unanswered = 0;
        startgame();

    });

});