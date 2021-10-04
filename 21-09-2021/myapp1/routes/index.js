var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/form", function (req, res, next) {
  res.render("form", { title: "Express" });
});

// router.get('/form', function(req, res, next) {
//  console.log(req.files.file123)
// });

router.post("/form", function (req, res, next) {
  var fileobject = req.files.file123;
  var filename = req.files.file123.name;
  var filesize = req.files.file123.size;
  var filemimetype = req.files.file123.mimetype;
  //upload method
  fileobject.mv("public/upload/" + filename, function (err) {
    if (err) return res.status(500).send(err);
    res.send("File uploaded");
  });
});

router.post('/form',function(req,res,next){
  var fileobject=req.files.file123;
  var filename=req.files.file123.name;
  var filesize=req.files.file123.size;
  var filemimetype=req.files.file123.mimetype;
  var myfile=req.files.file123.size;
  //upload method
  if(req.files.file123.size < 2 * 1024 * 1024)
{
fileobject.mv('public/upload/'+myfilename, function(err) {
if (err)
return res.status(500).send(err);
res.send('File uploaded!');
});
}
else{
res.send('Max File size 2 MB Only');
}
  });


module.exports = router;
