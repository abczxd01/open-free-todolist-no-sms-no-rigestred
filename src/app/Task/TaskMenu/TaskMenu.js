import './TaskMenu.scss';

class TaskMenu extends HTMLElement {
  constructor(data) {
    super();
    this.title = data.title;
    this.text = data.text;
    this.date = data.date;
  }

  render() {
    const menu = document.createElement('div');
    menu.classList.add('task-menu');

    const title = document.createElement('div');
    title.classList.add('task-menu__title');

    const menuWrapper = document.createElement('div');
    menuWrapper.classList.add('task-menu__wrapper');

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = this.title === 'null' ? '' : this.title;

    const text = document.createElement('div');
    text.classList.add('task-menu__text');

    const inputTextArea = document.createElement('textarea');
    inputTextArea.value = this.text === 'null' ? '' : this.text;

    title.append(titleInput);
    menuWrapper.append(text);
    text.append(inputTextArea);

    menu.append(title, menuWrapper);
    this.append(menu);
  }

  connectedCallback() {
    this.render();
  }
}

export { TaskMenu };
