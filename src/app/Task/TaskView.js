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
        taskList.append(new Task(element));
      });
    });
  }
}

let timerCreate = null;
const timerCreateDelay = 5000;

function ViewTaskMenu() {
  const taskMenu = new TaskMenu(null, 'createMenu');
  createTaskBth.after(taskMenu);

  taskMenu.addEventListener('keyup', () => {
    clearTimeout(timerCreate);
    timerCreate = setTimeout(() => {
      tasksRepository
        .create({
          title: taskMenu.querySelector('input').value,
          text: taskMenu.querySelector('textarea').value,
        })
        .then(res => {
          taskMenu.remove();
          taskList.append(new Task(res));
        });
    }, timerCreateDelay);
  });
}

export { ViewAllTask, ViewTaskMenu };
