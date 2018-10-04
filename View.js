var testView = "sdasdsa";

function addQuestionView(amountOfQuestions){
    var quizDiv = document.getElementById("quizDiv");
    
    var form = document.createElement("form");
    form.id = amountOfQuestions;
    
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

    quizDiv.appendChild(form);
}

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

function loadUserQuiz(){
    console.log("loading user quiz");
    var amountOfQuestions = localStorage.getItem("amt"); 
    console.log("The amt is" + amountOfQuestions);
    for(var i = 0; i < amountOfQuestions; i++){
        console.log("iterating");
        var q = new Question();
        q = JSON.parse(localStorage.getItem("allQuestions"))[i];
        var last = false;; 
        if(i == amountOfQuestions -1) {
            last = true; 
        }
        addUserQuest(q, last);
        
    }
}
function addUserQuest(q, last){

    amountOfQuestions = q.id;
    var form = document.createElement("div");
    form.id = amountOfQuestions;
    //form.id = amountOfQuestions; 
    
    var uq = document.getElementById("userQuiz");
    var p  = document.createElement("h2");
    
    p.id = "Title" + q.id;
    p.appendChild(document.createTextNode("Question " + q.id))
    
    form.appendChild(p);

    var br = document.createElement("br");
    form.appendChild(br);

    var p2 = document.createElement("h5");
    p2.appendChild(document.createTextNode("Q: " + q.questionText))
    form.appendChild(p2);

    var br = document.createElement("br");
    form.appendChild(br);

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
            //input1.appendChild(document.createTextNode(q.answer1));
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

    var br = document.createElement("br");
    form.appendChild(br);

    
    if(last) {
        var btn = document.createElement("button")
        btn.setAttribute("type", 'button');
        btn.setAttribute('onclick', 'checkAnswers()');
        btn.setAttribute('value', "SUBMIT ANSWERS")
        btn.setAttribute("class", "btn btn-success")
        btn.innerHTML = "Check Answers"
        form.appendChild(btn);
    }

    document.getElementById("userForm").appendChild(form);
}

function finalResultsView(score, totalAnswers, incorrectAnswers, correctedAnswers, incorrectAnswerValues, correctedAnswerValues, incorrectQuestionNumbers){
   

    var uq = document.getElementById('userQuiz');
    document.getElementById('userForm').remove();
    
    var h1 = document.createElement('h1');
    var tn = document.createTextNode('Your Final Score Is: ' + score + " out of " + totalAnswers);
    h1.appendChild(tn);
    uq.appendChild(h1);

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

function finalSaveView(){
    document.getElementById('errorDiv').setAttribute("class", "bg-success");
    document.getElementById('errorDiv').innerHTML = "The Quiz Was Made!";
    document.getElementById('quizDiv').remove();
    document.getElementById('btnAdd').remove();
    document.getElementById('btnSave').remove();

    //take quiz
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

function takeQuiz(){
    window.location = "user.html";
}

function writeNewQuiz(){
    localStorage.clear();
    window.location.reload();
}

function writeNewQuizUser(){
    localStorage.clear();
    window.location = "admin.html";
}


function addSavedQuestionView(id){
    document.getElementById(id).setAttribute("class", "p-3 mb-2 bg-success text-white");
}

function writeToErrorDiv(message){
    document.getElementById('errorDiv').innerHTML = message;
}

function clearErrorDiv(){
    document.getElementById('errorDiv').innerHTML ="";
}