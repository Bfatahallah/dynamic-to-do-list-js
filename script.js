// 1 ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

  // 2 select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

// 3 function to add a new task to the list
  function addTask() {
    const taskText = taskInput.value.trim(); // Get and trim input value

    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }
// 4 Task Creation and Removal
//list item for the task
    const li = document.createElement('li');
    li.textContent = taskText;

// remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

// assign onclick event to remove the task
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // append button to li, then li to the list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

// Clear the input field
    taskInput.value = '';
  }

// 5 attach event listeners
  addButton.addEventListener('click', addTask);

  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
