/**
 * StockController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    create: async function (req, res) {
        try {
          const newTransaction = await sails.models.stock.create(req.body).fetch();
          return res.json(newTransaction);
        } catch (err) {
          return res.serverError(err);
        }
      },

      getAll: async function (req, res) {
        try {
          const page = req.query.page || 1;
          const pageSize = req.query.pageSize || 10;
    
          const totalStocks = await  sails.models.stock.count();
    
          const totalPages = Math.ceil(totalStocks / pageSize);
    
          const stocks = await  sails.models.stock.find({
            skip: (page - 1) * pageSize,
            limit: pageSize,
          }).populate('user')
          .populate('medicine');
    
          // Manually filter user attributes
          const filteredStocks = stocks.map((stock) => {
            if (stock.user) {
              return {
                ...stock,
                user: {
                  id: stock.user.id,
                  username: stock.user.username,
                  name:stock.user.name,
                  phone:stock.user.phone,
                  // Add other user attributes you want to include
                },
              };
            }
            return stock;
          });
    
          return res.json({
            stocks: filteredStocks,
            totalPages,
          });
        } catch (err) {
          return res.serverError(err);
        }
      },

      deleteStock: async function (req, res) {
        try {
          const stockId = req.param('id');
    

          const foundStock = await sails.models.stock.findOne({ id: stockId });
          if (!foundStock) {
            return res.status(404).json({ message: 'Stock not found' });
          }
    

          await Stock.destroy({ id: stockId });
    
          return res.json({ message: 'Stock deleted successfully' });
        } catch (err) {
          return res.serverError(err);
        }
      },


      updateStock: async function (req, res) {
        try {
          const stockId = req.param('id');
          const updatedStockData = req.body;

          const foundStock= await sails.models.stock.findOne({ id: stockId });
          if (!foundStock) {
            return res.status(404).json({ message: 'Stock not found' });
          }
    
          const updatedStock = await sails.models.stock.updateOne({ id: stockId}).set(updatedStockData)

          
    
          return res.json({ message: 'Stock updated successfully', updatedStock});
        } catch (err) {
          return res.serverError(err);
        }
      },
};

