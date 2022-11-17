// Animal memes
// Comics
// Relatable Content

function displayCategoryCards() {
    let listOfwebs = ["https://i.pinimg.com/originals/f3/79/0f/f3790faa3915c7ffd28fa171ddc97014.jpg","https://i.redd.it/bev0b38un9551.jpg", "https://designshack.net/wp-content/uploads/placeholder-image.png"];
    let listOfcategories = ["Animal Memes", "Comics", "Others"];

    let categoryCardTemplate = document.getElementById("galleryCardTemplate");
    let categorycardGroup = document.getElementById("galleryCardGroup");
    
    for (var i = 0; i < listOfwebs.length; i++) {        
        let cardGroup = categoryCardTemplate.content.cloneNode(true);
        cardGroup.querySelector(".category").innerHTML = listOfcategories[i];

        cardGroup.querySelector(".container").src = listOfwebs[i];
        categorycardGroup.appendChild(cardGroup);
    }
}
displayCategoryCards();