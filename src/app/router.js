import { ViewAllTask } from './Task/TaskView';

export default function route(location) {
  if (location === '#/tasks-completed') {
    document.querySelector('.create-task-button').remove();
    ViewAllTask(true);
  } else {
    ViewAllTask();
  }
}
