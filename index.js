import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import ArticleRouter from './routes/articleRoutes.js';
import pkg from 'express-openid-connect';

const { auth, requiresAuth } = pkg;

const app = express();

dotenv.config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};

app.use(auth(config));

app.use(express.json());

const PORT = process.env.PORT || 3000;

connectDB();

app.get('/logged', (req, res) => {
    res.send(
        req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
    );
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user, null, 2));
});

app.use('/api/article', requiresAuth(), ArticleRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
