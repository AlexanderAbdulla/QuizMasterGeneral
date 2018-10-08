function firebaseInit(){
  console.log('initializing firebase')
var config = {
    apiKey: "AIzaSyDPCh9u8HSnDLoHhrtQ_5yKh5k9L35mcB8",
    authDomain: "nuggettracker-ee311.firebaseapp.com",
    databaseURL: "https://nuggettracker-ee311.firebaseio.com",
    projectId: "nuggettracker-ee311",
    storageBucket: "nuggettracker-ee311.appspot.com",
    messagingSenderId: "755504230364"
  };
  firebase.initializeApp(config);
}

function loadOptions(){
  console.log('test')
}