var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // currentUser.
        currentUser = db.collection("users").doc(user.uid);
        insertName();
    }
    else {
        console.log("No users available.");
        window.location.href = "login.html";
    }
});

function insertName() {

    currentUser.get().then((userDoc) => {
        
        var userName = userDoc.data().name;

        $("#username-placeholder").text(userName + "!");
    })
}
