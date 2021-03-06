var express = require('express');
var router = express.Router();

//Call User Database Model
var CountryModel = require('../schema/country_table');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
  res.render('country/add-country');
});


//Add Form Processing using Post Method 
router.post('/add', function(req, res, next) {
  console.log(req.body);

  //Create an Array 
  const mybodydata = {
    c_name: req.body.c_name
}
var data = CountryModel(mybodydata);
 
data.save(function(err) {
    if (err) {
       console.log("Error in Insert Record");
    } else {
        res.render('country/add-country');
    }
})

});




router.get('/display', function(req, res, next) {

    CountryModel.find(function(err, db_country_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_country_array);
        //Render User Array in HTML Table
        res.render('country/display-country', { country_array : db_country_array });
        
      }
  });
 
});




//Get Single User By ID
router.get('/show/:id', function(req, res) {
  console.log(req.params.id);
  CountryModel.findById(req.params.id, function(err, db_country_array) {
      if (err) {
          console.log("Error in Single Record Fetch" + err);
      } else {
          console.log(db_country_array);

          res.render('country/single-country-record', { country_array: db_country_array });
      }
  });
});



//Delete User By ID
router.get('/delete/:id', function(req, res) {
    CountryModel.findOneAndDelete(req.params.id, function(err, project) {
      if (err) {

        console.log("Error in Record Delete " + err);
          res.redirect('/country/display');
      } else {

        console.log(" Record Deleted ");
          res.redirect('/country/display');
      }
  });
});



//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {

  console.log(req.params.id);
  
  CountryModel.findById(req.params.id, function(err, db_country_array) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
          console.log(db_country_array);

          res.render('country/edit-country-form', { country_array: db_country_array });
      }
  });
});








//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {

  console.log("Edit ID is"+ req.params.id);

  const mybodydata = {
    c_name: req.body.c_name 
  }

  CountryModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
      if (err) {
          console.log("Error in Record Update");
          res.redirect('/country/display-country');
      } else {
        
          res.redirect('/country/display');
      }
  });
});


module.exports = router;