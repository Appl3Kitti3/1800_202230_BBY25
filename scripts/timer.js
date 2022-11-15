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

  for (var t = 1; t <= 4; t++) {
    changeToButton(t);
  }
  function changeToButton(thing) {
    
    console.log(thing);
    console.log("here")
    // document.getElementById("deadline0").innerHTML = '<p>Helo</p>'
    document.getElementById("deadline" + thing).innerHTML = 
    " <input type='number'   maxlength=2 placeholder='h' id='hour'>" 
    + "<input type='number' maxlength=2 placeholder='m' id='minute'>"
    + "<input type='number' maxlength=2 placeholder='s' id='second'>";

    console.log(document.getElementById("hour"));
    document.getElementById("hour").onchange = function() {
      let hr = this.value; 
      lol(hr, "hour",thing);
    };
    document.getElementById("minute").onchange = function() {
      let min = this.value; 
      lol(min,"minute",thing);
    };
    document.getElementById("second").onchange = function() {
      let sec = this.value; 
      lol(sec,"second",thing);
    };
  }
  function lol(value,type,id) {
    console.log(id);
    console.log(value);
    switch (type) {
      case "hour":
        getTimerbyId("deadline" + id).setHours(value);
        break;
        case "minute":
          getTimerbyId("deadline" + id).setMinutes(value);
          // console.log(getTimerbyId(id).getMinutes());
      break;
      case "second":
        getTimerbyId("deadline" + id).setSeconds(value);
      break;
    }
    // console.log(getTimerbyId("deadline2").getMinutes());
    console.log(deadLine.getHours() + "THIS IS DEADLINE");
    updateName("deadline" + id,getTimerbyId("deadline" +id));
    // console.log("deadline" + id);
    console.log(getTimerbyId("deadline" + id).getHours());
    let myTimer = getTimerbyId("deadline" + id);
    let h = myTimer.getHours();
    let m = myTimer.getMinutes();
    let s = myTimer.getSeconds();
    writeData(id, "TimerSomething", h + ":" + m + ":" + s);
    // writeData(id, "Timers " + id, (getTimerbyId("deadline" + id).getHours()) + ":" + (getTimerbyId("deadline" + id).getMinutes()) + ":" + (getTimerbyId("deadline" + id).getSeconds()));
  }

  

  // ("#hour").on("change", function() {let e = this.value; lol(e);});
  // ("#minute").on("change", function() {let e = this.value; lol(e);});
  // ("#second").on("change", function() {let e = this.value; lol(e);});

  function getTimerbyId(elementId) {
    switch (elementId) {
      case "deadline1":
        console.log(deadLine.getMinutes() + "AHHH");
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
    document.getElementById(id).innerHTML= '<button onclick="changeToButton(\'' + id.charAt(id.length - 1) + '\')">' + printZero(timer.getHours()) + ':' + printZero(timer.getMinutes()) + ':' + printZero(timer.getSeconds()) + '</button>'
    
  }

  function loop(id,timer) {
    timer.setTime(timer.getTime() - 1000);
    document.getElementById("deadline" + id).innerHTML= '<button onclick="changeToButton(\'' + ("deadline" + id) + '\')">' + printZero(timer.getHours()) + ':' + printZero(timer.getMinutes()) + ':' + printZero(timer.getSeconds()) + '</button>'
    if (timer.getHours()+timer.getMinutes()+timer.getSeconds() == 0) {
      getData('users'); 
      alert("A timer is finished!");
      stopTimer(id);
    }
  }
  
  var ex1,ex2,ex3,ex4;
  const delay = 1000;

  function startTimer(id) {

    let a = document.getElementById("play" + id);
    a.setAttribute("disabled","");
    a.setAttribute("style","width: 50px;");

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
     
  // var t = db.collection('users').doc(user.uid).collection('timers');

  function changeTimer(array) {

    const names = document.querySelectorAll(".timerName");
    // console.log(test[1] + "told u dont work");

    for (var nameClass = 0; nameClass < names.length; nameClass++ ) {
      names[nameClass].innerHTML = '<button name="somet" class="TELEVISION" onclick="changeToInput_Name(this, ' + (nameClass + 1) + ')" style="border: none;  background-color: transparent;">' + array[nameClass] + '</button>';
    }
        
  }
  getData('users');

function getData(collection) {

  var id;
  firebase.auth().onAuthStateChanged(user => {
    // Check if a user is signed in:
    if (user) {
        // Do something for the currently logged-in user here: 
        console.log(user.uid);
        console.log(user.displayName);
        user_Name = user.displayName;

        var i = 1;
        var nam = "1";
        var test = [];
        db.collection(collection).doc(user.uid).collection('timers').get().then(snap => {
          snap.forEach(doc => {
            test.push(doc.data().name);
            console.log(test);
            var durationList = doc.data().duration.split(":");
            
            lol(parseInt(durationList[0]),"hour",i);
            lol(parseInt(durationList[1]),"minute",i);
            lol(parseInt(durationList[2]),"second",i);
            
            console.log(nam + " key: " + i);
            i++;
            if (i == 5) {
              changeTimer(test);
            }
          })
        })
        

        
        console.log(deadLine.getHours() + " hourle");
        document.getElementById("deadline1").innerHTML= '<button onclick="changeToButton(\'1\')">' + printZero(deadLine.getHours()) + ':' + printZero(deadLine.getMinutes()) + ':' + printZero(deadLine.getSeconds()) + '</button>'

        console.log(deadLine.getHours());
        console.log(deadLine.getHours());
        console.log(deadLine.getHours() + "this");

        document.getElementById("deadline2").innerHTML= '<button onclick="changeToButton(\'2\')">' + printZero(deadLine1.getHours()) + ':' + printZero(deadLine1.getMinutes()) + ':' + printZero(deadLine1.getSeconds()) + '</button>'
        
        document.getElementById("deadline3").innerHTML= '<button onclick="changeToButton(\'3\')">' + printZero(deadLine2.getHours()) + ':' + printZero(deadLine2.getMinutes()) + ':' + printZero(deadLine2.getSeconds()) + '</button>'
        
        document.getElementById("deadline4").innerHTML= '<button onclick="changeToButton(\'4\')">' + printZero(deadLine3.getHours()) + ':' + printZero(deadLine3.getMinutes()) + ':' + printZero(deadLine3.getSeconds()) + '</button>'


        
        
        
        //method #1:  insert with html only
        //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
        //method #2:  insert using jquery
    } else {
        // No user is signed in.
    }
  });

// $("#TimerName1_1").
  // let listOtimersId;
  // for (var i = 0; i < 4;i++) {
  //   listOtimersId.add("")
  // }
  // collection.db.doc(user.uid).collection('timers');
  // console.log("Hello! " + id);
  
}

function writeNameData(timerNum, name) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      db.collection('users').doc(user.uid).collection('timers').doc("Timers " + timerNum).update({
        name: name
      })
    }
  })
}
function writeData(timerNum, name, duration) {
  firebase.auth().onAuthStateChanged(user => {
    // Check if a user is signed in:
    if (user) {
        // Do something for the currently logged-in user here: 
        console.log(user.uid);
        console.log(user.displayName);
        user_Name = user.displayName;
        console.log(timerNum);

        db.collection('users').doc(user.uid).collection('timers').doc("Timers " + timerNum).update({
          duration: duration
        }).then(function () {
          console.log("Timer has been added")
        })
        // console.log(tv);
        // db.collection('users').doc(user.uid).collection('timers').doc("Timers " + timerNum).get().then(snap => {
        //   snap.forEach(doc => {
            
        //     doc.data().name = name;
        //     doc.data().duration = duration;
        //     // let
        //     console.log(NAM + " key: " + i);
        //     // <button onclick="editTimer(\'TimerName\'' + i + ')"></button>
        //     document.getElementById("TimerName" + (timeNum - 1)).innerHTML = '<p>' + NAM + '</p>';
        //     i++;
        //   })
        // })

        //method #1:  insert with html only
        //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
        //method #2:  insert using jquery
    } else {
        // No user is signed in.
    }
  });
}

function setUp() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      user_Name = user.displayName;

      // const docRef = db.collection('users').doc(user.uid).collection('timers');
      // const docsSnap = getDocs(docsRef);
      // let timersRef = db.collection('users').doc(user.uid).collection('timers');
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

function changeToInput_Name(e,location) {
  e.removeAttribute('onclick');
  e.innerHTML = '<input type="text" class="changeName" id="' + location + '"/>';
  e.oninput = function () {
    writeNameData(location,document.getElementById(location).value);
  }
  // var o = 1;
  // console.log(e);
  // console.log(e.value);
  // const b = document.querySelector(".changeName");
  // console.log(b.id);
  // // console.log(e.id);
  // [].forEach.call(b, function (b) {
  //   b.onchange = function () {
  //     // console.log(b);
  //     // console.log(b.id);
  //     // console.log("its broken");
  //     let name = this.value;
  //     writeNameData(b.id,name);
  //   }
  // })
}

// document.getElementById("hour").onchange = function() {
//   let hr = this.value; 
//   lol(hr, "hour",thing);
// };

// for (let index = 1; index <= 4; index++) {
//   document.getElementById("" + index).onchange = function() {
//     writeNameData(index,this.value);
//   }
// }