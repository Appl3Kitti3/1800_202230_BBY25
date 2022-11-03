// function timerAttempt1() {
  // define date and variable
  // var systemDate = new Date();
  // systemDate.setTime(12333);
  var deadLine = new Date(), deadLine1 = new Date(), deadLine2 = new Date(), deadLine3 = new Date();
  setUp();

  // right i forgot bout that works...
  document.getElementById("deadline0").innerHTML = 
  "<input type='text' maxlength=2 pattern='[0-9]' placeholder='h' id='hour' class='measurement'>" 
  + "<input type='text' maxlength=2 pattern='[0-9]' placeholder='m' id='minute' class='measurement'>"
  + "<input type='text' maxlength=2 pattern='[0-9]' placeholder='s' id='second' class='measurement'>";
  
  function lol(tv) {
    console.log(tv);
  }
  document.getElementById("hour","minute","second").onchange = function() {let e = this.value; lol(e);};
  // document.getElementById("minute").onchange = function() {let b = this.value; lol(b);};
  // document.getElementById("second").onchange = function() {let c = this.value; lol(c);};

  // ("#hour").on("change", function() {let e = this.value; lol(e);});
  // ("#minute").on("change", function() {let e = this.value; lol(e);});
  // ("#second").on("change", function() {let e = this.value; lol(e);});

  function setUp() {
    var List = [deadLine,deadLine1,deadLine2,deadLine3];
    // var deadLine1 = new Date();
    // var deadLine2 = new Date();
    // var deadLine3 = new Date();
    for (var i = 0; i < List.length; i++) {
      List[i].setTime(-57600000);
    }
    
    // Millisecond
    
    var sixMinutesandfiftySeconds = (10 * 60 * 1000) + (10 * 1000);
    var teste = (12 * 60 * 1000) + (5 * 1000);
    var testTimer2 = (6 * 60 * 1000) + (15 * 1000);
    var testTimer3 = (1 * 60 * 1000) + (9 * 1000);
  
    // Testers
    deadLine.setTime(deadLine.getTime() + sixMinutesandfiftySeconds);
    deadLine1.setTime(deadLine1.getTime() + teste);
    deadLine2.setTime(deadLine2.getTime() + testTimer2);
    deadLine3.setTime(deadLine3.getTime() + testTimer3);
    
    for (var i = 0; i < List.length; i++) {
        // learn about Method chaining~
      document.getElementById("deadline" + i).innerHTML = List[i].getMinutes() + ":" + List[i].getSeconds();
      updateName("deadline" + i,List[i]);
    }
  }
  
  function countdown1(time,elementId) {
    console.log("Hi");
    document.getElementById(elementId).innerHTML = "TIMER IS FINISHED, HELLO CHERYL, HELLO ARIC!";
  }

  function updateName(id,timer) {
    if (timer.getSeconds() < 10) {
      document.getElementById(id).innerHTML = timer.getMinutes() + ":" + 0 + timer.getSeconds();
    }
  }

  function loop(id,timer) {
    timer.setTime(timer.getTime() - 1000);
    document.getElementById(id).innerHTML = timer.getMinutes() + ":" + timer.getSeconds();
    updateName(id,timer);
    if (timer.getTime() == -57600000) {
      alert("A timer is finished!");
      stopTimer(id);
    }
  }
  
  var ex1,ex2,ex3,ex4;
  const delay = 0;

  function startTimer(id) {
    switch (id) {
      case "deadline0":
        console.log("DeadLine 0 is at go");


        ex1 = setInterval(loop,delay,id,deadLine);
      break;
      case "deadline1":
        console.log("DeadLine 1 is at go");
        ex2 = setInterval(loop,delay,id,deadLine1);
        break;
      case "deadline2":
        console.log("DeadLine 2 is at go");
        ex3 = setInterval(loop,delay,id,deadLine2);
        break;
      case "deadline3":
        console.log("DeadLine 3 is at go");
        ex4 = setInterval(loop,delay,id,deadLine3);
      break;
    }
  }
  function stopTimer(id) {
    switch (id) {
      case "deadline0":
        clearInterval(ex1);
      break;
      case "deadline1":
        clearInterval(ex2);
      break;
      case "deadline2":
        clearInterval(ex3);
      break;
      case "deadline3":
        clearInterval(ex4);
      break;
    }
  }

    
  
  