# Kleiser Audio Player

  - Easy to install
  - Easy to style
  - Very efficient

#### This is a highly customizable audio player plugin. You can use simple css (or whatever) to customize the color, size, and responsiveness of the player very easily.

## Motivation
I wanted a lightweight customizable audio player using HTML, CSS, and JavaScript.

## Use it

##### If you would like this player to be highly customizable with Sass, follow these steps:
1) clone this project to your local machine
2) run `npm install`
3) run `gulp`
4) customize scss files to your liking

##### If you would like to customize this player with standard CSS, follow these steps:
1) include `<script src="https://npmcdn.com/rxjs@5.0.0-beta.1/bundles/Rx.umd.js"></script>` in the head section of your HTML.
(My player uses Rx.js Observables to handle events)
2) include [KleiserAudioPlayer.js](builds/site/js/es5/KleiserAudioPlayer.js) from this repository (use the compiled ES5 javascript)
3) include the [KleiserAudioPlayerStyles.css](builds/site/css/KleiserAudioPlayer.css)
4) customize CSS to your liking

### notes:
- This was originally geared toward use in the browser. If you plan on using it otherwise you may have to go about the installation differently