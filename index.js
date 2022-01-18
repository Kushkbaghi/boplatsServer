const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

// INCLUDE ROUTERS
const check = require("./routers/check");
const admin = require("./routers/admin");
const items = require("./routers/items");



/**------------------------
 *      DEPLOY SETTIING
 *------------------------*/




/**------------------------
 *      CONFIG
 *------------------------*/
// Get access controll to server/API
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Make image folder public
app.use("/images/", express.static(path.join(__dirname, "/images")));
dotenv.config();

// Make it possible to send JSON by body
app.use(express.json());

// Connect to databse
mongoose
  .connect(process.env.DATABS_URL)
  .then(console.log("Databas är kopplad"))
  .catch((err) => console.log(err));

// FILE UPLOADER
const fileStoragGenerator = multer.diskStorage({
  destination: (req, file, cb) => {
    // Callback function error null and path to store the file
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    // Create a orginalname as file namne and Date to make it unique
    cb(null, req.body.name);
  },
});

// Fileuploader
const fileUploader = multer({ storage: fileStoragGenerator });

// Call file uploader to save just a SINGLE  ifle
app.post("/server/file", fileUploader.single("file"), (req, res) => {
  res.status(200).json("Upload!");
});

// USE ROUTERS
app.use("/server/check", check);
app.use("/server/admin", admin);
app.use("/server/items", items);

// App Index
app.get('/', (req, res)=>{
  res.send('Boplats!')
})

app.listen(process.env.PORT || "3000", () => {
  console.log("Back end körs!");
});
