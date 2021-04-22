const storageTasks = [];
async function reqTasks() {
  try {
    const res = await fetch('http://127.0.0.1:4000/api/tasks');
    return res.json();
  } catch (err) {
    return err;
  }
}

async function createTasks(tasks) {
  for (const task of tasks) {
    const taskNode = document.createElement('div');
    taskNode.classList.add('input__creatTask');

    const taskText = document.createElement('p');
    taskText.innerText = task.text;
    taskNode.append(taskText);

    const taskCheckBox = document.createElement('input');
    taskCheckBox.setAttribute('type', 'checkbox');
    taskNode.append(taskCheckBox);

    document.body.append(taskNode);
    taskNode.id = task._id;
    storageTasks.push(taskNode);
  }
}

async function createTask(objTask) {
  const taskNode = document.createElement('div');
  taskNode.classList.add('input__creatTask');

  const taskText = document.createElement('p');
  taskText.innerText = objTask.text;
  taskNode.append(taskText);

  const taskCheckBox = document.createElement('input');
  taskCheckBox.setAttribute('type', 'checkbox');
  taskNode.append(taskCheckBox);

  document.body.append(taskNode);
  storageTasks.push(taskNode);
}

async function addTask(resServer, objTask) {
  if (resServer) {
    const tasks = await reqTasks();
    createTasks(tasks);
  } else {
    createTask(objTask);
  }
}

class Task {
  constructor(title, text, date, id) {
    this.title = title;
    this.text = text;
    this.date = date;
    this.completed = false;
  }
}
export {
  Task, addTask, reqTasks, createTask, createTasks, storageTasks,
};
