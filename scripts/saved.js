


firebase.auth().onAuthStateChanged(user => {
    if (user) {
      getBookmarks(user);
      getSavedQuotes(user);
      currentUser = db.collection("users").doc(user.uid);
      console.log(currentUser);
    } else {
        console.log("No user is signed in");
    }
});


function getBookmarks(user) {
  db.collection("users").doc(user.uid).get()
  
    .then(userDoc => {
    
      var musicBookmarks = userDoc.data().bookmarks;
      console.log(musicBookmarks);

      let musicCardTemplate = document.getElementById("musicCardTemplate");
      musicBookmarks.forEach(thisMusicID => {
        // console.log(thisMusicID);
        db.collection("music").where("videoId", "==", thisMusicID).get().then(snap => {
          size = snap.size;
          queryData = snap.docs;


          if (size == 1) {

            var doc = queryData[0].data();
            var musicTitle = doc.title; //gets the title field
            var videoId = doc.videoId; //gets Youtube link
            var thumbnail = doc.thumbnail;
            let testMusicCard = musicCardTemplate.content.cloneNode(true);
            testMusicCard.querySelector('.card-title').innerHTML = musicTitle;
            // testMusicCard.querySelector('.card-text').innerHTML = musicDescription; 

            testMusicCard.querySelector('a').onclick = () => setMusicData(videoId);
            testMusicCard.querySelector('i').id = 'save-' + videoId;
            testMusicCard.querySelector('i').innerText = 'bookmark';
            testMusicCard.querySelector('i').onclick = () => {
              if (document.querySelector('i').innerText === 'bookmark_border') {
                saveBookmark(videoId);
              } else {
                removeBookmark(videoId);
              }
            };
            testMusicCard.querySelector('.card-img-top').src = thumbnail;
            musicCardGroup.appendChild(testMusicCard);
          }
          else {
            console.group("Query has more than one data")
          }
        })

      });
    })
}

function getSavedQuotes(user) {
db.collection("users").doc(user.uid).get()

  .then(userDoc => {

  var savedQuotes = userDoc.data().bookmarks;
  console.log(savedQuotes);
  let cardTemplate = document.getElementById("quoteCardTemplate");
  let cardGroup = document.getElementById("cardContainer");

  savedQuotes.forEach(item => {
  console.log(item);
    db.collection("quotes").where("quote", "==", item).get().then(snap => {
          size = snap.size;
          queryData = snap.docs;


          if (size == 1) {

        var doc = queryData[0].data();
        var quote = doc.quote; 
        var author = doc.author; 
        let newcard = cardTemplate.content.cloneNode(true);

        newcard.querySelector("i").id = "save-" + quote;
        newcard.querySelector("i").onclick = () => {
          if (document.querySelector("i").innerText === "bookmark_border") {
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
        }
        else {
          console.group("Query has more than one data")
          }
      });
    });
    })
}






function setMusicData(id){
            localStorage.setItem ('videoId', id);
}


function saveBookmark(musicLink) {
    currentUser.set({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(musicLink)
        }, {
            merge: true
        })
        .then(function () {
            console.log("bookmark has been saved for: " + currentUser);
            var iconID = 'save-' + musicLink;
            //console.log(iconID);
						//this is to change the icon of the hike that was saved to "filled"
            document.getElementById(iconID).innerText = 'bookmark';
        });
}

//Removes the bookmarked link from the user's profile
function removeBookmark(musicLink) {
  currentUser.set({
    bookmarks: firebase.firestore.FieldValue.arrayRemove(musicLink)
    },{
      merge: true
    }).then(function () {
    console.log("bookmark has been deleted for: " + currentUser);
    var iconID = 'save-' + musicLink;
    document.getElementById(iconID).innerText = 'bookmark_border';
    })
  }