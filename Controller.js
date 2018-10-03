var quiz = new Quiz();
alert(testView);

function submitForm(formElement){
    var id = formElement.id;
    var x = document.getElementById("Question"+id+"Text").value;
    alert(x);
}

function addQuestion(){
    var amountOfQuestions = quiz.getamountOfQuestions();
    amountOfQuestions++;
    quiz.setamountOfQuestions(amountOfQuestions);
    addQuestionView(amountOfQuestions);
}

/*
  <form id="Question1">
            Question 1
            <br>
            <textarea id="Question1Text">Your question goes here</textarea>
            <br>
            <input type="radio" name="answers" value="Question1Answer1">
            <input type = "html" id="Question1Answer1"/>
            <br>
            <input type="radio" name="answers" value="Question1Answer2">
            <input type = "html" id="Question2Answer2"/>
            <br>
            <input type="radio" name="answers" value="Question1Answer3">
            <input type = "html" id="Question1Answer3"/>
            <br>
            <input type="radio" name="answers" value="Question1Answer4">
            <input type = "html" id="Question1Answer4"/>
            <br>
            <input type="button" onclick="submitForm(this.form)"; value="Save This Question">   
        </form>
*/