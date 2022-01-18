const express = require("express");
const router = express.Router();

const multer = require("multer");
// File stotage destination
const destination = { dest: "../images/" };

router.post("/", destination.single(""));

module.exports = router;
