import { db } from '../db.js';

export const searchUsers = async (req, res) => {
  const { q } = req.query;

  try {
    const data = await db.pool.query(
      'SELECT * FROM users WHERE username LIKE ?',
      [`%${q}%`],
    );
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const followUser = async (req, res) => {
  const followerId = req.user.id; // Assuming the ID of the follower is obtained from the request user object
  const followeeId = parseInt(req.params.userId); // Assuming the ID of the followee is obtained from the route parameter

  const checkQuery =
    'SELECT * FROM followers WHERE follower_id = ? AND followee_id = ?';
  const insertQuery =
    'INSERT INTO followers (follower_id, followee_id) VALUES (?, ?)';

  try {
    const existingRelationship = await db.pool.query(checkQuery, [
      followerId,
      followeeId,
    ]);
    if (existingRelationship.length > 0) {
      return res.status(400).json({ error: 'Already following this user' });
    }

    await db.pool.query(insertQuery, [followerId, followeeId]);
    return res.status(200).json({ message: 'User followed successfully' });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const unfollowUser = async (req, res) => {
  const followerId = req.user.id; // Assuming the ID of the follower is obtained from the request user object
  const followeeId = req.params.userId; // Assuming the ID of the followee is obtained from the route parameter

  const checkQuery =
    'SELECT * FROM followers WHERE follower_id = ? AND followee_id = ?';
  const deleteQuery =
    'DELETE FROM followers WHERE follower_id = ? AND followee_id = ?';

  try {
    const existingRelationship = await db.pool.query(checkQuery, [
      followerId,
      followeeId,
    ]);
    if (existingRelationship.length === 0) {
      return res.status(400).json({ error: 'Not following this user' });
    }

    await db.pool.query(deleteQuery, [followerId, followeeId]);
    return res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const getUser = async (req, res) => {
  const username = req.params.username; // Assuming the username is passed as a route parameter

  const query = `
    SELECT 
      u.id,
      u.username,
      u.email,
      u.img,
      CAST(COUNT(DISTINCT f1.id) AS INT) AS follower_count,
      CAST(COUNT(DISTINCT f2.id) AS INT) AS following_count,
      GROUP_CONCAT(DISTINCT f1.follower_id) AS followers,
      GROUP_CONCAT(DISTINCT f2.followee_id) AS following
    FROM users u
    LEFT JOIN followers f1 ON f1.followee_id = u.id
    LEFT JOIN followers f2 ON f2.follower_id = u.id
    WHERE u.username = ?
    GROUP BY u.id, u.username, u.email, u.img;
  `;

  try {
    const data = await db.pool.query(query, [username]);
    if (data.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = data[0];
    user.follower_count = Number(user.follower_count); // Convert to number
    user.following_count = Number(user.following_count); // Convert to number
    user.followers = user.followers
      ? user.followers.split(',').map(Number)
      : [];
    user.following = user.following
      ? user.following.split(',').map(Number)
      : [];

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const getNotifications = async (req, res) => {

  const userId = req.user.id;

  const query = `
    SELECT * FROM notifications
    WHERE uid = ?;
  `;

  try {
    const data = await db.pool.query(query, [userId]);

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json('Error retrieving notifications');
  }
};
