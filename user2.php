
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://www.gstatic.com/firebasejs/5.5.3/firebase.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="secretScripts.js"></script>
    <script>
          firebaseInit();
    </script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">    
    <script src = "View.js" defer></script>
    <script src = "Model.js" defer></script>
    <script src = "Controller.js" defer></script>
</head>
<body onload="loadQuiz('<?php echo $_GET['quizID']?>')" >
    <div class="row">
            <div class="col-sm-4"></div>
            <div class="col-sm-4">
                    <h1>!!!Quiz!!!</h1>
                    <div id="userQuiz">
                        <form id="userForm">
        
                        </form>    
                    </div>
            </div>
            <div class="col-sm-4"></div>
          </div>
</body>
</html>

