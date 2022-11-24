// Declare variables
var currentUser;
var ex1,ex2,ex3,ex4;
const delay = 1000;

// Do setUp() whenever there is a new user.
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    db.collection('users').doc(user.uid).collection('timers').get().then(sub => {
      // if sub collection exists
      if (sub.docs.length > 0) {
      } else {
        console.log("Collection not found, setting up...")
        setUp();
        setUpDurations();
      }
    })
    console.log("User " + user.uid + " logged on!");
  }
})

// Declare the timers.
const deadLine = new Date();
const deadLine1 = new Date();
const deadLine2 = new Date();
const deadLine3 = new Date();

// Begin Process.
start();

/**
 * A function that starts the timer.js script
 */
function start() {
  initalize();
  console.log("User inputs beyond this point.");
  getData('users');
  
}

/**
 * Initalizes the timers and its HTML element.
 */
function initalize() {
  var list = [deadLine,deadLine1,deadLine2,deadLine3];
  var i = 1;
  list.forEach(element => {
    element.setHours(0);
    element.setMinutes(0);
    element.setSeconds(0);

    updateName("deadline" + i, element);
    changeToButton(i);
    i++;
  }); 
}

/**
 * Prints a zero whenever the duration value is below 10.
 * @param {*} timeNum is a variable for timer duration. (hour / minutes / seconds)
 * @returns a 0 and the number below 10. 
 */
function printZero(timeNum) {
    if (timeNum < 10) {
      return "0" + timeNum;
    }
    return timeNum;
}

/**
 * Grants the ability to edit the timer duration.
 * @param {*} thing as element number after "deadline"
 * @see timer.html
 */
function changeToButton(thing) {
  document.getElementById("deadline" + thing).innerHTML = 
  " <input type='number'   maxlength=2 placeholder='h' id='hour'>" 
  + "<input type='number' maxlength=2 placeholder='m' id='minute'>"
  + "<input type='number' maxlength=2 placeholder='s' id='second'>";

  document.getElementById("hour").onchange = function() {
    let hr = this.value; 
    setDuration(hr, "hour",thing);
  };
  document.getElementById("minute").onchange = function() {
    let min = this.value; 
    setDuration(min,"minute",thing);
  };
  document.getElementById("second").onchange = function() {
    let sec = this.value; 
    setDuration(sec,"second",thing);
  };
  
}

/**
 * Sets duration.
 * @param {*} value of the timer duration 
 * @param {*} type of time (hours / minute / seconds)
 * @param {*} id of the timer
 */
function setDuration(value,type,id) {
    switch (type) {
      case "hour":
        getTimerbyId("deadline" + id).setHours(value);
        break;
        case "minute":
          getTimerbyId("deadline" + id).setMinutes(value);
      break;
      case "second":
        getTimerbyId("deadline" + id).setSeconds(value);
      break;
  }
  updateName("deadline" + id,getTimerbyId("deadline" + id));

  let myTimer = getTimerbyId("deadline" + id);
  let h = myTimer.getHours();
  let m = myTimer.getMinutes();
  let s = myTimer.getSeconds();
  writeData(id, h + ":" + m + ":" + s);
}

/**
 * Gets timer from id.
 * @param {*} elementId of an element is a number 
 * @returns the respectful Date object
 */
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

/**
 * Updates the HTML look of the timer.
 * @param {*} id of the HTML element
 * @param {*} timer name of the timer
 */
function updateName(id,timer) {
  document.getElementById(id).innerHTML= '<button onclick="changeToButton(\'' + id.charAt(id.length - 1) + '\')">' + printZero(timer.getHours()) + ':' + printZero(timer.getMinutes()) + ':' + printZero(timer.getSeconds()) + '</button>'    
}

/**
 * Updates the HTML every second.
 * @param {*} id of the HTML element
 * @param {*} timer name of the timer
 */
function loop(id,timer) {
  timer.setTime(timer.getTime() - 1000);
  document.getElementById("deadline" + id).innerHTML= '<button onclick="changeToButton(\'' + ("deadline" + id) + '\')">' + printZero(timer.getHours()) + ':' + printZero(timer.getMinutes()) + ':' + printZero(timer.getSeconds()) + '</button>'
  if (timer.getHours()+timer.getMinutes()+timer.getSeconds() == 0) {
    getData('users'); 
    alert("A timer is finished!");
    stopTimer(id);
  }
}

/**
 * Associated with the play button.
 * @param {*} id of the HTML element
 */
function startTimer(id) {
  let play = document.getElementById("play" + id);
  let nameElementParent = play.parentElement.parentElement.childNodes[1].childNodes[1].childNodes[0];
  if (nameElementParent.childNodes.length == 1) {
    getData('users');
  }
  play.setAttribute("disabled","");
  play.setAttribute("style","width: 50px;");

  document.getElementById("pause" + id).removeAttribute("disabled");
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

/**
 * Associated with the pause button.
 * @param {*} id of the HTML element
 */
function stopTimer(id) {
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
  document.getElementById("play" + id).removeAttribute("disabled");
  document.getElementById("play" + id).removeAttribute("style");
  document.getElementById("pause" + id).setAttribute("disabled","");
}

/**
 * Sets up the ability to change the name of the timer.  
 * @param {*} array of timer names 
 */
function changeTimerName(array) {
  const names = document.querySelectorAll(".timerName");
  for (var nameClass = 0; nameClass < names.length; nameClass++ ) {
    names[nameClass].innerHTML = '<button name="somet" class="TELEVISION" onclick="changeToInput_Name(this, ' + (nameClass + 1) + ')" style="border: none;  background-color: transparent;">' + array[nameClass] + '</button>';
  }
}

/**
 * Collects data from firebase.
 * @param {*} collection name of the database
 */
function getData(collection) {
  firebase.auth().onAuthStateChanged(user => {
    // Check if a user is signed in:
    if (user) {
        // Do something for the currently logged-in user here:
        var i = 1;
        var nam = "1";
        var test = [];
        db.collection(collection).doc(user.uid).collection('timers').get().then(snap => {
          snap.forEach(doc => {
            test.push(doc.data().name);
            durationList = doc.data().duration.split(":");

            setDuration(parseInt(durationList[0]),"hour",i);
            setDuration(parseInt(durationList[1]),"minute",i);
            setDuration(parseInt(durationList[2]),"second",i);
        
            i++;
            if (i == 5) {
              changeTimerName(test);
            }
          })
        })

    } else {
        // No user is signed in.
    }
  });
}

function setUpDurations() {
  document.getElementById("deadline1").innerHTML= '<button onclick="changeToButton(\'1\')">' + printZero(deadLine.getHours()) + ':' + printZero(deadLine.getMinutes()) + ':' + printZero(deadLine.getSeconds()) + '</button>'
  document.getElementById("deadline2").innerHTML= '<button onclick="changeToButton(\'2\')">' + printZero(deadLine1.getHours()) + ':' + printZero(deadLine1.getMinutes()) + ':' + printZero(deadLine1.getSeconds()) + '</button>'
  document.getElementById("deadline3").innerHTML= '<button onclick="changeToButton(\'3\')">' + printZero(deadLine2.getHours()) + ':' + printZero(deadLine2.getMinutes()) + ':' + printZero(deadLine2.getSeconds()) + '</button>'
  document.getElementById("deadline4").innerHTML= '<button onclick="changeToButton(\'4\')">' + printZero(deadLine3.getHours()) + ':' + printZero(deadLine3.getMinutes()) + ':' + printZero(deadLine3.getSeconds()) + '</button>'
}
/**
 * Updates firebase timer name.
 * @param {*} timerNum number of the timer
 * @param {*} name as String, name of the timer
 */
function writeNameData(timerNum, name) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user.uid);
      db.collection('users').doc(user.uid).collection('timers').doc("Timers " + timerNum).update({
        name: name
      }).then(function () {
        console.log(name);
      })
    } else {

    }
  });
}

/**
 * Updates firebase timer duration.
 * @param {*} timerNum number of the timer
 * @param {*} duration of the timer. (00 : 00 : 00 as String)
 */
function writeData(timerNum, duration) {
  firebase.auth().onAuthStateChanged(user => {
    // Check if a user is signed in:
    if (user) {
        // Do something for the currently logged-in user here: 
        db.collection('users').doc(user.uid).collection('timers').doc("Timers " + timerNum).update({
          duration: duration
        }).then(function () {
          console.log("Duration changed!");
        })
        
        //method #1:  insert with html only
        //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
        //method #2:  insert using jquery
    } else {
        // No user is signed in.
    }
  });
}

/**
 * Creates a sub collection of Timers.
 */
function setUp() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      for (var i = 1; i <= 4; i++ ) {
        var timersRef = db.collection('users').doc(user.uid).collection('timers').doc("Timers " + i);
        timersRef.set({
          name: "Timers " + i,
          duration: "0:0:0"
        })
      }
    }
  })
}

/**
 * @special Legendary Method
 * Calls the function writeNameData() and updates whenever the user types
 * in the input box. 
 * @param {*} element of the input box 
 * @param {*} timerID (both the id of the elment and id of the timer)
 */
function changeToInput_Name(element,timerID) {
  element.removeAttribute('onclick');
  element.innerHTML = '<input type="text" class="changeName" id="' + "TimerName" + (timerID) + '"/>';
  element.oninput = function () {
    writeNameData(timerID,document.getElementById("TimerName" + (timerID)).value);
  }
}