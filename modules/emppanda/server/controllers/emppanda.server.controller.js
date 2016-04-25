'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Order = mongoose.model('Order'),
  Vendor = mongoose.model('Vendor'),
  Employee = mongoose.model('Employee'),
  http = require('http'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
  
/**
 * Login
 */

exports.loginUser = function (req, res) {

   Employee.find({'emailid': req.body.emailid}).exec(function (err, employees) {
  	if (err) {     
	       return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
      });
    } else {
    	if(employees.length > 0) {
    		 if(req.body.password === 'password'){
    		 	if(req.body.deviceid) {
    		 		 Employee.update({ "emailid": req.body.emailid }, { $set: { "deviceid": req.body.deviceid}}, function (err, order) {
					    if (err) {
					      console.log("could not register the device");
					    } else {
					      console.log("Device successfully Registered");
					    }
					  });    		 		
    		 	}
    		 	res.json(employees);
    		 }
    		 else{
    		 	 return res.status(400).send({
          		   message: "Wrong Password"
  	    		  });
  	    	 }
    	}
    	else {
    		 Vendor.find({'emailid': req.body.emailid}).exec(function (err, vendors) {
			  	if (err) {     
				       return res.status(400).send({
			          message: errorHandler.getErrorMessage(err)
			      });
			    } else {
			    	if(vendors.length > 0) {
			    		 if(req.body.password === 'password'){
			    		 	if(req.body.deviceid) {
			    		 		Vendor.update({ "emailid": req.body.emailid }, { $set: { "deviceid": req.body.deviceid}}, function (err, order) {
								    if (err) {
								      console.log("could not register the device");
								    } else {
								      console.log("Device successfully Registered");
								    }
								  });    		 		
			    		 		}
			    		 	 res.json(vendors);
			    		 }
			    		 else{
			    		 	return res.status(400).send({
			          		   message: "Wrong Password"
			  	    		});
			    		 }
			    	}
			    	else {
			    		return res.status(400).send({
			          		   message: "User does not Exist"
			  	    	 });
			    	}
			
			    }
			  });
 
    	}

    }
  });
};




  
/**
 * Add New Vendor
 */
exports.addVendor = function (req, res) {
  
  Vendor.find({'emailid': req.body.emailid}).exec(function (err, vendors) {
  	if (err) {     
	       return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
      });
    } else {
    	if(vendors.length > 0) {
    		 res.send("Vendor Already Exist");
    	}
    	else {
    		 var vendor = new Vendor(req.body);
			  vendor.save(function (err) {
			    if (err) {
			      return res.status(400).send({
			        message: errorHandler.getErrorMessage(err)
			      });
			    } else {
			      res.json(vendor);
			    }
			  });
    	}

    }
  });
  
};



/**
 * List Vendors
 */
exports.listVendors = function (req, res) {
  Vendor.find().sort('-created').exec(function (err, vendors) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(vendors);
    }
  });
};

exports.deleteVendors = function (req, res) {  
  Vendor.remove({role:'Vendor'}).exec();
};

  /**
 * Add New Employee
 */
exports.addEmployee = function (req, res) {
	
  Employee.find({'emailid': req.body.emailid}).exec(function (err, employees) {
  	if (err) {     
	       return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
      });
    } else {
    	if(employees.length > 0) {
    		 res.send("User Already Exist");
    	}
    	else {
    		 var employee = new Employee(req.body);
			  employee.save(function (err) {
			    if (err) {
			      return res.status(400).send({
			        message: errorHandler.getErrorMessage(err)
			      });
			    } else {
			      res.json(employee);
			    }
			  });
    	}

    }
  });
};


exports.listEmployee = function (req, res) {
  Employee.find().sort('-created').exec(function (err, employees) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(employees);
    }
  });
};

exports.deleteEmployee= function (req, res) {
 /* var employee = req.employee;

  employee.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(employee);
    }
  });*/
  
  Employee.remove({role:'Employee'}).exec();
};


exports.orderListForEmp = function (req, res) {
  Order.find(req.query).sort('-created').exec(function (err, orders) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(orders);
    }
  });
};

exports.listOrder = function (req, res) {
 Order.find().sort('-created').exec(function (err, orders) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(orders);
    }
  });

};

exports.orderListForVendor = function (req, res) {
  Order.find(req.query).sort('-created').exec(function (err, orders) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(orders);
    }
  });
};


exports.placeOrder = function (req, res) {
   var order = new Order(req.body);
  //vendor.user = req.user;

  order.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(order);
      
      //Send an SMS to Vendor      
      var vendorMsg = "You have got a new order from " + order.orderbyname + ". Order number is " + order.ordernumber;       
      var sParameter = encodeURIComponent(vendorMsg.trim());
      // var smspath  = "/?auth=363AC9E2AA6F6CE158EB73674BB22&to=" + order.ordertophoneno + "&msg=" + sParameter;
      var smspath  = "/?auth=363AC9E2AA6F6CE158EB73674BB22&to=9049772849&msg=" + sParameter;
           
      var options = {
        host: 'smsapi.mybluemix.net',
        port: 80,
        path: smspath,
        };

        http.request(options, function(res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
        }).end();
        
        
          //Send a Push notification to Vendor         
        Vendor.find({'emailid': order.orderto}).exec(function (err, vendors) {
		    if (err) {
		     console.log("could not fetch device Id");
		    } else {
		    	
		    	var deviceid = vendors[0].deviceid;
		    	var pushpath  = "/push.php?deviceId=" + deviceid + "&message=" + sParameter + "&auth=YG2O80B1Q99s6tQaMlR4RA2f0o3q5LnO";  
		    	
		    	console.log(deviceid  + "-------->>>" + pushpath);
		        var pushOptions = {
		        host: 'smsapi.mybluemix.net',
		        port: 80,
		        path: pushpath,
		        };        
		
		        http.request(pushOptions, function(res) {
		            console.log('STATUS: ' + res.statusCode);
		            console.log('HEADERS: ' + JSON.stringify(res.headers));
		            res.setEncoding('utf8');
		            res.on('data', function (chunk) {
		                console.log('BODY: ' + chunk);
		            });
		        }).end();
		    }
		});
    }
  });
};

exports.updateOrder = function (req, res) {
   Order.update({ "_id": req.body.id }, { $set: { "status": req.body.status}}, function (err, order) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(order);
      
      //Get Updated Order
      console.log("Getting Updated Order");
      var updatedOrder = {};
      Order.find({ "_id": req.body.id }).exec(function (err, orders) {
	    if (err) {
	      return res.status(400).send({
	        message: errorHandler.getErrorMessage(err)
	      });
	    } else {
	      order = orders[0];
	      console.log("Got Updated Order" + JSON.stringify(order));
	      
	       console.log(order.status);
      console.log(order.status == "Order is Ready");
      if(order.status == "Order is Ready") {
      	  console.log("INSIDE BLOCK");
	     //Send an SMS to Employee      
	      var employeeMsg = "Your order number " + order.ordernumber + " is ready to collect from " + order.ordertoname;       
	      var sParameter = encodeURIComponent(employeeMsg.trim());
	      var smspath  = "/?auth=363AC9E2AA6F6CE158EB73674BB22&to=" + order.orderbyphoneno + "&msg=" + sParameter;
	    	var smspath  = "/?auth=363AC9E2AA6F6CE158EB73674BB22&to=9049772849&msg=" + sParameter;
	           
	      var options = {
	        host: 'smsapi.mybluemix.net',
	        port: 80,
	        path: smspath,
	        };
	
	        http.request(options, function(res) {
	            console.log('STATUS: ' + res.statusCode);
	            console.log('HEADERS: ' + JSON.stringify(res.headers));
	            res.setEncoding('utf8');
	            res.on('data', function (chunk) {
	                console.log('BODY: ' + chunk);
	            });
	        }).end();
	        
	        
	        //Send a Push notification to Employee         
	        Employee.find({'emailid': order.orderby}).exec(function (err, employees) {
			    if (err) {
			     console.log("could not fetch device Id");
			    } else {
			    	var deviceid = employees[0].deviceid;
			    	var pushpath  = "/push.php?deviceId=" + deviceid + "&message=" + sParameter + "&auth=YG2O80B1Q99s6tQaMlR4RA2f0o3q5LnO";
			    	
			        var pushOptions = {
			        host: 'smsapi.mybluemix.net',
			        port: 80,
			        path: pushpath,
			        };        
			
			        http.request(pushOptions, function(res) {
			            console.log('STATUS: ' + res.statusCode);
			            console.log('HEADERS: ' + JSON.stringify(res.headers));
			            res.setEncoding('utf8');
			            res.on('data', function (chunk) {
			                console.log('BODY: ' + chunk);
			            });
			        }).end();
			    }
			});
	      
	    }
	  }
      	
      });
      
    }
  });
};


exports.deleteOrder= function (req, res) {
 Order.remove().exec();
};



