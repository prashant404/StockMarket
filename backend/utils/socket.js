const socketIo = require('socket.io');

const setupSocket = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

module.exports = setupSocket;
