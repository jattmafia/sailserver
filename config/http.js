/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {
  
  /****************************************************************************
  *                                                                           *
  * Sails/Express middleware to run for every HTTP request.                   *
  * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
  *                                                                           *
  * https://sailsjs.com/documentation/concepts/middleware                     *
  *                                                                           *
  ****************************************************************************/

  middleware: {
    requestLogger: function (req, res, next) {
      console.log('Request:', req.method, req.url);
      return next();
    },

    // Add your other middleware here...

    // Order matters! Specify the order of middleware here
    order: [
      'requestLogger',
      // Add other middleware names here if any
      'cookieParser',
      'session',
      // ... other middleware
      'bodyParser',
      'compress',
      'poweredBy',
      'router',
      'www',
      'favicon',
      // ... and any other custom middleware you may have
      'finalLogger',  // This should be the last middleware
    ],

    // Do not forget to include the `finalLogger` middleware in the order.
    finalLogger: function (req, res, next) {
      return next();
    },
  
    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/

    // order: [
    //   'cookieParser',
    //   'session',
    //   'bodyParser',
    //   'compress',
    //   'poweredBy',
    //   'router',
    //   'www',
    //   'favicon',
    // 'apiAuth'
    // ],

    //  apiAuth: (function () {
    //   console.log('Initializing `foobar` (HTTP middleware)...');
    //   return function (req, res, next) {
    //     console.log('Received HTTP request: ' + req.method + ' ' + req.path);
    //     if (req.headers['apikey'] == sails.config.custom.APIKEY) {
    //       return next();
    //     } else {
    //       res.status(401);
    //       return res.send({
    //         "message": "Unauthorized Access"
    //       });
    //     }
    //   };
    // })(),
    /***************************************************************************
    *                                                                          *
    * The body parser that will handle incoming multipart HTTP requests.       *
    *                                                                          *
    * https://sailsjs.com/config/http#?customizing-the-body-parser             *
    *                                                                          *
    ***************************************************************************/

    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })(),

  },
 

};
