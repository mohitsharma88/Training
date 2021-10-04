var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    c_name: String,
    c_mobile : String
});

module.exports = mongoose.model('category', myschema);