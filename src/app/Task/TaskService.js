import TasksRepository from '$app/TasksRepository';

const tasksRepository = new TasksRepository();

export default class TaskService {
  constructor() {
    this.updateTimer = null;
    this.updateTimerDelay = 2000;
  }

  createTask(data) {
    tasksRepository.create(data);
  }

  deleteTask(id) {
    tasksRepository.delete(id);
  }

  completeTask(id) {
    tasksRepository.update({ id, completed: true });
  }

  updateTask(data, useTimer) {
    if (useTimer) {
      clearTimeout(this.updateTimer);
      this.updateTimer = setTimeout(() => {
        tasksRepository.update(data);
      }, this.updateTimerDelay);
    } else {
      tasksRepository.update(data);
    }
  }
}

export { TaskService };
