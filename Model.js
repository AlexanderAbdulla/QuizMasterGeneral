var test = "hkjdas";

class Quiz{
    constructor(){
        this.amountOfQuestions = 1;
        this.questions = new Array();
    }
    
    getamountOfQuestions(){
        return this.amountOfQuestions;
    }
    
    setamountOfQuestions(newAmt){
        this.amountOfQuestions = newAmt;
    }

    addQuestion(question){
        this.questions.push(question);
        alert("the test is" + question.questionText);
    }
}

class Question{
        constructor(id, questionText, answer1, answer2, answer3, answer4, correctAnswer){
        this.id = id;
        this.questionText = questionText;
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
        this.answer4 = answer4;
        this.correctAnswer = correctAnswer;
    }
}