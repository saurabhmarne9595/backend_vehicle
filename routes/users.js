var express = require('express');
var router = express.Router();
const USER = require('../models/userModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  USER.getAllData((err, user)=>{
  if (err) {
    res.json({
      success: false,
      msg: err
    });
  }
  else {
    res.json({
      success: true,
      msg: user
    })
  }
});
});

router.post('/addUser',(req,res)=>{

  //console.log(req.body)
  if (!req.body.chassiNo || !req.body.userName || !req.body.carName) {
    res.json({
      success: false,
      msg: 'Insufficient data!'
    });
  }
  else {
    USER.getbyChassiNo(req.body.chassiNo,(err,resUser)=>{
      
        if(err){
            res.json({
                "success":false,
                "msg":err
            })
        }
        else
        {
            if(resUser)
            {
                res.json({
                    "success":false,
                    "msg":"user already exist"
                })
            }
            else{
              tosend ={
                userName:req.body.userName,
                chassiNo:req.body.chassiNo,
                carName:req.body.carName
              }
              USER.addUser(tosend,(err)=>{
                if(err)
                {
                  res.json({
                    "success":false,
                    "msg":err
                  })
                }
                else{
                  res.json({
                    "success":true,
                      "msg":"user added successfully",
                  })
                }
              })
            }
          }
        });
}

});


module.exports = router;
