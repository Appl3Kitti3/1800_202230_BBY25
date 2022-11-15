//------------------------------------------------------
// Get data from a CSV file with ".fetch()"
// Since this file is local, you must use "live serve"
//------------------------------------------------------
async function getCSVdata() {
  const response = await fetch("./quotes_dataset.csv"); //send get request
  const data = await response.text(); //get file response
  const list = data.split("\n").slice(1); //get line
  list.forEach((row) => {
    //console.log(row);
    var message = "";
    //const columns = row.split(',');  //if columns have no commas

    const columns = row.match(/("[^"]*")|[^,]+/g); //secret sauce!

    const a = columns[0];
    const b = columns[1];
    const c = columns[2];
    //console.log(a);
    //console.log(b);
    //console.log(c);
    message += a + "  " + b + " ";
    //const tags c.slice(1).split(',');
    const tags = c.split(",");
    tags.forEach((tag) => {
      t = tag.replace(/\"/g, ""); //strip quotation marks
      console.log(t);
      message += t + " ";
    });

    //do something with the clean data
    //console.log(message);
  });
}

getCSVdata();

function displayCards(collection) {
  let cardTemplate = document.getElementById("quoteCardTemplate");

  db.collection(collection)
    .get()
    .then((snap) => {
      //var i = 1;  //if you want to use commented out section
      snap.forEach((doc) => {
        //iterate thru each doc
        var quote = doc.data().quote; // get value of the "quote" key
        var author = doc.data().author; // get value of the "author" key

        let newcard = quoteCardTemplate.content.cloneNode(true);

        //update title and text and image
        newcard.querySelector(".blockquote").innerHTML = quote;
        newcard.querySelector(".blockquote-footer").innerHTML = author;
        // newcard.querySelector(".card-image").src = `./images/${hikeID}.jpg`; //Example: NV01.jpg

        //give unique ids to all elements for future use
        // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
        // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
        // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

        //attach to gallery
        document.getElementById(collection + "-go-here").appendChild(newcard);
        //i++;   //if you want to use commented out section
      });
    });
}

displayCards("quotes");
