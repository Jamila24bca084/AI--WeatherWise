const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  createLocation,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation
} = require("../controllers/locationController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createLocation);
router.get("/", getLocations);
router.get("/:id", getLocation);
router.put("/:id", updateLocation);
router.delete("/:id", deleteLocation);

module.exports = router;
