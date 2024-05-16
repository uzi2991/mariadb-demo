import { db } from '../db.js';
import jwt from 'jsonwebtoken';
import { saveNotification } from '../utils/notification.js';
import moment from 'moment';

export const addComment = async (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json('Not authenticated!');
  try {
    const decoded = jwt.verify(token, 'jwtkey');
    const q =
      'INSERT INTO comments(`content`, `username`, `date`, `uid`, `pid`) VALUES (?)';
    const values = [
      req.body.content,
      req.body.username,
      req.body.date,
      decoded.id,
      req.body.pid,
    ];

    try {
      const result = await db.pool.query(q, [values]);
      const commentId = result.insertId;

      res.json('Comment has been added.');

      // Fetch the post owner ID
      const postQuery = 'SELECT uid FROM posts WHERE id = ?';
      const postResult = await db.pool.query(postQuery, [req.body.pid]);
      const postOwnerId = postResult[0].uid;

      // Send notification to the post owner
      const notification = {
        content: `${req.body.username} commented on your post.`,
        url: `/post/${req.body.pid}#c${commentId}`,
        uid: postOwnerId,
        is_read: false,
        date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      };

      await saveNotification(notification);

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

export const getComments = async (req, res) => {
  const pid = req.query.pid; // Assuming the post ID is passed as a query parameter

  const query = 'SELECT * FROM comments WHERE pid = ? ORDER BY date DESC';

  try {
    const data = await db.pool.query(query, [pid]);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).send(err);
  }
};
