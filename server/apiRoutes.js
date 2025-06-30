const express = require('express');
const authMiddleware = require('./middleware/auth');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const friendController = require('./controllers/friendController');
const messageController = require('./controllers/messageController');

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.get('/search', authMiddleware, userController.searchUsers);

// Friend management routes
router.post('/friend/request', authMiddleware, friendController.sendFriendRequest);
router.post('/friend/accept', authMiddleware, friendController.acceptFriendRequest);
router.post('/friend/reject', authMiddleware, friendController.rejectFriendRequest);
router.get('/friends', authMiddleware, friendController.getFriends);
router.get('/friend/requests', authMiddleware, friendController.getFriendRequests);

// Messaging routes
router.post('/message', authMiddleware, messageController.sendMessage);
router.get('/messages/:userId', authMiddleware, messageController.getMessages);
router.post('/messages/read', authMiddleware, messageController.markMessagesAsRead);
router.get('/messages/unread', authMiddleware, messageController.getUnreadMessageCount);

// Test routes
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
