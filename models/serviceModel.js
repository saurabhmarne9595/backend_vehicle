const mongoose = require('mongoose');

const serviceSchema = {
    chassiNo:{
        type:String,
        required:true
    },
    lastService:{
        type:String,
        required:true
    },
    partsReplaced:{
        type:String,
        required:true
    },
    currentKms:{
        type:Number,
        required:true
    },
    nextDueKms:{
        type:Number,
        required:true
    }
}

const SERVICE = module.exports = mongoose.model('serviceDetail',serviceSchema);

module.exports.addDetails=function(details,callback){
    SERVICE.create(details,callback);
};

module.exports.getAllDetails=function(callback){
    SERVICE.find(callback);
};

module.exports.updateDetails=function(details,callback){
    query={
        _id:details._id
    }
    query1={
        lastService:details.lastService,
        partsReplaced:details.partsReplaced,
        currentKms:details.currentKms,
        nextDueKms:details.nextDueKms
    }
    SERVICE.findByIdAndUpdate(query,query1,callback)
}

module.exports.getDetailsbyChassiNo=function(chassiNo,callback){
    query={
        chassiNo:chassiNo
    }
    SERVICE.findOne(query,callback)
}


// module.exports = router;