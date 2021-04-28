import { TaskService } from './TaskService';

const taskService = new TaskService();

class TaskController {
  constructor(context, data) {
    this.id = data.id;
    this.text = data.text;
    this.title = data.title;
    this.completed = data.completed;

    this.taskElement = context;

    this.handler = {
      taskElement: this.taskElement,

      showEditMenu() {
        const editMenu = this.taskElement.querySelector('.task-menu');
        editMenu.classList.toggle('task-menu__active');
      },

      clickHandler(event) {
        if (event.path[1].className.includes('edit')) this.showEditMenu();
        if (event.path[1].className.includes('delete')) {
          this.taskElement.remove();
          taskService.deleteTask(this.taskElement.id);
        }
      },
      keybordHandler(event) {
        if (event.path[1].className.includes('text')) {
          taskService.updateTask({
            id: this.taskElement.id,
            text: event.srcElement.value,
          });
        } else if (event.path[1].className.includes('title')) {
          taskService.updateTask({
            id: this.taskElement.id,
            title: event.srcElement.value,
          });
        }
      },
      handleEvent(event) {
        if (event.type === 'click' && event.target instanceof HTMLImageElement) this.clickHandler(event);
        if (event.type === 'change' && event.path[1].className.includes('checkbox')) {
          taskService.completeTask(this.taskElement.id);
        }
        if (event.type === 'keyup') this.keybordHandler(event);
      },
    };
  }

  addEventListeners() {
    this.taskElement.addEventListener('click', this.handler);
    this.taskElement.addEventListener('change', this.handler);
    this.taskElement.addEventListener('keyup', this.handler);
  }
}

export { TaskController };
