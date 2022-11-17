
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
    tempStr = row.replace("\"", "");
    tempStr = tempStr.replace("\",", "~");
    tempStr = tempStr.replace(",\"", "~");
    // Fun Fact from Teddy, when splitting, replace in between words with uncommon symbols.
    var columns = tempStr.split("~");  //~ is the only symbol that is not common

    // Element 1 = Quotes
    // Element 2 = Author
    // Element 3 = Tags
    columns[1] = columns[1].replace("\" ","");
    columns[1] = columns[1].replace("\"","");
    columns[2] = columns[2].replace("\" ","");
    columns[2] = columns[2].replace("\"","");
    
    // Add list data to firebase
    writeCSVData(columns);
  });
}

function writeCSVData(list) {
  firebase.auth().onAuthStateChanged(user => {
    // If user logged in or current logged in user
    if (user) {
        var quotesRef = db.collection("quotes");
        quotesRef.add({
          quote: list[0],
          // AUTHOR AND BOOK
          author: list[1],
          tags: list[2]
        })
    }
  }) 
}

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

displayCards("quotes");
