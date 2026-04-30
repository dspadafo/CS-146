var timerID = 0;

const taskName = document.getElementById("task-input");
const treeName = document.getElementById("tree-name");
taskName.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        e.stopPropagation();
        treeName.textContent = taskName.value;
        taskName.parentElement.style.display = "none";
    }
});

const changeName = document.getElementById("change-name-button");
changeName.addEventListener("click", (e) => {
    e.stopPropagation();
    taskName.parentElement.style.display = "inline-block";
    treeName.textContent = "";
});


function startTimer(duration, display){
    var timer = 2, minutes, seconds;
    timerID = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        if(--timer < 0){
            killTimer(timerID);
        }
    }, 1000);
}

const killTimer = (id) => {
    clearInterval(id);
};

const timerBox = document.getElementById("timer-box");
const timer = document.querySelector("#timer")
timerBox.addEventListener("click", (e) => {
    e.stopPropagation();
    startTimer(25*60, timer);
});

const resetTimer = document.getElementById("reset-button");
resetTimer.addEventListener("click", (e) => {
    e.stopPropagation();
    killTimer(timerID);
    timer.textContent = "25:00";
});
