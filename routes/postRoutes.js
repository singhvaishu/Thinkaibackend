
const express = require('express');
const { createPost, getAllPosts, upload, getPostById, } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', authMiddleware, upload, createPost);
router.get('/:id', authMiddleware, getPostById);

module.exports = router;
