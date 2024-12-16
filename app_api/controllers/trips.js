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

//Mod6 POST
//POST: /trips - Adds a new Trip
//Regardless of outcome, response must include HTML status code
//and JSON message to the requesting client

const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

    if (!q)
    {
        //Databse returned no data
        return res
            .status(400)
            .json(err);
    } else {
        //Return new trip
        return res
            .status(201)
            .json(q)
    }

    //Uncomment the following line to show the results of operation
    //on the console
    //console.log(q);
};

//PUT: /trips/:tripCode - Adds a new Trio
//Regardless of outcome, response must include HTML status code
//and JSON message to the requesting client

const tripsUpdateTrip = async( req, res ) => {
    //Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    const q = await Model
        .findOneAndUpdate(
            {'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec()

        if (!q) {
            //Database returned no data
            return res
                .status(400)
                .json(err);
        } else {
            //Return resulting updated trip
            return res
                .status(201)
                .json(q);
        }

        //Uncomment the following to show results of operation
        //on the console
        //conole.log
}

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
