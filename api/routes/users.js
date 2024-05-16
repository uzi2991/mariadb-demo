import express from 'express';
import {
  getUser,
  searchUsers,
  followUser,
  unfollowUser,
  getNotifications,
  readNotification,
} from '../controllers/user.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.get('/search', searchUsers);
router.get('/notifications', authMiddleware, getNotifications);
router.post('/notifications/:notificationId', authMiddleware, readNotification);
router.post('/follow/:userId', authMiddleware, followUser);
router.post('/unfollow/:userId', authMiddleware, unfollowUser);

router.get('/u/:username', getUser);

export default router;
