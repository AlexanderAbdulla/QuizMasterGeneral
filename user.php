
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">    
    <script src="https://www.gstatic.com/firebasejs/5.5.3/firebase.js"></script>
    <script src="secretScripts.js"></script>
    <script src = "View.js" defer></script>
    <script src = "Model.js" defer></script>
    <script src = "Controller.js" defer></script>
    <script>
        firebaseInit();
    </script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body onload="loadQuiz('<?php echo $_GET['quizID']?>')" >
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">QuizMasterGeneral</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav">
                    <li class="nav-item">
                      <a class="nav-link" href="options.html">Your Quizzes</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="admin.html">Make Quiz</a>
                    </li>
                    
                  </ul>
                </div>
        </nav>  
    <div class="row">
            <div class="col-sm-4"></div>
            <div class="col-sm-4">
                    <h1 id = "quizTitle" style="text-align: center">There is no quiz loaded!</h1>
                    <div id="userQuiz">
                        <form id="userForm">
        
                        </form>    
                    </div>
            </div>
            <div class="col-sm-4"></div>
          </div>
</body>
</html>

