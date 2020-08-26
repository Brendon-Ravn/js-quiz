var score = 0;
var startBtn = document.querySelector("#start-button");
var topScoreForm = document.querySelector("#topScoreForm");
var timer = document.getElementById("timer");
var currentQuestion = document.querySelector("#currentQuestion");
var questionaireDiv = document.querySelector("#questionaire");
var index = -1;
var optionsUl = document.createElement("ul");
optionsUl.style.listStyleType = "none";
var modalEl = document.querySelector("#modal-container");
var modalNameEl = document.querySelector("#modal-name");
var replayBtn = document.querySelector("#replay");
var closeBtn = document.querySelector(".close");
var topScoresList = document.querySelector("#topScoresList");
var enterInitials = document.querySelector("#enterInitials");
var topScorelink = document.querySelector("#topScoreLink");
var gameOver = document.querySelector("#gameover");
gameOver.style.display = "none";

var topScores = [];
var currentId = 0;
var quiz = [
    {
        question: "What separates items in an Array?",
        choices: [",", ":", "'", "nothing"],
        answer: ","
    },
    {
        question: "How do you create a loop?",
        choices: ["if statement", "for statement", "string", "event listener"],
        answer: "for statement"
    },
    {
        question: "What do you add to an eventListener to keep it from refreshing the page?",
        choices: ["event!()", "event.stop()", "event.quit()", "event.preventDefault()"],
        answer: "event.preventDefault()"
    },
    {
        question: "In which element do we put JavaScript?",
        choices: ["<js>", "<modal>", "<script>", "<JvSc>"],
        answer: "<script>",
    },
    {
        question: "How do you alert 'Hello'?",
        choices: ["pin('Hello')", "console.log('Hello')", "caution('Hello')", "alert('Hello')"],
        answer: "alert('Hello')",
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: ["function = functionName()", "function: functionName()", "function-functionName()", "function functionName()"],
        answer: "function functionName()",
    },
    {
        question: "How do you call a function named 'thisWorks'?",
        choices: ["thisWorks()", "run thisWorks()", "call thisWorks()", "..thisWorks()"],
        answer: "thisWorks()",
    },
    {
        question: "How do you print something to the console in Javascript?",
        choices: ["window.alert", "console.log()", "print.screen()", "print.console"],
        answer: "console.log()"
    },
    {
        question: "How do you comment out a line in JavaScript?",
        choices: ["''", ",,", "//", "**"],
        answer: "//"
    },
    {
        question: "How do you pull elements from a document to create a variable for JavaScript?",
        choices: ["document.addEventListener()", "document.querySelector()", "document.pull()", "doc.find()"],
        answer: "document.querySelector()"
    }
];
var currentTimer = 60;

function startTimer(event) {
    event.preventDefault()
    startBtn.style.display = "none";
    modalEl.style.display = "none";

    var timeInterval = setInterval(function () {
        timer.textContent = "Time Remaining: " + currentTimer;
        currentTimer--;

        if (currentTimer <= 0) {
            timer.textContent = "";
            gameOver.style.display = "block";
            topScorelink.style.display = "none";
            currentQuestion.textContent = "";
            optionsUl.style.display = "none";
            clearInterval(timeInterval);
        } else if (index > quiz.length - 1) {
            timer.textContent = "";
            init();
            clearInterval(timeInterval);
        }

    }, 1000);
    startQuiz(1);
}
var userChoices;
function startQuiz(direction) {

    index += direction;
    currentQuestion.textContent = "";
    optionsUl.innerHTML = "";
    currentQuestion.textContent = quiz[index].question;
    userChoices = quiz[index].choices;

    userChoices.forEach(function (option) {
        var optionsLi = document.createElement("li");
        optionsLi.style.margin = "20px";
        var optionBtn = document.createElement("button");
        optionBtn.style.width = "200px";
        optionBtn.style.wordWrap = "break-word";
        optionBtn.style.border = "5px outset white";

        optionsLi.appendChild(optionBtn);
        optionBtn.textContent = option;
        questionaire.appendChild(optionsUl);
        optionsUl.appendChild(optionsLi);
        optionsLi.addEventListener("click", (checkAnswer));
    });
}
function checkAnswer(event) {
    var element = event.target;
    if (element.textContent === quiz[index].answer) {
        score++;
        alert("Right! Your score is: " + score);
        startQuiz(1);
    } else {
        alert("Wrong! You lose 10 seconds!");
        currentTimer -= 10;
        startQuiz(1);
    }
    if (index > quiz.length - 1) {
        saveScore();
    }
}

function replay() {
    window.location.reload("Refresh")

}
function close() {
    modalEl.style.display = "none";
    index = 0;
    startBtn.style.display = "block";
    currentTimer = 60;
}

function renderTopScores() {
    topScoresList.innerHTML = "";

    for (var i = 0; i < topScores.length; i++) {
        var currentIndex = topScores[i];
        console.log(currentIndex);
        var li = document.createElement("li");
        li.textContent = currentIndex.initials + ": " + currentIndex.score;
        topScoresList.appendChild(li);
    }
}
function init() {
    modalEl.style.display = "block";

    var storedTopScores = JSON.parse(localStorage.getItem("topScores"));

    if (storedTopScores) {
        
        topScores = storedTopScores;
    }
    renderTopScores();
}

function storeTopScores() {
    localStorage.setItem("topScores", JSON.stringify(topScores));
}

topScoreForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(topScores);

    if (!enterInitials) {
        alert("Please enter your initials");
    } else {
        if (topScores.length >= 10) {
            topScores.length = 0;
        }
        
        var userScore = {
            initials: enterInitials.value,
            score: score
        };

        enterInitials.value = "";
        topScores.push(userScore);
        storeTopScores();
        renderTopScores();
        
    }
});



topScorelink.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    init();
    modalEl.style.display = "block";

});


closeBtn.addEventListener("click", close);
replayBtn.addEventListener("click", replay);
startBtn.addEventListener("click", startTimer);