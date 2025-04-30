const taskInput = document.getElementById('taskInput');
const taskTimeInput = document.getElementById('taskTime');
const taskUnorderedList = document.getElementById('taskUnorderedList');
const taskOrderedList = document.getElementById('taskOrderedList');

// Function to change the time from military time to normal
function formatTime24to12(timeStr) {
  const [hour, minute] = timeStr.split(':');
  const hourNum = parseInt(hour, 10);
  const ampm = hourNum >= 12 ? 'PM' : 'AM';
  const hour12 = hourNum % 12 || 12; // Converts 0 to 12
  return `${hour12}:${minute} ${ampm}`;
}

function addTask() {
  const taskText = taskInput.value.trim();
  const rawTime = taskTimeInput.value;
  let timedTask = false;
  let taskTime = '';
  if (rawTime) {
    taskTime = formatTime24to12(rawTime);
    timedTask = true;
  }

  if (taskText === '') return;

  // Create list item
  const li = document.createElement('li');

  // Create span for task text
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskTime ? `${taskTime} - ${taskText}` : taskText;
  taskSpan.classList.add('task-text');

  // Add strikethrough behavior
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  // Create remove button
  const removeBtn = document.createElement('button');
  removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
  removeBtn.classList.add('remove-btn');
  removeBtn.textContent = '🗑️';

  removeBtn.onclick = (e) => {
    e.stopPropagation(); // Prevent toggle when clicking trash can
    li.remove();
  };

  // Append task text and remove button to the list item
  li.appendChild(taskSpan);
  li.appendChild(removeBtn);

  // Append the list item to the task list
  if (timedTask) {
    taskOrderedList.appendChild(li);
  }
  else {
    taskUnorderedList.appendChild(li);
  }

  // Clear input
  taskInput.value = '';
}
  
  // Listens for the "Enter" key press while typing in the input box
  // If Enter is pressed, it triggers the addTask() function to add a new to-do
  document.getElementById('taskInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Toggles the visibility of the theme buttons when "Choose Theme" is clicked
  // It adds or removes the 'show' class to show/hide the theme panel
  document.getElementById('toggleThemesBtn').addEventListener('click', () => {
    const themePanel = document.getElementById('themeButtons');
    themePanel.classList.toggle('show');
  });  

  // Sets the selected theme by adding the corresponding class to the <body>
  // It first removes any previous theme classes to avoid conflicts
  function setTheme(theme) {
    const body = document.body;
    const themes = ['white', 'black', 'birthday', 'christmas', 'halloween', 'newyear', 'vacation'];
    themes.forEach(t => body.classList.remove(t));
    body.classList.add(theme);
  }
  