const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    country: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    }
  },
  { timestamps: true }
);

locationSchema.index({ user: 1, city: 1, country: 1 }, { unique: true });

module.exports = mongoose.model("Location", locationSchema);
