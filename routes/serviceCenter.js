var express = require('express');
var router = express.Router();
//const SENSOR = require('../models/sensorModel');
const SERVICE = require('../models/serviceCntrModel');
const USER = require('../models/userModel');

router.get('/', function (req, res, next) {
    SERVICE.getAllDetails((err, devices) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        }
        else {
            res.json({
                success: true,
                msg: devices
            })
        }
    });
});

router.post('/repair', (req, res) => {
    if (!req.body.chassiNo ||!req.body.part ||!req.body.password) {
        res.json({
            success: false,
            msg: 'Insufficient data!'

        });
    }
    else {
        USER.getbyChassiNo(req.body.chassiNo, (err, resUser) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                })
            }
            else {
                if (!resUser) {
                    res.json({
                        success: false,
                        msg: "user does not exist"
                    })
                }
                else {
                    SERVICE.getDetailsbyChassiNo(req.body.chassiNo, (err, resDetails) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: err
                            })
                        }
                        else {
                            if (resDetails) {
                                if(resDetails.password!=req.body.password)
                                {
                                    res.json({
                                        success:false,
                                        msg:"password does not match"
                                    })
                                }
                                else{
				                    if(resDetails.parts!=null)
				                    {   
                                        let finalData =resDetails.parts;
                                        let value1 = finalData.split(",");
                                        let data = (req.body.part).split(",");
                                        console.log(finalData);
                                        let i=0,j=0;
                                        for (i=0; i<data.length; i++)
                                        {
                                            console.log(data[i]+"*");
                                            let c=0;
                                            for (j=0; j<value1.length; j++)
                                            {
                                               console.log(value1[j]+"+");
                                                if(value1[j]==data[i])
                                                {
                                                    c=c+1
                                                }
                                            }
                                            if(c==0)
                                            {
                                                finalData=finalData+","+data[i]
                                            }
                                        }
                                        console.log(finalData)
                                        tosend = {
                                            _id: resDetails._id,
                                            parts:finalData
                                        }
                                        SERVICE.updateDetails(tosend, (err) => {
                                            if (err) {
                                                res.json({
                                                    "success": false,
                                                    "msg": err
                                                })
                                            }
                                           else {
                                                res.json({
                                                "success": true,
                                                "msg": "data updated"
                                                })
                                            }
                                        })
				                    }
                                else{
				                    tosend = {
                                        _id: resDetails._id,
                                        parts:req.body.part
                                    }
                                        SERVICE.updateDetails(tosend, (err) => {
                                            if (err) {
                                                res.json({
                                                    "success": false,
                                                    "msg": err
                                                })
                                            }
                                            else {
                                                res.json({
                                                    "success": true,
                                                    "msg": "data updated"
                                                })
                                            }
                                        })
				                    }
                                }
                            }
                            else {
                                toSend = {
                                    chassiNo: req.body.chassiNo,
                                    parts:req.body.part,
                                    password:req.body.password
                                }

                                SERVICE.addDetails(toSend, (err) => {
                                    if (err) {
                                        res.json({
                                            success: false,
                                            msg: err
                                        })
                                    }
                                    else {
                                        res.json({
                                            success: true,
                                            msg: "new sensor added",
                                        });

                                    }
                                })

                            }
                        }
                    })
                }
            }
        })
    }
});


router.post('/clear', (req, res) => {
    if (!req.body.chassiNo || !req.body.password) {
        res.json({
            success: false,
            msg: 'Insufficient data!'

        });
    }
    else {
        USER.getbyChassiNo(req.body.chassiNo, (err, resUser) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                })
            }
            else {
                if (!resUser) {
                    res.json({
                        success: false,
                        msg: "user does not exist"
                    })
                }
                else {
                    SERVICE.getDetailsbyChassiNo(req.body.chassiNo, (err, resDetails) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: err
                            })
                        }
                        else {
                            if (resDetails) {
                                if(req.body.password==resDetails.centerkey)
                                tosend = {
                                    _id: resDetails._id,
                                    parttobechecked:""
                                }
                                SERVICE.updateDetails(tosend, (err) => {
                                    if (err) {
                                        res.json({
                                            "success": false,
                                            "msg": err
                                        })
                                    }
                                    else {

                                        res.json({
                                            "success": true,
                                            "msg": "data updated"
                                        })
                                    }
                                })
                            }
                            else {
                                res.json({
                                    "success": false,
                                    "msg": "record not found"
                                })
                            }
                        }
                    })
                }
            }
        })
    }
});

module.exports = router


