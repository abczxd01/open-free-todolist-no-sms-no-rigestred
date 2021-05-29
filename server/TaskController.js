import Task from './Task.js';

class TaskController {
  async options(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, X-Requested-With'
    );
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
    res.end();
  }

  async create(req, res) {
    try {
      const completed = false;
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With'
      );
      const { title, text, date } = req.body;
      const task = await Task.create({
        title,
        text,
        date,
        completed,
      });
      res.json(task);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async getAll(req, res) {
    try {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With'
      );
      const tasks = await Task.find();
      return res.json(tasks);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async getOne(req, res) {
    try {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With'
      );
      const { id } = req.params;
      if (!id) res.status(400).json({ message: 'Id не указан' });
      const task = await Task.findById(id);
      return res.json(task);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async update(req, res) {
    try {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With'
      );
      const task = req.body;
      if (!task._id) res.status(400).json({ message: 'Id не указан' });
      const updateTask = await Task.findByIdAndUpdate(task._id, task, {
        new: true,
      });
      return res.json(updateTask);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async delete(req, res) {
    try {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With'
      );
      const { id } = req.params;
      if (!id) res.status(400).json({ message: 'Id не указан' });
      const task = await Task.findByIdAndDelete(id);
      return res.json(task);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default new TaskController();
