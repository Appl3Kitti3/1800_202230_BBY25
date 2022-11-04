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
  
  console.log(List.length);
  for (var i = 0; i < List.length; i++) {
      // learn about Method chaining~
    // document.getElementById("deadline" + i).innerHTML = List[i].getMinutes() + ":" + List[i].getSeconds();
    updateName("deadline" + (i + 1),List[i]);
  }

  function printZero(timeNum) {
    if (timeNum < 10) {
      return "0" + timeNum;
    }
    return timeNum;

  }
  // right i forgot bout that works...

  // console.log(document.getElementById("deadline1"));
  // document.getElementById("deadline1").innerHTML = 'T';
  document.getElementById("deadline1").innerHTML= '<button onclick="changeToButton(\'1\')">' + printZero(deadLine.getHours()) + ':' + printZero(deadLine.getMinutes()) + ':' + printZero(deadLine.getSeconds()) + '</button>'

  document.getElementById("deadline2").innerHTML= '<button onclick="changeToButton(\'2\')">' + printZero(deadLine1.getHours()) + ':' + printZero(deadLine1.getMinutes()) + ':' + printZero(deadLine1.getSeconds()) + '</button>'
  
  document.getElementById("deadline3").innerHTML= '<button onclick="changeToButton(\'3\')">' + printZero(deadLine2.getHours()) + ':' + printZero(deadLine2.getMinutes()) + ':' + printZero(deadLine2.getSeconds()) + '</button>'
  
  document.getElementById("deadline4").innerHTML= '<button onclick="changeToButton(\'4\')">' + printZero(deadLine3.getHours()) + ':' + printZero(deadLine3.getMinutes()) + ':' + printZero(deadLine3.getSeconds()) + '</button>'


  function changeToButton(thing) {
    console.log(thing);
    console.log("here")
    // document.getElementById("deadline0").innerHTML = '<p>Helo</p>'
    document.getElementById("deadline" + thing).innerHTML = 
    "<input type='text' maxlength=2 pattern='[0-9]' placeholder='h' id='hour'>" 
    + "<input type='text' maxlength=2 pattern='[0-9]' placeholder='m' id='minute'>"
    + "<input type='text' maxlength=2 pattern='[0-9]' placeholder='s' id='second'>";

    console.log(document.getElementById("hour"));
    document.getElementById("hour").onchange = function() {let hr = this.value; lol(hr, "hour",thing);};
    document.getElementById("minute").onchange = function() {let min = this.value; lol(min,"minute",thing);};
    document.getElementById("second").onchange = function() {let sec = this.value; lol(sec,"second",thing);};
  }
  function lol(value,type,id) {
    console.log(value);
    switch (type) {
      case "hour":
        getTimerbyId("deadline" + id).setHours(value);
        break;
        case "minute":
          getTimerbyId("deadline" + id).setMinutes(value);
          console.log(getTimerbyId(id).getMinutes());
      break;
      case "second":
        getTimerbyId("deadline" + id).setSeconds(value);
      break;
    }
  }

  

  // ("#hour").on("change", function() {let e = this.value; lol(e);});
  // ("#minute").on("change", function() {let e = this.value; lol(e);});
  // ("#second").on("change", function() {let e = this.value; lol(e);});

  function getTimerbyId(elementId) {
    switch (elementId) {
      case "deadline1":
        return deadLine;
      case "deadline2":
        return deadLine1;
      case "deadline3":
        return deadLine2;
      case "deadline4":
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
    document.getElementById("deadline" + id).innerHTML= '<button onclick="changeToButton(\'' + ("deadline" + id) + '\')">' + printZero(timer.getHours()) + ':' + printZero(timer.getMinutes()) + ':' + printZero(timer.getSeconds()) + '</button>'
    if (timer.getHours()+timer.getMinutes()+timer.getSeconds() == 0) {
      alert("A timer is finished!");
      stopTimer(id);
    }
  }
  
  var ex1,ex2,ex3,ex4;
  const delay = 1000;

  function startTimer(id) {

    let a = document.getElementById("play" + id);
    a.setAttribute("disabled","");
    a.setAttribute("style","width: 8%;");

    document.getElementById("pause" + id).removeAttribute("disabled");

    // document.getElementById("play" + id).innerHTML = '<button class="playNpause" class="e" disabled onclick="startTimer(\'' + id + '\')"></button>';
    switch ("deadline" + id) {
      case "deadline1":
        console.log("DeadLine 1 is at go");
        ex1 = setInterval(loop,delay,id,deadLine);
      break;
      case "deadline2":
        console.log("DeadLine 2 is at go");
        ex2 = setInterval(loop,delay,id,deadLine1);
        break;
      case "deadline3":
        console.log("DeadLine 3 is at go");
        ex3 = setInterval(loop,delay,id,deadLine2);
        break;
      case "deadline4":
        console.log("DeadLine 4 is at go");
        ex4 = setInterval(loop,delay,id,deadLine3);
      break;
    }
  }
  function stopTimer(id) {
    // document.getElementById(id).innerHTML = '<button class="playNpause" class="e" onclick="startTimer(\'' + id + '\')"></button>'
    switch ("deadline" + id) {
      case "deadline1":
        clearInterval(ex1);
        updateName("deadline" + id,deadLine);
        document.getElementById("deadline1").innerHTML= '<button onclick="changeToButton(\'1\')">' + printZero(deadLine.getHours()) + ':' + printZero(deadLine.getMinutes()) + ':' + printZero(deadLine.getSeconds()) + '</button>'
      break;
      case "deadline2":
        clearInterval(ex2);
        updateName("deadline" + id,deadLine1);
        document.getElementById("deadline2").innerHTML= '<button onclick="changeToButton(\'2\')">' + printZero(deadLine1.getHours()) + ':' + printZero(deadLine1.getMinutes()) + ':' + printZero(deadLine1.getSeconds()) + '</button>'

      break;
      case "deadline3":
        clearInterval(ex3);
        updateName("deadline" + id,deadLine2);
        document.getElementById("deadline3").innerHTML= '<button onclick="changeToButton(\'3\')">' + printZero(deadLine2.getHours()) + ':' + printZero(deadLine2.getMinutes()) + ':' + printZero(deadLine2.getSeconds()) + '</button>'

      break;
      case "deadline4":
        clearInterval(ex4);
        updateName("deadline" + id,deadLine3);
        document.getElementById("deadline4").innerHTML= '<button onclick="changeToButton(\'4\')">' + printZero(deadLine3.getHours()) + ':' + printZero(deadLine3.getMinutes()) + ':' + printZero(deadLine3.getSeconds()) + '</button>'
      break;
    }
    // document.getElementById("play" + id).innerHTML ='<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">' +
    //                         '<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>';
    document.getElementById("play" + id).removeAttribute("disabled");
    document.getElementById("play" + id).removeAttribute("style");

    document.getElementById("pause" + id).setAttribute("disabled","");
  }

  getData('timers');
function getData(collection) {
  // let listOtimersId;
  // for (var i = 0; i < 4;i++) {
  //   listOtimersId.add("")
  // }
  console.log("Hello! " + collection);
  var i = 0;
  db.collection(collection).get().then(snap => {
    snap.forEach(doc => {
      
      var NAM = doc.data().name;
      var timerDurationTest = doc.data().duration;
      // let
      console.log(NAM + " key: " + i);
      
      if (NAM == "TimerName" + i) {
        document.getElementById("TimerName" + i).innerHTML = '<button onclick="editTimer(\'TimerName\'' + i + ')"></button>';
        NAM;
      }
      i++;
    })
  })
}

function writeData() {
  var timers = db.collection("timers");
  timers.add({
    name: "TimerName0",
    duration: "00:00:00",
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
  
  timers.add({
    name: "TimerName1",
    duration: "00:00:00",
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });

  timers.add({
    name: "TimerName2",
    duration: "00:00:00",
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });

  timers.add({
    name: "TimerName3",
    duration: "00:00:00",
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  });
}