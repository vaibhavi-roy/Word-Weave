const express = require('express');
const {
    getAllUsers,
    registerController,
    loginController,
} = require("../controllers/userController");

//router object 
const router = express.Router();

//GET ALL USERS || GET
router.get("https://word-weave-edj4.onrender.com/all-users", getAllUsers);

// CREATE USER || POST
router.post("https://word-weave-edj4.onrender.com/register", registerController);

//LOGIN ||POST
router.post("https://word-weave-edj4.onrender.com/login", loginController);


module.exports = router;