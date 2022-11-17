





function listenMusic() { 

let videoId = localStorage.getItem("videoId");
var w = window.screen.availWidth;
var h = w * (9/16);

let player = musicPlayerTemplate.content.cloneNode(true);
player.querySelector('iframe').src = "https://www.youtube.com/embed/" + videoId;
player.querySelector('iframe').width = w;
player.querySelector('iframe').height = h;     
musicPlayerWindow.appendChild(player);
    
}

listenMusic();

console.log("Playing music");

