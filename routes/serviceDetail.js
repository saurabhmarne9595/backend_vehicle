var express = require('express');
var router = express.Router();
//const SENSOR = require('../models/sensorModel');
const SERVICE = require('../models/serviceModel');
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


router.post('/addDetails', (req, res) => {
    if (!req.body.chassiNo || !req.body.lastService || !req.body.partsReplaced || !req.body.currentKms || !req.body.nextDueKms) {
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
                                tosend = {
                                    _id: resDetails._id,
                                    lastService: req.body.lastService,
                                    partsReplaced: req.body.partsReplaced,
                                    currentKms: req.body.currentKms,
                                    nextDueKms: req.body.nextDueKms,
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
                                toSend = {
                                    chassiNo: req.body.chassiNo,
                                    lastService: req.body.lastService,
                                    partsReplaced: req.body.partsReplaced,
                                    currentKms: req.body.currentKms,
                                    nextDueKms: req.body.nextDueKms,
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

router.post('/showDetails', (req, res) => {
    console.log(req.body)
    console.log("In show details")
    if (!req.body.chassiNo) {
        res.json({
            success: false,
            msg: "Insuffcient Data"
        })
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
                                res.json({
                                    success:true,
                                    msg:resDetails
                                })
                            }
                            else{
                                res.json({
                                    success:false,
                                    msg:"No Data Found"
                                })
                            }
                        }
                    })
                }
            }
        })
    }

})

module.exports = router;
