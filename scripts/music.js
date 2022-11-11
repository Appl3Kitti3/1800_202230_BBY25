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
        musicCardGroup.appendChild(testMusicCard);
      })

    })
}
populateCardsDynamically();

function setMusicData(id){
            localStorage.setItem ('link', id);
}