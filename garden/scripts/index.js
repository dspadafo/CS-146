var timerID = 0;

const taskName = document.getElementById("task-input");
const treeName = document.getElementById("tree-name");
const timer = document.getElementById("timer");

const changeButton = document.getElementById("change-name-button");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");

taskName.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        e.stopPropagation();
        treeName.textContent = taskName.value;
        taskName.parentElement.style.display = "none";
    }
});

function startTime(duration, display){
    var timer = duration, minutes, seconds;
    if(!timerID){
        timerID = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;
            if(--timer < 0)     killTime();
        }, 1000);
    }
}

const killTime = () => {
    clearInterval(timerID);
    timerID = null;
};

startButton.addEventListener("click", (e) => {
    startTime(25*60, timer);
});

resetButton.addEventListener("click", (e) => {
    killTime();
    timer.textContent = "25:00";
});

changeButton.addEventListener("click", (e) => {
    taskName.parentElement.style.display = "inline-block";
    treeName.textContent = "";
});