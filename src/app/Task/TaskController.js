import TasksRepository from '$app/TasksRepository';

const tasksRepository = new TasksRepository();

export default class TaskController {
  constructor(context, data) {
    this.id = data.id;
    this.text = data.text;
    this.title = data.title;
    this.completed = data.completed;

    this.taskElement = context;

    this.handler = {
      taskElement: this.taskElement,
      timer: null,
      showEditMenu() {
        const editMenu = this.taskElement.querySelector('.task-menu');
        if (editMenu.hasAttribute('hidden')) {
          editMenu.removeAttribute('hidden');
        } else {
          editMenu.setAttribute('hidden', '');
        }
      },

      clickHandler(event) {
        if (event.path[1].className.includes('edit')) this.showEditMenu();
        if (event.path[1].className.includes('delete')) {
          this.taskElement.remove();
          tasksRepository.delete(this.taskElement.id);
        }
      },

      keybordHandler() {
        const { id } = this.taskElement;
        const title = this.taskElement.querySelector('input').value;
        const text = this.taskElement.querySelector('textarea').value;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          tasksRepository.update({ id, title, text });
        }, 2000);
      },

      handleEvent(event) {
        if (
          event.type === 'click'
          && event.target instanceof HTMLImageElement
        ) {
          this.clickHandler(event);
        }
        if (
          event.type === 'change'
          && event.path[1].className.includes('checkbox')
        ) {
          tasksRepository.update({
            id: this.taskElement.id,
            completed: true,
          });
          this.taskElement.remove();
        }
        if (event.type === 'keyup') {
          this.keybordHandler(event);
        }
      },
    };
  }

  addEventListeners() {
    this.taskElement.addEventListener('click', this.handler);
    this.taskElement.addEventListener('change', this.handler);
    this.taskElement.addEventListener('keyup', this.handler);
  }
}
