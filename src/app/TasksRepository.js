export default class TasksRepository {
  constructor() {
    this.SERVER_API = 'http://127.0.0.1:4000/api/tasks';
  }

  async validationData(data) {
    return data.map((value) => {
      const id = value._id;
      delete value.__v;
      delete value._id;
      value.id = id;
      value.text = value.text ? value.text : null;
      value.title = value.title ? value.title : null;
      value.date = value.date ? value.date : null;
      value.completed = value.completed ? value.completed : null;
      return value;
    });
  }

  async create(data) {
    const reqData = {};
    if (data.date !== undefined) {
      reqData.date = data.date;
    }
    if (data.title !== undefined) {
      reqData.title = data.title;
    }
    if (data.text !== undefined) {
      reqData.text = data.text;
    }
    try {
      let res = await fetch(this.SERVER_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(reqData),
      });
      res = await res.json();
      return this.validationData(res);
    } catch (err) {
      return err;
    }
  }

  async getAll() {
    try {
      let res = await fetch(this.SERVER_API);
      res = await res.json();
      return this.validationData(res);
    } catch (err) {
      return err;
    }
  }

  async getOne(id) {
    try {
      const res = await fetch(`${this.SERVER_API}/${id}`);
      return res.json();
    } catch (err) {
      return err;
    }
  }

  async update(data) {
    const reqData = {};
    if (data.id !== undefined) {
      reqData._id = data.id;
    } else {
      return new Error('id undefined');
    }
    if (data.date !== undefined) {
      reqData.date = data.date;
    }
    if (data.title !== undefined) {
      reqData.title = data.title;
    }
    if (data.text !== undefined) {
      reqData.text = data.text;
    }
    if (data.completed !== undefined) {
      reqData.completed = data.completed;
    }
    try {
      const res = await fetch(`${this.SERVER_API}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(reqData),
      });
      return res.json();
    } catch (err) {
      return err;
    }
  }

  async delete(id) {
    try {
      const res = await fetch(`${this.SERVER_API}/${id}`, { method: 'DELETE' });
      return res.json();
    } catch (err) {
      return err;
    }
  }
}
