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
        editMenu.classList.toggle('task-menu__active');
      },

      clickHandler(event) {
        if (event.path[1].className.includes('edit')) this.showEditMenu();
        if (event.path[1].className.includes('delete')) {
          this.taskElement.remove();
          tasksRepository.delete(this.taskElement.id);
        }
      },

      keybordHandler(event) {
        if (event.path[1].className.includes('text')) {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            tasksRepository.update({
              id: this.taskElement.id,
              text: event.srcElement.value,
            });
          }, 2000);
        } else if (event.path[1].className.includes('title')) {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            tasksRepository.update({
              id: this.taskElement.id,
              title: event.srcElement.value,
            });
          }, 2000);
        }
      },

      handleEvent(event) {
        if (event.type === 'click' && event.target instanceof HTMLImageElement) {
          this.clickHandler(event);
        }
        if (event.type === 'change' && event.path[1].className.includes('checkbox')) {
          tasksRepository.update({
            id: this.taskElement.id,
            completed: true,
          });
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
