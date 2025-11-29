import express from 'express';
import cors from 'cors';

import dockerRouter from './routes/dockerRouter.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(dockerRouter);

export default app;