// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");

// // Include admin modle and create an object of the modle
// const Admin = require("../models/Admin");
// const Item = require("../models/Item");

// // //  GET AN ACCONT
// // router.get("/:id", async (req, res) => {
// //   const formId = req.body.adminId;
// //   const parameterId = req.params.id;

// //   try {
// //     // Get all info about user but not password
// //     const theAdmin = await Admin.findById(parameterId).select("-password");
// //     res.status(200).json(theAdmin);
// //   } catch (error) {
// //     res.status(500).json(error);
// //   }
// // });

// // UPDATE AN ACCONT
// router.put("/:id", async (req, res) => {
//   const formId = req.body.adminId;
//   const parameterId = req.params.id;
//   try {
//     // if URL id/parameter is same as body/form input
//     if (formId === parameterId) {
//       // If there is any password data från form/body update password
//       if (req.body.password) {
//         const salt = await bcrypt.genSaltSync(10);
//         const passwordHash = await bcrypt.hashSync(req.body.password, salt);
//       }
//       // Update the admin with body data
//       const updateAdminsAccont = await Admin.findByIdAndUpdate(parameterId, {
//         $set: req.body,
//       });
//       //
//       res.status(200).json(updateAdminsAccont);
//     } else {
//       // Send Unauthorized error
//       res.status(401).json("Fel inmatning försök igen!");
//     }
//   } catch (error) {
//     // Send Internal Server Error
//     res.status(500).json(error);
//   }
// });

// // DELETE AN ACCONT
// router.delete("/:id", async (req, res) => {
//   const parameterId = req.params.id;
//   const formId = req.body.adminId;

//   try {
//     // if URL id/parameter is same as body/form input
//     if (formId === parameterId) {
//       // Find and delete element 
//       const deleteAdmin = await Admin.findByIdAndDelete(parameterId);
//       // Delete the items those create by this admin
//       const deleteAdminsItems =  await Item.deleteMany({admin: Admin.name});
//       res.status(200).json("Konto är raderad");
//     } else {
//       res.status(401).json("Fel inmatning försök igen!");
//     }
//   } catch (error) {
//     // Send Internal Server Error
//     res.status(500).json(error);
//   }
// });
// module.exports = router;
