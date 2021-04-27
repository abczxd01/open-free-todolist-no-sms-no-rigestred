import TasksRepository from '$js/TasksRepository';
import { TaskField } from './TaskField/TaskField';
import { TaskMenu } from './TaskMenu/TaskMenu';
import { TaskController } from './TaskController';

customElements.define('task-field', TaskField);

const tasksRepository = new TasksRepository();
customElements.define('task-menu', TaskMenu);

export default class Task extends HTMLElement {
  constructor(data) {
    super();
    this.id = data._id === undefined ? null : data._id;
    this.text = data.text === undefined ? null : data.text;
    this.title = data.title === undefined ? null : data.title;
    this.date = data.date === undefined ? null : data.date;
    this.completed = data.completed === undefined ? null : data.completed;
    this.handler = {
      TaskContext: this,
      deleteTask(id) {
        tasksRepository.delete(id);
        this.TaskContext.remove();
      },
      completeTask(id) {
        tasksRepository.update({ id, completed: true });
      },
      showEditMenu() {
        const editMenu = this.TaskContext.querySelector('.task__menu');
        editMenu.style.position = 'relative';
        editMenu.style.visibility = 'visible';
        editMenu.style.opacity = 1;
      },
      clickHandler(event) {
        if (event.path[1].className.includes('edit')) this.showEditMenu();
        if (event.path[1].className.includes('delete')) this.deleteTask(event.path[3].id);
      },
      handleEvent(event) {
        if (event.type === 'click' && event.target instanceof HTMLImageElement) this.clickHandler(event);
        if (event.type === 'change' && event.path[1].className.includes('labe')) this.completeTask(event.path[3].id);
      },
    };
  }

  render() {
    this.append(new TaskField(this.data));
    this.append(new TaskMenu(this.data));
  }

  connectedCallback() {
    this.addEventListeners();
    this.render();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }
}
