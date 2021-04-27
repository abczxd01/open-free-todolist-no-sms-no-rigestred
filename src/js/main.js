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
    const elementValidation = {
      id: element._id === undefined ? null : element._id,
      text: element.text === undefined ? null : element.text,
      title: element.title === undefined ? null : element.title,
      date: element.date === undefined ? null : element.date,
      completed: element.completed === undefined ? null : element.completed,
    };
    tasks.append(new Task(elementValidation));
  });
});
