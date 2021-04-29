import TasksRepository from '$js/TasksRepository';

const tasksRepository = new TasksRepository();

class TaskService {
  constructor() {
    this.updateTimer = null;
    this.updateTimerDelay = 2000;
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
