import TasksRepository from '$js/TasksRepository';

const tasksRepository = new TasksRepository();

class TaskController {
  constructor(context, data) {
    this.id = data.id;
    this.text = data.text;
    this.title = data.title;
    this.completed = data.completed;

    this.taskElement = context;

    this.handler = {
      taskElement: this.taskElement,
      deleteTask(id) {
        tasksRepository.delete(id);
        this.taskElement.remove();
      },
      completeTask(id) {
        tasksRepository.update({ id, completed: true });
      },
      showEditMenu() {
        const editMenu = this.taskElement.querySelector('.task-menu');
        editMenu.style.position = 'relative';
        editMenu.style.visibility = 'visible';
        editMenu.style.opacity = 1;
      },
      clickHandler(event) {
        if (event.path[1].className.includes('edit')) this.showEditMenu();
        if (event.path[1].className.includes('delete')) this.deleteTask(this.taskElement.id);
      },
      handleEvent(event) {
        if (event.type === 'click' && event.target instanceof HTMLImageElement) this.clickHandler(event);
        if (event.type === 'change' && event.path[1].className.includes('labe')) this.completeTask(event.path[3].id);
      },
    };
  }

  addEventListeners() {
    this.taskElement.addEventListener('click', this.handler);
    this.taskElement.addEventListener('change', this.handler);
    this.taskElement.addEventListener('keyup', this.handler);
  }

  removeEventListeners() {
    this.taskElement.removeEventListener('click', this.handler);
    this.taskElement.removeEventListener('change', this.handler);
    this.taskElement.removeEventListener('keyup', this.handler);
  }
}

export { TaskController };
