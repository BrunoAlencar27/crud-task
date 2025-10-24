import 'dotenv/config';

import { createApp } from './app.js';
import { dbInit } from './config/dataBase.js';

const app = createApp();
await dbInit();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server is running');
});
