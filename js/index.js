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
    clearInputs();
    addTaskCardToHtml(inputText, inputDate, inputTime);
    takeFromLocalStorage();
})

function validateInputs(inputText, inputDate, inputTime) {
    if (!inputText) {
        alert('Please enter a task');
        return false;
    }

    if (!inputDate) {
        alert('Please select a date');
        return false;
    }

    if (!inputTime) {
        alert('Please select a time');
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

    createDeleteButtonToHtml(taskCard);
    const deleteButton = taskCard.querySelector(`.deleteButton`);
    deleteButton.addEventListener(`click`, function() {
        deleteTaskButton(taskCard);
    });

    const textArea = document.createElement(`textarea`);
    textArea.setAttribute(`readonly`, `readonly`);
    textArea.setAttribute(`cols`, `20`);
    textArea.setAttribute(`rows`, `5`);
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
}

function clearTasksFromBoard() {
        localStorage.clear();
}

clearTaskBoard.addEventListener(`click`, function() {
    if(confirm(`are you sure?`)) {
        clearTasksFromBoard();
        displayUserTask.textContent = "";
    }
});

function deleteTaskButton(taskCard) {
    const index = Array.from(displayUserTask.children).indexOf(taskCard);
    if(index !== -1) {
        taskArray.splice(index, 1);
        if(confirm(`are you sure?`)) {
            displayUserTask.removeChild(taskCard);
            saveInLocalStorage(taskArray);
        }
    }
}

function createDeleteButtonToHtml(taskCard) {
    const deleteButton = document.createElement(`button`);
    deleteButton.classList.add(`deleteButton`);
    const nameOfDeleteButton = document.createTextNode(`X`);
    deleteButton.appendChild(nameOfDeleteButton);
    taskCard.appendChild(deleteButton);
    return deleteButton;
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