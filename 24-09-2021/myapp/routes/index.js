var express = require('express');
var router = express.Router();

//Load Model
var UserModel=require('../model/users_model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/add', function(req, res, next) {
  res.render('add');
});

router.post('/add-process', function(req, res, next) {
  const mybodydata = {
    user_name : req.body.txt1,
    user_mobile : req.body.txt2
  }
  
  var data = UserModel(mybodydata);

  data.save(function(err){
    if(err){
      console.log("Error in Insert");
    }else{
      console.log("Record Added");
      res.render('add');
    }
  })

});

router.get('/display',function(req,res,next){
  UserModel.find(function(err,db_user_data){
    
    if(err){
      console.log("Error in Fetch Data" + err);
    }else{
      console.log("Fetch Data" + db_user_data);
      res.render('display',{user_array:db_user_data});
    }
  }).lean;
});

router.get('/delete/:id',function(req,res,next){
  var deleteid = req.params.id;
  UserModel.findOneAndDelete(deleteid,function(err,data){
    
    if(err){
      console.log("Error in Delete" + err);
    }else{
      console.log("Record Deleted");
      res.redirect('/display');
    }
  });
});

router.get('/edit/:id',function(req,res,next){
  var editid = req.params.id;
  UserModel.findById(editid,function(err,data){
    
    if(err){
      console.log("Error in Edit" + err);
    }else{
      console.log("Edit Record" + data);
      res.render('edit',{editdata:data});
    }
  }).lean();

});
//Update
router.post('/edit/:id',function(req,res,next){
  var editid = req.params.id;
  
  const mybodydata = {
    user_name : req.body.txt1,
    user_mobile : req.body.txt2
  }

  UserModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    
    if(err){
      console.log("Error in Update" + err);
    }else{
      console.log("Record Update");
      res.redirect('/display');
    }
  })

});

module.exports = router;
