/**
 * LocationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    subscribeToLocationUpdates: function (req, res) {
        console.log("located");
      if (!req.isSocket) {
        return res.badRequest('This endpoint only supports socket requests.');
      }
  
      const socket = req.socket;
      const userId = req.session.userId; // Adjust this based on your authentication mechanism
  
      if (!userId) {
        return res.badRequest('User not authenticated.');
      }
  
      // Join the 'user' room for this user
      sails.sockets.join(socket, 'user_' + userId);
  
      return res.ok();
    },
  };
  

