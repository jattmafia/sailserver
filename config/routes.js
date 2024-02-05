/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {},
  "POST /api/doctor": 'DoctorController.create',
  'GET /medicine/getAllDoctor': 'DoctorController.getAllDoctor',
  'POST /medicine': 'MedicineController.create',
  'GET /medicine/getAllMedicines': 'MedicineController.getAllMedicines',
  'POST /stock/create': 'StockController.create',
  'GET /stock': 'StockController.getAll',
  'DELETE /medicine/delete/:id': 'MedicineController.deleteMedicine',
  'PUT /medicine/update/:id': 'MedicineController.updateMedicine',
  'DELETE /stock/delete/:id': 'StockController.deleteStock',
  'PUT /stock/update/:id': 'StockController.updateStock',
  'POST /sell/create': 'SellController.create',
  'Get /sell/all': 'SellController.getSell',
  'Get /gift/all': 'SellController.getGift',
  'POST /receive/create': 'ReceiveController.create',
  'GET /receive/all': 'ReceiveController.getAllReceive',
  'POST /driver/create': 'DriverController.create',
  'POST /driver/login': 'DriverController.login',
  'GET /socket/connect': 'DriverController.con',
  'GET /driver/get': 'DriverController.getAll',
  'PUT /driver/update': 'DriverController.update',
  'GET /user/all': 'UsercontrollerController.getAll',
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
