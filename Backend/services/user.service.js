const express = require("express");
const userModel = require("../models/user_model");




module.exports.createUser = async ({ firstname, lastname, email, password }) =>{

    if(!firstname || !email || !password){
        throw new Error("All Fields are Required");
    }
    const user = userModel.create({
        fullname: {
            firstname,
            password
        },
        email,
        password,
    })

    return user;

}