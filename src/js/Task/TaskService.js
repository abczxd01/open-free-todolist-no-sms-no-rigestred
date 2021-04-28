import TasksRepository from '$js/TasksRepository';

const tasksRepository = new TasksRepository();

class TaskService {
  deleteTask(id) {
    tasksRepository.delete(id);
  }

  completeTask(id) {
    tasksRepository.update({ id, completed: true });
  }

  updateTask(data) {
    tasksRepository.update(data);
  }
}

export { TaskService };
