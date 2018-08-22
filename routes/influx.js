var express = require('express');
var router = express.Router();

const Influx = require('influxdb-nodejs');


//connecting database
//----------------------------------------------------------

const client = new Influx('http://127.0.0.1:8086/server');

//----------------------------------------------------------


router.get('/', function (req, res, next) {
            res.json({
                success: true,
                msg: "in the influx page"
            });
        });


router.post('/', (req, res) => {
    console.log(req.body)
    if (!req.body.carId) {
        res.json({
            success: false,
            msg: 'Insufficient data!'

        });
    }
    else{
        client.query('car')
        .where('carId', "chassiNO")
        .addFunction('bottom', 'temp', 1)
        .then((data) => {
            console.log(data.results[0].series[0].values[0]);
            if(data.results[0].series[0].values[0][1]>25)
            {
            res.json({
                success:true,
                msg:"your engine may not work properly as the temperature i.e. "+data.results[0].series[0].values[0][1]+" above the  normal range"
            })
           }
           else{
           res.json({
                success:false,
                msg:"Status FINE Engine temperature is "+data.results[0].series[0].values[0][1]
            })
           }
          }).catch(console.log("err"));
    }
})

module.exports = router;
