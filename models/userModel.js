const mongoose = require('mongoose');

const userSchema = {
    chassiNo:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    carName:{
        type:String,
        required:true
    }
}
const USER = module.exports = mongoose.model('user',userSchema);

module.exports.getAllData=function(callback){
    USER.find(callback);
}
module.exports.addUser=function(user,callback){
    USER.create(user,callback)
}
module.exports.getbyChassiNo = function (chassiNo, callback) {
    query = {
        chassiNo: chassiNo
    }
    USER.findOne(query, callback);
};

// module.exports = router;