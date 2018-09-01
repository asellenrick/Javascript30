const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('.timer__button');
let currentTimer = null;

function timer(seconds){
    clearInterval(currentTimer);
    const now = Date.now();
    const then = now + (seconds * 1000);
    displayTimeLeft(seconds);
    displayEndTime(then);
    currentTimer = setInterval( (e) => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0){
            clearInterval(currentTimer);
            return;
        }
        displayTimeLeft(secondsLeft);
    },1000);
}

function displayTimeLeft(seconds){
    const minLeft = Math.floor(seconds / 60);
    const secLeft = seconds % 60;
    const display = `${minLeft}:${secLeft < 10 ? '0' : ''}${secLeft}`;
    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    let hour = end.getHours();
    const min = end.getMinutes();
    const suff = hour >= 12 ? 'PM' : 'AM';
    hour = hour > 12 ? hour - 12 : hour;
    endTime.textContent = `Be back at ${hour}:${min < 10 ? '0':''}${min} ${suff}`;
}``

buttons.forEach( button => button.addEventListener('click', startTimer));

function startTimer(e){
    const duration = parseInt(this.dataset.time);
    timer(duration);
}

document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = parseInt(this.minutes.value);
    if (!isNaN(mins))
        timer(mins*60);
    this.reset();
});