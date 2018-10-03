var amountOfQuestions = 1; 

function submitForm(formElement){
    var id = formElement.id;
    var x = document.getElementById("Question"+id+"Text").value;
    alert(x);
}

function addQuestion(){
    amountOfQuestions++;
    var quizDiv = document.getElementById("quizDiv");
    
    var form = document.createElement("form");
    form.id = amountOfQuestions;
    
    var br = document.createElement("br");
    form.appendChild(br);
    
    var text = document.createTextNode("Question "+amountOfQuestions);
    form.appendChild(text);

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
        radiobtn.id = "Question"+i;
        radiobtn.setAttribute('type', 'radio');
        radiobtn.setAttribute('value', 'Question'+amountOfQuestions+'Answer'+i)
        radiobtn.setAttribute('name','answers')
        form.appendChild(radiobtn);

        var input1 = document.createElement("INPUT");
        input1.id = "Question"+amountOfQuestions+"Answers"+i;
        input1.setAttribute("type", "html")
        form.appendChild(input1);
        var br = document.createElement("br");
        form.appendChild(br);
    }

    var btn = document.createElement("INPUT");
    btn.setAttribute('type', 'button');
    btn.setAttribute('onclick', 'submitForm(this.form)');
    btn.setAttribute('value', 'Save This Question')
    form.appendChild(btn);

    quizDiv.appendChild(form);
}

/*
  <form id="Question1">
            Question 1
            <br>
            <textarea id="Question1Text">Your question goes here</textarea>
            <br>
            <input type="radio" name="answers" value="Question1Answer1">
            <input type = "html" id="Question1Answer1"/>
            <br>
            <input type="radio" name="answers" value="Question1Answer2">
            <input type = "html" id="Question2Answer2"/>
            <br>
            <input type="radio" name="answers" value="Question1Answer3">
            <input type = "html" id="Question1Answer3"/>
            <br>
            <input type="radio" name="answers" value="Question1Answer4">
            <input type = "html" id="Question1Answer4"/>
            <br>
            <input type="button" onclick="submitForm(this.form)"; value="Save This Question">   
        </form>
*/