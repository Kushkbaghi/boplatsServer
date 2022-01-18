const mongoose = require("mongoose");

// Create datamodeling/Schema for items collection
// Create Createdate for item by timestamps
const ItemsSchema = new mongoose.Schema(
  {
    admin: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    town: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    floor: { type: Number, required: true },
    room: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: "",
    },
    tags: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Items", ItemsSchema);
