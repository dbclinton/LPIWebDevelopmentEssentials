const taskForm = document.getElementById('task-form');
const taskList = document.querySelector('#task-list ul');

taskForm.addEventListener('submit', handleFormSubmit);

// Fetch and display existing tasks when the page loads
fetch('/tasks')
  .then(response => response.json())
  .then(tasks => {
    tasks.forEach(task => {
      displayTask(task);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

function handleFormSubmit(event) {
  event.preventDefault();

  const titleInput = document.getElementById('title');
  const descriptionInput = document.getElementById('description');
  const dueDateInput = document.getElementById('due-date');

  const task = {
    title: titleInput.value,
    description: descriptionInput.value,
    dueDate: dueDateInput.value
  };

  if (task.title && task.description && task.dueDate) {
    if (event.target.hasAttribute('data-task-id')) {
      // Update existing task
      const taskId = event.target.getAttribute('data-task-id');
      updateTask(taskId, task);
    } else {
      // Create new task
      createTask(task);
    }

    // Clear form inputs
    titleInput.value = '';
    descriptionInput.value = '';
    dueDateInput.value = '';
    taskForm.removeAttribute('data-task-id');
    taskForm.querySelector('button[type="submit"]').textContent = 'Save Task';
  }
}

function createTask(task) {
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
    .then(response => response.json())
    .then(savedTask => {
      displayTask(savedTask);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function updateTask(taskId, task) {
  fetch(`/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
    .then(response => response.json())
    .then(updatedTask => {
      const taskItem = document.getElementById(`task-${taskId}`);
      taskItem.innerHTML = `
        <h3>${updatedTask.title}</h3>
        <p>${updatedTask.description}</p>
        <p>Due Date: ${updatedTask.dueDate}</p>
        <button onclick="editTask(${updatedTask.id})">Edit</button>
        <button onclick="deleteTask(${updatedTask.id})">Delete</button>
      `;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayTask(task) {
  const li = document.createElement('li');
  li.setAttribute('id', `task-${task.id}`);
  li.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <p>Due Date: ${task.dueDate}</p>
    <button onclick="editTask(${task.id})">Edit</button>
    <button onclick="deleteTask(${task.id})">Delete</button>
  `;
  taskList.appendChild(li);
}

function deleteTask(taskId) {
  fetch(`/tasks/${taskId}`, {
    method: 'DELETE'
  })
    .then(() => {
      const taskItem = document.getElementById(`task-${taskId}`);
      taskItem.remove();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function editTask(taskId) {
  fetch(`/tasks/${taskId}`)
    .then(response => response.json())
    .then(task => {
      // Populate form with task details
      const titleInput = document.getElementById('title');
      const descriptionInput = document.getElementById('description');
      const dueDateInput = document.getElementById('due-date');

      titleInput.value = task.title;
      descriptionInput.value = task.description;
      dueDateInput.value = task.dueDate;

      // Update form submit button
      const submitButton = taskForm.querySelector('button[type="submit"]');
      submitButton.textContent = 'Update Task';

      // Set data-task-id attribute on form
      taskForm.setAttribute('data-task-id', taskId);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
