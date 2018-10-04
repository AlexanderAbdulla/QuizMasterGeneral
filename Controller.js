//Getting a quiz object
var quiz = new Quiz();

/*Saves a question and updates the model */
function saveQuestion(formElement){
    var id = formElement.id;
    var questionText = document.getElementById("Question"+id+"Text").value;
    
    var answer1 = document.getElementById("Question"+id+"Answer"+0).value;
    var answer2 = document.getElementById("Question"+id+"Answer"+1).value;
    var answer3 = document.getElementById("Question"+id+"Answer"+2).value;
    var answer4 = document.getElementById("Question"+id+"Answer"+3).value;
    
    var radios = document.getElementsByName('answers'+id);

    for(var i = 0; i < radios.length; i++){
        console.log(radios[i]);
        if(radios[i].checked)
            var correctAnswer = radios[i].value;
    }

    var question = new Question(id, questionText, answer1, answer2, answer3, answer4, correctAnswer);
    if(quiz.validateSave(question) == true){
        quiz.addQuestion(question);
    }
       
}

/* Adds a question to the model's list of questions */
function addQuestion(){
    if(quiz.validateAdd() == true){
        var amountOfQuestions = quiz.getamountOfQuestions();
        amountOfQuestions++;
        quiz.setamountOfQuestions(amountOfQuestions);
        addQuestionView(amountOfQuestions);    
    }    
}

/* Deletes a question from the model's list of questions */
function deleteQuestion(formElement){
    var amountOfQuestions = quiz.getamountOfQuestions();
    amountOfQuestions--;
    quiz.setamountOfQuestions(amountOfQuestions);
    var id = formElement.id;
    quiz.deleteQuestion(id);
}

/* Saves all of the quiz questions*/
function saveAll(){

    if(validateSave()== true){

     if (typeof(Storage) !== "undefined") {
         localStorage.setItem("amountOfQuestions", quiz.getamountOfQuestions());
         localStorage.setItem("allQuestions", JSON.stringify(quiz.getQuestions()));
         localStorage.setItem("amt", quiz.getamountOfQuestions());
        
        } else {
        // this is not supported by browser
     }
    
        quiz.saveAllState();
    }
}

/*Checks all of the answers and sees which ones have been selected */
function checkAnswers(){
    console.log("Checking answers brah");
    var counter = 0; 
   
    var pickedAnswers = new Array();
    
    $('#userForm').children('div').each(function(){
        $(this).children('input').each(function(){
            if($(this).is(":checked")) {
                var p = $(this).attr('value');
                pickedAnswers.push(p); 
        
            }
        }) 
       counter++;
    })

    parseAnswers(pickedAnswers, counter);
    
}

/* Validates the save to see if any mistakes have been made in the quiz generation */
function validateSave(){
    document.getElementById('errorDiv').innerHTML = "";
    if(quiz.savedQuestions == 0){
        document.getElementById('errorDiv').innerHTML = "You have not saved any questions!";
        return false;
    }

    if(quiz.savedQuestions < quiz.amountOfQuestions){
        document.getElementById('errorDiv').innerHTML = "You have not saved all the questions!";
        return false;
    }
    return true;
}

/* Parses all the raw answers and passes them to the view to create a results page*/
function parseAnswers(pickedAnswers, counter){
    
   var score = JSON.parse(localStorage.getItem("allQuestions")).length;
   var totalAnswers = JSON.parse(localStorage.getItem("allQuestions")).length;;
   var incorrectAnswers = new Array();
   var correctedAnswers = new Array();
   var incorrectAnswerValues = new Array();
   var correctedAnswerValues = new Array();
   var incorrectQuestionNumbers = new Array();
    
    for (var i = 0; i < counter; i++){
        console.log("checking for " + JSON.parse(localStorage.getItem("allQuestions"))[i].correctAnswer);
        if(pickedAnswers[i] == JSON.parse(localStorage.getItem("allQuestions"))[i].correctAnswer){
            console.log("got a match");
        } else {
            console.log("no match");
            incorrectAnswers.push(pickedAnswers[i]);
            incorrectAnswerValues.push(document.getElementById(pickedAnswers[i]).innerHTML)
            correctedAnswers.push(JSON.parse(localStorage.getItem("allQuestions"))[i].correctAnswer);
            correctedAnswerValues.push(document.getElementById(JSON.parse(localStorage.getItem("allQuestions"))[i].correctAnswer).innerHTML)
            incorrectQuestionNumbers.push(i + 1);
            score--;
        }
    }

    quiz.storeAnwsers(score, totalAnswers, incorrectAnswers, correctedAnswers, incorrectAnswerValues, correctedAnswerValues, incorrectQuestionNumbers);
}