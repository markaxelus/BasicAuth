import { Article } from '../models/articleModel.js';
import express from 'express';

const articleRouter = express.Router();

// POST: Create a new article
articleRouter.post('/', async (req, res) => {
    try {
        const { title, content, author } = req.body;
        if (!title || !content || !author) {
            res.status(400).send({ message: "Input all required fields"});
        }
        const newArticle = new Article({ title, content, author});
        await newArticle.save();
        res.status(201).json({ message: "Article successfull created", article: newArticle});
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
});

// GET: Retrieve all articles
articleRouter.get('/', async (req, res) => {
    try {
        const articles = await Article.find().populate('author', 'username');
        res.status(200).json(articles);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// GET: Retrieve an article by ID
articleRouter.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('author', 'username');
        if(!article) {
            return res.status(404).json({ error: "Article not found"});
        }
        res.status(200).json(article);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT: Update an article
articleRouter.put('/:id', async (req, res) => {
    try {
        const { title, content } = req.body;
        const article = await Article.findByIdAndUpdate(req.params.id, 
            {
                title,
                content,
                updatedAt: Date.now()
            },
            {
                new: true
            });
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.status(200).json(article);
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE: Delete an article
articleRouter.delete('/:id', async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.status(200).json({ message: "Article deleted successfully" });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

export default articleRouter;