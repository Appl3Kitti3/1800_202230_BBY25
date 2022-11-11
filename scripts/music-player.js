





function listenMusic() { 

let musicLink = localStorage.getItem("link");
var w = window.screen.availWidth;
var h = w * (9/16);

let player = musicPlayerTemplate.content.cloneNode(true);
player.querySelector('iframe').src = musicLink;
player.querySelector('iframe').width = w;
player.querySelector('iframe').height = h;     
musicPlayerWindow.appendChild(player);
    
}

listenMusic();

console.log("Playing music");