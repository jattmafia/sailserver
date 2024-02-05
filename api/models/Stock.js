/**
 * Stock.js
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
    user: {
      model: 'Users',
      required: true,
    },
    quantity: {
      type: 'number',
      required: true,
      min: 1,
    },
  },
};

