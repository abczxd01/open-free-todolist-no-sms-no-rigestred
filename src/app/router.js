import { ViewAllTask } from './Task/TaskView';

export default function route(location) {
  if (location === '#/tasks-completed') {
    ViewAllTask(true);
  } else {
    ViewAllTask();
  }
}
