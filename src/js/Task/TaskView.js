import TasksRepository from '$js/TasksRepository';
import Task from './Task';

const tasksRepository = new TasksRepository();

customElements.define('task-element', Task);

const tasks = document.querySelector('.tasks');

function TasksView() {
  tasksRepository.getAll().then((res) => {
    res.forEach((element) => {
      const elementValidation = {
        id: element._id ? element._id : null,
        text: element.text ? element.text : null,
        title: element.title ? element.title : null,
        date: element.date ? element.date : null,
        completed: element.completed ? element.completed : null,
      };
      tasks.append(new Task(elementValidation));
    });
  });
}

export { TasksView };
