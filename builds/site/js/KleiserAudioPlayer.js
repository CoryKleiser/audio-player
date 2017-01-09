'use strict';
//vars
const audioPlayers = Array.from(document.getElementsByTagName('audio'));

console.log(audioPlayers);


//functions
const insertAfter = (newNode, referenceNode) => referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);

const ff = track => {
    if (track.playbackRate < 4) {
        track.playbackRate += 1;
        console.log(track.playbackRate);
    }
    else {
        track.playbackRate = 1;
        console.log(track.playbackRate);
    }
};



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
            <div class="ap-navigation">
                <button class="ap-back10">&laquo;10</button>
                <button class="ap-togglePlay"></button>
                <button class="ap-skip10">10&raquo;</button>
            </div>
            <div class="ap-volume">
                <button class="ap-volbtn">sp</button>
                <section class="ap-volslider">
                    <h1>Volume Slider Here</h1>
                </section>
            </div>
        </div>        
`;

    //add to document
    insertAfter(audioContainer, audio);



    //set up button
    const playPause = document.getElementsByClassName('ap-togglePlay')[i];
    playPause.innerHTML = '&#9654;';
    const togglePlayPause = Rx.Observable.fromEvent(playPause, 'click');
    /**
     * toggle play/pause track
     */
    togglePlayPause.forEach((e) => {
        if (audio.paused) {
            audio.play();
            setTimeout(()=>console.log(`${audio.currentTime/audio.duration*100}%`), 1000);
            playPause.innerHTML = '&#10073;&#10073;';
        }
        else {
            audio.pause();
            playPause.innerHTML = '&#9654;';
        }
    });

    //set up nav controls

    const back10 = document.getElementsByClassName('ap-back10')[i];
    const back10sec = Rx.Observable.fromEvent(back10, 'click');
    /**
     * go back 10 seconds
     */
    back10sec.forEach((e) => audio.currentTime-=10);

    const skip10 = document.getElementsByClassName('ap-skip10')[i];
    /**
     * skip forward 10 seconds
     */
    const skip10sec = Rx.Observable.fromEvent(skip10, 'click');
    skip10sec.forEach((e) => audio.currentTime+=10);

    //set up scrubber
    const scrubberBox = document.getElementsByClassName('ap-scrubberContainer')[i];
    const scrubber = document.getElementsByClassName('ap-scrubberBar')[i];
    const currentPosition = document.getElementsByClassName('ap-scrubber')[i];

    const scrubberClicks = Rx.Observable.fromEvent(scrubberBox, 'click');
    /**
     * skip to location in track based on scrubber clicks
     */
    scrubberClicks.forEach((e) => {
        console.log(e);
        const rect = scrubberBox.getBoundingClientRect();
        const positionRequested = (e.clientX - rect.left) / rect.width;
        audio.currentTime = audio.duration * positionRequested;
    });

    /**
     * Animate Scrubber to time updates
     */
    audio.ontimeupdate = () => {
        audio.percentPlayed = audio.currentTime/audio.duration*100;
        currentPosition.setAttribute('style', `width: ${audio.percentPlayed}%`);
        if (audio.percentPlayed === 100) {
            button.innerHTML ='&#9654;'
        }
    };

    //todo:: find proper icons for volume button
    const volume = document.getElementsByClassName('ap-volume')[i];
    const volumeBtn = document.getElementsByClassName('ap-volbtn')[i];
    const volumeSlider = document.getElementsByClassName('ap-volslider')[i];
    const volumeClick = Rx.Observable.fromEvent(volumeBtn, 'click');
    const volumeEnter = Rx.Observable.fromEvent(volume, 'mouseover');
    const volumeExit = Rx.Observable.fromEvent(volume, 'mouseleave');
    const currentVolume = audio.volume;
    /**
     * toggle mute on click
     */
    volumeClick.forEach(function (e) {
        if(audio.volume > 0){
            audio.volume = 0;
        } else {
            audio.volume = currentVolume;
        }
    });
    /**
     * volume controls to appear on mouse over
     */
    volumeEnter.forEach(function (e) {
        console.log('working');
        volumeSlider.style.display = 'inline';
    });
    /**
     * volume controls to appear on mouse exit
     */
    volumeExit.forEach(function (e) {
        //todo change on mouse out to preserve display
        volumeSlider.style.display = 'none';
    });
    //todo:: enable dragable volume control

    i++;
    console.log(i);
});