//Base set up
//----------------------------------------------

var express = require('express');
var bodyParser = require('body-parser')
var mongodb = require('mongodb');
//var mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost/27017/Employees"); //this is our db
var monk = require('monk');
var db = monk('localhost:27017/Employees');


var app = express();
app.use(bodyParser());

var port = process.env.PORT || 8080;

var router = express.Router();

//var Employee = require('./model/Employee.js');
 app.use(function(req,res,next){
 	console.log("received some");
 	req.db = db;
 	res.setHeader("Access-Control-Allow-Origin", "*");
 	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 	next();
 });


router.route('/list')
	.get(function(req,res){
		// Employee.find({},'erwree',function(err, employees){
		// 	if(err)
		// 		res.send(err)
		// 	console.log("employeess" + employees);
		// 	res.json(employees);
		// });
	 	var db = req.db;
    	var collection = db.get('employees');
    	collection.find({},{}, function(err, employees){
    		if(err)
		 		res.send(err)

		 	res.json(employees);
		 	console.log(employees);
    	});
	});

router.route('/delete')
	.post(function(req,res){
		console.log("empid" + req.body.empId);
	 	var db = req.db;
	 	var collection = db.get('employees');
	 	collection.remove({id : req.body.empid}, function(err,message){
	 		if(err) {
	 			res.send(err);
	 			console.log(err);
	 		}
	 		else {
	 			res.send("Success");
	 			console.log("success");
	 		}
	 		
	 		
	 	});
	});

router.get('/', function(req,res){
	res.json({message : 'Welocome'});
});


app.use('/api', router);

 

app.listen(port);
console.log('Server running @ post' + port);