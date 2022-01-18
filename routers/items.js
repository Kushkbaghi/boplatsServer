const express = require("express");
const router = express.Router();

// Include item modle and create an object of the modle
const Item = require("../models/Item");

// CREATE ITEM
router.post("/", async (req, res) => {
  try {
    const newItem = await new Item(req.body);
    const itemAdded = await newItem.save();
    res.status(200).json(newItem);
  } catch (error) {
    res.status(500).json(error);
  }
});

//  GET AN ITEM
router.get("/:id", async (req, res) => {
  const formId = req.body.itemId;
  const parameterId = req.params.id;

  try {
    // Get alla info about user but not password
    const theItem = await Item.findById(parameterId);
    res.status(200).json(theItem);
  } catch (error) {
    res.status(500).json(error);
  }
});

//  GET ALL ITEMS
router.get("/", async (req, res) => {
  try {
    // Get alla info about user but not password
    const theItems = await Item.find();
    res.status(200).json(theItems);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE AN ITEM
router.put("/:id", async (req, res) => {
  try {
    const formId = req.body.itemId;
    const parameterId = req.params.id;
    // if URL id/parameter is same as body/form input
    //if (formId === parameterId) {
    // If there is any password data from form/body update password

    // Update the item with body data
    const updateItemsAccont = await Item.findByIdAndUpdate(parameterId, {
      $set: req.body,
    });
    // Send if it's successful
    res.status(200).json("Item har updaterats");
    //} else {
    // Send Unauthorized error
    // res.status(401).json("Fel inmatning försök igen!");
    //}
  } catch (error) {
    // Send Internal Server Error
    res.status(500).json(error);
  }
});

// DELETE AN ACCONT
router.delete("/:id", async (req, res) => {
  const parameterId = req.params.id;
  try {
    // Find and delete element
    const deleteitem = await Item.findByIdAndDelete(parameterId);
    res.status(200).json("Item är raderad");
  } catch (error) {
    // Send Internal Server Error
    res.status(500).json(error);
  }
});
module.exports = router;
