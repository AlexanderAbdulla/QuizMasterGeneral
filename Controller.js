var quiz = new Quiz();

function saveQuestion(formElement){
    var id = formElement.id;
    var questionText = document.getElementById("Question"+id+"Text").value;
    var question = new Question(id, questionText, "asda", "asda", "asda", "asda", "asda");
    
    quiz.addQuestion(question);
       
}

function addQuestion(){
    var amountOfQuestions = quiz.getamountOfQuestions();
    amountOfQuestions++;
    quiz.setamountOfQuestions(amountOfQuestions);
    addQuestionView(amountOfQuestions);
}