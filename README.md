this function is way to long.

function addTaskCardToHtml(inputText, inputDate, inputTime) {

Can be replaced:
if (textArea.style.textDecoration === `line-through`) {
            textArea.style.textDecoration = ``;
        } else {
            textArea.style.textDecoration = `line-through`;
        }
}
updateTaskForLineThrough(inputText, textArea.style.textDecoration !== `line-through`);

again: huge function
function editTaskButton(taskCard, inputText) {


if its not !==-1? error message? something?
function updateTask(oldText, newText, newDate, newTime) {
    const taskIndex = taskArray.findIndex( task => task.text ===oldText);

    if(taskIndex !== -1) {

again, error handling?
function updateTaskForLineThrough(inputText, complete) {
    const task = taskArray.find(task => task.text === inputText);

    if (task) {


GREAT WORK!!!
