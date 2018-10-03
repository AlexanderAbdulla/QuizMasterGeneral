var quiz = new Quiz();

function saveQuestion(formElement){
    var id = formElement.id;
    var questionText = document.getElementById("Question"+id+"Text").value;
    var question = new Question(id, questionText, "asda", "asda", "asda", "asda", "asda");
    var questionExists = false; 
    var length = quiz.amountOfQuestions - 1; 
    for (var i = 0; i < length; i++){
        alert(quiz.questions[i].id);
    }    
}

function addQuestion(){
    var amountOfQuestions = quiz.getamountOfQuestions();
    amountOfQuestions++;
    quiz.setamountOfQuestions(amountOfQuestions);
    addQuestionView(amountOfQuestions);
}