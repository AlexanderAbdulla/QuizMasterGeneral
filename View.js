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