//first methods that will integrate with MongoDB to retrieve data for the application

const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //Register the model
const Model = mongoose.model('trips');

//GET: /trips - lists all of the trips
//Regardless of outcome, response must include HTM status code
//and JSON message to the requesting client

const tripsList = async(req, res) => {
    const q = await Model 
        .find({}) //No filter return all of the records
        .exec();

        //Uncoment the following line to show results of the query
        //on the console
        console.log(q);

    if (!q) {
        //Database returned no data
        return res
                .status(404)
                .json(err)
    } else {
        //Return resulting trip list
        return res
                .status(200)
                .json(q)
    }
};

//GET: /trips/:tripCode - list a single trip
//Regardless of outcome, response must include HTML status code
//and JSON message to the requesting client

const tripsFindByCode = async(req, res) => {
    const q = await Model 
        .find({'code': req.params.tripCode}) //Return single record
        .exec();

        //Uncoment the following line to show results of the query
        //on the console
        console.log(q);

    if (!q) {
        //Database returned no data
        return res
                .status(404)
                .json(err)
    } else {
        //Return resulting trip list
        return res
                .status(200)
                .json(q)
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};
