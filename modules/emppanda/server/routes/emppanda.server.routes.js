'use strict';

/**
 * Module dependencies
 */
var emppandaPolicy = require('../policies/emppanda.server.policy'),
  emppanda = require('../controllers/emppanda.server.controller');

module.exports = function (app) {
	
	app.use(function(req, res, next){
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
	});


  // Articles collection routes
  app.route('/api/vendors').all(emppandaPolicy.isAllowed)
    .get(emppanda.listVendors)
    .post(emppanda.addVendor)
    .delete(emppanda.deleteVendors);
    
  app.route('/api/vendors/getorders').all(emppandaPolicy.isAllowed)
    .get(emppanda.orderListForVendor);
  
   
    // Single article routes
  app.route('/api/employee').all(emppandaPolicy.isAllowed)
  	.get(emppanda.listEmployee)
    .post(emppanda.addEmployee)
    .delete(emppanda.deleteEmployee);
    
  app.route('/api/employee/getorders').all(emppandaPolicy.isAllowed)
    .get(emppanda.orderListForEmp);
    
  
  app.route('/api/order').all(emppandaPolicy.isAllowed)
    .get(emppanda.listOrder)
    .post(emppanda.placeOrder)
    .put(emppanda.updateOrder)
    .delete(emppanda.deleteOrder);


  app.route('/api/login').all(emppandaPolicy.isAllowed)
    .post(emppanda.loginUser); 
	
  app.route('/api/addsapemployee')
  .post(emppanda.addSAPEmployee)
   app.route('/api/getsapemployee/:sapID')
  .get(emppanda.getSAPEmployee)
   app.route('/api/updatesapemployeetask/:sapID')
  .post(emppanda.updateSAPEmployee) 
};