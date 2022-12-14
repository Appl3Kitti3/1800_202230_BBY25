var currentUser = db.collection("users").doc(localStorage.getItem('userID'));

// Starts
populateCardsDynamically();
setBookmarkIcon();

document.getElementById("search-submit").addEventListener("click", filterMusic);

var keyword;

/**
 * Used for searchbar.
 * Collects videos that have the same tag.
 */
function filterMusic() {
    keyword = document.getElementById("search-bar").value;
    document.getElementById('musicCardGroup').innerHTML = "";
    populateCardsDynamicallyWithSearch(keyword);
}

/**
 * Shows all videos from the database.
 */
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
        
        let element = testMusicCard.querySelector('i');
        testMusicCard.querySelector('a').onclick = () => setMusicData(videoId);
        element.id = 'save-' + videoId;
        // testMusicCard.getElementById(`save-${videoId}`).addEventListener('click', toggleBookmark, false);
        element.onclick = () => {
          if (element.innerHTML === 'bookmark_border') {
          saveBookmark(videoId);
          console.log(element.innerHTML)
          } else {
          removeBookmark(videoId);
          console.log(element.innerHTML + 'a')
          }
          
          };
          
        
        testMusicCard.querySelector('.card-img-top').src = thumbnail;
        musicCardGroup.appendChild(testMusicCard);
      })

    })
}

/**
 * Shows all videos that correspond to the search keyword.
 */
function populateCardsDynamicallyWithSearch() {
  let musicCardTemplate = document.getElementById("musicCardTemplate");
  let musicCardGroup = document.getElementById("musicCardGroup");

  db.collection("music")
  .where("tags", "array-contains", keyword)
  .get()

    .then(allMusic => {
      allMusic.forEach(doc => {
        var musicTitle = doc.data().title; //gets the title field
        var videoId = doc.data().videoId; //gets Youtube link
        var thumbnail = doc.data().thumbnail;
        let testMusicCard = musicCardTemplate.content.cloneNode(true);
        testMusicCard.querySelector('.card-title').innerHTML = musicTitle;     
        // testMusicCard.querySelector('.card-text').innerHTML = musicDescription; 
        
        let element = testMusicCard.querySelector('i');
        testMusicCard.querySelector('a').onclick = () => setMusicData(videoId);
        element.id = 'save-' + videoId;
        // testMusicCard.getElementById(`save-${videoId}`).addEventListener('click', toggleBookmark, false);
        element.onclick = () => {
          if (element.innerHTML === 'bookmark_border') {
          saveBookmark(videoId);
          console.log(element.innerHTML)
          } else {
          removeBookmark(videoId);
          console.log(element.innerHTML + 'a')
          }
          
          };
          
        
        testMusicCard.querySelector('.card-img-top').src = thumbnail;
        musicCardGroup.appendChild(testMusicCard);
      })

    })
}

/**
 * Helper to redirect clicked videos to a different page.
 * @param {*} id 
 */
function setMusicData(id){
  localStorage.setItem ('videoId', id);
}

/**
 * Saves music video to the database array.
 * @param {*} musicLink as music id.
 */
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
        document.getElementById(iconID).innerText = 'bookmark';
    });
}

/**
 * Removes music video from the saved array in the database.
 * @param {*} musicLink as music id.
 */
function removeBookmark(musicLink) {
console.log(musicLink);
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
// Only called once.
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

/**
 * Sets the bookmark functionality.
 */
function setBookmarkIcon() {
  db.collection("users").doc(localStorage.getItem('userID')).get()
    .then(userDoc => {
      var musicBookmarks = userDoc.data().bookmarks;
      // console.log(musicBookmarks);
      musicBookmarks.forEach(thisMusicID => {
        console.log(thisMusicID);
        db.collection("music").where("videoId", "==", thisMusicID).get().then(snap => {
          size = snap.size;
          queryData = snap.docs;
          if (size == 1) {
            if(document.getElementById("save-" + thisMusicID)) {
              document.getElementById("save-" + thisMusicID).innerHTML = 'bookmark';
            }
          } else {
            console.group("Query has more than one data");
          }
        })
      });
  })
}

