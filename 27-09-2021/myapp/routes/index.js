var express = require('express');
var router = express.Router();
var UserModel = require('../model/user_model');
var StudModel = require('../model/user_student');
var EmpModel = require('../model/user_emp');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/form', function(req, res, next) {
  res.render('form', { title: 'Express' });
});
router.post('/form-process', function(req, res, next) {
  
  const mybodydata = {
    user_name : req.body.nm,
    user_mobile : req.body.mno
  }
  var data = UserModel(mybodydata);

  data.save(function(err){
    if(err){
      console.log("Error in Add Record" + err);
    }else{
      console.log("Record Added");
      res.send("Record Successfully Added")
    }
  })
  
});
router.get('/display', function(req, res, next) {
  UserModel.find(function(err,data){
    if(err){
      console.log("Error in Fetch Data" + err);
    }else{
      console.log("Record Data is " + data);
      res.render('display',{mydata:data});
    }
  }).lean();
});
router.get('/delete/:id', function(req, res, next) {
  var deleteid = req.params.id;
  UserModel.findByIdAndDelete(deleteid,function(err,data){
    if(err)
    {
      console.log("Error in Delete " + err);
    }else{
      console.log("Record Deleted " + deleteid);
      res.redirect('/display');
    }
  })
  
});
router.get('/edit/:id', function(req, res, next) {
  var editid = req.params.id;
  UserModel.findById(editid,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log(data);
      res.render('edit',{mydata:data})
    }
  }).lean();

});
router.post('/edit/:id', function(req, res, next) {
  var editid = req.params.id;
  const mybodydata = {
    user_name : req.body.nm,
    user_mobile : req.body.mno
  }

  UserModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log( "Record Updated" +  data);

      res.redirect('/display');
    }
  }).lean();

});

router.get('/reg', function(req, res, next) {
  res.render('student/reg', { title: 'Express' });
});

router.post('/reg-process', function(req, res, next) {
  
  const mybodydata = {
    stud_name : req.body.nm,
    stud_mobile : req.body.mno,
    stud_age: req.body.age,
    // stud_gender:req.gender,
    stud_subject:req.body.sub,
  }
  var data = StudModel(mybodydata);

  data.save(function(err){
    if(err){
      console.log("Error in Add Record" + err);
    }else{
      console.log("Record Added");
      res.send("Record Successfully Added")
    }
  })
  
});

router.get('/displaystud', function(req, res, next) {
  StudModel.find(function(err,data){
    if(err){
      console.log("Error in Fetch Data" + err);
    }else{
      console.log("Record Data is " + data);
      res.render('student/display',{mydata:data});
    }
  }).lean();
});
router.get('/deletestud/:id', function(req, res, next) {
  var deleteid = req.params.id;
  StudModel.findByIdAndDelete(deleteid,function(err,data){
    if(err)
    {
      console.log("Error in Delete " + err);
    }else{
      console.log("Record Deleted " + deleteid);
      res.redirect('/displaystud')
    }
  })
  
});
router.get('/editstud/:id', function(req, res, next) {
  var editid = req.params.id;
  StudModel.findById(editid,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log(data);
      res.render('student/edit',{mydata:data})
    }
  }).lean();

});
router.post('/editstud/:id', function(req, res, next) {
  var editid = req.params.id;
  const mybodydata = {
    stud_name : req.body.nm,
    stud_mobile : req.body.mno,
    stud_age:req.body.age,
    // stud_gender:req.gender,
    stud_subject:req.body.sub,

  }

  StudModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log( "Record Updated" +  data);

      res.redirect('/displaystud');
    }
  }).lean();

});
router.get('/empreg', function(req, res, next) {
  res.render('employee/emp_reg');
});
router.post('/emp-process', function(req, res, next) {
  
  const mybodydata = {
    emp_name : req.body.nm,
    emp_mobile : req.body.mno,
    emp_age:req.body.age,
    emp_salary:req.body.sal
  }
  var data = EmpModel(mybodydata);

  data.save(function(err){
    if(err){
      console.log("Error in Add Record" + err);
    }else{
      console.log("Record Added");
      res.send("Record Successfully Added")
    }
  })
  
});
router.get('/displayemp', function(req, res, next) {
  EmpModel.find(function(err,data){
    if(err){
      console.log("Error in Fetch Data" + err);
    }else{
      console.log("Record Data is " + data);
      res.render('employee/display',{mydata:data});
    }
  }).lean();
});

router.get('/deleteemp/:id', function(req, res, next) {
  var deleteid = req.params.id;
  EmpModel.findByIdAndDelete(deleteid,function(err,data){
    if(err)
    {
      console.log("Error in Delete " + err);
    }else{
      console.log("Record Deleted " + deleteid);
      res.redirect('/displayemp')
    }
  })
  
});
router.get('/editemp/:id', function(req, res, next) {
  var editid = req.params.id;
  EmpModel.findById(editid,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log(data);
      res.render('employee/edit',{mydata:data})
    }
  }).lean();

});
router.post('/editemp/:id', function(req, res, next) {
  var editid = req.params.id;
  const mybodydata = {
    emp_name : req.body.nm,
    emp_mobile : req.body.mno,
    emp_age:req.body.age,
    emp_salary:req.body.sal
  }

  EmpModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log( "Record Updated" +  data);

      res.redirect('/displayemp');
    }
  }).lean();

});
module.exports = router;