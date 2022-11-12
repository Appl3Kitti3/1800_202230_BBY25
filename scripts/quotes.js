//------------------------------------------------------
// Get data from a CSV file with ".fetch()"
// Since this file is local, you must use "live serve"
//------------------------------------------------------
async function getCSVdata() {
  const response = await fetch("./quotes_dataset.csv"); //send get request
  const data = await response.text(); //get file response
  const list = data.split("\n").slice(1); //get line

  list.forEach((row) => {

    const columns = row.split("\""); //get token
    console.log(row);
    console.log(columns);
    
    const quote = columns[0]; //quote 
    console.log(quote);
    const author = columns[1]; //author name
    console.log(author);
    const tags = columns[2]; //tags associated with the quote
    console.log(tags);

      db.collection("quotes").add({   //write to firestore
         name: author,
         quote: quote,
         category: tags
      })
    }
  )}
