const mongoose = require('mongoose');

const serviceCntrSchema = {
    chassiNo:{
        type:String,
        required:true
    },
    parts:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    centerkey:{
        type:String,
        default:"cntr@123"
    }
}
const CENTER = module.exports = mongoose.model('serviceCenter',serviceCntrSchema);

module.exports.addDetails=function(details,callback){
    CENTER.create(details,callback);
};

module.exports.getAllDetails=function(callback){
    CENTER.find(callback);
};

module.exports.updateDetails=function(details,callback){
    query={
        _id:details._id
    }
    query1={
        lastService:details.lastService,
        parts:details.parts,
        currentKms:details.currentKms,
        nextDueKms:details.nextDueKms
    }
    CENTER.findByIdAndUpdate(query,query1,callback)
}

module.exports.getDetailsbyChassiNo=function(chassiNo,callback){
    query={
        chassiNo:chassiNo
    }
    CENTER.findOne(query,callback)
}

