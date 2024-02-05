/**
 * SellController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fs = require('fs');
const path = require('path');
module.exports = {
  create: async function (req, res) {
    try {
      await req.file('image').upload({
        dirname: require('path').resolve(sails.config.appPath, 'assets/images/')
      }, async function (err, uploadedFiles) {
        if (err) return res.serverError(err);
        const filename = path.basename(uploadedFiles[0].fd);
        const imagePath = '/images/' + filename;
        const serverUrl = req.protocol + '://' + req.get('host');
        const imageUrl = serverUrl + imagePath;
        const data = {
          ...req.body,
          image: imageUrl,
        };
        const createdSell = await sails.models.sell.create(data).fetch();

        return res.json({
          message: 'Sell Added Successfully',
          doctor: createdSell,
        });
      }

      )


    } catch (err) {
      return res.serverError(err);
    }
  },

  getSell: async function (req, res) {
    try {
      const page = req.query.page || 1;
      const pageSize = req.query.pageSize || 10;

      const totalTransactions = await sails.models.sell.count({
        where: {
          type: 'Sell',
        },
      });

      const totalPages = Math.ceil(totalTransactions / pageSize);

      const sellTransactions = await sails.models.sell.find({
        where: {
          type: 'Sell',
        },
        skip: (page - 1) * pageSize,
        limit: pageSize,
      }).populate('medicine').populate('doctor');

      return res.json({
        sellTransactions,
        totalPages,
      });
    } catch (err) {
      return res.serverError(err);
    }
  },


  getGift: async function (req, res) {
    try {
      const page = req.query.page || 1;
      const pageSize = req.query.pageSize || 10;

      const totalTransactions = await sails.models.sell.count({
        where: {
          type: 'Gift',
        },
      });

      const totalPages = Math.ceil(totalTransactions / pageSize);

      const sellTransactions = await sails.models.sell.find({
        where: {
          type: 'Gift',
        },
        skip: (page - 1) * pageSize,
        limit: pageSize,
      }).populate('medicine').populate('doctor');

      return res.json({
        sellTransactions,
        totalPages,
      });
    } catch (err) {
      return res.serverError(err);
    }
  },




};

