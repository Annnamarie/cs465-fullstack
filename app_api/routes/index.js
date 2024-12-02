//route to controller
const express = require('express'); //Express app
const router = express.Router(); //Router logic

//Import the controllers we will route
const tripsController = require('../controllers/trips');

//define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList); //GET method routes tripList

//GET Method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)

module.exports = router;