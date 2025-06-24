// INITIALIZE DOM ELEMENTS
const taskInput = document.getElementById('taskInput');
const taskTimeInput = document.getElementById('taskTime');
const taskUnorderedList = document.getElementById('taskUnorderedList');
const taskOrderedList = document.getElementById('taskOrderedList');

// AUTO-RESIZES TASK INPUT TEXTAREA (MAKES INPUT BOX INCREASE WITH CHARACTER INPUT)
taskInput.addEventListener('input', () => {
  taskInput.style.height = 'auto';    // Resets height
  taskInput.style.height = taskInput.scrollHeight + 'px';   // Set height to match content
});

// CONVERTS MILITARY TIME TO AMs AND PMs
function formatTime24to12(timeStr) {
  const [hour, minute] = timeStr.split(':');
  const hourNum = parseInt(hour, 10);
  const ampm = hourNum >= 12 ? 'PM' : 'AM';
  const hour12 = hourNum % 12 || 12; // Converts 0 to 12
  return `${hour12}:${minute} ${ampm}`;
}

// NOT CURRENTLY IN USE: CONVERTS AMs AND PMs BACK TO MILITARY TIME
function convert12to24(time12h) {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') hours = '0';
  if (modifier === 'PM') hours = parseInt(hours) + 12;
  return `${hours.padStart(2, '0')}:${minutes}`;
}

// FOR SORTING TIMED TASKS (CONVERTS TIME STRING TO MINUTES FOR SORTING)
function getTimeAsNumber(timeStr) {
  const [hour, minute] = timeStr.split(':').map(Number);
  return hour * 60 + minute;
}

// FUNCTION TO ADD TASK
function addTask() {
  const taskText = taskInput.value.trim();    // retrieves task input (trim removes extra spaces)
  const rawTime = taskTimeInput.value;        // retreives inputted time
  let timedTask = false;                      // track if time is stored
  let taskTime = '';

  // IF EMPTY INPUT: DON'T ADD AS A TASK
  if (taskText === '') return;
  
  // LI = LIST ITEM, EACH ENTERED TASK IS REPRESENTED AS ONE 'LI' ELEMENT
  // CREATES A NEW 'LI' (TASK ITEM) ELEMENT
  const li = document.createElement('li');

  // TOGGLES TASK COMPLEITION (ALLOWS USER TO CLICK THE TASK TO MARK AS COMPLETE)
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  // CREATES THE REMOVE BUTTON (TRASH ICON)
  const removeBtn = document.createElement('button');
  removeBtn.classList.add('remove-btn');
  removeBtn.textContent = '🗑️';

  // TASK IS REMOVED IF TRASH CAN IS CLICKED
  removeBtn.onclick = (e) => {
    e.stopPropagation(); // Prevent toggle when clicking trash can
    li.remove();
  };
  
  // IF TIMED TASK: ADD TASK TO TIMED LIST
  if (rawTime) {
    taskTime = formatTime24to12(rawTime);
    timedTask = true;
  }  

  // IF TIMED TASK: STORE 24-HOUR TIME FOR SORTING
  if (timedTask) {
    li.setAttribute('data-time24', rawTime); 
  }

  // SPAN FOR NEW TASKS (STYLE IN CSS)
  // SPANS ARE INLINE ELEMENTS USED FOR WRAPPING TEXT & APPLYING STYLES

  // creates a <span> HTML element to hold the text of the added task
  const taskSpan = document.createElement('span');  
  // adds a class to new <span>: it's defined in CSS to control how task looks 
  taskSpan.classList.add('task-text');    
  // sets up what appears inside the <span> element
  taskSpan.innerHTML = timedTask
    // formats timed tasks & allows for 'shift enter' for indented inputs
    ? `${taskTime} - ${taskText.replace(/\n/g, '<br>')}`
    // formats un-timed tasks & allows for 'shift enter' for indented inputs
    : taskText.replace(/\n/g, '<br>');

  // SLIGHT DELAY FOR BROWSER TO CALCULTAE THE SCROLL HEIGHT
  setTimeout(() => {
    taskInput.style.height = taskInput.scrollHeight + 'px';
  }, 0);

  // ADDS TASK TO THE APPROPRIATE LIST
  // IF THE TASK IS TIMED: ADD TO ORDERED LIST
  if (timedTask) {
    const newTimeValue = getTimeAsNumber(rawTime); // rawTime = taskTimeInput.value
    let inserted = false;

    // LOOPS THROUGH CURRENT ORDERED LIST AND INSERTS IN APPROPRIATE SPOT
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

    // IF TIMED TASK ISN'T PLACED CORRECTLY, TASK IS ADDED TO THE END OF ORDERED LIST
    if (!inserted) {
      taskOrderedList.appendChild(li); // If not inserted, add to end
    }
  }
  
  // IF THE TASK IS NOT TIMED: ADD TO UNORDERED LIST
  else {
    taskUnorderedList.appendChild(li);
  }

  // ADDS THE TASK TEXT AND REMOVE BUTTON TO THE TO-DO LIST
  li.appendChild(taskSpan);
  li.appendChild(removeBtn);

  // CLEAN UP: CLEARS THE INPUT BOX, THE TIME INPUT, & RESETS THE HEIGHT
  taskInput.value = '';
  taskTimeInput.value = ''; 
  taskInput.style.height = 'auto'; 
}
  
// ADDS TASK USING THE 'ENTER' BUTTON
document.getElementById('taskInput').addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    addTask();
  }
});

// TOGGLES THE "CHOOSE THEME" BUTTON
document.getElementById('toggleThemesBtn').addEventListener('click', () => {
  const themePanel = document.getElementById('themeButtons');
  themePanel.classList.toggle('show');
});  

// APPLIES THEME TO PAGE
function setTheme(theme) {
  const body = document.body;
  const themes = ['white', 'black', 'birthday', 'christmas', 'halloween', 'newyear', 'vacation'];
  themes.forEach(t => body.classList.remove(t));
  body.classList.add(theme);
}
  