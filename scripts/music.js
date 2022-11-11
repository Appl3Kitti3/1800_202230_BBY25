function populateCardsDynamically() {
  let musicCardTemplate = document.getElementById("musicCardTemplate");
  let musicCardGroup = document.getElementById("musicCardGroup");

  db.collection("music").get()
    .then(allMusic => {
      allMusic.forEach(doc => {
        var musicTitle = doc.data().title; //gets the name field
        var musicLink = doc.data().link; //gets the length field
        var musicDescription = doc.data().description;
        let testMusicCard = musicCardTemplate.content.cloneNode(true);
        testMusicCard.querySelector('.card-title').innerHTML = musicTitle;     //equiv getElementByClassName
        testMusicCard.querySelector('.card-text').innerHTML = musicDescription; 
        testMusicCard.querySelector('a').onclick = () => setMusicData(musicLink);//equiv getElementByTagName
        // testMusicCard.querySelector('img').src = `./images/${hikeID}.jpg`;   //equiv getElementByTagName
        musicCardGroup.appendChild(testMusicCard);
      })

    })
}
populateCardsDynamically();

function setMusicData(id){
            localStorage.setItem ('link', id);
}