import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: String, required: true },
});

export const TaskModel = mongoose.model('task', taskSchema);
