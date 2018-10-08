//Getting a quiz object
var quiz = new Quiz();
var uid;

/* set auth data on login */
//TODO put in model?
firebase.auth().onAuthStateChanged(function(user) {
    console.log("auth state has changed")
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      uid = user.uid;
      var providerData = user.providerData;
      console.log("email" + email);
     // document.getElementById("welcomeTxt").innerHTML = "Welcome " + email; 
      console.log ("uid is" + uid)

      //getQuizzes(uid);
      // ...
    } else {
      // User is signed out.
      // ...
      console.log("user is signed out??? why??");
    }
});




/*Saves a question and updates the model */
function saveQuestion(formElement){
    console.log("made it to the save fx")
    
    var id = formElement.id;

   // console.log("diff val is " + document.getElementById("Question"+id+"Difficulty").checked)
    /*
    <input id="Question1Difficulty" type = "radio" name = "Question1Difficulty" checked="checked" value="easy">
                        <label>Hard</label>
                        <input id="Question1Difficulty" type = "radio" name = "Question1Difficulty" value="hard">
    */
   var difficulty;
    if(document.getElementById('Question'+ id + 'Easy').checked){
        difficulty = false;
    } else {
        difficulty = true; 
    }

    console.log("difficulty is " + difficulty)
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

/* Deletes a question from the model's list of questions */

/*
function deleteQuestion(formElement){
    var amountOfQuestions = quiz.getamountOfQuestions();
    //BUG REMOVE BELOW
    amountOfQuestions--;
    //BUG ADD BELOW
    

    //saved qs too?
    //quiz.savedQuestions--;
    quiz.setamountOfQuestions(amountOfQuestions);
    var id = formElement.id;
    quiz.deleteQuestion(id);
}*/

//NEW
function deleteQuestion(formElement){
    if(formElement.value =="saved"){
        quiz.savedQuestions--;
    }
    quiz.amountOfQuestions--;
    quiz.deleteQuestion(formElement.id)
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
    console.log("Creating a new user...")
    console.log("the email is" + email)
    console.log("The password is" + password)
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        console.log("in this function?");
        var errorCode = error.code;
        var errorMessage = error.message;
        
        if(errorCode == "auth/invalid-email"){
            document.getElementById("errorDiv").innerHTML = "Your email address is invalid bro"; 
        } else{
           // window.location.replace("options.html");
        }

        console.log(errorMessage)
      });
}

/* Logs in a user*/

function login(){
    var email = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;
    console.log("the email is" + email)
    console.log("The password is" + password)
    var error = true;

    //  window.location.replace("options.html");

    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
        // Handle Errors here.
       
       // if(errorMessage == ""){
       // }
      //document.getElementById('errorDiv').innerHTML = errorMessage;
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

//TO DO
// ALL OF THE SHIT BELOW NEEDS TO BE MVC'D UP DAWG

  

/* updates user info*/
function getQuizzes(uid){
    console.log("getting quizzes")
    //console.log("emauk is " + email)
    console.log('uid is ' + uid);
    //user.uid 
    var ref = firebase.database().ref(uid);
    console.log(uid);
    ref.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          console.log('the key is '+ childSnapshot.key);
          //console.log('the question is' + ref.child('questions').);
         // var thisQ = new Quiz();
        // console.log("this titel is" + thisQ.quizTitle)
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
    quizTitle.innerHTML =  thisQ.quizTitle;
    uq.appendChild(quizTitle);
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
       //console.log(snapshot.val())
       quiz = snapshot.val();
        console.log(quiz.questions);
        localStorage.setItem("quizTitle", quiz.quizTitle);
        localStorage.setItem("amountOfQuestions", quiz.amountOfQuestions);
        localStorage.setItem("allQuestions", JSON.stringify(quiz.questions));
        localStorage.setItem("amt", quiz.amountOfQuestions);
        loadUserQuiz();
    });
    
    /*
    localStorage.setItem("amountOfQuestions", amountOfQuestions);
    localStorage.setItem("allQuestions", JSON.stringify(questions);
    localStorage.setItem("amt", quiz.getamountOfQuestions());
    loadUserQuiz();
    */
}


/* Checks if a user is in, modifies accordingly*/
/*
function loadOptions(dummy){
   firebase.auth().onAuthStateChanged(function(user){
        if(user){
            //do nothing
            var wt = document.getElementById('titleText');
            wt.innerHTML = "Welcome " + user.email
        } else {
            var od = document.getElementById('optionsDiv');
            od.innerHTML = "";
            var wt = document.getElementById('titleText');
            wt.innerHTML = "Welcome Guest! Login To Access Quizzes";
            var lb = document.createElement('button');
            lb.setAttribute('class', "btn btn-success");
            lb.innerHTML = "Login"
            lb.setAttribute('onclick', 'redirectToIndex()')
            od.appendChild(lb)
        }
    });
}
*/

/* Checks if a user is in, modifies accordingly*/
 function checkLogin(dummy){
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
                console.log("the user is logged in at " + user.email)
                console.log ("uid is" + user.uid)
                getQuizzes(user.uid)
            
             //  var wt = document.getElementById('titleText');
               //wt.innerHTML = "Welcome " + user.email

        } else {
            var od = document.getElementById('loggedInDiv');
            od.innerHTML = "";
            if(document.getElementById('btnAdd')){
                document.getElementById('btnAdd').remove();
                document.getElementById('btnSave').remove();  
            } 
         
            var wt = document.getElementById('titleText');
            wt.innerHTML = "Welcome Guest! Please Login!!";
            var lb = document.createElement('button');
            lb.setAttribute('class', "btn btn-success");
            lb.innerHTML = "Login"
            lb.setAttribute('onclick', 'redirectToIndex()')
            od.appendChild(lb)
        }
    });
 }

 /* Display Logout if Necessary*/
 function displayLogout(dummy){
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            document.getElementById('loggedInDiv').innerHTML = ""
            var btn = document.createElement('button')
            btn.setAttribute('onclick', 'logoutUser()')
            btn.setAttribute('class', 'btn btn-danger')
            btn.innerHTML = "Logout"
            document.getElementById('loggedInDiv').appendChild(btn)
        } else {
            
        }
    });
 }

 /* Logs out a user */
 function logoutUser(){
    firebase.auth().signOut();
    window.location.replace('index.html')

 }







