const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');
const User = require('../models/users');

// Helper function to get user
const getUser = (req, res, callback) => {
  if (req.payload && req.payload.email) {
    User.findOne({ email: req.payload.email }).exec((err, user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
      }
      callback(req, res, user.name);
    });
  } else {
    return res.status(401).json({ message: "Unauthorized access" });
  }
};

// POST: /trips - Add a new trip
const tripsAddTrip = async (req, res) => {
  getUser(req, res, () => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Trip data is required" });
    }

    const newTrip = {
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    };

    Trip.create(newTrip, (err, trip) => {
      if (err) {
        return res.status(400).json({ message: "Error creating trip", error: err });
      }
      return res.status(201).json({ message: "Trip created successfully", trip });
    });
  });
};

// PUT: /trips/:tripCode - Update an existing trip
const tripsUpdateTrip = async (req, res) => {
  getUser(req, res, () => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Update data is required" });
    }

    const updateFields = {
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    };

    Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      updateFields,
      { new: true, runValidators: true }
    )
      .then((trip) => {
        if (!trip) {
          return res.status(404).json({
            message: `Trip with code '${req.params.tripCode}' not found`,
          });
        }
        return res.status(200).json({ message: "Trip updated successfully", trip });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ message: "Error updating trip", error: err });
      });
  });
};

// GET: /trips/:tripCode - Retrieve a single trip
const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Model.findOne({ code: req.params.tripCode }).exec();
    if (!trip) {
      return res.status(404).json({ message: `Trip with code '${req.params.tripCode}' not found` });
    }
    return res.status(200).json(trip);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving trip", error: err });
  }
};

// GET: /trips - Retrieve all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Model.find({}).exec();
    if (!trips || trips.length === 0) {
      return res.status(404).json({ message: "No trips found" });
    }
    return res.status(200).json(trips);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error retrieving trips", error: err });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
};
