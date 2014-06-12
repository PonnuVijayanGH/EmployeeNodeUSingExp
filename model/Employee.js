var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EmployeeSchema = new Schema(
{
	name : String,
	designation : String,
	email : String,
	phone : String,
	date : String,
	id : String,
	image : String,
	contactInfo : [{name : String,value : String}],
	projectInfo : [	{name:String,details : [{name : String,	value : String}]}],
	eduInfo : [{name : String,value : String}]
	
});
module.exports = mongoose.model('employee', EmployeeSchema);