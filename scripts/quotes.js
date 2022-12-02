var currentUser = db.collection('users').doc(localStorage.getItem('userID'));
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = db.collection("users").doc(user.uid); //global
    console.log(currentUser);
  } else {
    // No user is signed in.
    console.log("No user is signed in");
    window.location.href = "login.html";
  }
});

displayCards("quotes");

// this is a setUp()
// this code must be called through the console
// however, it cannot be executed again or else the data will be duplicated in firestore

//------------------------------------------------------
// Get data from a CSV file with ".fetch()"
// Since this file is local, you must use "live serve"
//------------------------------------------------------
async function getCSVdata() {
  const response = await fetch("./quotes_dataset.csv"); //send get request
  const data = await response.text(); //get file response
  const list = data.split("\n").slice(1); //get line
  list.forEach((row) => {
    var tempStr = "";
    tempStr = row.replace('"', "");
    tempStr = tempStr.replace('",', "~");
    tempStr = tempStr.replace(',"', "~");
    // Fun Fact from Teddy, when splitting, replace in between words with uncommon symbols.
    var columns = tempStr.split("~"); //~ is the only symbol that is not common

    // Element 1 = Quotes
    // Element 2 = Author
    // Element 3 = Tags
    columns[1] = columns[1].replace('" ', "");
    columns[1] = columns[1].replace('"', "");
    columns[2] = columns[2].replace('" ', "");
    columns[2] = columns[2].replace('"', "");

    // Add list data to firebase
    writeCSVData(columns);
  });
}
// Run once.
// getCSVdata().then({
//   // dont put anything here
// });

/**
 * Writes the quotes into the database.
 * @param {*} list as array
 */
function writeCSVData(list) {
  var quoteRef = db.collection("quotes");
  quoteRef.add({
    quote: list[0],
    author: list[1],
    tags: list[2]
  });
}

/**
 * Displays all the quotes from database.
 * @param {*} collection 
 */
function displayCards(collection) {
  let cardTemplate = document.getElementById("quoteCardTemplate");
  let cardGroup = document.getElementById("cardContainer");
  db.collection(collection)
    .get()
    .then((snap) => {
      //var i = 1;  //if you want to use commented out section
      snap.forEach((doc) => {
        //iterate thru each doc
        var quote = doc.data().quote; // get value of the "quote" key
        var author = doc.data().author; // get value of the "author" key

        let newcard = cardTemplate.content.cloneNode(true);

        let elementi = newcard.querySelector("i");
        elementi.id = "save-" + quote;
        elementi.onclick = () => {
          if (elementi.innerText == "bookmark_border") {
            saveBookmark(quote);
          } else {
            removeBookmark(quote);
          }
        };

        //update title and text and image
        newcard.querySelector(".blockquote").innerHTML = quote;
        newcard.querySelector(".blockquote-footer").innerHTML = author;
        // newcard.querySelector(".card-image").src = `./images/${hikeID}.jpg`; //Example: NV01.jpg

        //give unique ids to all elements for future use
        // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
        // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
        // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

        //attach to gallery
        cardGroup.appendChild(newcard);
        //i++;   //if you want to use commented out section
      });
    });
}

// console.log(currentUser);

/**
 * Saves quote to the database.
 * @param {*} quote as String
 */
function saveBookmark(quote) {
  currentUser
    .set(
      {
        bookmarks: firebase.firestore.FieldValue.arrayUnion(quote)
      },
      {
        merge: true,
      }
    )
    .then(function () {
      console.log("bookmark has been saved for: " + currentUser);
      var iconID = "save-" + quote;
      //console.log(iconID);
      //this is to change the icon of the hike that was saved to "filled"
      document.getElementById(iconID).innerText = "bookmark";
    });
}

/**
 * Removes bookmarked quote from database.
 * @param {*} quote as String
 */
function removeBookmark(quote) {
  currentUser
    .set(
      {
        bookmarks: firebase.firestore.FieldValue.arrayRemove(quote),
      },
      {
        merge: true,
      }
    )
    .then(function () {
      console.log("bookmark " + quote + "has been deleted for: " + currentUser);
      var iconID = "save-" + quote;
      document.getElementById(iconID).innerText = "bookmark_border";
    });
}
