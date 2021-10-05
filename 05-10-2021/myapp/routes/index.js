var express = require('express');
var router = express.Router();

var SignupModel=require("../schema/signup_table");

/* GET home page. */
router.get('/index1', function(req, res, next) {
  res.render('index1', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  var myfile = req.files.file;
  var myfilename = req.files.file.name;
  myfile.mv('public/images/'+myfilename, function(err) {
  if (err)
  throw err;
  //res.send('File uploaded!');
  });
  const mybodydata = {
    email: req.body.email,
    password: req.body.password,
    file:myfilename
  }
  var data = SignupModel(mybodydata);

  data.save(function(err){
    if(err){
      console.log("Error in Add Record" + err);
    }else{
      console.log("Record Added");
      res.send("Record Successfully Added")
    }
  })

});

router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/login', function (req, res, next) {

  var email = req.body.email;
  var password = req.body.password;

  console.log(req.body);
  SignupModel.findOne({ "email": email }, function (err, db_admin_array) {

    console.log("Find One " + db_admin_array);

    if (db_admin_array) {
      var email = db_admin_array.email;
      var password = db_admin_array.password;

    }

    console.log("db_admin_array.email " + email);
    console.log("db_admin_array.password " + password);

    if (email == null) {
      console.log("If");
      res.end("Email not Found");
    }
    else if (email == email && password == password) {
      console.log("db_admin_array.email " + email);
      req.session.email = email;
      res.send('Login successfull');
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }
  });
});



module.exports = router;
