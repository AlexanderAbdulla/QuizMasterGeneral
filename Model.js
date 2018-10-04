var test = "hkjdas";

class Quiz{
    constructor(){
        this.amountOfQuestions = 1;
        this.savedQuestions = 0;
        this.questions = new Array();
    }
    
    getamountOfQuestions(){
        return this.amountOfQuestions;
    }
    
    setamountOfQuestions(newAmt){
        this.amountOfQuestions = newAmt;
    }

    addQuestion(question){
     

        if(this.savedQuestions < question.id) {
            this.questions.push(question)
            this.savedQuestions++;
        }
      
       this.getQuestions();
       clearErrorDiv();
       addSavedQuestionView(question.getid());
    }

    getQuestions(){
        return this.questions;
    }

    deleteQuestion(id){
        deleteQuestionView(id);
    }

    storeAnwsers(score, totalAnswers, incorrectAnswers, correctedAnswers, incorrectAnswerValues, correctedAnswerValues, incorrectQuestionNumbers){
        finalResultsView(score, totalAnswers, incorrectAnswers, correctedAnswers, incorrectAnswerValues, correctedAnswerValues, incorrectQuestionNumbers);
    }

    saveAllState(){
        finalSaveView();
    }

    validateSave(question){
        
        if (question.questionText == ""){
            writeToErrorDiv("You have no question text")
            return false;
        } 

        if (question.answer1 == ""){
            writeToErrorDiv("You are missing an answer")
            return false;
        } 

        if (question.answer2 == ""){
            writeToErrorDiv("You are missing an answer")
            return false;
        } 

        if (question.answer3 == ""){
            writeToErrorDiv("You are missing an answer")
            return false;
        } 

        if (question.answer4 == ""){
            writeToErrorDiv("You are missing an answer")
            return false;
        } 
        
        return true;
    }

    validateAdd(){
        if(this.savedQuestions < this.amountOfQuestions){
            writeToErrorDiv("Lets save before we continue, shall we?");
            return false;
        }

        return true;
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

    getid(){
        return this.id;
    }

    getquestionText(){
        return this.questionText;
    }
}