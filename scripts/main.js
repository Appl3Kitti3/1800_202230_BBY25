var currentUser = db.collection('users').doc(localStorage.getItem('userID'));

// Start.
insertName();
getTimeMessage();

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
    let textElement = $("#time-placeholder");
    var time = new Date();
    let specialDay = ("" + time.getMonth() + time.getDate());
    console.log("" + (time.getMonth() + 1) + time.getDate());
    switch (specialDay) {
        case "84":
            // Cheryl's Day
            textElement.text(
                "Everything is the weather but you are the sky, "
                );
            break;
        case "615":
            // Aric's Day
            textElement.text(
                "Just Keep Swimmin', "
            );
            break;
        case "92":
            // Teddy's Day
            textElement.text(
                "Don't Overthink It, "
            )
            break;
        default:
            var timeInt = time.getHours();
            if (time.getMinutes() < 10) {
                timeInt += "0";
            }
            timeInt = parseInt("" + timeInt + time.getMinutes());
            if (timeInt > 1700 && timeInt < 2359) {
                textElement.text("Evening");
            } else if (timeInt > 1200 && timeInt < 1659) {
                textElement.text("Afternoon");
            } else if (timeInt > 500 && timeInt < 1159) {
                textElement.text("Morning");
            } else {
                textElement.text("Night");
            }
            break;
            // 12AM - 4:59AM - 00hrs - 4:59hrs - night
            // 5AM - 11:59AM - 5hrs - 11:59hrs - morning
            // 12PM - 4:59PM - 12hrs - 16:59hrs - afternoon
            // 5PM - 11:59PM - 17hrs 23:59hrs - evening
            // console.log(time.getTimezoneOffset())
    }
    // console.log("" + time.getMonth() + time.getDate());
}