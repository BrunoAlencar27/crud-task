import { createApp } from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = createApp();

mongoose
  .connect(process.env.CONECTIONSTRING)
  .then(() => {
    console.log('Connected to the databases');
    app.emit('ok');
  })
  .catch(() => {
    console.log('Erro na conexão com banco de dados');
  });
const port = process.env.PORT || 3000;

app.on('ok', () => {
  app.listen(port, () => {
    console.log('Server is running');
  });
});
