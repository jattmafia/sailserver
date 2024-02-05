const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const sails = require('sails');
const Waterline = require('waterline');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Load Sails.js app
sails.lift({}, (err) => {
  if (err) {
    throw err;
  }

  // Access Sails.js model
  const Driver = sails.models.driver;

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for location updates from the driver
    socket.on('updateLocation', (data) => {
      const { driverId, latitude, longitude } = data;

      // Update the driver's location in the database
      Driver.update({ id: driverId }, { latitude, longitude })
        .then((updatedDrivers) => {
         
            // Emit the updated location to connected users
            io.emit(`locationUpdate${driverId}`, { driverId, latitude, longitude });
         
        })
        .catch((err) => {
          console.error('Error updating driver location:', err);
        });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  server.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
});

// When the Sails.js app lifts, make sure to lower it when the Node.js process exits
// process.on('exit', () => {
//   sails.lower();
// });
