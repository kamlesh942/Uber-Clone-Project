const express = require('express');
const router = express.Router();
const {body, query} = require("express-validator");
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middlewares');

router.post('/create', 
    authMiddleware.authUser,
    body('pickup')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Pickup location must be at least 3 characters long'),
   
    body('destination')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Destination must be at least 3 characters long'),

    body('vehicleType')
    .isString()
    .isIn(['auto', 'car', 'motorcycle'])
    .withMessage('Vehicle type must be one of auto, car, or motorcycle'),
    rideController.createRide

)

router.get('/get-fare', 
    authMiddleware.authUser, 
    query('pickup')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Pickup location must be at least 3 characters long'),
    
    query('destination')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Destination must be at least 3 characters long'),
    rideController.getFare


);

module.exports = router;