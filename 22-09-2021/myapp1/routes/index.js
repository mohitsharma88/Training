const { json } = require('express');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create-cookie', function(req, res, next) {
  res.cookie('user','Mohit');
  res.cookie('admin','php');
  //res.cookie('rememberme','1',{ expires: new Date(Date.now() + 600000), httpOnly: true });
  res.send('cookie Created');
});

router.get('/get-cookie', function(req , res, next){
  let Cookies = JSON.stringify(req.cookies)
  return res.send(Cookies);
});

router.get('/clear-cookie', function(req,res){
  res.clearCookie('user');
  res.clearCookie('admin');
  res.send('Cookie deleted');
})
module.exports = router;