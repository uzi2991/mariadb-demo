import { db } from '../db.js';
import jwt from 'jsonwebtoken';
import { sendNotificationToFollowers } from '../utils/notification.js';

export const searchPosts = async (req, res) => {
  const { q } = req.query;

  try {
    const data = await db.pool.query('SELECT * FROM posts WHERE title LIKE ?', [
      `%${q}%`,
    ]);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const getPosts = async (req, res) => {
  const { cat, uid } = req.query;
  let q = 'SELECT * FROM posts ORDER BY date DESC';

  const params = [];
  if (cat && uid) {
    q = 'SELECT * FROM posts WHERE cat=? AND uid=? ORDER BY date DESC';
    params.push(cat, uid);
  } else if (cat) {
    q = 'SELECT * FROM posts WHERE cat=? ORDER BY date DESC';
    params.push(cat);
  } else if (uid) {
    q = 'SELECT * FROM posts WHERE uid=? ORDER BY date DESC';
    params.push(uid);
  }

  try {
    const data = await db.pool.query(q, params);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const getPost = async (req, res) => {
  const q =
    'SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ';
  try {
    const data = await db.pool.query(q, [req.params.id]);
    return res.status(200).json(data[0]);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const addPost = async (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json('Not authenticated!');

  try {
    const decoded = jwt.verify(token, 'jwtkey');
    const q =
      'INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)';
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      decoded.id,
    ];

    try {
      const result = await db.pool.query(q, [values]);
      const postId = result.insertId;

      res.json('Post has been created.');

      await sendNotificationToFollowers(decoded.id, postId);

      return;
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  } catch (err) {
    console.log(err);
    return res.status(403).json('Token is not valid!');
  }
};

export const deletePost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  try {
    const decoded = jwt.verify(token, 'jwtkey');
    const postId = req.params.id;
    const q = 'DELETE FROM posts WHERE `id` = ? AND `uid` = ?';
    try {
      await db.pool.query(q, [postId, decoded.id]);
      return res.json('Post has been deleted!');
    } catch (err) {
      return res.status(403).json('You can delete only your post!');
    }
  } catch (err) {
    return res.status(403).json('Token is not valid!');
  }
};

export const updatePost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  try {
    const decoded = jwt.verify(token, 'jwtkey');
    const postId = req.params.id;
    const q =
      'UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?';

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    try {
      await db.pool.query(q, [...values, postId, decoded.id]);
      return res.json('Post has been updated!');
    } catch (err) {
      return res.status(500).json(err);
    }
  } catch (err) {
    return res.status(403).json('Token is not valid!');
  }
};
