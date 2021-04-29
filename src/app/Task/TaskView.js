import TasksRepository from '$app/TasksRepository';
import Task from './Task';
import TaskMenu from './TaskMenu/TaskMenu';

const tasksRepository = new TasksRepository();

customElements.define('task-element', Task);

const tasks = document.querySelector('.tasks');
const createTaskBth = document.querySelector('.create-task-button');

function ViewAllTask() {
  tasksRepository.getAll().then((res) => {
    res.forEach((element) => {
      tasks.append(new Task(element));
    });
  });
}

let timerCreate = null;
const timerCreateDelay = 5000;

function ViewTaskMenu() {
  const taskMenu = new TaskMenu();
  createTaskBth.after(taskMenu);
  taskMenu.firstChild.style.display = 'block';
  taskMenu.style.borderTop = '5px solid black';
  taskMenu.style.marginTop = '10px';
  taskMenu.addEventListener('keyup', (event) => {
    clearTimeout(timerCreate);
    timerCreate = setTimeout(() => {
      tasksRepository.create({
        title: taskMenu.querySelector('input').value,
        text: taskMenu.querySelector('textarea').value,
      }).then((res) => {
        taskMenu.remove();
        const id = res._id;
        delete res._id;
        delete res.__v;
        res.id = id;
        tasks.append(new Task(res));
      });
    }, timerCreateDelay);
  });
}

export { ViewAllTask, ViewTaskMenu };
