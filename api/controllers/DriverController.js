/**
 * DriverController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fs = require('fs');
const path = require('path');
module.exports = {

  con: async function (req, res) {
    console.log("bbbbbbb");

    sails.socket.emit('greeting', 'Hello, world!'); // Emit event to all connected clients
    res.json({ message: 'Greeting sent via socket.' });
    // const socketId = sails.sockets.id(req);
    // sails.log.info(`User connected: ${socketId}`);
    // return res.json({ message: 'Connected successfully' });
  },
  create: async function (req, res) {
    try {
      const validationErrors = await sails.models.driver.findOne({ username: req.param('username') })

      if (validationErrors) {
        return res.badRequest("Username Already Exists");
      }
      const validationErrors2 = await sails.models.driver.findOne({ email: req.param('email') })
      if (validationErrors2) {
        return res.badRequest("Email Already Exists");
      }
      await req.file('image').upload({
        dirname: require('path').resolve(sails.config.appPath, 'assets/images/')
      }, async function (err, uploadedFiles) {
        if (err) return res.serverError(err);
        const filename = path.basename(uploadedFiles[0].fd);
        const imagePath = '/images/' + filename;
        const serverUrl = req.protocol + '://' + req.get('host');
        const imageUrl = serverUrl + imagePath;
        const driverData = {
          ...req.body,
          image: imageUrl, // Include image path only if an image was provided
        };
        const createdDriver = await sails.models.driver.create(driverData).fetch();

        // Send a custom message and the created doctor in the response
        return res.json({
          message: 'Driver Added Successfully',
          doctor: createdDriver,
        });
      });
    } catch (err) {
      return res.serverError(err);
    }
  },

  login: async function (req, res) {
    console.log("bbbbbbb");
    try {
      const { username, password } = req.body;

      // Find the doctor by username
      const driver = await sails.models.driver.findOne({ username });

      // Check if the doctor exists
      if (!driver) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Validate the password
      const isValidPassword = await Driver.validatePassword(username, password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Doctor successfully authenticated
      return res.json({ message: 'Login successful', driver });
    } catch (err) {
      return res.serverError(err);
    }
  },

  getAll: async function (req, res) {
    try {
      const page = req.query.page || 1;
      const pageSize = req.query.pageSize || 10;

      const totaldrivers = await sails.models.driver.count(); // Count total number of medicines

      const totalPages = Math.ceil(totaldrivers / pageSize);

      const drivers = await Driver.find({
        skip: (page - 1) * pageSize,
        limit: pageSize,
      });

      return res.json({
        drivers,
        totalPages,
      });
    } catch (err) {
      return res.serverError(err);
    }
  },

  update: async function (req, res) {
    try {

      const { id, isOnline } = req.body;

      const updatedUser = await sails.models.driver.updateOne({ id }).set({ isOnline });

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }


      return res.json(updatedUser);
    } catch (error) {
      return res.serverError(error);
    }
  },



};

