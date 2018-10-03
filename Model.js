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
        var found; 
        // question id is 1
        // but we have 0 saved questions
        
        // question id is 2 
        // we have 1 saved question
      //  console.log("id" + question.id)
        //console.log("sq"+this.savedQuestions)

        if(this.savedQuestions < question.id) {
            this.questions.push(question)
            this.savedQuestions++;
        }
        this.getQuestions();
    }

    getQuestions(id){
        for(var i = 0; i < this.questions.length; i++)
        {
            console.log(this.questions[i].getquestionText());
        }
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