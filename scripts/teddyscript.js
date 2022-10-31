// function timerAttempt1() {
  // define date and variable
  var systemDate = new Date();
  // systemDate.setTime(12333);

  var deadLine = new Date();
  // Millisecond
  deadLine.setTime(-57600000);
  
  var sixMinutesandfiftySeconds = (10 * 60 * 1000) + (50 * 1000);
  deadLine.setTime(deadLine.getTime() + sixMinutesandfiftySeconds);
  
  document.getElementById("deadline").innerHTML = deadLine.getMinutes() + ":" + deadLine.getSeconds();
  if (deadLine.getSeconds() == 0) {
    document.getElementById("deadline").innerHTML += "0";
  }
  function countdown() {
    
    
   if (deadLine.getTime() == -57600000) {
    document.getElementById("deadline").innerHTML = "TIMER IS FINISHED, HELLO CHERYL, HELLO ARIC!";
   }
   else {
    document.getElementById("deadline").innerHTML = deadLine.getMinutes() + ":" + deadLine.getSeconds();
    if (deadLine.getSeconds() == 0) {
      document.getElementById("deadline").innerHTML += "0";
    }
    deadLine.setTime(deadLine.getTime() - 1000);
   }
  }
  
  var ex1;
  function startTimer() {
    ex1 = setInterval(countdown,0);
  }
  function stopTimer() {
    clearInterval(ex1);
  } 
  // function stopTimer() {
  // }
  // try 15min

  // var minute = Math.floor((t))
  // math floor returns round down
  // document.getElementById("clock").innerHTML = Math.floor(5);
  // document.getElementById("clock").innerHTML = systemDate.getMonth();

  // function setTimer() {

  //   var days = Math.floor(t / (1000 * 60 * 60 * 24));
  //   var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
  //   var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  //   var seconds = Math.floor((t % (1000 * 60)) / 1000);
  // }
  // one second
 
// }

// setInterval(timerAttempt1,1000);