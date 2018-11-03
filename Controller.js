/* Creates a quiz and user object */
var quiz = new Quiz();
var thisUser = new User();

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
function saveQuestion(formElement, btnElement){
   
    var id = formElement.id;
    var difficulty;
    if(document.getElementById('Question'+ id + 'Easy').checked){
        difficulty = false;
    } else {
        difficulty = true; 
    }

    var questionText = document.getElementById("Question"+id+"Text").value;
    var answer1 = document.getElementById("Question"+id+"Answer"+0).value;
    var answer2 = document.getElementById("Question"+id+"Answer"+1).value;
    var answer3 = document.getElementById("Question"+id+"Answer"+2).value;
    var answer4 = document.getElementById("Question"+id+"Answer"+3).value;
    var radios = document.getElementsByName('answers'+id);

    for(var i = 0; i < radios.length; i++){
        if(radios[i].checked)
            var correctAnswer = radios[i].value;
    }

    var question = new Question(id, questionText, answer1, answer2, answer3, answer4, correctAnswer, difficulty);
    if(quiz.validateSave(question) == true){
        quiz.addQuestion(question);
        document.getElementById(btnElement.id).disabled = true;
    }
       
}

/* Saves all of the quiz questions*/
function saveAll(){
    
    if(validateSave()== true){

     if (typeof(Storage) !== "undefined") {
         localStorage.setItem("amountOfQuestions", quiz.getamountOfQuestions());
         localStorage.setItem("allQuestions", JSON.stringify(quiz.getQuestions()));
         localStorage.setItem("amt", quiz.getamountOfQuestions());
         quiz.quizTitle = document.getElementById('QuizTitle').value;
         saved = true;
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
      if(pickedAnswers[i] == JSON.parse(localStorage.getItem("allQuestions"))[i].correctAnswer){
        } else {
           incorrectAnswers.push(pickedAnswers[i]);
            incorrectAnswerValues.push(document.getElementById(pickedAnswers[i]).innerHTML)
            correctedAnswers.push(JSON.parse(localStorage.getItem("allQuestions"))[i].correctAnswer);
            correctedAnswerValues.push(document.getElementById(JSON.parse(localStorage.getItem("allQuestions"))[i].correctAnswer).innerHTML)
            incorrectQuestionNumbers.push(i + 1);
            score--;
        }
    }
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            thisUser.storeAnwsers(score, totalAnswers);
        } 
    });
  
    quiz.storeAnwsers(score, totalAnswers, incorrectAnswers, correctedAnswers, incorrectAnswerValues, correctedAnswerValues, incorrectQuestionNumbers);
}

/* Signs up a new user */
function createNewUser(){
    var email = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        
        if(errorMessage != null){
            document.getElementById("errorDiv").innerHTML = errorMessage; 
        } else{
            window.location.replace("options.html");
        }

        
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


/* Gets the leaderboard information from firebase */
function getLeaderboard(uid){
    var ref = firebase.database().ref('userStats').orderByChild('quizzesTaken').limitToLast(5);
    ref.on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            console.log("value " + childSnapshot.key)
            var x = document.createElement('p')
            var val = Math.abs(childSnapshot.child('quizzesTaken').val());
            
            x.innerHTML = "USER: " + childSnapshot.child('username').val() + " QUIZZES TAKEN: " + val;
            document.getElementById('topQuizTakers').appendChild(x)
        })
    })

    var ref = firebase.database().ref('userStats').orderByChild('totalCorrectAnswers').limitToLast(5);
    ref.on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            console.log("value " + childSnapshot.key)
            var x = document.createElement('p')
            x.innerHTML = "USER: " + childSnapshot.child('username').val() + " CORRECT ANSWERS: " + Math.abs(childSnapshot.child('totalCorrectAnswers').val());
            document.getElementById('topScorers').appendChild(x)
        })
    })
}

/* Updates user ranking */
function getRanking(uid){
    var ref = firebase.database().ref("userStats/"+uid)
    var counter = 0;
    var quizzesTaken = 0;
    var totalCorrectAnswers = 0;
    var totalWrongAnswers = 0;

    ref.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            console.log("values " + childSnapshot.val())
            if(counter == 0) {
                quizzesTaken = childSnapshot.val();
                if(isNaN(quizzesTaken)){
                    quizzesTaken = 0;
                }

            } else if(counter == 1){
                totalCorrectAnswers = childSnapshot.val();
                if(isNaN(totalCorrectAnswers)){
                    totalCorrectAnswers = 0;
                }
            } else if(counter == 2) {
                totalWrongAnswers = childSnapshot.val();
                if(isNaN(totalWrongAnswers)){
                    totalWrongAnswers = 0;
                }
            }
            counter++;
        });

        
        populateRanking(Math.abs(quizzesTaken), Math.abs(totalCorrectAnswers), Math.abs(totalWrongAnswers));
    });

}



/* populateRanking */
function populateRanking(quizzesTaken, totalCorrectAnswers, totalWrongAnswers){
    console.log("total correct " + totalCorrectAnswers);
    console.log("total wrong " + totalWrongAnswers);
    var avgScore = ((totalCorrectAnswers/(totalCorrectAnswers + totalWrongAnswers))*100).toFixed(2);
    if(isNaN(avgScore)){
        avgScore = 0
    }
    document.getElementById('quizzesTaken').innerHTML = "Quizzes Taken: " + quizzesTaken;
    document.getElementById('totalCorrectAnswers').innerHTML = "Total Answers Correct: " + totalCorrectAnswers;
    document.getElementById('totalWrongAnswers').innerHTML = "Total Answers Wrong: " + totalWrongAnswers;
    document.getElementById('averageScore').innerHTML = "Average Score: " + avgScore + "%";

}

/* populate view with quizzes*/
function populateUserQuizzesView(thisQ, key){
    
    var uq = document.getElementById('yourQuizzes');
    var quizTitle = document.createElement('button');
    quizTitle.id = uid + "/" + key;
    quizTitle.setAttribute('onclick', "redirectToQuiz(this.id)")
    quizTitle.setAttribute('class', 'btn btn-primary')
    quizTitle.innerHTML =  thisQ.quizTitle;
    uq.appendChild(quizTitle);
    uq.appendChild(document.createElement('br'))

    var quizDelete = document.createElement('button');
    quizDelete.id = uid + "/" + key;
    quizDelete.setAttribute('onclick', 'deleteQuiz(this.id)')
    quizDelete.setAttribute('class', 'btn btn-danger')
    quizDelete.innerHTML = "X";
    uq.appendChild(quizDelete);

    var quizShare = document.createElement('button')
    quizShare.id = uid + "/" + key;
    quizShare.setAttribute('class', 'btn btn-warning')
    quizShare.onclick = function(){
        modal.style.display="block"
    }
    quizShare.innerHTML = "Share"
    
    var modal = document.getElementById('myModal')
    var span = document.getElementsByClassName("close")[0]
    
    document.getElementById('modalText').value = "https://quizmastergeneral.azurewebsites.net/user.php?quizID=" + uid+"/"+key

    span.onclick = function(){
        modal.style.display="none";
    }
    window.onclick =function(event){
        if (event.target == modal){
            modal.style.display="none"
        }
    }   

    uq.appendChild(quizShare);
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
            if(dummy == 3)
            {
                getRanking(user.uid)
            } else if(dummy == 4){
                getLeaderboard(user.uid)
            } else {
                getQuizzes(user.uid)
            }
        } else {
            checkLoginView()
        }
    });
 }

 /* Display Logout if Necessary*/
function displayLogout(dummy){
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            updateLogoutView(user.email)
        } else {
            
        }
    });
 }






