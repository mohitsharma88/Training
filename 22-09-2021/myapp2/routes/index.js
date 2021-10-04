var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// router.get('/home', function(req, res, next) {
//   res.render('home');
// });
router.get('/colorForm', function(req, res, next) {
  res.render('colorForm');
});
router.post('/colorPage', function(req, res, next) {
  console.log("colorPage");
  //Get Value From Textbox
  var a = req.body.txt1;
  console.log(a);
  res.render('colorPage', { mya: a });
});
module.exports = router;
