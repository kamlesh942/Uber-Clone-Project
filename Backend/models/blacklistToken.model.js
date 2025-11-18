const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token :{
        type : String,
        required : true,
        unique : true,
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 86400 //24 hours = 86400 sec
    }
});

module.exports = mongoose.model('blackListToken', blacklistTokenSchema);