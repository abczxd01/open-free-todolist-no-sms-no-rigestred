import './TaskField.scss';

class TaskField extends HTMLElement {
  constructor(title, text, completed) {
    super();
    this.title = title;
    this.completed = completed;
    this.text = text;
  }

  render() {
    console.log(this.title);
    const taskField = document.createElement('div');
    taskField.classList.add('task-field');

    const taskFieldText = document.createElement('p');
    taskFieldText.classList.add('task-field__text');
    taskFieldText.innerText = this.title === 'null' ? this.text : this.title;

    const iconEdit = document.createElement('img');
    iconEdit.src = './assets/images/edit.svg';
    const iconDelete = document.createElement('img');
    iconDelete.src = './assets/images/delete.svg';

    const taskFieldBthEdit = document.createElement('button');
    taskFieldBthEdit.classList = 'task-field__bth task-field__bth-edit';
    taskFieldBthEdit.append(iconEdit);

    const taskFieldBthDelete = document.createElement('button');
    taskFieldBthDelete.classList = 'task-field__bth task-field__bth-delete';
    taskFieldBthDelete.append(iconDelete);

    const taskFieldCheckbox = document.createElement('label');
    taskFieldCheckbox.classList.add('task-field__checkbox');
    const taskFieldInput = document.createElement('input');
    taskFieldInput.setAttribute('type', 'checkbox');
    if (this.completed === true) taskFieldInput.setAttribute('checked', '');

    taskFieldCheckbox.append(taskFieldInput, document.createElement('span'));

    taskField.append(taskFieldText, taskFieldBthEdit, taskFieldBthDelete, taskFieldCheckbox);
    this.append(taskField);
  }

  connectedCallback() {
    this.render();
  }
}

export { TaskField };
