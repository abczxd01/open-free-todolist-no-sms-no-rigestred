import Task from "./Task.js"

class TaskController {
    async create(req, res) {
        try {
            const { title, text, date, check } = req.body
            const task = await Task.create({ title, text, date, check })
            res.json(task)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    async getAll(req, res) {
        try {
            const tasks = await Task.find()
            return res.json(tasks)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params
            if (!id)
                res.status(400).json({ message: 'Id не указан' })
            const task = await Task.findById(id)
            return res.json(task)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    async update(req, res) {
        try {
            const task = req.body
            if (!task._id)
                res.status(400).json({ message: "Id не указан" })
            const updateTask = await Task.findByIdAndUpdate(task._id, task, { new: true })
            return res.json(updateTask)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params
            if (!id)
                res.status(400).json({ message: 'Id не указан' })
            const task = await Task.findByIdAndDelete(id)
            return res.json(task)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

export default new TaskController()