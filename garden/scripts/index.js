var timerID = 0, currentTime = 25*60, paused = false;
const taskName = document.getElementById("task-input");
const treeName = document.getElementById("tree-name");
const timer = document.getElementById("timer");

const changeButton = document.getElementById("change-name-button");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");

// holding data for sessions
let history = {
    pomodoroRounds: 0,
    score: 0
}

let sessionData = {
    mode: "pomodoro",
    pomodoroRounds: 0,
    shortBreaks: 0,
    longBreaks: 0
}

// functions below
function startTime(duration){
    var timer = duration, minutes, seconds;
    if(!timerID){
        timerID = setInterval(() => {
            currentTime--;
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            this.timer.textContent = minutes + ":" + seconds;
            if(--timer < 0){
                sessionDone();
                return;
            }
        }, 1000);
    }
}

const killTime = () => {
    clearInterval(timerID);
    timerID = null;
};

function switchMode(newMode){
    let newTime;
    // some might pomodoro differently. but a 20 minute break is necessary.
    if (newMode === "shortBreak") newTime = 300;                // 5 min
    else if(newMode === "longBreak") newTime = 1200;            // 20 min
    else if(newMode === "pomodoro" && !paused) newTime = 1500;  // 25 min
    else newTime = currentTime;

    sessionData.mode = newMode;
    // console.log(`Starting ${sessionData.mode} round with ${newTime} on the clock!`);     was for debugging purposes
    startTime(newTime)
}

/**
 * pomdoro -> break -> pomdoro -> break -> pomdoro -> break -> pomdoro -> long break
 */
function sessionDone(){
    killTime();
    console.log("done!");
    if(sessionData.mode === "pomodoro"){
        sessionData.pomodoroRounds++;
    }

    if(sessionData.mode === "pomodoro"){        // time for a break!
        if(sessionData.pomodoroRounds%4 === 0)
            switchMode("longBreak"); 
        else
            switchMode("shortBreak");   
    }
    else switchMode("pomodoro");                // go back to studying.
}

startButton.addEventListener("click", () => {
    if(startButton.textContent == "Start"){
        switchMode(sessionData.mode);
        startButton.textContent = "Pause";
        
    } else{
        killTime();
        paused = true;
        startButton.textContent = "Start";
    }
});

// button event listeners
resetButton.addEventListener("click", () => {
    killTime();
    startButton.textContent = "Start";
    currentTime = 25*60;
    timer.textContent = "25:00";
});

changeButton.addEventListener("click", () => {
    taskName.parentElement.style.display = "inline-block";
    treeName.textContent = "";
});


taskName.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        e.stopPropagation();
        treeName.textContent = taskName.value;
        taskName.parentElement.style.display = "none";
    }
});