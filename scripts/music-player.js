/**
 * Sets an iframe in an individual page.
 */
function listenMusic() { 

    let videoId = localStorage.getItem("videoId");
    var w = window.innerWidth;
    var h = w * (9/16);

    let player = musicPlayerTemplate.content.cloneNode(true);
    let element = player.querySelector('iframe');
    element.src = "https://www.youtube.com/embed/" + videoId;
    element.width = w;
    element.height = h;     
    musicPlayerWindow.appendChild(player);
        
}

listenMusic();

// console.log("Playing music");

