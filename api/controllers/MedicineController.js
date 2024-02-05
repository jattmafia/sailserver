/**
 * MedicineController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    create: async function (req, res) {
        try {
          const newMedicine = await sails.models.medicine.create(req.body).fetch();
          return res.json(newMedicine);
        } catch (err) {
          return res.serverError(err);
        }
      },

      getAllMedicines: async function (req, res) {
        try {
          const page = req.query.page || 1;
          const pageSize = req.query.pageSize || 10;
    
          const totalMedicines = await sails.models.medicine.count(); // Count total number of medicines
    
          const totalPages = Math.ceil(totalMedicines / pageSize);
    
          const medicines = await Medicine.find({
            skip: (page - 1) * pageSize,
            limit: pageSize,
          });
    
          return res.json({
            medicines,
            totalPages,
          });
        } catch (err) {
          return res.serverError(err);
        }
      },


      deleteMedicine: async function (req, res) {
        try {
          const medicineId = req.param('id');
    

          const foundMedicine = await sails.models.medicine.findOne({ id: medicineId });
          if (!foundMedicine) {
            return res.status(404).json({ message: 'Medicine not found' });
          }
    

          await Medicine.destroy({ id: medicineId });
    
          return res.json({ message: 'Medicine deleted successfully' });
        } catch (err) {
          return res.serverError(err);
        }
      },


      updateMedicine: async function (req, res) {
        try {
          const medicineId = req.param('id');
          const updatedMedicineData = req.body;

          const foundMedicine = await sails.models.medicine.findOne({ id: medicineId });
          if (!foundMedicine) {
            return res.status(404).json({ message: 'Medicine not found' });
          }
    
          const updatedMedicine = await sails.models.medicine.updateOne({ id: medicineId }).set(updatedMedicineData);
    
          return res.json({ message: 'Medicine updated successfully', updatedMedicine });
        } catch (err) {
          return res.serverError(err);
        }
      },

};

