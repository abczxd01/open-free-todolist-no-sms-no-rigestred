import TasksRepository from '$app/TasksRepository';
import Task from './Task';
import TaskMenu from './TaskMenu/TaskMenu';

const tasksRepository = new TasksRepository();

customElements.define('task-element', Task);

const taskList = document.querySelector('.task-list');
const createTaskBth = document.querySelector('.create-task-button');

function ViewAllTask(filter) {
  if (filter) {
    document.querySelectorAll('task-element').forEach(task => {
      task.remove();
    });
    tasksRepository.getAll().then(res => {
      res.forEach(element => {
        if (element.completed) taskList.append(new Task(element));
      });
    });
  } else {
    tasksRepository.getAll().then(res => {
      res.forEach(element => {
        const task = new Task(element);
        if (!task.completed) {
          taskList.append(task);
        }
      });
    });
  }
}

function ViewTaskMenu() {
  const taskMenu = new TaskMenu(null, 'createMenu');
  createTaskBth.after(taskMenu);

  taskMenu.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
      const title = taskMenu.querySelector('input').value;
      const text = taskMenu.querySelector('textarea').value;
      if (!title && !text) return;
      if (!title) return;
      const reqBody = { title };
      if (text) reqBody.text = text;

      tasksRepository.create(reqBody).then(res => {
        taskMenu.remove();
        taskList.append(new Task(res));
      });
    }
  });
}

export { ViewAllTask, ViewTaskMenu };
