import ArticleModel from '../models/article.model.js';

const getArticles = async (req, res) => {
    try {
        const articles = await ArticleModel.find();
        if (!articles) {
            return res.status(404).json({ message: 'No articles found' });
        }
        res.status(200).json({articles});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addArticle = async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description || '';
        const content = req.body.content;
        if ([title, content].includes(undefined)) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const article = new ArticleModel({
            title: title,
            description: description,
            content: content
        });
        await article.save();
        res.status(200).json({article});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteArticle = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id){
            return res.status(400).send({message: "Invalid ID"})
        }
        const articleRemoved = await ArticleModel.deleteOne({_id: id});
        if(!articleRemoved){
            return res.status(404).send({message: "Article not found"})
        }
        return res.status(200).send({ message : "Article removed", article: articleRemoved});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const changeArticle = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id){
            res.status(400).json({ message: "Invalid ID" });
        }
        const articleToUpdate = await ArticleModel.findOne({_id: id});
        if (!articleToUpdate) {
            res.status(404).json({ message: "Article not found" });
        }
        const title = req.body.title;
        const description = req.body.description;
        const content = req.body.content;
        if([title, description, content].includes(undefined)){
            res.status(400).json({ message: "All fields are required" });
        }
        articleToUpdate.title = title;
        articleToUpdate.description = description;
        articleToUpdate.content = content;
        await articleToUpdate.save();
        res.status(200).json({ message: "Article updated", article: articleToUpdate });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateArticle = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id){
            res.status(400).json({ message: "Invalid ID" });
        }
        const articleToUpdate = await ArticleModel.findOne({_id: id});
        if (!articleToUpdate) {
            res.status(404).json({ message: "Article not found" });
        }
        const title = req.body.title;
        const description = req.body.description;
        const content = req.body.content;
        if(title == "" && description == "" && content == ""){
            res.status(400).json({ message: "At least one data must be typed" });
        }
        articleToUpdate.title = title || articleToUpdate.title;
        articleToUpdate.description = description || articleToUpdate.description;
        articleToUpdate.content = content || articleToUpdate.content;
        await articleToUpdate.save();
        res.status(200).json({ message: "Article updated", article: articleToUpdate });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getArticles, addArticle, deleteArticle, changeArticle, updateArticle };
