import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profileImageKey: { type: String },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model('user', userSchema);
