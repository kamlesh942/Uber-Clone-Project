const mongoose = require('mongoose');
const DBname = "uberClone";
function connectDB(){
    mongoose.connect(`${process.env.DB_CONNECT}/${DBname}`).then(() => {
            console.log("MongoDB connected successfully");
        }).catch(err => console.log(err));
    
}

module.exports = connectDB;
