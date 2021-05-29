import '$baseStyle/style.scss';
import './header';

import { ViewAllTask, ViewTaskMenu } from './Task/TaskView';

if (!window.location.hash) {
  ViewAllTask();
} else if (window.location.hash === '#/tasks-completed') {
  ViewAllTask(true);
}

const createTaskBth = document.querySelector('.create-task-button');

createTaskBth.addEventListener('click', () => {
  ViewTaskMenu();
});
