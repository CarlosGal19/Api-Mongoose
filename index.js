import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import ArticleRouter from './routes/articleRoutes.js';
import pkg from 'express-openid-connect';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const { auth, requiresAuth } = pkg;

const app = express();

dotenv.config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'd12KKjRuXbW87ZJHdYJEACIubxpGLxOr',
    issuerBaseURL: 'https://dev-onyfbauj3gubi6i8.us.auth0.com'
  };

app.use(auth(config));

app.use(express.json());

app.use(cookieParser());

const PORT = 3000;

connectDB();

const allowDomains = [
    'http://localhost:5173/',
];

const corsOptions = {
    origin: allowDomains,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.get('/logged', (req, res) => {
    const jwt = req.cookies['appSession'];
    res.send(req.oidc.isAuthenticated() ? {msg: 'Logged in', jwt} : {msg: 'Logged out'});
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send({data: req.oidc.user});
});

app.use('/api/article', requiresAuth(), ArticleRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
