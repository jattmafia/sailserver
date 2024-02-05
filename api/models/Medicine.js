/**
 * Medicine.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    medicineName: {
      type: 'string',
      required: true,
    },
    medicineUnit: {
      type: 'string',
      required: true,
    },
    retailPrice: {
      type: 'number',
      required: true,
    },
    sellPrice: {
      type: 'number',
      required: true,
    },
  },

};

