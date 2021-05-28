import TaskField from './TaskField/TaskField';
import TaskMenu from './TaskMenu/TaskMenu';
import TaskController from './TaskController';

customElements.define('task-field', TaskField);
customElements.define('task-menu', TaskMenu);

export default class Task extends HTMLElement {
  constructor(data) {
    super();
    this.id = data.id;
    this.text = data.text ?? null;
    this.title = data.title ?? null;
    this.completed = data.completed;
    this.data = data;
    this.controller = new TaskController(this, this.data);
  }

  render() {
    this.append(new TaskField(this.data));
    this.append(new TaskMenu(this.data));
  }

  connectedCallback() {
    this.controller.addEventListeners();
    this.render();
  }
}
