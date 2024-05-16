import { db } from '../db.js';
import moment from 'moment';

export const sendNotificationToFollowers = async (userId, postId) => {
  try {
    // Fetch the username of the user
    const query = 'SELECT username FROM users WHERE id = ?';
    const user = await db.pool.query(query, [userId]);

    if (user.length === 0) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    const username = user[0].username;

    // Fetch the followers of the user
    const followersQuery =
      'SELECT follower_id FROM followers WHERE followee_id = ?';
    const followers = await db.pool.query(followersQuery, [userId]);

    // Iterate over the followers and send notifications
    followers.forEach(async (follower) => {
      const notification = {
        content: `${username} created a new post`,
        url: `/post/${postId}`, // Example URL for the post
        uid: follower.follower_id,
        is_read: false,
        date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), // Current date and time
      };

      // Save the notification in the database
      await saveNotification(notification);
    });
  } catch (err) {
    console.log(err);
    // Handle any errors that occur during the process
  }
};

export const saveNotification = async (notification) => {
  try {
    // Save the notification in the database
    const query =
      'INSERT INTO notifications (content, url, uid, is_read, date) VALUES (?, ?, ?, ?, ?)';
    const values = [
      notification.content,
      notification.url,
      notification.uid,
      notification.is_read,
      notification.date,
    ];
    await db.pool.query(query, values);
  } catch (err) {
    console.log(err);
    // Handle any errors that occur during the process
  }
};
