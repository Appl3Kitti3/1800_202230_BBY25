var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid);   //global
        console.log(currentUser);


    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});





function populateCardsDynamically() {
  let musicCardTemplate = document.getElementById("musicCardTemplate");
  let musicCardGroup = document.getElementById("musicCardGroup");

  
  db.collection("music").get()
    .then(allMusic => {
      allMusic.forEach(doc => {
        
        var musicTitle = doc.data().title; //gets the title field
        var videoId = doc.data().videoId; //gets Youtube link
        var thumbnail = doc.data().thumbnail;
        let testMusicCard = musicCardTemplate.content.cloneNode(true);
        testMusicCard.querySelector('.card-title').innerHTML = musicTitle;     
        // testMusicCard.querySelector('.card-text').innerHTML = musicDescription; 
        
        testMusicCard.querySelector('a').onclick = () => setMusicData(videoId);
        testMusicCard.querySelector('i').id = 'save-' + videoId;
        testMusicCard.querySelector('i').onclick = () => {
          if (document.querySelector('i').innerText === 'bookmark_border') {
          saveBookmark(videoId);
          } else {
          removeBookmark(videoId);
          }};
        testMusicCard.querySelector('.card-img-top').src = thumbnail;
        musicCardGroup.appendChild(testMusicCard);
      })

    })
}
populateCardsDynamically();

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



//Uploads new music information into Firestore
async function getMusicData() {
  const response = await fetch("./playlistItems.json");
  const data = await response.text();
  let parsedData = JSON.parse(data);
  console.log(parsedData);

  for (let i = 0; i < parsedData.length; i++) {
    let item = parsedData[i];
    let musicTitle = item["snippet"]["title"];
    console.log(musicTitle);

    let thumbnailImg = item["snippet"]["thumbnails"]["medium"]["url"];
    console.log(thumbnailImg);
    let musicId = item["snippet"]["resourceId"]["videoId"];
    console.log(musicId);

    
    function writeMusicData() {
      firebase.auth().onAuthStateChanged(user => {

        if (user) {
          var musicRef = db.collection("music");
          musicRef.add({
            title: musicTitle,
            thumbnail: thumbnailImg,
            videoId: musicId
            })
            }
            })
            }
            writeMusicData();
    
    }
  }

  // getMusicData();
