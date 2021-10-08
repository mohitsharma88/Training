var express = require('express');
var router = express.Router();
var SignupModel=require("../schema/signup_table");
/* GET home page. */
// var session=require(express-session);


router.get('/', function(req, res, next) {
    console.log("i am inside admin route...")
  res.render('index');
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

    if (email == null ) {
      console.log("If");
      res.end("Email not Found");
    }
    else if ( email == email && password == password ) {
      // console.log("db_admin_array.email " + email);
      req.session.email = email;
      res.send('Login successfull');
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }
  });
});

// //Delete User By ID
// router.get('/delete/:id', function (req, res) {
//   SignUpModel.findOneAndDelete(req.params.id, function (err, project) {
//     if (err) {

//       console.log("Error in Record Delete " + err);
//       res.redirect('/admindisplay');
//     } else {

//       console.log(" Record Deleted ");
//       res.redirect('/admindisplay');
//     }
//   });
// });

router.get('/forgotpassword', function(req, res, next) {
  res.render('forgotpassword');
});
// // forgot-password
// router.post('/forgot-password', function (req, res, next) {

//   var email = req.body.email; 

//   console.log(req.body);
//   SignUpModel.findOne({ "email": email }, function (err, db_admin_array) {

//     console.log("Find One " + db_admin_array);

//     if (db_admin_array) {
//       var email = db_admin_array.email;
//       var password = db_admin_array.password;

//     }

//     console.log("db_admin_array.email " + email);
//     console.log("db_admin_array.password " + password);

//     if (email == null) {
//       console.log("If");
//       res.end("Email not Found");
//     }
//     else if (email == email) {
//       "use strict";
// const nodemailer = require("nodemailer");

// // async..await is not allowed in global scope, must use a wrapper
// async function main(){

//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let account = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: "demo830870@gmail.com", // generated ethereal user
//       pass: "Demo@123" // generated ethereal password
//     }
//   });

//   // setup email data with unicode symbols
//   let mailOptions = {
//     from: "demo830870@gmail.com", // sender address
//     to: email, // list of receivers
//     subject: "Forgot Password", // Subject line
//     text: "Hello your password is "  + password, // plain text body
//     html: "Hello your password is "  + password // html body
//   };

//   // send mail with defined transport object
//   let info = await transporter.sendMail(mailOptions)

//   console.log("Message sent: %s", info.messageId);
//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

//   res.end("Password Sent on your Email");
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

//       main().catch(console.error); 
// else {
//   console.log("Credentials wrong");
//   res.end("Login invalid");
// }
//     }
//   });
// });
// //F-pass End



router.get('/admindisplay', function(req, res, next) {
    SignupModel.find(function (err, data) {
        if (err) {
          console.log("Error in Fetch Data " + err);
        } else {
          //Print Data in Console
          console.log(data);
          //Render User Array in HTML Table
          res.render('admindisplay', { data: data });
    
        }
      }).lean();
  });

module.exports = router;
