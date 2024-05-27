import express from 'express';
import  connectDB  from './config/db.js';
import { configDotenv } from 'dotenv';
import ArticleRouter from './routes/articleRoutes.js';

const app = express();

app.use(express.json());

configDotenv();

const PORT = process.env.PORT || 3000;

connectDB();

app.use('/api/article', ArticleRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
