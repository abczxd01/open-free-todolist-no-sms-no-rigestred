import '$baseStyle/style.scss';
import './header';

import { ViewAllTask, ViewTaskMenu } from './Task/TaskView';

ViewAllTask();

const createTaskBth = document.querySelector('.create-task-button');

createTaskBth.addEventListener('click', (event) => {
  ViewTaskMenu();
});
