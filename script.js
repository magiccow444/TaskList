function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
  
    if (taskText === '') return;
  
    const taskList = document.getElementById('taskList');
  
    const li = document.createElement('li');
    li.textContent = taskText;
  
    li.addEventListener('click', () => {
      li.classList.toggle('completed');
    });
  
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '🗑️';
    removeBtn.classList.add('remove-btn');
    removeBtn.onclick = () => li.remove();
  
    li.appendChild(removeBtn);
    taskList.appendChild(li);
    taskInput.value = '';
  }
  
  document.getElementById('taskInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });