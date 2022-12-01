firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // If logged in
        localStorage.setItem('userID',user.uid);
    }
    else {
        console.log("No users available.");
        window.location.href = "login.html";
    }
});