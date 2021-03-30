import mongoose from "mongoose"

const Task = new mongoose.Schema({
    title: { type: String },
    text: { type: String, required: true },
    date: { type: String },
    check: { type: Boolean, required: true },
})

export default mongoose.model('Task', Task)