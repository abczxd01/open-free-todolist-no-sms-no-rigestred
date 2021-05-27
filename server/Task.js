import mongoose from 'mongoose';

const Task = new mongoose.Schema({
  title: { type: String },
  text: { type: String },
  date: { type: String },
  completed: { type: Boolean, required: true },
});

export default mongoose.model('Task', Task);
