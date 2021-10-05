var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema1 = new Schema({
    p_name : String,
    p_details : String,
    p_price : String,
    p_img : String,
    p_qty : String
});

module.exports = mongoose.model('product', myschema1);