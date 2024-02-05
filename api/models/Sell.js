/**
 * Sell.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    transactionDate: {
      type: 'ref',
      columnType: 'date',
      required: true,
    },
    medicine: {
      model: 'Medicine',
      required: true,
    },
    doctor: {
      model: 'Doctor',
      required: true,
    },
    type: {
      type: 'string',
      required: true,
    },
    quantity:{
      type:"number",
      required:true,
      min:1,
    },
    sellPrice:{
      type:"number",
      required:true,
    },
    totalPrice:{
      type:"number"
    },
    image :{type:'string'}
  },
};

