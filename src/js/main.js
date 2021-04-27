import '$baseStyle/style.scss';
import './ui';
import './calender';

import TasksRepository from './TasksRepository';
import Task from './Task/Task';

const tasksRepository = new TasksRepository();

customElements.define('task-element', Task);

const tasks = document.querySelector('.tasks');

tasksRepository.getAll().then((res) => {
  res.forEach((element) => {
    tasks.append(new Task(element));
  });
});
