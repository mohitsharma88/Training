var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//display login form
router.get('/login', function(req, res, next) {
  res.render('login');
});

//login process route
router.post('/login', function(req, res, next) {
  var my1 = req.body.txt1;
  console.log(my1);
  //session var created and assign value
  req.session.mysess = my1;
  console.log("Session value is " + req.session.mysess);
  res.redirect("/home");
});
  router.get('/home', function(req, res, next) {
    //check session in set or not
    if(req.session.mysess)
    {
      var username = req.session.mysess;
      //render session val is home.hbs
      res.render('home',{ myvalue : username});
      
    }else{
      res.redirect('/login');
    }
  });
  router.get('/logout',function(req ,res, next){
    req.session.destroy(function(err){
      res.redirect('/login');
    })
  });
//counter demo

router.get('/counter', function(req, res, next) {
  if (req.session.views) {
  req.session.views++
  res.setHeader('Content-Type', 'text/html')
  res.write('<p>views: ' + req.session.views + '</p>')
  res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
  res.end()
  } else {
  req.session.views = 1
  res.end('welcome to the session demo. refresh!')
  }
  });


module.exports = router;