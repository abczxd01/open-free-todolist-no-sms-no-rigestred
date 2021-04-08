import EventHandlersTasks from './EventHandlersTasks';
import {
  Task, addTask, reqTasks, createTask, createTasks, storageTasks,
} from './TaskController';

const inputCreateTask = document.querySelector('.input__creatTask');

addTask(true);

inputCreateTask.addEventListener('keydown', EventHandlersTasks.handlerAddTask);
