import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';
import resumeRouter from './routes/resumeRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = 4000;

app.use(cors());

//CONNECT DB
connectDB();

//MIDDLEWARE
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/resume',resumeRouter);

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'),{
    setHeaders: (res,path) => {
      res.set('Access-Control-Allow-Origin', 'https://craftcv-frontend.onrender.com');
    }
  })
)

//ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to CraftCV Backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

