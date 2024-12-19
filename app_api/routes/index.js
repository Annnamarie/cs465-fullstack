const express = require('express'); //Express app
const router = express.Router(); //Router logic
const { expressjwt: expressJwt } = require("express-jwt"); 

// JWT Authentication middleware
const auth = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ["HS256"]
});


//Import the controllers we will route
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

router
    .route('/register')
    .post(authController.register);

router
    .route('/login')
    .post(authController.login);

//define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) //GET method routes tripList
    //mod 6 
    .post(auth, tripsController.tripsAddTrip); //POST Method Adds a Trip
    router.use((req, res, next) => {
        console.log('Authorization header:', req.headers['authorization']);
        next();
    });
    
//GET Method routes tripsFindByCode - requires parameter
//PUT Method routes tripsUpdateTrip - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);
    router.use((req, res, next) => {
        console.log('Authorization header:', req.headers['authorization']);
        next();
    });
    
module.exports = router;