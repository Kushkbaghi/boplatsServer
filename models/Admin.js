const mongoose = require("mongoose");

// Create datamodeling/Schema for admins collection
// Create Createdate for item by timestamps
const AdminsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Admin", AdminsSchema );