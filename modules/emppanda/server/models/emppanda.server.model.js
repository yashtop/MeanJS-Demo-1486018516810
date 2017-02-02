'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  
function sequenceGenerator(name){
  var SequenceSchema, Sequence;

  SequenceSchema = new mongoose.Schema({
    nextSeqNumber: { type: Number, default: 1 }
  });

  Sequence = mongoose.model(name + 'Seq', SequenceSchema);

  return {
    next: function(callback){
      Sequence.find(function(err, data){
        if(err){ throw(err); }

        if(data.length < 1){
          // create if doesn't exist create and return first
          Sequence.create({}, function(err, seq){
            if(err) { throw(err); }
            callback(seq.nextSeqNumber);
          });
        } else {
          // update sequence and return next
          Sequence.findByIdAndUpdate(data[0]._id, { $inc: { nextSeqNumber: 1 } }, function(err, seq){
            if(err) { throw(err); }
            callback(seq.nextSeqNumber);
          });
        }
      });
    }
  };
}

var sequence = sequenceGenerator('todo');

  
var EmployeeSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  phonenumber: Number,
  emailid: String, 
  role: {
  	 type: String,
     default: 'Employee'
  },
  location:{
  	type: String,
    default: 'PDC1'
  },
   deviceid: {
    type: String,
    default: ''
  }
});

var MenuItemSchema = new Schema({
 itemname: String,
 category: String,
 rate: Number,
 quantity: {
  	 type: Number,
     default: 0
  }
});


var VendorSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  phonenumber: Number,
  emailid: String, 
  role: {
  	 type: String,
     default: 'Vendor'
  },
  location:{
  	type: String,
    default: 'PDC1'
  },
  imgname: String,  
  deviceid: {
    type: String,
    default: ''
  }, 
  menu: [MenuItemSchema]
});

var EmpSAPSchema = new Schema({
Image: String,
Name: String,
Designation: String,
JoiningDate: String,
EnterprizeID: String,
EmployeeNumber: String,
Project: {
ProjectName: String,
ProjectDescription: String,
ProjectLocation: String,
ProjectDUName: String,
ProjectDULeadName: String,
ProjectPOC: String,
ProjectContactNumber: String,
ProjectIcon: String
},
TaskList: [
{
task: String,
status: String
},
{
task: String,
status: String
},
{
task: String,
status: String
}
],
Trainings: [
{
Name: String,
URL: String
},
{
Name: String,
URL: String
}
]
});

var OrderSchema = new Schema({
  ordernumber: {type: Number},
  orderto: String,
  orderby: String,
  ordertoname: String,
  orderbyname: String,
  ordertophoneno: Number,
  orderbyphoneno: Number,
  totalCost: Number,
  ordertime: { type: Date, default: Date.now },
  ordereditems: [MenuItemSchema],
  status: {
  	type: String,
  	default: 'Order in Queue'
  }
  
});

OrderSchema.pre('save', function(next) {
    var doc = this;
       sequence.next(function(nextSeq){
       doc.ordernumber = nextSeq;
    next();
  });
});



var Employee = mongoose.model('Employee', EmployeeSchema);
var Vendor  = mongoose.model('Vendor', VendorSchema);
var Order = mongoose.model('Order', OrderSchema);
var EmpSAP = mongoose.model('EmpSAP', EmpSAPSchema);
