import express from 'express';
import { getArticles, addArticle, deleteArticle, changeArticle, updateArticle } from '../controllers/ArticleController.js';

const ArticleRouter = express.Router();

ArticleRouter.get('/', async (req, res) => {
    getArticles(req, res);
});

ArticleRouter.post('/', async (req, res) => {
    addArticle(req, res);
});

ArticleRouter.delete('/:id', async (req, res) => {
    deleteArticle(req, res);
});

ArticleRouter.put('/:id', async (req, res) => {
    changeArticle(req, res);
});
ArticleRouter.patch('/:id', async (req, res) => {
    updateArticle(req, res);
});

export default ArticleRouter;
