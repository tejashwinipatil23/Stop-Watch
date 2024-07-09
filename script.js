let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let timer;
let isRunning = false;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapNameInput = document.getElementById('lapName');
const lapsContainer = document.getElementById('laps');
const eyeBlinker = document.getElementById('eye-blinker');

startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        startPauseBtn.textContent = 'Start';
        eyeBlinker.style.visibility = 'hidden';
    } else {
        timer = setInterval(updateTime, 10);
        startPauseBtn.textContent = 'Pause';
        eyeBlinker.style.visibility = 'visible';
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    startPauseBtn.textContent = 'Start';
    eyeBlinker.style.visibility = 'hidden';
    updateDisplay();
    lapsContainer.innerHTML = '';
    lapNameInput.value = '';
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapName = lapNameInput.value || 'Unnamed Lap';
        const lapTime = display.textContent;
        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.innerHTML = `<span>${lapName}</span> <span>${lapTime}</span>`;
        lapsContainer.appendChild(lapElement);
        lapNameInput.value = '';
    }
});

function updateTime() {
    milliseconds += 10;
    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    updateDisplay();
}

function updateDisplay() {
    const min = String(minutes).padStart(2, '0');
    const sec = String(seconds).padStart(2, '0');
    const ms = String(Math.floor(milliseconds / 10)).padStart(2, '0');
    display.textContent = `${min}:${sec}:${ms}`;
}
