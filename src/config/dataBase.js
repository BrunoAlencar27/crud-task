import mongoose from 'mongoose';

export async function dbInit() {
  try {
    await mongoose.connect(process.env.CONECTIONSTRING);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed');
    throw error;
  }
}
