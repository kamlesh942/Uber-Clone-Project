const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength : [3, 'first name must be atleast 3 Characters'],
        },  
        lastname : {
            type: String,
            minlength : [3, 'last name must be atleast 3 Characters'],
        }
    },
    email :{
        type : String,
        required: true,
        unique : true,
        lowercase : true,
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type : String,
        required : true,
        select : false,
    },
    socketId :{
        type : String,
    },

    status :{
        type : String,
        enum : ['active', 'inactive'],
        default: "inactive",
    },
    vehicle : {
        color :{
            type : String,
            required : true,
            minlength : [3, 'vehicle color must be atleast 3 Characters'],
        },
        plate : {
            type : String,
            required: true,
            minlength : [3, 'plate number must be atleast 3 Characters']
        },
        capacity :{
            type : Number,
            required: true,
            min : [1, 'Capacity must be atleast 1'],
        },
        vehicleType :{
            type : String,
            required : true,
            enum :['car', 'motorcycle', 'auto'],
        }
    },

    location :{
        lat :{
            type : Number,
        },
        lng :{
            type : Number,
        },
    }
});

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
};

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
};
const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;