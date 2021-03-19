function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
 
    this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScores() {
    if (typeof(Storage) !== "undefined") {
        // Store
        var gameOverHTML = "<h1>Congratulations!!!</h1>";
        
        localStorage.setItem("score", quiz.score);
        var allscore =  localStorage.getItem("score");
        gameOverHTML += "<h2 id='score'> Your score is: " + allscore + "</h2>";
        var element = document.getElementById("quiz");
        element.innerHTML = gameOverHTML;


        
      } else {
        document.getElementById("quiz").innerHTML = "Sorry, your browser does not support Web Storage...";
      }
};

 
// create questions here
var questions = [
    new Question("Hyper Text Markup Language Stand For?", ["JavaScript", "XHTML","CSS", "HTML"], "HTML"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ___ -side programming language.", ["Client", "server", "both", "none"], "both"),
    new Question("Which of the following will write the message “Hello DataFlair!” in an alert box?", ["alertBox(“Hello DataFlair!”);", "alert(Hello DataFlair!);", "msgAlert(“Hello DataFlair!”);", "alert(“Hello DataFlair!”);"], "alert(“Hello DataFlair!”);"),
    new Question("How do you find the minimum of x and y using JavaScript?", ["min(x,y);", "Math.min(x,y)", "Math.min(xy)", "min(xy);"], "Math.min(x,y)"),
    new Question("Which JavaScript label catches all the values, except for the ones specified?", ["catch", "label", "try", "default"], "default"),
    new Question("Which are the correct if statements to execute certain code if “x” is equal to 2?", ["if(x 2)", "if(x=2)", "if(x==2)", "if(x!=2 )"], "if(x==2)"),
    new Question("Hyper Text Markup Language Stand For?", ["JavaScript", "XHTML","CSS", "HTML"], "HTML"),
];
//var questions = $.getJSON("ques.json");

// create quiz
//var xmlhttp = new XMLHttpRequest();
/*ar myObj = JSON.parse(this.responseText);
    document.getElementById("demo").innerHTML = myObj.name;
  }
};
xmlhttp.open("GET", "ques.json", true);
xmlhttp.send();
console.log(xmlhttp)*/
var request = new XMLHttpRequest();
        request.open('GET', 'ques.json');
        request.onload = function(){
            var data=JSON.parse(request.responseText);
            Quiz(data)
        }  
        request.send();
var quiz = new Quiz(questions);
 
// display quiz
populate();