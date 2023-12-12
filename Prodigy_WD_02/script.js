let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 100);
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay();
    clearLaps();
}

function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    updateDisplay();
}

function updateDisplay() {
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('display').innerText = formattedTime;
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return (
        padZero(hours) + ':' +
        padZero(minutes) + ':' +
        padZero(seconds)
    );
}

function padZero(number) {
    return number < 10 ? '0' + number : number;
}

function recordLap() {
    if (isRunning) {
        const lapTime = elapsedTime;
        const formattedLapTime = formatTime(lapTime);
        const lapList = document.getElementById('laps');
        const lapItem = document.createElement('li');
        lapItem.innerText = `Lap ${lapList.children.length + 1}: ${formattedLapTime}`;
        lapList.appendChild(lapItem);
    }
}

function clearLaps() {
    const lapList = document.getElementById('laps');
    lapList.innerHTML = '';
}
