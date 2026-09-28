const Location = require("../models/Location");

async function createLocation(req, res, next) {
  try {
    const { city, country } = req.body;

    if (!city || !country) {
      return res.status(400).json({
        success: false,
        message: "City and country are required"
      });
    }

    const location = await Location.create({
      user: req.user.id,
      city: city.trim(),
      country: country.trim()
    });

    res.status(201).json({
      success: true,
      message: "Favorite location added",
      location
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This location is already in your favorites"
      });
    }
    next(error);
  }
}

async function getLocations(req, res, next) {
  try {
    const locations = await Location.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: locations.length,
      locations
    });
  } catch (error) {
    next(error);
  }
}

async function getLocation(req, res, next) {
  try {
    const location = await Location.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found"
      });
    }

    res.json({ success: true, location });
  } catch (error) {
    next(error);
  }
}

async function updateLocation(req, res, next) {
  try {
    const { city, country } = req.body;

    const location = await Location.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      {
        ...(city && { city: city.trim() }),
        ...(country && { country: country.trim() })
      },
      { new: true, runValidators: true }
    );

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found"
      });
    }

    res.json({
      success: true,
      message: "Location updated",
      location
    });
  } catch (error) {
    next(error);
  }
}

async function deleteLocation(req, res, next) {
  try {
    const location = await Location.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found"
      });
    }

    res.json({
      success: true,
      message: "Location deleted"
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createLocation,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation
};
