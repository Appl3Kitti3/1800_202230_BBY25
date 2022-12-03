
// start
getData();

/**
 * Gets pictures from database depending on the selected category.
 */
function getData() {
    let category = localStorage.getItem('memeCategory');
    let element = document.getElementById("category-name");
    switch (category) {
        case "Animal Memes":
            element.innerHTML = "Animal Memes";
            animalMemes();
            break;
        case "Comics":
            element.innerHTML = "Comics";    
            comics();
            break;
        case "Others":
            element.innerHTML = "Others";
            others();
            break;
    }
}

/**
 * Animal Memes category.
 */
function animalMemes() {
    let listOPictures = ["https://i.pinimg.com/originals/f3/79/0f/f3790faa3915c7ffd28fa171ddc97014.jpg","https://th.bing.com/th/id/R.cb914dfa5feeb997ca078e8d986a3c27?rik=ZJXhBEPUZL4IXA&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2016%2f01%2f211450-fennec-animals.jpg&ehk=ZM3ddMdkIOL%2fHtc6Ofjr2M23c5ntfvF3zFGXQyZDg30%3d&risl=&pid=ImgRaw&r=0", "https://th.bing.com/th/id/OIP.8mwqdEI1jfjlgJ77iWRmVQHaHa?pid=ImgDet&rs=1", "https://s24193.pcdn.co/wp-content/uploads/2017/09/funny-animal-memes-entity-3.png", "https://th.bing.com/th/id/OIP.kwj1GmIy4B-RPhdJfjnWeQHaIU?pid=ImgDet&rs=1", "https://th.bing.com/th/id/R.d72bd4bd2e4c896f79ad04af1e38ebfe?rik=6TLC8UxAky3AFg&riu=http%3a%2f%2fquotesnhumor.com%2fwp-content%2fuploads%2f2015%2f07%2fTop-30-Very-Funny-Animals-Memes-humor-meme.jpg&ehk=%2bi6V6OW85kuWL9AIr2WYA4hWlBYuaJkjvnVEBQo0gsU%3d&risl=&pid=ImgRaw&r=0", "https://www.groundzeroweb.com/wp-content/uploads/2017/05/Funny-Cat-Memes-11.jpg", "https://breakbrunch.com/wp-content/uploads/2018/09/funny-dog-meme-061418-13.jpg"];
    applyImages(listOPictures);
}

/**
 * Comics category.
 */
function comics() {
    let listOPictures = ["https://cdn.acidcow.com/pics/20200917/1600352540_xsrk3mb1s0.jpg","https://static.boredpanda.com/blog/wp-content/uploads/2018/08/15803302_1194757503895360_7159603134019403776_n-5b7a8ccd65200__880.jpg", "https://acidcow.com/pics/20111229/the_most_hilarious_web_comic_strips_06.jpg", "https://i.pinimg.com/originals/e1/e8/43/e1e8439ea8499e1a0169ef51601d8e65.png", "https://th.bing.com/th/id/R.d61d20d9d7ad30ed170af14a6f3f737e?rik=88UNIqOnr6yUGQ&riu=http%3a%2f%2fstatic.boredpanda.com%2fblog%2fwp-content%2fuploads%2f2016%2f05%2ffunny-introvert-comics-61-57443a2d91a66__700.jpg&ehk=dtTwedPwupB6rxw8BdWXZmUNos%2fvEmgbtF59rHBHXg8%3d&risl=&pid=ImgRaw&r=0", "https://cdn.slidemodel.com/wp-content/uploads/20141-02-comic-book-powerpoint-template-16x9-5-870x489.jpg"];
    applyImages(listOPictures);
}

/**
 * Others category.
 */
function others() {
    let listOPictures = [
    "https://fancyfantacy.com/wp-content/uploads/2020/04/Extremely-Funny-Memes-You-Will-Laugh-out-Loud-17.jpg","https://th.bing.com/th/id/R.0feeb4d50450d80de02117cee2cdc5ae?rik=jR2eAXfXQMOHSg&riu=http%3a%2f%2fslapwank.com%2fwp-content%2fuploads%2f2017%2f11%2fstressed.jpg&ehk=Ni3pzy4BmJlGyVK52bnkbbbkuyGK%2bo361%2fOt0txYvhk%3d&risl=&pid=ImgRaw&r=0", 
    "https://th.bing.com/th/id/OIP.JNDeB4c2XwxpFPVk5vumngHaL2?pid=ImgDet&rs=1", 
    "https://i.chzbgr.com/original/9388343552/h67FA11D7/funny-woman-yelling-at-cat-meme-neverending-story", 
    "https://i.pinimg.com/originals/c2/93/85/c293854df954a3bccf8471fa15624b69.jpg", 
    "https://i.pinimg.com/736x/1f/a7/49/1fa7494a1b8923847e24d5e8ffff4aab.jpg"];
    applyImages(listOPictures);
}

/**
 * Place each pictures into the container.
 * @param {*} list as array
 */
function applyImages(list) {
    abc = 0;

    let memeCardTemplate = document.getElementById("memeCardTemplate");
    let memeCardGroup = document.getElementById("memeCardGroup");
    for (var i = 0; i < list.length; i++) {
        let cardGroup = memeCardTemplate.content.cloneNode(true);
        cardGroup.querySelector(".container").src = list[i];

        memeCardGroup.appendChild(cardGroup);
    }
}