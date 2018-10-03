class Quiz{
    constructor(){
        this.amountOfQuestions = 1;
    }
    
    getamountOfQuestions = function(){
        return amountOfQuestions;
    }    
}

class Question{
        constructor(){
        this.id;
        this.questionText;
        this.answer1;
        this.answer2;
        this.answer3;
        this.correctAnswer;
    }
}