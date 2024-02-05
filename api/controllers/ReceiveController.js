/**
 * ReceiveController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    create: async function (req, res) {
        try {
          const newTransaction = await sails.models.receive.create(req.body).fetch();
          return res.json(newTransaction);
        } catch (err) {
          return res.serverError(err);
        }
      },


      getAllReceive: async function (req, res) {
        try {
          const page = req.query.page || 1;
          const pageSize = req.query.pageSize || 10;
      
          const totalreceive = await sails.models.receive.count(); // Count total number of medicines
      
          const totalPages = Math.ceil(totalreceive / pageSize);
      
          const receive = await Receive.find({
            skip: (page - 1) * pageSize,
            limit: pageSize,
          }).populate('doctor'); // Populate the 'doctor' field
      
          return res.json({
            receive,
            totalPages,
          });
        } catch (err) {
          return res.serverError(err);
        }
      },
};

