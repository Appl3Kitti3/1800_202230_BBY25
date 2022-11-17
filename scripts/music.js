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
        var musicLink = doc.data().link; //gets Youtube link
        var musicDescription = doc.data().description; //gets the description field
        let testMusicCard = musicCardTemplate.content.cloneNode(true);
        testMusicCard.querySelector('.card-title').innerHTML = musicTitle;     
        testMusicCard.querySelector('.card-text').innerHTML = musicDescription; 
        testMusicCard.querySelector('a').onclick = () => setMusicData(musicLink);
        testMusicCard.querySelector('#add-fave').onclick = () => saveBookmark(musicLink);
        musicCardGroup.appendChild(testMusicCard);
      })

    })
}
populateCardsDynamically();

function setMusicData(id){
            localStorage.setItem ('link', id);
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
            // document.getElementById(iconID).innerText = 'bookmark';
        });
}