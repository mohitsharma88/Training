var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    stud_name : String,
    stud_mobile : Number,
    stud_age: Number,
    // stud_gender:String,
    stud_subject:String,

});

module.exports = mongoose.model('student',myschema);