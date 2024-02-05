/**
 * SocketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
// api/controllers/SocketController.js

const socketIO = require('socket.io');

module.exports = {
  initialize: function (cb) {
    const io = socketIO(sails.hooks.http.server);

    io.on('connection', function (socket) {
      sails.log.info(`Socket ${socket.id} connected`);

      // Example: Send a welcome message to the client
      socket.emit('welcome', 'Hello, client!');
    });

    cb();
  },
};
