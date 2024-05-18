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
      u.img
    FROM users u
    WHERE u.username = ?
   
  `;

  try {
    const data = await db.pool.query(query, [username]);
    if (data.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = data[0];

    const getFollowersQuery = `
      SELECT
        u.id,
        u.username,
        u.img,
        u.email
      FROM users u
      JOIN followers f ON f.follower_id = u.id
      WHERE f.followee_id = ?
    `;
    const followersData = await db.pool.query(getFollowersQuery, [user.id]);

    const getFollowingsQuery = `
      SELECT
        u.id,
        u.username,
        u.img,
        u.email
      FROM users u
      JOIN followers f ON f.followee_id = u.id
      WHERE f.follower_id = ?
    `;

    const followingsData = await db.pool.query(getFollowingsQuery, [user.id]);

    return res
      .status(200)
      .json({ ...user, followers: followersData, followings: followingsData });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const getNotifications = async (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT * FROM notifications
    WHERE uid = ?
    ORDER BY date DESC;
  `;

  try {
    const data = await db.pool.query(query, [userId]);

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json('Error retrieving notifications');
  }
};

export const readNotification = async (req, res) => {
  const { notificationId } = req.params;

  try {
    // Update the notification in the database to mark it as read
    await db.pool.query(
      'UPDATE notifications SET is_read = true WHERE id = ?',
      [notificationId],
    );

    return res.json('Notification marked as read.');
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
