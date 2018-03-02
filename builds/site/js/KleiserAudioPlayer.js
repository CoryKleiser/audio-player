(function(){
    'use strict';
    //vars
    const audioPlayers = Array.from(document.getElementsByTagName('audio'));

    console.log(audioPlayers);

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
                    <div style="width:0%" class="ap-scrubberMouseover">&nbsp;</div>
                </div>
            </div>
            <div class="ap-controls">
                <div class="ap-navigation">
                    <button class="ap-back10">&laquo;10</button>
                    <button class="ap-togglePlay"></button>
                    <button class="ap-skip10">10&raquo;</button>
                </div>
            </div>        
    `;

        //add to document
        insertAfter(audioContainer, audio);



        //set up button
        const playPause = document.getElementsByClassName('ap-togglePlay')[i];
        playPause.innerHTML = '&#9658;';
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
                playPause.innerHTML = '&#9658;';
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
        /**
         * fast forward
         */
        // const fastForward = Rx.Observable.fromEvent(skip10, 'click');
        // fastForward.forEach((e) => ff(audio));

        //set up scrubber
        const scrubberBox = document.getElementsByClassName('ap-scrubberContainer')[i];
        const scrubber = document.getElementsByClassName('ap-scrubberBar')[i];
        const scrubberHover = document.getElementsByClassName('ap-scrubberMouseover')[i];
        const currentPosition = document.getElementsByClassName('ap-scrubber')[i];

        const scrubberMousemoves = Rx.Observable.fromEvent(scrubberBox, 'mousemove');
        const scrubberMouseouts = Rx.Observable.fromEvent(scrubberBox, 'mouseout');
        const scrubberClicks = Rx.Observable.fromEvent(scrubberBox, 'click');

        /**
         * Animate buffer
         */
        audio.progress = () => {
            console.log(audio.buffer);
        }

        if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            /**
             * animate scrubber on mouseover
             */
            scrubberMousemoves.forEach((e) => {
                const rect = scrubberBox.getBoundingClientRect();
                const mousePosition = ((e.clientX - rect.left) / rect.width) * 100;
                console.log(mousePosition);
                scrubberHover.setAttribute('style', `width: ${mousePosition}%`);
            });

            /**
             * reset scrubberHover width to 0
             */
            scrubberMouseouts.forEach(() => {
                scrubberHover.setAttribute('style', 'width:0');
            });
        }

        /**
         * skip to location in track based on scrubber clicks
         */
        scrubberClicks.forEach((e) => {
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
                playPause.innerHTML ='&#9658;'
                currentPosition.setAttribute('style', 'width: 0%');
            }
        };

        i++;
        console.log(i);
    });
}());