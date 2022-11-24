firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        setUp(user);
        ready();
        saveJournal();
    } else {

    }
})

/**
 * Takes snap shot atm.
 */
function ready() {
    const screenShotTarget = document.getElementById('my-doc');

    html2canvas(screenShotTarget).then((canvas) => {
        document.getElementById('ter').appendChild(canvas);
        // const base64image = canvas.toDataURL("image/png");
        // window.location.href = base64image;
    })
}

/**
 * Saves journal.
 */
function saveJournal() {
    document.querySelector(".journal.active").parentNode.childNodes[3].addEventListener("click", function() {
        var journalText = this.parentNode.childNodes[7].value;
        let journalDoc = db.collection('users').doc(currentUser.uid).collection('journals').doc("Test Document");
        journalDoc.set({
            title: "Test Document",
            description: journalText
        })
    })
}

/**
 * Set up function.
 * @param {*} user as var
 */
function setUp(user) {
    db.collection('users').doc(user.uid).collection('journals').get().then(sub => {
        // if sub collection exists
        if (sub.docs.length > 0) {
        } else {
          console.log("Collection not found, setting up...");
          createExampleDocument(user.uid);
        }
      })
}

/**
 * Create an example document for new users.
 * @param {*} id as String 
 */
function createExampleDocument(id) {
    let exampleDocument = db.collection('users').doc(id).collection('journals').doc('Example Document');
    exampleDocument.set({
        title: "Example Document",
        description: "This is a journal"
    })
}
