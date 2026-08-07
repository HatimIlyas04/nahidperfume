const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const env = require('../config/env');

let io = null;

function init(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const isAllowed =
          env.allowedOrigins.includes(origin) ||
          origin === 'http://localhost:3000' ||
          origin === 'http://localhost:5173' ||
          origin.endsWith('.vercel.app');
        return callback(null, isAllowed);
      },
      credentials: true,
    },
  });

  // Only authenticated admins may join the admin notification room.
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('unauthorized'));
      const payload = jwt.verify(token, env.jwtSecret);
      socket.admin = { id: payload.id, username: payload.username, role: payload.role };
      next();
    } catch (err) {
      next(new Error('unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    socket.join('admins');
    socket.on('disconnect', () => {});
  });

  return io;
}

function emitToAdmins(event, payload) {
  if (!io) return;
  io.to('admins').emit(event, payload);
}

module.exports = { init, emitToAdmins };
