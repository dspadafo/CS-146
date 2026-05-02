var timerID = null;
var currentTime = 25 * 60;
var paused = false;

var timerDisplay = document.getElementById("timer");
var taskInput = document.getElementById("task-input");
var treeName = document.getElementById("tree-name");
var startButton = document.getElementById("start-button");
var resetButton = document.getElementById("reset-button");
var changeButton = document.getElementById("change-name-button");


const folderPath = "./images/flower_imgs/flower ";
const currentFlower = document.getElementById("flower");
const flowerImgs = [];
for(let i = 1; i <= 16; i++) flowerImgs.push(`${folderPath}(${i}).png`);

var sessionData = {
    mode: "pomodoro",
    pomodoroRounds: 0
};

function startTime(duration) {
    var remaining = duration;
    if (!timerID) {
        timerID = setInterval(function() {
            var minutes = Math.floor(remaining / 60);
            var seconds = remaining % 60;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            timerDisplay.textContent = minutes + ":" + seconds;

            remaining--;
            currentTime = remaining;
            if (remaining < 0) {
                sessionDone();
            }
        }, 0.01);
    }
}

function killTime() {
    clearInterval(timerID);
    timerID = null;
}

function switchMode(newMode) {
    var newTime;
    if (newMode === "shortBreak") newTime = 300;
    else if (newMode === "longBreak") newTime = 1200;
    else if (newMode === "pomodoro" && !paused) newTime = 1500;
    else newTime = currentTime;

    sessionData.mode = newMode;
    startTime(newTime);
}

function sessionDone() {
    killTime();
    if (sessionData.mode === "pomodoro") {
        sessionData.pomodoroRounds++;
        // Has 3 short breaks and then 1 long break
        addPoints(25); // add points after finishing a pomodoro session
        if (sessionData.pomodoroRounds % 4 === 0) {
            switchMode("longBreak");
            currentFlower.src = flowerImgs[Math.floor(Math.random() * 16)];
        } else {
            switchMode("shortBreak");
        }
    } else {
        switchMode("pomodoro");
        currentFlower.src = "./images/flowerpot.png";
    }
}

function addPoints(pts) {
    const listOfUsers = JSON.parse(localStorage.getItem("listOfUsers")) || [];
    const user = listOfUsers.find(u => u.token === sessionToken) || null;
    if (!user) return;      // not logged in

    user.score = (user.score || 0) + pts;
    localStorage.setItem("listOfUsers", JSON.stringify(listOfUsers));
}

startButton.addEventListener("click", function() {
    if (startButton.textContent === "Start") {
        
        switchMode(sessionData.mode);
        paused = false;
        startButton.textContent = "Pause";
    } else {
        killTime();
        paused = true;
        startButton.textContent = "Start";
    }
});

resetButton.addEventListener("click", function() {
    killTime();
    paused = false;
    currentTime = 25 * 60;
    timerDisplay.textContent = "25:00";
    startButton.textContent = "Start";
    sessionData.mode = "pomodoro";
    sessionData.pomodoroRounds = 0;
});

changeButton.addEventListener("click", function() {
    // Label with the input
    taskInput.parentElement.style.display = "block";
    treeName.textContent = "";
});

taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        treeName.textContent = taskInput.value.trim();
        taskInput.parentElement.style.display = "none"; // Hides label
    }
});