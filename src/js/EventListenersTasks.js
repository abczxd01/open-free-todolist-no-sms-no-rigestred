import EventHandlersTasks from './EventHandlersTasks';
import {
  Task, addTask, reqTasks, createTask, createTasks, storageTasks,
} from './TaskController';

const inputCreateTask = document.querySelector('.create-task-button');

addTask(true);

inputCreateTask.addEventListener('keydown', EventHandlersTasks.handlerAddTask);
