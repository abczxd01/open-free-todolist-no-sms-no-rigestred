import TasksRepository from './TasksRepository';

const tasksRepository = new TasksRepository();

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
        // console.log(event);
      },
    };
  }

  render() {
    this.classList.add('task');

    const wrapper = document.createElement('div');
    wrapper.classList.add('task__wrapper');

    const text = document.createElement('p');
    text.classList.add('task__text');

    text.innerText = this.title === 'null' ? this.text : this.title;

    const buttonEdit = document.createElement('button');
    buttonEdit.classList = 'task__buttons task__button-edit';

    const buttonDelete = document.createElement('button');
    buttonDelete.classList = 'task__buttons task__button-delete';

    const label = document.createElement('label');
    label.classList = 'task__buttons task__label';

    const buttonEditImg = document.createElement('img');
    buttonEditImg.src = './assets/images/edit.svg';

    const buttonDeleteImg = document.createElement('img');
    buttonDeleteImg.src = './assets/images/delete.svg';

    const buttonInput = document.createElement('input');
    buttonInput.type = 'checkbox';
    buttonInput.classList.add('task__button-input');
    if (this.completed === true) buttonInput.setAttribute('checked', '');

    const buttonCheckBox = document.createElement('span');
    buttonCheckBox.classList.add('task__button-checkbox');

    buttonEdit.append(buttonEditImg);
    buttonDelete.append(buttonDeleteImg);
    label.append(buttonInput, buttonCheckBox);

    wrapper.append(text, buttonEdit, buttonDelete, label);
    this.append(wrapper);

    const menu = document.createElement('div');
    menu.classList.add('task__menu');

    const title = document.createElement('div');
    title.classList.add('task__menu__input-title');

    const menuWrapper = document.createElement('div');
    menuWrapper.classList.add('task__menu__wrapper');

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = this.title === 'null' ? '' : this.title;

    const inputText = document.createElement('div');
    inputText.classList.add('task__menu__input-text');

    const inputTextArea = document.createElement('textarea');
    inputTextArea.value = this.text === 'null' ? '' : this.text;

    title.append(titleInput);
    menuWrapper.append(inputText);
    inputText.append(inputTextArea);

    menu.append(title, menuWrapper);
    this.append(menu);
  }

  addEventListeners() {
    this.addEventListener('click', this.handler);
    this.addEventListener('change', this.handler);
    this.addEventListener('keyup', this.handler);
  }

  removeEventListeners() {
    this.removeEventListener('click', this.handler);
    this.removeEventListener('change', this.handler);
    this.removeEventListener('keyup', this.handler);
  }

  connectedCallback() {
    this.addEventListeners();
    this.render();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }
}
