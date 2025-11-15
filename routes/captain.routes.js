
const mongoose = require('mongoose');
const captainController = require('../controllers/captain.controller');
const router = express.Router();
const { body } = require('express-validator');
const { use } = require('react');

router.post('/register', [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('fullname.firstname').isLength({min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min : 3}).withMassage('Plate number must be at least 3 characters long'),
    body('vahicle.capacity').isInt({min:1}).withMessage('Capacity must be at least 1'),
    bady('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be one of car, motorcycle, or auto'),
],

    captainController.registerCaptain
)


module.exports = router;