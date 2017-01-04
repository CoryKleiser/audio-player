'use strict';

//vars
const audioPlayers = Array.from(document.getElementsByTagName('audio'));

console.log(audioPlayers);


//functions
const insertAfter = (newNode, referenceNode) => referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);

const backTenSec = track => track.currentTime-=10;
const skipTenSec = track => track.currentTime+=10;


let i = 0;

audioPlayers.forEach(function (audio) {

    //container
    const audioContainer = document.createElement('div');
    audioContainer.setAttribute('class', 'audio');

    //set innerHTML
    audioContainer.innerHTML = `
        <div class="ap-scrubberContainer">
            <div class="ap-scrubberBar">
                <div style="width:0%" class="ap-scrubber">&nbsp;</div>
            </div>
        </div>
        <div class="ap-controls">
            <button class="ap-back10">&laquo;10</button>
            <button class="ap-togglePlay"></button>
            <button class="ap-skip10">10&raquo;</button>
        </div>        
`;

    //add to document
    insertAfter(audioContainer, audio);



    //set up button
    const button = document.getElementsByClassName('ap-togglePlay')[i];
    button.innerHTML = '&#9654;';
    button.addEventListener('click', (e) => {
        if (audio.paused) {
            audio.play();
            setTimeout(()=>console.log(`${audio.currentTime/audio.duration*100}%`), 1000);
            button.innerHTML = '&#10073;&#10073;';
        }
        else {
            audio.pause();
            button.innerHTML = '&#9654;';
        }
    });

    //set up nav controls
    document
        .getElementsByClassName('ap-back10')[i]
        .addEventListener('click', (e) => backTenSec(audio));
    document
        .getElementsByClassName('ap-skip10')[i]
        .addEventListener('click', (e) => skipTenSec(audio));

    //set up scrubber
    const scrubber = document.getElementsByClassName('ap-scrubberBar')[i];
    const currentPosition = document.getElementsByClassName('ap-scrubber')[i];
    console.log(scrubber);
    /**
     * Animate Scrubber to time updates
     */
    audio.ontimeupdate = () => {
        audio.percentPlayed = audio.currentTime/audio.duration*100;
        currentPosition.setAttribute('style', `width: ${audio.percentPlayed}%`);
        console.log(`${audio.percentPlayed}%`);
        if (audio.percentPlayed === 100) {
            button.innerHTML ='&#9654;'
        }
    };
    i++;
    console.log(i);

});