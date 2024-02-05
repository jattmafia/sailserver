/**
 * Driver.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      isEmail: true,
      required: true,
      unique: true,
    },
    phone: {
      type: 'string',
      required: true,
      unique: true,
    },
    isOnline: {
      type: 'boolean',
      defaultsTo: false,
    },
    latitude: {
      type: 'number',
    },
    longitude: {
      type: 'number',
    },
    image :{type:'string'}
  },

  beforeCreate: async function (values, proceed) {
    if (values.password) {
      const hashedPassword = await bcrypt.hash(values.password, 10);
      values.password = hashedPassword;
    }
    return proceed();
  },

  customToJSON: function () {
    return _.omit(this, ['password']);
  },

  validatePassword: async function (username, password) {
    const driver = await Driver.findOne({ username });
    if (!driver) {
      return false;
    }

    return await bcrypt.compare(password, driver.password);
  },

  

};