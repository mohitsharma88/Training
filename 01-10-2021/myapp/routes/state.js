var express = require('express');
var router = express.Router();

//Call User Datab
var StateModel = require('../schema/state_table')
 var CountryModel = require('../schema/country_table');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res, next) {

    CountryModel.find(function(err, db_country_array) {
        if (err) {
            console.log("Error in Fetch Data " + err);
          } else {
            //Print Data in Console
            console.log(db_country_array);
            //Render User Array in HTML Table
            res.render('state/add-state', { country_array : db_country_array });
            
          }
      });
  //res.render('add-category');
});


//Add Form Processing using Post Method 
router.post('/add', function(req, res, next) {
  console.log(req.body);
 
  //Create an Array 
  const mybodydata = {
    s_name: req.body.s_name,
    _country: req.body._country
   
    }
 
    console.log("Name is "  + req.body.s_name);
    console.log("ID is "  + req.body._country);
 
var data = StateModel(mybodydata);
 
data.save(function(err) {
    if (err) {
       console.log("Error in Insert Record");
    } else {
        res.redirect('add');
    }
})

});


 


  router.get('/display', function(req, res, next) {

    StateModel.find(function(err, db_state_array){
        
        console.log(db_state_array);

        if (err) res.json({message: 'There are no posts here.'});

        StateModel.find({})
        .populate('_country')
      
          .exec(function(err, db_state_array) {

            console.log(db_state_array);
         
            res.render("state/display-state", { state_array: db_state_array });
          })
      });
   
  });


//Get Single User By ID
router.get('/show/:id', function(req, res) {
  console.log(req.params.id);

  StateModel.findById(req.params.id, function(err, db_state_array) {


      if (err) {
          console.log("Error in Single Record Fetch" + err);
      } else {
          console.log(db_state_array);

          res.render('state/single-state-record', { state_array: db_state_array });
      }
  });
});



//Delete User By ID
router.get('/delete/:id', function(req, res) {
    StateModel.findByIdAndDelete(req.params.id, function(err, project) {
      if (err) {
        console.log("Error in Record Delete " + err);
          res.redirect('display');
      } else {
        console.log(" Record Deleted ");
          res.redirect('/state/display');
      }
  });
});



//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {

  console.log(req.params.id);
  
  StateModel.findById(req.params.id, function(err, db_state_array) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
          console.log(db_state_array);

          res.render('state/edit-state-form', { state_array: db_state_array });
      }
  });
});

//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {

  console.log("Edit ID is"+ req.params.id);

  const mybodydata = {
    s_name: req.body.s_name,
    _country: req.body._country
  }

  StateModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
      if (err) {
          console.log("Error in Record Update");
          res.redirect('/state/display');
      } else {
        
          res.redirect('/state/display');
      }
  });
});


module.exports = router;