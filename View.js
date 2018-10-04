/* Adds questions to the admin view */
function addQuestionView(amountOfQuestions){
    var quizDiv = document.getElementById("quizDiv");
    
    var form = document.createElement("form");
    form.id = amountOfQuestions;

    addHeadersToQV(form, amountOfQuestions);
    addRadioToQV(form, amountOfQuestions);
    addBtnsToQv(form, amountOfQuestions);
    quizDiv.appendChild(form);
}

/* Add radio buttons to the question view*/
function addBtnsToQv(form, amountOfQuestions){
    var br = document.createElement("br");
    form.appendChild(br);    

    var btn = document.createElement("INPUT");
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'btn btn-success')
    btn.setAttribute('onclick', 'saveQuestion(this.form)');
    btn.setAttribute('value', 'Save')
    btn.style.marginRight = "5px";
    form.appendChild(btn);


    var btn = document.createElement("INPUT");
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'btn btn-danger')
    btn.setAttribute('onclick', 'deleteQuestion(this.form)');
    btn.setAttribute('value', 'Delete')
    form.appendChild(btn);
}

/* Adds radio buttons to the question view */
function addRadioToQV(form, amountOfQuestions){
    for (i = 0; i <4; i++){ 
        var radiobtn = document.createElement("INPUT");
        radiobtn.id = "Question"+amountOfQuestions+"Radio"+i;
        radiobtn.setAttribute('type', 'radio');
        radiobtn.setAttribute('value', 'Question'+amountOfQuestions+'Answer'+i)
        radiobtn.setAttribute('name','answers'+amountOfQuestions)
        if(i ==0){
            radiobtn.setAttribute('checked', 'checked')
        }
        form.appendChild(radiobtn);

        var input1 = document.createElement("INPUT");
        input1.id = "Question"+amountOfQuestions+"Answer"+i;
        input1.setAttribute("type", "html")
        form.appendChild(input1);
        var br = document.createElement("br");
        form.appendChild(br);
    }
}

/* Adds headers to the question view*/
function addHeadersToQV(form, amountOfQuestions){
    var br = document.createElement("br");
    form.appendChild(br);
    
    var p = document.createElement("h2");
    p.id = "Title"+amountOfQuestions;
    var text = document.createTextNode("Question "+amountOfQuestions);
    p.appendChild(text);
    form.appendChild(p);

    var br = document.createElement("br");
    form.appendChild(br);
    
    var textarea = document.createElement("textarea");
    textarea.setAttribute('value', 'Your question goes here');
    textarea.id = "Question"+amountOfQuestions+"Text";
    textarea.style.resize = "none";
    form.appendChild(textarea);

    var br = document.createElement("br");
    form.appendChild(br);
    var br = document.createElement("br");
    form.appendChild(br);
}


/* Deletes a question view by its id*/
function deleteQuestionView(id){
    console.log("deleting" + id);
    var deletedEl = document.getElementById(id);
    deletedEl.parentNode.removeChild(deletedEl);
    var counter = 1;

     $('#quizDiv').children('form').each(function () {
        $(this).attr("id", counter);
        $(this).find("p").html("Question " + counter);
        $(this).find("p").attr("id", "Title"+counter);
        $(this).find("textarea").attr("id", "Question"+counter+"Text")
        var radioCounter = 0;
        $(this).children('input').each(function (){
             if($(this).attr("type") == "radio"){
                console.log("adjusting radio")
                $(this).attr("value", "Question"+counter+"Answer"+ radioCounter) 
                $(this).attr("id", "Question"+counter+"Radio"+radioCounter)   
            } else {
               console.log("regular input");
               $(this).attr("id", "Question"+counter+"Answer"+radioCounter)
            }
        })
        counter++;
    });
}

/*Loads the user quiz into the view */
function loadUserQuiz(){
    var amountOfQuestions = localStorage.getItem("amt"); 
    for(var i = 0; i < amountOfQuestions; i++){
        var q = new Question();
        q = JSON.parse(localStorage.getItem("allQuestions"))[i];
        console.log(q)
        var last = false;; 
        if(i == amountOfQuestions -1) {
            last = true; 
        }
        //console.log(q);
        addUserQuest(q, last);
        
    }
}

/* Redirects the view to the user page after results*/
function takeQuiz(){
    window.location = "user.html";
}

/* Redirects the view to a fresh quiz and resets the storage*/
function writeNewQuiz(){
    localStorage.clear();
    window.location.reload();
}

/* Lets us a write a new quiz from the user page*/
function writeNewQuizUser(){
    localStorage.clear();
    window.location = "admin.html";
}

/* Adds a saved question view*/
function addSavedQuestionView(id){
    document.getElementById(id).setAttribute("class", "p-3 mb-2 bg-success text-white");
}

/* Writes a message to the error div*/
function writeToErrorDiv(message){
    document.getElementById('errorDiv').innerHTML = message;
}

/* Clears the error div*/
function clearErrorDiv(){
    document.getElementById('errorDiv').innerHTML ="";
}

/* Adds all the questions written by the user to user.html*/
function addUserQuest(q, last){

    amountOfQuestions = q.id;
    var form = document.createElement("div");
    form.id = amountOfQuestions;
    
    var uq = document.getElementById("userQuiz");
    var p  = document.createElement("h2");
    
    p.id = "Title" + q.id;
    p.appendChild(document.createTextNode("Question " + q.id))
    
    form.appendChild(p);

    addBr(form);

    var p2 = document.createElement("h5");
    p2.appendChild(document.createTextNode("Q: " + q.questionText))
    form.appendChild(p2);

    addBr(form);
 
    addRadioToRv(form, amountOfQuestions, q);
    addBr(form);
    var br = document.createElement("br");
    form.appendChild(br);

    checkIfLast(form, last);
    document.getElementById("userForm").appendChild(form);
}

/* Adds a br*/
function addBr(form){
    var br = document.createElement("br");
    form.appendChild(br);
}

/*Checks if this is the last question in the view and responds with adding buttons*/
function checkIfLast(form, last){
    if(last) {
        var btn = document.createElement("button")
        btn.setAttribute("type", 'button');
        btn.setAttribute('onclick', 'checkAnswers()');
        btn.setAttribute('value', "SUBMIT ANSWERS")
        btn.setAttribute("class", "btn btn-success")
        btn.innerHTML = "Check Answers"
        form.appendChild(btn);
    }
}

/* Adds the radio buttons to the results*/
function addRadioToRv(form, amountOfQuestions, q){
    for (i = 0; i <4; i++){ 
        var radiobtn = document.createElement("INPUT");
        radiobtn.id = "Question"+amountOfQuestions+"Radio"+i;
        radiobtn.setAttribute('type', 'radio');
        radiobtn.setAttribute('value', 'Question'+amountOfQuestions+'Answer'+i)
        radiobtn.setAttribute('name','answers'+amountOfQuestions)
        radiobtn.style.textAlign = "left"
        
        if(i ==0){
            radiobtn.setAttribute('checked', 'checked')
        }
        form.appendChild(radiobtn);

        var input1 = document.createElement("label");
        input1.id = "Question"+amountOfQuestions+"Answer"+i;
        if( i == 0){
            input1.innerHTML = q.answer1;
        } else if (i == 1){
            input1.innerHTML = q.answer2;
        } else if (i == 2){
            input1.innerHTML = q.answer3;
        } else if (i == 3){
            input1.innerHTML = q.answer4;
        }
        form.appendChild(input1);
        var br = document.createElement("br");
        form.appendChild(br);
        document.getElementById("userForm").appendChild(form);
    }
}
/* Displays the final results view*/
function finalResultsView(score, totalAnswers, incorrectAnswers, correctedAnswers, incorrectAnswerValues, correctedAnswerValues, incorrectQuestionNumbers){
   
    var uq = document.getElementById('userQuiz');
    document.getElementById('userForm').remove();
    
    var h1 = document.createElement('h1');
    var tn = document.createTextNode('Your Final Score Is: ' + score + " out of " + totalAnswers);
    h1.appendChild(tn);
    uq.appendChild(h1);

    addDetailsToRv(uq, incorrectAnswers, incorrectQuestionNumbers, incorrectAnswerValues, correctedAnswerValues);
    addBtnToRv(uq);
}

/* Adds details to the results view*/
function addDetailsToRv(uq, incorrectAnswers, incorrectQuestionNumbers, incorrectAnswerValues, correctedAnswerValues){
    for (var i = 0; i < incorrectAnswers.length; i++){

        var p1 = document.createElement('h3');
        var tn = document.createTextNode("There was a mistake at: Question " + incorrectQuestionNumbers[i]);
        p1.appendChild(tn);
        uq.appendChild(p1);
    
        var p1 = document.createElement('h3');
        var tn = document.createTextNode("You guessed: " + incorrectAnswerValues[i]);
        p1.appendChild(tn);
        uq.appendChild(p1);
    
        var p1 = document.createElement('h3');
        var tn = document.createTextNode("The correct answer was: " + correctedAnswerValues[i]);
        p1.appendChild(tn);
        uq.appendChild(p1);     
    }
}

/* Adds buttons to the results view */
function addBtnToRv(uq){
    var btn1 = document.createElement('button');
    btn1.setAttribute("type", "button");
    btn1.setAttribute("onclick", "takeQuiz()")
    btn1.setAttribute("class", "btn btn-warning");
    btn1.style.marginRight = "5px";
    btn1.innerHTML = "Take The Quiz Again"

    uq.appendChild(btn1);

    var btn1 = document.createElement('button');
    btn1.setAttribute("type", "button");
    btn1.setAttribute("onclick", "writeNewQuizUser()")
    btn1.setAttribute("class", "btn btn-info");
    btn1.style.marginRight = "5px";
    btn1.innerHTML = "Write A New Quiz"

    uq.appendChild(btn1);
}

/* Displays the final save view*/
function finalSaveView(){
    document.getElementById('errorDiv').setAttribute("class", "bg-success");
    document.getElementById('errorDiv').innerHTML = "The Quiz Was Made!";
    document.getElementById('quizDiv').remove();
    document.getElementById('btnAdd').remove();
    document.getElementById('btnSave').remove();

    var btn1 = document.createElement('button');
    btn1.setAttribute("type", "button");
    btn1.setAttribute("onclick", "takeQuiz()")
    btn1.setAttribute("class", "btn btn-primary")
    btn1.style.marginRight = "5px"
    btn1.innerHTML = "Take The Quiz"

    document.getElementById('centerDiv').appendChild(btn1);

    var btn1 = document.createElement('button');
    btn1.setAttribute("type", "button");
    btn1.setAttribute("onclick", "writeNewQuiz()")
    btn1.setAttribute("class", "btn btn-info")
    btn1.innerHTML = "Write A New Quiz"

    document.getElementById('centerDiv').appendChild(btn1);

}

