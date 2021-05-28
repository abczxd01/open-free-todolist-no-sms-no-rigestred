import './TaskMenu.scss';

export default class TaskMenu extends HTMLElement {
  constructor(data, renderType) {
    super();
    this.renderType = renderType;
    if (data) {
      this.text = data.text;
    }
  }

  renderCreateMenu() {
    this.classList.add('task-menu_create');

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.setAttribute('placeholder', 'Заголовок');

    const inputTextArea = document.createElement('textarea');
    inputTextArea.setAttribute('placeholder', 'Описание задачи');

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save';

    this.append(titleInput, inputTextArea, saveButton);
  }

  renderMenu() {
    const menu = document.createElement('div');
    menu.setAttribute('hidden', '');
    menu.classList.add('task-menu');

    const text = document.createElement('div');
    text.classList.add('task-menu__text');

    const inputTextArea = document.createElement('textarea');

    inputTextArea.value = this.text ?? '';

    text.append(inputTextArea);

    menu.append(text);
    this.append(menu);
  }

  connectedCallback() {
    if (this.renderType === 'createMenu') this.renderCreateMenu();
    else this.renderMenu();
  }
}
