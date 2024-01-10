const userInputText = document.querySelector(`#inputText`);
const userInputDate = document.querySelector(`#inputDate`);
const userInputTime = document.querySelector(`#inputTime`);
const displayUserTask = document.querySelector(`.displayTask`);
const saveButton = document.querySelector(`.btn`);
const clearTaskBoard = document.querySelector(`.clear`);
let taskArray = [];

saveButton.addEventListener(`click`, function () {
    const inputText = userInputText.value.trim();
    const inputDate = userInputDate.value;
    const inputTime = userInputTime.value;

    if (!validateInputs(inputText, inputDate, inputTime)) {
        return;
    }

    let taskobj = {
        text: inputText,
        date: inputDate,
        time: inputTime,
    };

    taskArray.push(taskobj);
    saveInLocalStorage(taskArray);
    addTaskCardToHtml(inputText, inputDate, inputTime);
    clearInputs();
})

function validateInputs(inputText, inputDate, inputTime) {
    if (!inputText || !inputDate || !inputTime) {
        alert('Please enter a task, date and time');
        return false;
    }

    return true;
}

function clearInputs() {
    userInputText.value = "";
    userInputDate.value = "";
    userInputTime.value = "";
}

function saveInLocalStorage(array) {
    localStorage.setItem(`SaveTask`, JSON.stringify(array));
}

function addTaskCardToHtml(inputText, inputDate, inputTime) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    const textArea = document.createElement(`textarea`);
    textArea.setAttribute(`readonly`, `readonly`);
    textArea.setAttribute(`cols`, `20`);
    textArea.setAttribute(`rows`, `6`);
    const userText = document.createTextNode(inputText);
    textArea.appendChild(userText);
    taskCard.appendChild(textArea);

    const userDate = document.createElement(`input`);
    userDate.type = `date`;
    userDate.value = inputDate;
    taskCard.appendChild(userDate);

    const userTime = document.createElement(`input`);
    userTime.type = `time`;
    userTime.value = inputTime;
    taskCard.appendChild(userTime);

    displayUserTask.appendChild(taskCard);

    createDeleteButtonToHtml(taskCard);
    const deleteButton = taskCard.querySelector(`.deleteButton`);
    deleteButton.addEventListener(`click`, function () {
        deleteTaskButton(taskCard);
    });

    if (taskArray.find(task => task.text === inputText && task.complete)) {
        textArea.style.textDecoration = `line-through`;
    }

    createDoneTaskButton(taskCard);
    const doneButton = taskCard.querySelector(`.doneButton`);
    doneButton.addEventListener(`click`, function () {
        if (textArea.style.textDecoration === `line-through`) {
            textArea.style.textDecoration = ``;
            updateTaskForLineThrough(inputText, false);
        } else {
            textArea.style.textDecoration = `line-through`;
            updateTaskForLineThrough(inputText, true);
        }
    })
}

function updateTaskForLineThrough(inputText, complete) {
    const task = taskArray.find(task => task.text === inputText);
    if (task) {
        task.complete = complete;
        saveInLocalStorage(taskArray);
    }
}

function clearTasksFromBoard() {
    localStorage.clear();
}

clearTaskBoard.addEventListener(`click`, function () {
    if (confirm(`are you sure?`)) {
        clearTasksFromBoard();
        displayUserTask.textContent = "";
    }
});

function deleteTaskButton(taskCard) {
    const index = Array.from(displayUserTask.children).indexOf(taskCard);
    if (index !== -1) {
        taskArray.splice(index, 1);
        if (confirm(`are you sure?`)) {
            displayUserTask.removeChild(taskCard);
            saveInLocalStorage(taskArray);
        }
    }
}

function createDeleteButtonToHtml(taskCard) {
    const deleteButton = document.createElement(`button`);
    deleteButton.classList.add(`deleteButton`);
    deleteButton.innerHTML = `&#10006;`;
    taskCard.appendChild(deleteButton);
    return deleteButton;
}


function createDoneTaskButton(taskCard) {
    const doneButton = document.createElement(`button`);
    doneButton.classList.add(`doneButton`);
    doneButton.innerHTML = '&#10004;';
    taskCard.appendChild(doneButton);
    return doneButton;
}

function takeFromLocalStorage() {
    taskArray = JSON.parse(localStorage.getItem(`SaveTask`)) || [];
}

(function () {
    takeFromLocalStorage();
    taskArray.forEach(task => {
        addTaskCardToHtml(task.text, task.date, task.time);
    });
})();