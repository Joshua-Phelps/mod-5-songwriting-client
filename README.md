## Song Control 
This is a React App I built for my final project at Flatiron School. It uses a Rails API backend with a PostgreSQL database. 

This app was designed to assist songwriters in their creative process. A user can create multiple versions of a song for easy reference and store them in collections for optimal organization. Each song has lyric formatter using the JavaScript library ChordSheetJS that places chord changes above the words and a tool to look up synonyms, rhymes, and definitions for a chosen word. 

## Motivation
I wanted to build this app because I am a songwriter myself and was tired of sifting through the numerous versions of songs that I had recorded. I often times will come up with alternate verses or choruses for a particular song. I wanted an apllication that could store all those versions in one place for quick and easy access. 

## Screenshots
<img src="https://github.com/Joshua-Phelps/mod-5-songwriting-client/blob/master/src/images/ScreenShot1.png" alt="ScreenShot1"
	title="ScreenShot1" width="600" height="400" />

<img src="https://github.com/Joshua-Phelps/mod-5-songwriting-client/blob/master/src/images/ScreenShot2.png" alt="ScreenShot1"
	title="ScreenShot2" width="600" height="400" />

<img src="https://github.com/Joshua-Phelps/mod-5-songwriting-client/blob/master/src/images/ScreenShot3.png" alt="ScreenShot1"
title="ScreenShot3" width="600" height="400" />

<img src="https://github.com/Joshua-Phelps/mod-5-songwriting-client/blob/master/src/images/ScreenShot4.png" alt="ScreenShot1"
	title="ScreenShot4" width="600" height="400" />

<img src="https://github.com/Joshua-Phelps/mod-5-songwriting-client/blob/master/src/images/ScreenShot5.png" alt="ScreenShot1"
	title="ScreenShot5" width="600" height="400" />





## Tech/framework used

<b>Built with</b>
- [React](https://reactjs.org/)
- [Ruby on Rails](https://rubyonrails.org/)
- [Material UI](https://material-ui.com/)


## Features
- A user can create a collection of songs for easy organization 
- A user can move a song between collections
- A user can create a new song and record multiple versions 
  - Those versions can be accessed from the song's webpage for quick reference
- A user can write and format lyrics to reference while recording
- A user can search for synonyms, rhymes, and definitions of words to assist with the lyric writing process. 
- A user can delete versions, songs, collections and well as their whole account if desired
- Uses Bcrypt and JWT tokens for login security 
- The recording are hosted on Amazon S3


## Credits
 - [ChordSheetJS](https://github.com/martijnversluis/ChordSheetJS)

## How to use?
Check out the demo at https://www.youtube.com/watch?v=u5eMMfXUyk4

Website live at https://song-control-client.herokuapp.com/ 

Backend repo available at https://github.com/Joshua-Phelps/mod-5-songwriting-backend 



