var testView = "sdasdsa";

function addQuestionView(amountOfQuestions){
    var quizDiv = document.getElementById("quizDiv");
    
    var form = document.createElement("form");
    form.id = amountOfQuestions;
    
    var br = document.createElement("br");
    form.appendChild(br);
    
    var p = document.createElement("p");
    p.id = "Title"+amountOfQuestions;
    var text = document.createTextNode("Question "+amountOfQuestions);
    p.appendChild(text);
    form.appendChild(p);

    var br = document.createElement("br");
    form.appendChild(br);
    
    var textarea = document.createElement("textarea");
    textarea.setAttribute('value', 'Your question goes here');
    textarea.id = "Question"+amountOfQuestions+"Text";
    form.appendChild(textarea);

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

    var btn = document.createElement("INPUT");
    btn.setAttribute('type', 'button');
    btn.setAttribute('onclick', 'saveQuestion(this.form)');
    btn.setAttribute('value', 'Save This Question')
    form.appendChild(btn);

    var btn = document.createElement("INPUT");
    btn.setAttribute('type', 'button');
    btn.setAttribute('onclick', 'deleteQuestion(this.form)');
    btn.setAttribute('value', 'Delete This Question')
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
    var p  = document.createElement("p");
    
    p.id = "Title" + q.id;
    p.appendChild(document.createTextNode("Question " + q.id))
    form.appendChild(p);

    var br = document.createElement("br");
    form.appendChild(br);

    var p2 = document.createElement("p");
    form.appendChild(document.createTextNode(q.questionText))
    form.appendChild(p2);

    var br = document.createElement("br");
    form.appendChild(br);

    for (i = 0; i <4; i++){ 
        var radiobtn = document.createElement("INPUT");
        radiobtn.id = "Question"+amountOfQuestions+"Radio"+i;
        radiobtn.setAttribute('type', 'radio');
        radiobtn.setAttribute('value', 'Question'+amountOfQuestions+'Answer'+i)
        radiobtn.setAttribute('name','answers'+amountOfQuestions)
        if(i ==0){
           // radiobtn.setAttribute('checked', 'checked')
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

    
    if(last) {
        var btn = document.createElement("button")
        btn.setAttribute("type", 'button');
        btn.setAttribute('onclick', 'checkAnswers()');
        btn.setAttribute('value', "SUBMIT ANSWERS")
        btn.innerHTML = "CHECK YO SHIT"
        form.appendChild(btn);
    }

    document.getElementById("userForm").appendChild(form);
}