const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

// INCLUDE ROUTERS
const check = require("./routers/check");
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
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
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
app.post("/file", fileUploader.single("file"), (req, res) => {
  res.status(200).json("Upload!");
});

// USE ROUTERS
app.use("/check", check);
app.use("/items", items);

app.get("/",  (req, res) =>{
  res.send("hej");
});

const PORT = process.env.PORT || 3000;

// Connect to databse
mongoose
  .connect(process.env.DATABS_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server kör i ${PORT}`)))
  .catch((err) => console.log(err));
