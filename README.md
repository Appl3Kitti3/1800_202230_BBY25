## My Web Application MoodUp

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
This browser based web application is designed to provide a collection of stress-soothing features for the user.  It includes a quote library, music library, focus timers, journal, and a meme gallery.

	
## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* Bootstrap 
* Firebase and Firestore
	
## Content
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
├── login.html               # login HTML file, the log-in page
├── main.html                # main HTML file, the landing page after log-in or user set-up
├── gallery.html             # gallery HTML file, the gallery page for meme pictures
├── journal.html             # joural HTML file, the journal page to save and write journals
├── music.html               # music HTML file, the music library page
├── music-player.html        # music-player HTML file, the music player page after pressing play
├── saved.html               # saved HTML page, the page with athe bookmarked music and quotes
├── timer.html               # timer HTML page, the page for setting timers
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /lakeside.jpg            # background for the app
    /playarrow.svg           # play arrow for timer and the music
├── scripts                  # Folder for scripts
    /authentication.js       # JS for authenticating users
    /eachCategory.js         # JS for the meme page
    /journal.js              # JS for the journal
    /main.js                 # JS for the main page 
    /meme.js                 # JS for th meme page
    /music-player.js         # JS for the music player page
    /music.js                # JS for the music page
    /quote.js                # JS for the quote
    /saved.js                # JS for the saved 
    /script.js               # JS for after the user has been logged in

├── styles                   # Folder for styles
    /eachCategory.css        # style for eachCategory.html
    /index.css               # style for index.html
    /main.css                # style for main.html
    /memes.css               # style for music.html
    /music.css               # style for quotes.html
    /saved.css               # style for saved.html
    /style.css               # style for pages (general) 

├── skeletons                # Folder for the skeletons
    /footer.html             # footer HTML file, footer that is shared among the pages
    /navBar.html             # nav bar HTML file, the nav bar that is shared among the pages
    /navBarMain.html         # nav bar (full) HTML file, the full nav bar that is shared among the pages

Firebase hosting files: 
├── .firebaserc
├── firestore.indexes.json
├── firestore.rules
├── firebase.json 
└── storage.rules

## Resources
- In-app icons from Feather v4.28.0 (Open Source https://feathericons.com/)
- Logo homemade!

## Contact 
* John Smith - jsmith@my.bcit.ca 
* ...

## Acknowledgements 
* <a href="https://fontawesome.com/">Font Awesome</a>
* <a href="https://fonts.adobe.com/">Adobe Fonts</a> 
* <a href="https://fonts.google.com/">Google Fonts</a>
* <a href="https://stock.adobe.com/images">Adobe Stock Images</a>
* <a href="https://getbootstrap.com/">Bootstrap</a>

