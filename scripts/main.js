var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // If logged in
        currentUser = db.collection("users").doc(user.uid);
        insertName();
        getTimeMessage();
    }
    else {
        console.log("No users available.");
        window.location.href = "login.html";
    }
});

/**
 * Automatically updates the username heading.
 */
function insertName() {

    currentUser.get().then((userDoc) => {
        
        var userName = userDoc.data().name;

        $("#username-placeholder").text(userName + "!");
    })
}

/**
 * Automatically updates the greeting message.
 */
function getTimeMessage() {

    var time = new Date();
    var timeInt = time.getHours();
    if (time.getMinutes() < 10) {
        timeInt += "0";
    }
    timeInt = parseInt(timeInt + time.getMinutes());
    console.log(timeInt);
    if (timeInt > 1700 && timeInt < 2359) {
        $("#time-placeholder").text("Evening");
    } else if (timeInt > 1200 && timeInt < 1659) {
        $("#time-placeholder").text("Afternoon");
    } else if (timeInt > 500 && timeInt < 1159) {
        $("#time-placeholder").text("Morning");
    } else {
        $("#time-placeholder").text("Night");
    }
    // 12AM - 4:59AM - 00hrs - 4:59hrs - night
    // 5AM - 11:59AM - 5hrs - 11:59hrs - morning
    // 12PM - 4:59PM - 12hrs - 16:59hrs - afternoon
    // 5PM - 11:59PM - 17hrs 23:59hrs - evening
    // console.log(time.getTimezoneOffset())

    console.log("" + time.getMonth() + time.getDate());
}