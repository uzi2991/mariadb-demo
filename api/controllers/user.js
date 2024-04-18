import { db } from '../db.js';

export const getUser = async (req, res) => {
  const username = req.params.username; // Assuming the username is passed as a route parameter

  const query = 'SELECT id, username, email, img FROM users WHERE username = ?';

  try {
    const data = await db.pool.query(query, [username]);
    if (data.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = data[0];
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};