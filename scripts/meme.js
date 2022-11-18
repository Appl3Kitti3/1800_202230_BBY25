// Animal memes
// Comics
// Relatable Content

/**
 * Display cards.
 */
function displayCategoryCards() {
    let listOfwebs = ["https://i.pinimg.com/originals/f3/79/0f/f3790faa3915c7ffd28fa171ddc97014.jpg","https://i.redd.it/bev0b38un9551.jpg", "https://designshack.net/wp-content/uploads/placeholder-image.png"];
    let listOfcategories = ["Animal Memes", "Comics", "Others"];

    let categoryCardTemplate = document.getElementById("galleryCardTemplate");
    let categorycardGroup = document.getElementById("galleryCardGroup");
    
    for (var i = 0; i < listOfwebs.length; i++) {        
        let cardGroup = categoryCardTemplate.content.cloneNode(true);
        cardGroup.querySelector(".category").innerHTML = listOfcategories[i];

        cardGroup.querySelector(".container").src = listOfwebs[i];
        cardGroup.querySelector(".container").id = listOfcategories[i];
        console.log(cardGroup.querySelector(".container").id);
        let categoryElement = cardGroup.querySelector(".container").id;
        cardGroup.querySelector(".container").onclick = () => setData(categoryElement);


        categorycardGroup.appendChild(cardGroup);

    }
}

displayCategoryCards();

/**
 * 
 * @param {*} id 
 */
function setData(id) {
    localStorage.setItem('memeCategory', id);
    window.location.href = "eachCategory.html";
}