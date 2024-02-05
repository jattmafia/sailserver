/**
 * DoctorcontrollerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Doctor = require("../models/Doctor");

const fs = require('fs');
const path = require('path');

module.exports = {
  create: async (req, res) => {

 
    try {
      // Validate the incoming data
      const validationErrors = await sails.models.doctor.findOne({ phone: req.param('phone')})
  
      if (validationErrors) {
        return res.badRequest("Phone Already Exists");
      }

      await  req.file('image').upload({
        dirname: require('path').resolve(sails.config.appPath, 'assets/images/')
      },async function (err, uploadedFiles) {
        if (err) return res.serverError(err);
        const filename = path.basename(uploadedFiles[0].fd);
        const imagePath = '/images/' + filename;
        const serverUrl = req.protocol + '://' + req.get('host');
        const imageUrl = serverUrl + imagePath;
        const doctorData = {
              ...req.body,
              image: imageUrl, // Include image path only if an image was provided
            };
            const createdDoctor = await sails.models.doctor.create(doctorData).fetch();
      
            // Send a custom message and the created doctor in the response
            return res.json({
              message: 'Doctor Added Successfully',
              doctor: createdDoctor,
            });
      });
     
      
    //   const uploadedFile = req.file('image');
    // const imageUrl = `/images/${uploadedFile.filename}`;
    //         console.log(uploadedFile.filename)

    // console.log(imageUrl)

    //   // Create the doctor record, including the image path
    //   const doctorData = {
    //     ...req.body,
    //     image: imageUrl || "", // Include image path only if an image was provided
    //   };
    //   const createdDoctor = await sails.models.doctor.create(doctorData).fetch();

    //   // Send a custom message and the created doctor in the response
    //   return res.json({
    //     message: 'Doctor Added Successfully',
    //     doctor: createdDoctor,
    //   });
    } catch (error) {
      // Log the error and send a server error response
      sails.log.error(error);
      res.serverError('An error occurred while adding the doctor.');
    }
   },

   

   getAllDoctor: async function (req, res) {
    try {
      const page = req.query.page || 1;
      const pageSize = req.query.pageSize || 10;

      const totalDoctor = await sails.models.doctor.count(); // Count total number of medicines

      const totalPages = Math.ceil(totalDoctor / pageSize);

      const doctor = await Doctor.find({
        skip: (page - 1) * pageSize,
        limit: pageSize,
      });

      return res.json({
       doctor,
        totalPages,
      });
    } catch (err) {
      return res.serverError(err);
    }
  },



};
