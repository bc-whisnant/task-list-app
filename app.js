// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load event listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask)
    // Clear task event
    clearBtn.addEventListener('click', clearTasks)
    // Filter tasks
    filter.addEventListener('keyup', filterTasks)
}

// get Tasks from local storage
// this is for page reloading but keeping the data
// get tasks ---> loop through the tasks and append them to appropriate dom elements
function getTasks() {
    let tasks;

    if(localStorage.getItem('tasks') === null)  {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class to link
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append link to li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);

    })
}

// Add task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    }

    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class to link
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);
    
    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
    let tasks;

    if(localStorage.getItem('tasks') === null)  {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
        }

        // Remove from local storage
        removeTaskFromLocalStorage( e.target.parentElement.parentElement);
       
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if(localStorage.getItem('tasks') === null)  {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
    // taskList.innerHTML = '';
    
    // Faster way
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);

    }

    // Clear from local storage
    clearTasksFromLocalStorage();

}

// clear tasks from local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// filter tasks
function filterTasks(e) {
    // get value of whatever if being typed in to filter input
    // and converts to lowercase
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        // if a letter is entered and it doesn't exist within a task - hide all tasks
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });

}