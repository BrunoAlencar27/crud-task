import { createApp } from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = createApp();

mongoose
  .connect(process.env.CONECTIONSTRING)
  .then(() => {
    console.log('Database connected successfully');
    app.emit('ok');
  })
  .catch((error) => {
    console.log('Database connection failed');
    console.log(error);
  });
const port = process.env.PORT || 3000;

app.on('ok', () => {
  app.listen(port, () => {
    console.log('Server is running');
  });
});
