//Gets the database
var database =  firebase.database();
//The user ID
var uid;

/* set auth data on login */
firebase.auth().onAuthStateChanged(function(user) {
    console.log("auth state has changed")
    if (user) {
        // set UID
      uid = user.uid;
      user = new User();
    } else {
     // do nothing
    }
});

/*Defines a user class which holds data specific to the current user*/
class User {


    constructor(){

        console.log("creating a user")
  
        var ref = firebase.database().ref(uid+ "/totalCorrectAnswers");
        ref.once('value', function(snapshot) {
            console.log("the values: " + snapshot.val())
        });

        var ref = firebase.database().ref(uid+ "/totalWrongAnswers");
        ref.once('value', function(snapshot) {
            console.log("the values: " + snapshot.val())
        });

        var ref = firebase.database().ref(uid+ "/quizzesTaken");
        ref.once('value', function(snapshot) {
            console.log("the values: " + snapshot.val())
        });

        
    }

    incrementQuizzesTaken(value){
        console.log("in inc quizzes")
        firebase.database().ref(uid+"DATA").set({quizzesTaken: value})  
    }

    storeAnwsers(score, totalAnswers){

        /*
        var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
        starCountRef.on('value', function(snapshot) {
        updateStarCount(postElement, snapshot.val());
        });
        */

       var totalCorrectAnswers =  score;
       var totalWrongAnswers = (totalAnswers - score);
       

        firebase.database().ref(uid+"DATA/quizzesTaken").once('value', function(snapshot)
        {
            console.log("checking quizzes taken")
            //console.log(snapshot.val())
            if(snapshot.exists()) {
                var newValue = snapshot.val() + 1;
                firebase.database().ref(uid+"DATA").update({quizzesTaken: newValue})     
            } else {
                firebase.database().ref(uid+"DATA").update({quizzesTaken: 1})
                
            }
        })

        
        firebase.database().ref(uid+"DATA/totalCorrectAnswers").once('value', function(snapshot)
        {
            console.log("checking quizzes taken")
            //console.log(snapshot.val())
            if(snapshot.exists()) {
                var newValue = snapshot.val() + totalCorrectAnswers;
                firebase.database().ref(uid+"DATA").update({totalCorrectAnswers: newValue})     
            } else {
                firebase.database().ref(uid+"DATA").update({totalCorrectAnswers: totalCorrectAnswers})
                
            }
        })

        
        firebase.database().ref(uid+"DATA/totalWrongAnswers").once('value', function(snapshot)
        {
            console.log("checking quizzes taken")
            //console.log(snapshot.val())
            if(snapshot.exists()) {
                var newValue = snapshot.val() + totalWrongAnswers;
                firebase.database().ref(uid+"DATA").update({totalWrongAnswers: newValue})     
            } else {
                firebase.database().ref(uid+"DATA").update({totalWrongAnswers: totalWrongAnswers})
                
            }
        })
        
    }

    
}


/*Defines quiz class which holds all the data of the quiz */
class Quiz{
    constructor(){
        console.log("creating a quiz")
        this.amountOfQuestions = 1;
        this.savedQuestions = 0;
        this.questions = new Array();
        this.quizTitle = "";
        
    }
    
    getQuizTitle(){
        return this.quizTitle;
    }

    setQuizTitle(quizTitle){
        this.quizTitle = this.quizTitle;
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
    /*BUG
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
*/
    addQuestion(question){
        this.questions.push(question)
        this.savedQuestions++;
        
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
            console.log('the amt of questions is ' + this.amountOfQuestions)
            console.log('the saved questions are ' + this.savedQuestions)
            return false;
        }
        
      

        return true;
    }
}

/* Defines a question class */
class Question{
        constructor(id, questionText, answer1, answer2, answer3, answer4, correctAnswer, difficulty){
        this.id = id;
        this.questionText = questionText;
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
        this.answer4 = answer4;
        this.correctAnswer = correctAnswer;
        this.difficulty = difficulty;
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


function test() { console.log('in test')}
