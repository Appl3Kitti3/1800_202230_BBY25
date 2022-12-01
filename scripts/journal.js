// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//         currentUser = user;
//         setUp(user);
//         getJournalContent();
//         saveJournal();
//     } else {

//     }
// })

setUp();
getJournalContent();

// saveJournal();

/**
 * Saves journal.
 */
function saveJournal() {
    // changing the query selector to getElementbyID.
    console.log(document.querySelector(".journal.active").parentNode.childNodes[1].childNodes[3]);
    document.querySelector(".journal.active").parentNode.childNodes[1].childNodes[3].addEventListener("click", function() {
        var journalText = document.getElementById("journalInput").value; // Input value
        let journalDoc = db.collection('users').doc(localStorage.getItem('userID')).collection('journals').doc("My Journal");
        journalDoc.update({
            description: journalText
        })
    })
}

/**
 * Get journal text.
 */
function getJournalContent() {
    db.collection('users').doc(localStorage.getItem('userID')).collection('journals').doc("My Journal").get().then(text => {
        document.getElementById("journalInput").innerHTML = text.data().description;
    })
}

/**
 * Set up function.
 */
function setUp() {
    db.collection('users').doc(localStorage.getItem('userID')).collection('journals').get().then(sub => {
        // if sub collection exists
        if (sub.docs.length > 0) {
        } else {
            console.log("Collection not found, setting up...");
            createExampleDocument(localStorage.getItem('userID'));
        }
    })
}

/**
 * Create an example document for new users.
 * @param {*} id as String -> user.uid
 */
function createExampleDocument(id) {
    let exampleDocument = db.collection('users').doc(id).collection('journals').doc('My Journal');
    // This is the main document which is automatically provided for the user.
    exampleDocument.set({
        title: "My Journal",
        description: "This is a journal!"
    })
}
