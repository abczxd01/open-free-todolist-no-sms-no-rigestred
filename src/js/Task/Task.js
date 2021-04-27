import { TaskField } from './TaskField/TaskField';
import { TaskMenu } from './TaskMenu/TaskMenu';
import { TaskController } from './TaskController';

customElements.define('task-field', TaskField);
customElements.define('task-menu', TaskMenu);

export default class Task extends HTMLElement {
  constructor(data) {
    super();
    this.id = data._id === undefined ? null : data._id;
    this.text = data.text === undefined ? null : data.text;
    this.title = data.title === undefined ? null : data.title;
    this.date = data.date === undefined ? null : data.date;
    this.completed = data.completed === undefined ? null : data.completed;
  }

  render() {
    this.append(new TaskField(this.data));
    this.append(new TaskMenu(this.data));
  }

  connectedCallback() {
    new TaskController(this, this.data).addEventListeners();
    this.render();
  }

  // disconnectedCallback() {}
}
