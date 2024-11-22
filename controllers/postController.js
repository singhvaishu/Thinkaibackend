const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Controller to create a new post
exports.createPost = async (req, res) => {

    try {
        const { title, content, author } = req.body;
        console.log(req.body)
        authorId = req.userId
        let imageUrl = null;

        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const post = new Post({ title, content, authorId, author, image: imageUrl });
        await post.save();

        res.status(201).json({
            message: 'Post created successfully',
            post,
        });
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to get a post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller to get all posts ( filter by authorId)
exports.getAllPosts = async (req, res) => {
    const { authorId, author } = req.query;

    try {
        if (authorId) {
            const posts = await Post.find({ authorId });
            return res.status(200).json(posts);
        } else if (author) {
            const posts = await Post.find(author);
            return res.status(200).json(posts);
        } else {
            const posts = await Post.find();
            return res.status(200).json(posts);
        }

    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Export upload middleware
exports.upload = upload.single('image');
