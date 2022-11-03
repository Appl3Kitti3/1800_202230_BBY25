  var deadLine = new Date(), deadLine1 = new Date(), deadLine2 = new Date(), deadLine3 = new Date();

  var List = [deadLine,deadLine1,deadLine2,deadLine3];
  // var deadLine1 = new Date();
  // var deadLine2 = new Date();
  // var deadLine3 = new Date();
  for (var i = 0; i < List.length; i++) {
    List[i].setHours(0);
    List[i].setMinutes(0);
    List[i].setSeconds(0);
  }
  
  // Millisecond
  // Have a CSV or text file to save time results or initalize it to 00:00:00
  // var sixMinutesandfiftySeconds = (10 * 60 * 1000) + (10 * 1000);
  // var teste = (12 * 60 * 1000) + (5 * 1000);
  // var testTimer2 = (6 * 60 * 1000) + (15 * 1000);
  // var testTimer3 = (1 * 60 * 1000) + (9 * 1000);

  // Testers
  deadLine.setTime(deadLine.getTime());
  deadLine1.setTime(deadLine1.getTime());
  deadLine2.setTime(deadLine2.getTime());
  deadLine3.setTime(deadLine3.getTime());
  
  for (var i = 0; i < List.length; i++) {
      // learn about Method chaining~
    document.getElementById("deadline" + i).innerHTML = List[i].getMinutes() + ":" + List[i].getSeconds();
    updateName("deadline" + i,List[i]);
  }

  function printZero(timeNum) {
    if (timeNum < 10) {
      return "0" + timeNum;
    }
    return timeNum;

  }
  // right i forgot bout that works...
  // let a = document.getElementById("deadline0");
  // document.getElementById("deadline0").getAttribute();
  document.getElementById("deadline0").innerHTML= '<button onclick="changeToButton(\'deadline0\')">' + printZero(deadLine.getHours()) + ':' + printZero(deadLine.getMinutes()) + ':' + printZero(deadLine.getSeconds()) + '</button>'

  document.getElementById("deadline1").innerHTML= '<button onclick="changeToButton(\'deadline1\')">' + printZero(deadLine1.getHours()) + ':' + printZero(deadLine1.getMinutes()) + ':' + printZero(deadLine1.getSeconds()) + '</button>'
  
  document.getElementById("deadline2").innerHTML= '<button onclick="changeToButton(\'deadline2\')">' + printZero(deadLine2.getHours()) + ':' + printZero(deadLine2.getMinutes()) + ':' + printZero(deadLine2.getSeconds()) + '</button>'
  
  document.getElementById("deadline3").innerHTML= '<button onclick="changeToButton(\'deadline3\')">' + printZero(deadLine3.getHours()) + ':' + printZero(deadLine3.getMinutes()) + ':' + printZero(deadLine3.getSeconds()) + '</button>'
  
  function changeToButton(thing) {
    console.log(thing);
    console.log("here")
    // document.getElementById("deadline0").innerHTML = '<p>Helo</p>'
    document.getElementById(thing).innerHTML = 
    "<input type='text' maxlength=2 pattern='[0-9]' placeholder='h' id='hour'>" 
    + "<input type='text' maxlength=2 pattern='[0-9]' placeholder='m' id='minute'>"
    + "<input type='text' maxlength=2 pattern='[0-9]' placeholder='s' id='second'>";

    document.getElementById("hour").onchange = function() {let hr = this.value; lol(hr, "hour",thing);};
    document.getElementById("minute").onchange = function() {let min = this.value; lol(min,"minute",thing);};
    document.getElementById("second").onchange = function() {let sec = this.value; lol(sec,"second",thing);};
  }
  function lol(value,type,id) {
    console.log(value);
    switch (type) {
      case "hour":
        getTimerbyId(id).setHours(value);
        break;
        case "minute":
          getTimerbyId(id).setMinutes(value);
          console.log(getTimerbyId(id).getMinutes());
      break;
      case "second":
        getTimerbyId(id).setSeconds(value);
      break;
    }
  }

  

  // ("#hour").on("change", function() {let e = this.value; lol(e);});
  // ("#minute").on("change", function() {let e = this.value; lol(e);});
  // ("#second").on("change", function() {let e = this.value; lol(e);});

  function getTimerbyId(elementId) {
    switch (elementId) {
      case "deadline0":
        return deadLine;
      case "deadline1":
        return deadLine1;
      case "deadline2":
        return deadLine2;
      case "deadline3":
        return deadLine3;
    }
  }
  
  function countdown1(time,elementId) {
    console.log("Hi");
    document.getElementById(elementId).innerHTML = "TIMER IS FINISHED, HELLO CHERYL, HELLO ARIC!";
  }

  function updateName(id,timer) {
    document.getElementById(id).innerHTML= '<button onclick="changeToButton(\'' + id + '\')">' + printZero(timer.getHours()) + ':' + printZero(timer.getMinutes()) + ':' + printZero(timer.getSeconds()) + '</button>'
    
  }

  function loop(id,timer) {
    timer.setTime(timer.getTime() - 1000);
    document.getElementById(id).innerHTML= '<button onclick="changeToButton(\'' + id + '\')">' + printZero(timer.getHours()) + ':' + printZero(timer.getMinutes()) + ':' + printZero(timer.getSeconds()) + '</button>'
    if (timer.getHours()+timer.getMinutes()+timer.getSeconds() == 0) {
      alert("A timer is finished!");
      stopTimer(id);
    }
  }
  
  var ex1,ex2,ex3,ex4;
  const delay = 1000;

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
        updateName(id,deadLine);
      break;
      case "deadline1":
        clearInterval(ex2);
        updateName(id,deadLine1);
      break;
      case "deadline2":
        clearInterval(ex3);
        updateName(id,deadLine2);
      break;
      case "deadline3":
        clearInterval(ex4);
        updateName(id,deadLine3);
      break;
    }
  }

    
  
  