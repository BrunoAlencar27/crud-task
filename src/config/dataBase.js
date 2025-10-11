import mongoose from 'mongoose';

export function dbInit() {
  return mongoose.connect(process.env.CONECTIONSTRING);
}
