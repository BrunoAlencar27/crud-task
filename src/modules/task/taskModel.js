import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    completed: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true },
);

export const TaskModel = mongoose.model('task', taskSchema);
