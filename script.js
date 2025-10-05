// 1 ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => 
  {
  // 2 select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // 3 Local Storage: tasks array + helpers
  let tasks = [];
    localStorage.getItem('tasks');
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(taskText => addTask(taskText, false)); // false -> don't re-save while rendering
  }

  // 4 helper to create and append a task DOM element with remove behavior
  function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;
  
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    
    removeBtn.onclick = function () {
      // Remove from DOM
      taskList.removeChild(li);
      // Remove from tasks array and update storage
      const index = tasks.indexOf(taskText);
      if (index > -1) {
        tasks.splice(index, 1);
        saveTasks();
      }
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  }

  // 5 function to add a new task to the list (optionally save to Local Storage)
  function addTask(taskText, save = true) {
    const text = (typeof taskText === 'string' ? taskText : taskInput.value).trim();

    if (text === '') {
      // only alert when user action (no param provided)
      if (typeof taskText !== 'string') {
        alert('Please enter a task.');
      }
      return;
    }

    // Create and append task element
    createTaskElement(text);

    // Update Local Storage if needed
    if (save) {
      tasks.push(text);
      saveTasks();
    }

    // Clear input only when adding from the input field
    if (typeof taskText !== 'string') {
      taskInput.value = '';
    }
  }

  // 6 load tasks from Local Storage on startup
  loadTasks();

  // 7 attach event listeners
  addButton.addEventListener('click', () => addTask());

  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
