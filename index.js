/*
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getPosts, getPostById, createPost, updatePost, deletePost } = require('./crudOperations');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/posts', async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});

app.get('/posts/:id', async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve post' });
  }
});

app.post('/posts', async (req, res) => {
  try {
    const newPost = await createPost(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

app.put('/posts/:id', async (req, res) => {
  try {
    const updatedPost = await updatePost(req.params.id, req.body);
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

app.delete('/posts/:id', async (req, res) => {
  try {
    const deletedPost = await deletePost(req.params.id);
    res.json(deletedPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/






/*
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getPosts, getPostById, createPost, updatePost, deletePost } = require('./crudOperations');

const app = express();

// CORS Configuration to only allow your specific frontend
const corsOptions = {
    origin: 'http://localhost:5173', // Only allow this origin to make requests
    methods: 'GET,POST,PUT,DELETE', // Allowed methods
    allowedHeaders: 'Content-Type,Authorization', // Allowed headers
    credentials: true, // If you need cookies/token authorization
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/posts', async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});

app.get('/posts/:id', async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve post' });
  }
});

app.post('/posts', async (req, res) => {
  try {
    const newPost = await createPost(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

app.put('/posts/:id', async (req, res) => {
  try {
    const updatedPost = await updatePost(req.params.id, req.body);
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

app.delete('/posts/:id', async (req, res) => {
  try {
    const deletedPost = await deletePost(req.params.id);
    res.json(deletedPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/




require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { getPosts, getPostById, createPost, updatePost, deletePost } = require('./crudOperations');

const app = express();

// CORS Configuration to only allow your specific frontend
const corsOptions = {
    origin: 'http://localhost:5173',  // Only allow this origin to make requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Specify allowed headers
    credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 200  // Response to preflight request
};

app.use(cors(corsOptions));
app.use(express.json()); // Use Express's built-in body parser to parse JSON

// Route to fetch all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});

// Route to fetch a single post by ID
app.get('/posts/:id', async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve post' });
  }
});

// Route to create a new post
app.post('/posts', async (req, res) => {
  try {
    const newPost = await createPost(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Route to update a post
app.put('/posts/:id', async (req, res) => {
  try {
    const updatedPost = await updatePost(req.params.id, req.body);
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Route to delete a post
app.delete('/posts/:id', async (req, res) => {
  try {
    const deletedPost = await deletePost(req.params.id);
    res.json(deletedPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Route to fetch lorem ipsum text
app.get('/api/fetch-lorem', (req, res) => {
    const url = 'https://loripsum.net/api/1/short/plaintext';

    // Making a request to loripsum.net directly from the backend
    axios.get(url)
        .then(response => {
            // Sending the fetched data back to the frontend
            res.send(response.data);
        })
        .catch(error => {
            console.error('Failed to fetch lorem ipsum:', error);
            res.status(500).send('Failed to fetch data');
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
