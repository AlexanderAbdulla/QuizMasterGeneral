//Gets the database
var database =  firebase.database();

//Testing the database
//TODO remove this 
database.ref('LaunchData').set({Counter : 5});

/*Defines quiz class which holds all the data of the quiz */
class Quiz{
    constructor(){
        this.amountOfQuestions = 1;
        this.savedQuestions = 0;
        this.questions = new Array();
    }
    
    /* Returns the amount of questions */
    getamountOfQuestions(){
        return this.amountOfQuestions;
    }
    
    /* Sets the amount of questions */
    setamountOfQuestions(newAmt){
        this.amountOfQuestions = newAmt;
    }

    /* Adds a question to the view */
    addQuestion(question){
        //TODO investigate if this is where our counting error is
        if(this.savedQuestions < question.id) {
            this.questions.push(question)
            this.savedQuestions++;
        }
      
       this.getQuestions();
       clearErrorDiv();
       addSavedQuestionView(question.getid());
    }

    /* Gets an array of questions */
    getQuestions(){
        return this.questions;
    }

    /* Deletes the questiom */
    deleteQuestion(id){
        deleteQuestionView(id);
    }

    /* Stores all of the answers given in the quiz*/
    storeAnwsers(score, totalAnswers, incorrectAnswers, correctedAnswers, incorrectAnswerValues, correctedAnswerValues, incorrectQuestionNumbers){
        finalResultsView(score, totalAnswers, incorrectAnswers, correctedAnswers, incorrectAnswerValues, correctedAnswerValues, incorrectQuestionNumbers);
    }

    /* Saves all of the data of the quiz that has been taken and makes a results page*/
    saveAllState(){ 
        finalSaveView();
    }

    /* Checks all possible saving failures before submitting a quiz question*/
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

    /* Checks all possible failures before incrementing the amount of questions on the page in the view*/
    validateAdd(){
        if(this.savedQuestions < this.amountOfQuestions){
            writeToErrorDiv("Lets save before we continue, shall we?");
            return false;
        }

        return true;
    }
}

/* Defines a question class */
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

    /* Retuns the id of the question*/
    getid(){
        return this.id;
    }

    /* Returns the text of the question */
    getquestionText(){
        return this.questionText;
    }
}