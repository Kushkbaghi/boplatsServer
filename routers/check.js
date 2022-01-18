const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Include admin modle aand create an object of the modle
const Admin = require("../models/Admin");

// LOGIN
router.post("/login", async (req, res) => {
  try {
    // return true if admins namne and password is valid
    const validAdminName = await Admin.findOne({ name: req.body.name });

    !validAdminName && res.status(400).json("Fel anvädarnamn eller lösenord!");

    // Check password
    const validAdminPass = await bcrypt.compareSync(
      req.body.password,
      validAdminName.password
    );
    !validAdminPass && res.status(400).json("Fel anvädarnamn eller lösenord!");

    // Send all data but not password
    const theAdmin = await Admin.findOne({ name: req.body.name }).select(
      "-password"
    );
    res.status(200).json(validAdminName);

    // Create local Storage object
  } catch (error) {
    res.status(500).json(error);
  }
});

// SINGUP
router.post("/register", async (req, res) => {
  // user try catch for async functions
  try {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(req.body.password, salt);
    const newAdmin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
    });

    // sava post body/new admin to the collistion/table by Mongoose save method
    const admin = await newAdmin.save();

    res.status(200).json(admin);
  } catch (error) {
    // Send  internal Server Error status and the error
    res.status(500).json(error);
  }
});

module.exports = router;
