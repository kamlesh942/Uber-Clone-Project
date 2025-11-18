
const mongoose = require('mongoose');
const express = require('express');
const captainController = require('../controllers/captain.controller');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middlewares');
const { authCaptain } = require('../middlewares/auth.middlewares');

router.post('/register', [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('fullname.firstname').isLength({min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min : 3}).withMessage('Plate number must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be one of car, motorcycle, or auto'),
],

    captainController.registerCaptain
);


router.post('/login', [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({min: 6}).withMessage('Password is required'),

    ],
    captainController.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain ,captainController.getCaptainProfile);

router.get('/logout',  authMiddleware.authCaptain, captainController.logoutCaptain);


module.exports = router;