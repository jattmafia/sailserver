/**
 * Receive.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    receiveDate: {
      type: 'ref',
      columnType: 'date',
      required: true,
    },
    
    doctor: {
      model: 'Doctor',
      required: true,
    },
   
    sellPrice:{
      type:"number",
      required:true,
    },
    receivedAmount:{
      type:"number"
    }
  },
};

