var quiz = new Quiz();

function saveQuestion(formElement){
    
    var id = formElement.id;
    console.log("Saving" + id)
    var questionText = document.getElementById("Question"+id+"Text").value;
    console.log("THE OBJECT IS"+ document.getElementById("Question"+id+"Answer"+1));
    console.log("THE OBJECT IS"+ document.getElementById("Question"+id+"Answer"+2));

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
    
    quiz.addQuestion(question);
       
}

function addQuestion(){
    var amountOfQuestions = quiz.getamountOfQuestions();
    amountOfQuestions++;
    quiz.setamountOfQuestions(amountOfQuestions);
    addQuestionView(amountOfQuestions);
}

function deleteQuestion(formElement){
    var amountOfQuestions = quiz.getamountOfQuestions();
    amountOfQuestions--;
    //console.log("new amt of questions" + amountOfQuestions);
    quiz.setamountOfQuestions(amountOfQuestions);
    var id = formElement.id;
    quiz.deleteQuestion(id);
}

function saveAll(){
    if (typeof(Storage) !== "undefined") {
        //console.log("The amt of qs is" +quiz.getamountOfQuestions)
        localStorage.setItem("amountOfQuestions", quiz.getamountOfQuestions());
        localStorage.setItem("allQuestions", JSON.stringify(quiz.getQuestions()));
        localStorage.setItem("amt", quiz.getamountOfQuestions());
        /*
        for(var i = 0; i < quiz.getamountOfQuestions(); i++){
            var q = new Question();
            q = JSON.parse(localStorage.getItem("allQuestions"))[i];
            console.log(q);
        }*/
    } else {
        // Sorry! No Web Storage support..
    }
}

function checkAnswers(){
    console.log("Checking answers brah");
    var counter = 0; 
   
    // iteratre thru each div (question) and get the answers we've picked
    var pickedAnswers = new Array();
    
    $('#userForm').children('div').each(function(){
        //grab the answer that was picked
        $(this).children('input').each(function(){
            if($(this).is(":checked")) {
                var p = $(this).attr('value');
                // push the picked answers to an array 
                pickedAnswers.push(p); 
        
            }
        }) 

        // incremement to next div
        counter++;
    })

    console.log("picked answers " + pickedAnswers);

    /*
    variables for our new view
    */

   var score = JSON.parse(localStorage.getItem("allQuestions")).length;
   var totalAnswers = JSON.parse(localStorage.getItem("allQuestions")).length;;
   var incorrectAnswers = new Array();
   var correctedAnswers = new Array();
   var incorrectAnswerValues = new Array();
   var correctedAnswerValues = new Array();
   var incorrectQuestionNumbers = new Array();
    
    //check if the answers are correct 
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

  
   // var q = new testClass();
    
   // quiz.getQuestions();

   console.log("----------------------------------------")
   console.log("final score = " + score + " out of  " + totalAnswers);
   for (var i = 0; i < incorrectAnswers.length; i++){
       console.log("Mistake at Question" + incorrectQuestionNumbers[i])
       console.log("The incorrect answer was: " + incorrectAnswers[i]);
       console.log("The incorrect answer value was: " + incorrectAnswerValues[i]);
       console.log("The correct answer was " + correctedAnswers[i]);
       console.log("The correct answer value was: " + correctedAnswerValues[i]);
   }
    quiz.storeAnwsers(score, totalAnswers, incorrectAnswers, correctedAnswers, incorrectAnswerValues, correctedAnswerValues, incorrectQuestionNumbers);

    //var q = new QuizAnswers(score, totalAnswers, incorrectAnswers, correctedAnswers, incorrectAnswerValues, correctedAnswerValues, incorrectQuestionNumbers);
    //var q = new QuizAnswers(1, 2, 3, 4, 5, 6, 7, 8);
    //q.printQuizAnswers();
    
}