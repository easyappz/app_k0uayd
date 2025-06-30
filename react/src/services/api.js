import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authApi = {
  login: (data) => API.post('/login', data),
  register: (data) => API.post('/register', data),
};

export const userApi = {
  getProfile: () => API.get('/profile'),
  updateProfile: (data) => API.put('/profile', data),
  searchUsers: (query) => API.get(`/search?query=${encodeURIComponent(query)}`),
};

export const friendApi = {
  sendFriendRequest: (userId) => API.post('/friend/request', { userId }),
  acceptFriendRequest: (userId) => API.post('/friend/accept', { userId }),
  rejectFriendRequest: (userId) => API.post('/friend/reject', { userId }),
  getFriends: () => API.get('/friends'),
  getFriendRequests: () => API.get('/friend/requests'),
};

export const messageApi = {
  sendMessage: (recipientId, content) => API.post('/message', { recipientId, content }),
  getMessages: (userId) => API.get(`/messages/${userId}`),
  markMessagesAsRead: (userId) => API.post('/messages/read', { userId }),
  getUnreadMessageCount: () => API.get('/messages/unread'),
};

export default API;
