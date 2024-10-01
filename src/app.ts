import express from 'express';
import dotenv from 'dotenv';
import { router } from './routes';

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('API_KEY:', process.env.API_KEY);
});