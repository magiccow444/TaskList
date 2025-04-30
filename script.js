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

// Changing to 24 hour to sort
function convert12to24(time12h) {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') hours = '0';
  if (modifier === 'PM') hours = parseInt(hours) + 12;
  return `${hours.padStart(2, '0')}:${minutes}`;
}

// For sorting the timed tasks
function getTimeAsNumber(timeStr) {
  const [hour, minute] = timeStr.split(':').map(Number);
  return hour * 60 + minute;
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
  if (timedTask) {
    li.setAttribute('data-time24', rawTime); // Save raw 24-hour time for sorting
  }

  // Create span for task text
  const taskSpan = document.createElement('span');
  taskSpan.classList.add('task-text');  
  taskSpan.textContent = timedTask ? `${taskTime} - ${taskText}` : taskText;

  // Add strikethrough behavior
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  // Create remove button
  const removeBtn = document.createElement('button');
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
    const newTimeValue = getTimeAsNumber(rawTime); // rawTime = taskTimeInput.value
    let inserted = false;

    // Loop through all current list items and put the current task where it needs to go
    for (let i = 0; i < taskOrderedList.children.length; i++) {
      const existingLi = taskOrderedList.children[i]; 
      const existingRawTime = existingLi.getAttribute('data-time24');
      if (!existingRawTime) continue;
      const existingTimeValue = getTimeAsNumber(existingRawTime);

      if (newTimeValue < existingTimeValue) {
        taskOrderedList.insertBefore(li, existingLi);
        inserted = true;
        break;
      }
    }

    if (!inserted) {
      taskOrderedList.appendChild(li); // If not inserted, add to end
    }
  }
  else {
    taskUnorderedList.appendChild(li);
  }

  // Clear input
  taskInput.value = '';
  taskTimeInput.value = '';
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
  