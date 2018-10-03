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
    
    var correctAnswerValue = document.getElementById(correctAnswer).value;

    var question = new Question(id, questionText, answer1, answer2, answer3, answer4, correctAnswerValue);
    
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
    $('#userForm').children('div').each(function(){
        $(this).children('input').each(function(){
            if($(this).is(":checked")){
                console.log("the correct answer is" + $(this).attr('value'));
            }
        })
        
    })
    
}