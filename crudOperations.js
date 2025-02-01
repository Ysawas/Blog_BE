const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const getPosts = async () => {
  const { rows } = await pool.query('SELECT * FROM posts ORDER BY date DESC');
  return rows;
};

const getPostById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return rows.length ? rows[0] : null;
};

const createPost = async (post) => {
  const { title, author, content, cover } = post;
  const { rows } = await pool.query(
    'INSERT INTO posts (title, author, content, cover) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, author, content, cover]
  );
  return rows[0];
};

const updatePost = async (id, post) => {
    const { title, author, content, cover } = post;
    const { rows } = await pool.query(
      'UPDATE posts SET title = $1, author = $2, content = $3, cover = $4 WHERE id = $5 RETURNING *',
      [title, author, content, cover, id]
    );
    return rows[0];
  };
  

const deletePost = async (id) => {
  const { rows } = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
  return rows[0];
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
