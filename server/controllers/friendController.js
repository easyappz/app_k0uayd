const User = require('../models/User');

// Send friend request
exports.sendFriendRequest = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    if (userId.toString() === req.user.id.toString()) {
      return res.status(400).json({ message: 'Cannot send friend request to yourself' });
    }

    const recipient = await User.findById(userId);
    if (!recipient) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (recipient.friendRequests.includes(req.user.id) || recipient.friends.includes(req.user.id)) {
      return res.status(400).json({ message: 'Friend request already sent or user is already a friend' });
    }

    recipient.friendRequests.push(req.user.id);
    await recipient.save();

    res.json({ message: 'Friend request sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending friend request', error: error.message });
  }
};

// Accept friend request
exports.acceptFriendRequest = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(req.user.id);
    if (!user.friendRequests.includes(userId)) {
      return res.status(400).json({ message: 'No friend request from this user' });
    }

    user.friends.push(userId);
    user.friendRequests = user.friendRequests.filter(id => id.toString() !== userId.toString());
    await user.save();

    const sender = await User.findById(userId);
    sender.friends.push(req.user.id);
    await sender.save();

    res.json({ message: 'Friend request accepted' });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting friend request', error: error.message });
  }
};

// Reject friend request
exports.rejectFriendRequest = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(req.user.id);
    if (!user.friendRequests.includes(userId)) {
      return res.status(400).json({ message: 'No friend request from this user' });
    }

    user.friendRequests = user.friendRequests.filter(id => id.toString() !== userId.toString());
    await user.save();

    res.json({ message: 'Friend request rejected' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting friend request', error: error.message });
  }
};

// Get friends list
exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friends', 'username profile');
    res.json(user.friends);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching friends list', error: error.message });
  }
};

// Get friend requests
exports.getFriendRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friendRequests', 'username profile');
    res.json(user.friendRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching friend requests', error: error.message });
  }
};
