import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'https://gigflow-backend-4av3.onrender.com';

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});

export const initializeSocket = (userId) => {
  if (!socket.connected) {
    socket.connect();
  }
  socket.emit('register', userId);
  console.log('Socket initialized for user:', userId);
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
