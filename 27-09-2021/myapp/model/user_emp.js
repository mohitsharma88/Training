var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    emp_name : String,
    emp_mobile : Number,
    emp_age: Number,
    emp_salary: Number
    
});

module.exports = mongoose.model('emp',myschema);