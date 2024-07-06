// Timer JS
const workTime = 25 * 60; // Work time in seconds (25 minutes)
const shortBreakTime = 5 * 60; // Short break time in seconds (5 minutes)
const longBreakTime = 10 * 60; // Long break time in seconds (10 minutes)
let isWorkSession = true; // Flag to check if it's work or break session
let intervalCount = 0; // Counter for intervals

let timer; // Variable to hold the timer interval

function startTimer() {
    let time = isWorkSession ? workTime : (intervalCount === 4 ? longBreakTime : shortBreakTime);
    timer = setInterval(() => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        document.getElementById('timer').innerText = `${minutes}:${seconds}`;
        console.log(`${minutes}:${seconds}`);
        if (--time < 0) {
            clearInterval(timer);
            document.getElementById('chime').play(); // Play chime sound
            if (isWorkSession) intervalCount++;
            if (intervalCount === 4) intervalCount = 0;
            isWorkSession = !isWorkSession;
            startTimer();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    isWorkSession = true;
    intervalCount = 0;
    document.getElementById('timer').innerText = '25:00';
}

// Task manager JS
class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(name, priority) {
        const task = {
            id: this.tasks.length + 1,
            name: name,
            priority: priority,
            completed: false
        };
        this.tasks.push(task);
        this.renderTasks();
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.renderTasks();
    }

    completeTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) task.completed = !task.completed;
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = "";
        this.tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskItem.innerHTML = `
                <span>${task.name} (${task.priority})</span>
                <button onclick="taskManager.completeTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="taskManager.removeTask(${task.id})">Remove</button>
            `;
            taskList.appendChild(taskItem);
        });
    }
}

const taskManager = new TaskManager();

function addTask() {
    const name = document.getElementById('taskName').value;
    const priority = document.getElementById('taskPriority').value;
    if (name && priority) {
        taskManager.addTask(name, priority);
        document.getElementById('taskName').value = '';
        document.getElementById('taskPriority').value = 'High';
    }
}
