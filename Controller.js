//Getting a quiz object
var quiz = new Quiz();

/* Adds a question to the model's list of questions */
function addQuestion(){
    if(quiz.validateAdd() == true){
        var amountOfQuestions = quiz.getamountOfQuestions();
        //quiz.savedQuestions++;
        amountOfQuestions++;
        quiz.setamountOfQuestions(amountOfQuestions);
        addQuestionView(amountOfQuestions);    
    }    
}

/* Deletes a quiz question and updates the model*/
function deleteQuestion(formElement){
    if(formElement.value =="saved"){
        quiz.savedQuestions--;
    }
    quiz.amountOfQuestions--;
    quiz.deleteQuestion(formElement.id)
}

/*Saves a question and updates the model */
function saveQuestion(formElement){
   
    var id = formElement.id;
    var difficulty;
    if(document.getElementById('Question'+ id + 'Easy').checked){
        difficulty = false;
    } else {
        difficulty = true; 
    }

   // grabbing the values to validate them and update the model 
    var questionText = document.getElementById("Question"+id+"Text").value;
    var answer1 = document.getElementById("Question"+id+"Answer"+0).value;
    var answer2 = document.getElementById("Question"+id+"Answer"+1).value;
    var answer3 = document.getElementById("Question"+id+"Answer"+2).value;
    var answer4 = document.getElementById("Question"+id+"Answer"+3).value;
    var radios = document.getElementsByName('answers'+id);

    for(var i = 0; i < radios.length; i++){
        console.log(radios[i]);
        if(radios[i].checked)
            var correctAnswer = radios[i].value;
    }

    var question = new Question(id, questionText, answer1, answer2, answer3, answer4, correctAnswer, difficulty);
    if(quiz.validateSave(question) == true){
        quiz.addQuestion(question);
    }
       
}

/* Saves all of the quiz questions*/
function saveAll(){
    console.log("the uid is " + uid)
    
    if(validateSave()== true){

     if (typeof(Storage) !== "undefined") {
         localStorage.setItem("amountOfQuestions", quiz.getamountOfQuestions());
         localStorage.setItem("allQuestions", JSON.stringify(quiz.getQuestions()));
         localStorage.setItem("amt", quiz.getamountOfQuestions());
         console.log("We are in here");
         console.log("We have stored" + localStorage.getItem("allQuestions"))        
         quiz.quizTitle = document.getElementById('QuizTitle').value;
         saved = true;
         console.log('saved' + saved)
         quiz.saveAllState();
         database.ref(uid).push(quiz);
        } else {
            alert("no local storage supported");
        // this is not supported by browser
     }

     
    
        
    }
}

/*Checks all of the answers and sees which ones have been selected */
function checkAnswers(){
    console.log("Checking answers brah");
    var counter = 0; 
   
    var pickedAnswers = new Array();
    
    $('#userForm').children('div').each(function(){
        $(this).children('input').each(function(){
            if($(this).is(":checked")) {
                var p = $(this).attr('value');
                pickedAnswers.push(p); 
        
            }
        }) 
       counter++;
    })

    parseAnswers(pickedAnswers, counter);
    
}

/* Validates the save to see if any mistakes have been made in the quiz generation */

function validateSave(){
    document.getElementById('errorDiv').innerHTML = "";
    if(quiz.savedQuestions == 0){
        document.getElementById('errorDiv').innerHTML = "You have not saved any questions!";
        return false;
    }

    if(quiz.savedQuestions < quiz.amountOfQuestions){
        document.getElementById('errorDiv').innerHTML = "You have not saved all the questions!";
        return false;
    }
    return true;
}


/* Parses all the raw answers and passes them to the view to create a results page*/
function parseAnswers(pickedAnswers, counter){
    
   var score = JSON.parse(localStorage.getItem("allQuestions")).length;
   var totalAnswers = JSON.parse(localStorage.getItem("allQuestions")).length;;
   var incorrectAnswers = new Array();
   var correctedAnswers = new Array();
   var incorrectAnswerValues = new Array();
   var correctedAnswerValues = new Array();
   var incorrectQuestionNumbers = new Array();
    
    for (var i = 0; i < counter; i++){
        console.log("checking for " + JSON.parse(localStorage.getItem("allQuestions"))[i].correctAnswer);
        if(pickedAnswers[i] == JSON.parse(localStorage.getItem("allQuestions"))[i].correctAnswer){
            console.log("got a match");
        } else {
            console.log("no match");
            incorrectAnswers.push(pickedAnswers[i]);
            incorrectAnswerValues.push(document.getElementById(pickedAnswers[i]).innerHTML)
            correctedAnswers.push(JSON.parse(localStorage.getItem("allQuestions"))[i].correctAnswer);
            correctedAnswerValues.push(document.getElementById(JSON.parse(localStorage.getItem("allQuestions"))[i].correctAnswer).innerHTML)
            incorrectQuestionNumbers.push(i + 1);
            score--;
        }
    }

    quiz.storeAnwsers(score, totalAnswers, incorrectAnswers, correctedAnswers, incorrectAnswerValues, correctedAnswerValues, incorrectQuestionNumbers);
}

/* Signs up a new user */
function createNewUser(){
    var email = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        console.log("in this function?");
        var errorCode = error.code;
        var errorMessage = error.message;
        
        if(errorCode == "auth/invalid-email"){
            document.getElementById("errorDiv").innerHTML = "Your email address is invalid bro"; 
        } else{
            window.location.replace("options.html");
        }

        console.log(errorMessage)
      });
}

/* Logs in a user and updates model and view*/
function login(){
    var email = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;
     var error = true;

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
      window.location.replace('options.html')
      }).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById('errorDiv').innerHTML = errorMessage;  
    });
}

/* redirects to admin page */
function redirectAdmin(){
    window.location.replace("admin.html");
}


/* Updates user info*/
function getQuizzes(uid){
    var ref = firebase.database().ref(uid);
    ref.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
           var thisQ = childSnapshot.val();
          var key = childSnapshot.key;
          populateUserQuizzesView(thisQ, key);
         
        });
    });
}

/* populate view with guesses*/
function populateUserQuizzesView(thisQ, key){
    
    var uq = document.getElementById('yourQuizzes');
    var quizTitle = document.createElement('button');
    quizTitle.id = uid + "/" + key;
    quizTitle.setAttribute('onclick', "redirectToQuiz(this.id)")
    quizTitle.setAttribute('class', 'btn btn-primary')
    quizTitle.innerHTML =  thisQ.quizTitle;
    uq.appendChild(quizTitle);

    var quizDelete = document.createElement('button');
    quizDelete.id = uid + "/" + key;
    quizDelete.setAttribute('onclick', 'deleteQuiz(this.id)')
    quizDelete.setAttribute('class', 'btn btn-danger')
    quizDelete.innerHTML = "X";
    console.log('quiz delete butting about to be added')
    console.log(quizDelete);
    uq.appendChild(quizDelete);

    uq.appendChild(document.createElement('br'))
    uq.appendChild(document.createElement('br'))
}

/* Redirect To User Quiz*/
function redirectToQuiz(id){
    console.log('id is ' + id)
    window.location = "user.php?quizID=" + id;
}

/* Redirect to index*/
function redirectToIndex(){
    window.location = "index.html";
}

/* Populate page with specific quizes*/
function loadQuiz(id){
    console.log('loading quiz')
    var quiz;
    var amountOfQuestions;
    var questions;
    var ref = firebase.database().ref(id);
    ref.once('value', function(snapshot) {
        quiz = snapshot.val();
        localStorage.setItem("quizTitle", quiz.quizTitle);
        localStorage.setItem("amountOfQuestions", quiz.amountOfQuestions);
        localStorage.setItem("allQuestions", JSON.stringify(quiz.questions));
        localStorage.setItem("amt", quiz.amountOfQuestions);
        loadUserQuiz();
    });
    
}


 /* Logs out a user */
 function logoutUser(){
    firebase.auth().signOut();
    window.location.replace('index.html')

 }

 /*Deletes a whole quiz on click */
 function deleteQuiz(id){
    var ref = firebase.database().ref(id).remove();
    window.location.reload();
 }

  /* Checks if a user is logged in, modifies view accordingly*/
function checkLogin(dummy){
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            getQuizzes(user.uid)

        } else {
            checkLoginView()
        }
    });
 }

 /* Display Logout if Necessary*/
function displayLogout(dummy){
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            updateLogoutView()
        } else {
            
        }
    });
 }






