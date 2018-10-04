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
    }

    getQuestions(){
        for(var i = 0; i < this.questions.length; i++)
        {
            //console.log(this.questions[i]);
        }
        return this.questions;
    }

    deleteQuestion(id){
        deleteQuestionView(id);
       // this.questions.splice(id -1, 1);
    }

    storeAnwsers(score, totalAnswers, incorrectAnswers, correctedAnswers, incorrectAnswerValues, correctedAnswerValues, incorrectQuestionNumbers){
        finalResultsView(score, totalAnswers, incorrectAnswers, correctedAnswers, incorrectAnswerValues, correctedAnswerValues, incorrectQuestionNumbers);
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

class QuizAnswers {

    constructor(score, totalAnswers, incorrectAnswers, correctedAnswers, incorrectAnswerValues, correctedAnswerValues, incorrectQuestionNumbers){
        this.score = score;
        this.totalAnswers = totalAnswers;
        this.incorrectAnswers = incorrectAnswers;
        this.correctedAnswers = correctedAnswers;
        this.incorrectAnswerValues = incorrectAnswerValues;
        this.correctedAnswerValues = correctedAnswerValues;
        this.incorrectQuestionNumbers = incorrectQuestionNumbers;
    }

    printQuizAnswers(){
        for (var i = 0; i < incorrectAnswers.length; i++){
            console.log("Mistake at Question" + incorrectQuestionNumbers[i])
            console.log("The incorrect answer was: " + incorrectAnswers[i]);
            console.log("The incorrect answer value was: " + incorrectAnswerValues[i]);
            console.log("The correct answer was " + correctedAnswers[i]);
            console.log("The correct answer value was: " + correctedAnswerValues[i]);
        }
    }
 
}

function testFx(){
    console.log("hiwoayah")
}