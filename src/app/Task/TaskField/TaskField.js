import './TaskField.scss';

export default class TaskField extends HTMLElement {
  constructor(data) {
    super();
    this.title = data.title;
    this.completed = data.completed;
    this.text = data.text;
  }

  render() {
    const field = document.createElement('div');
    field.classList.add('task-field');

    const fieldText = document.createElement('p');
    fieldText.classList.add('task-field__text');
    fieldText.innerText = this.title === 'null' ? this.text : this.title;

    const iconEdit = document.createElement('img');
    iconEdit.src = './assets/images/edit.svg';
    const iconDelete = document.createElement('img');
    iconDelete.src = './assets/images/delete.svg';

    const fieldBthEdit = document.createElement('button');
    fieldBthEdit.classList = 'task-field__bth task-field__bth-edit';
    fieldBthEdit.append(iconEdit);

    const fieldBthDelete = document.createElement('button');
    fieldBthDelete.classList = 'task-field__bth task-field__bth-delete';
    fieldBthDelete.append(iconDelete);

    const fieldCheckbox = document.createElement('label');
    fieldCheckbox.classList.add('task-field__checkbox');
    const fieldInput = document.createElement('input');
    fieldInput.setAttribute('type', 'checkbox');
    if (this.completed === true) fieldInput.setAttribute('checked', '');

    fieldCheckbox.append(fieldInput, document.createElement('span'));

    field.append(fieldText, fieldBthEdit, fieldBthDelete, fieldCheckbox);
    this.append(field);
  }

  connectedCallback() {
    this.render();
  }
}

