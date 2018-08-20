// Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Funcitions
function togglePlay(){
    if (video.paused)
        video.play();
    else 
        video.pause();
}

function updateButton(){
    if (video.paused)
        toggle.textContent = '►';
    else
        toggle.textContent = '❚ ❚';
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate(){
    video[this.name] = this.value;
}

function updateProgress(e){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrubProgress(e){
    const newTime = e.offsetX / progress.offsetWidth * video.duration;
    video.currentTime = newTime;
}

let mouseDown = false;
// Events
video.addEventListener('click',togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);
progress.addEventListener('click',scrubProgress);
progress.addEventListener('mousedown', e => mouseDown = true);
progress.addEventListener('mousemove', e => mouseDown && scrubProgress(e));
progress.addEventListener('mouseup', e => mouseDown = false);
document.addEventListener('mouseout', e => mouseDown = false);
toggle.addEventListener('click',togglePlay);
skipButtons.forEach( button => button.addEventListener('click',skip));
ranges.forEach( slider => slider.addEventListener('change', rangeUpdate))
ranges.forEach( slider => slider.addEventListener('mousemove', rangeUpdate))