const taskInput = document.getElementById('taskInput');
const taskTimeInput = document.getElementById('taskTime');
const taskList = document.getElementById('taskList');

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
    let taskTime = '';
    if (rawTime) {
      taskTime = formatTime24to12(rawTime);
    }
  
    if (taskText === '') return;

    const li = document.createElement('li');
    li.textContent = taskTime ? `${taskTime} - ${taskText}` : taskText;
  
    li.addEventListener('click', () => {
      li.classList.toggle('completed');
    });
  
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '🗑️';
    removeBtn.classList.add('remove-btn');
    removeBtn.onclick = () => li.remove();
  
    li.appendChild(removeBtn);
    taskList.appendChild(li);
    taskInput.value = ''
    taskTimeInput.value = '';
  }
  
  document.getElementById('taskInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });