import { createApp } from './app.js';
import dotenv from 'dotenv';
import { dbInit } from './config/dataBase.js';

dotenv.config();

const app = createApp();
await dbInit();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server is running');
});
