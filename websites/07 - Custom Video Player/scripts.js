/*
  Some portions of this file are based on:
  Wes Bos's JavaScript 30 course
  Make It Yourself: https://javascript30.com/
*/

/* Get Our Elements*/

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.full_screen');

/*Build out functions */

function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    console.log('Update the button');
}

function skip() {
    console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log(this.value);
    console.log(this.name);
 }

 function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`; 
 }

 function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;    
    video.currentTime = scrubTime;
    console.log(e);
 }

 function expandScreen() {
    console.log('full SCREEEN!!!!');
    const fullWidth = window.innerWidth;   // viewport width in px
    const fullHeight = window.innerHeight;
    console.log(fullHeight);
    if (!isBig) {
        player.style.width = `${fullWidth}%`;
        player.style.height = `${fullHeight}%`;
        player.style.background = 'black';
        isBig = true;
    } else {
        player.style.width = '';
        player.style.height = '';
        player.style.background = '';
        isBig = false;
    }
 }

/*Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); 
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

let isBig = false;
fullScreen.addEventListener('click', expandScreen);


