const express = require('express');
const router = express.Router();
const {allUsers, singleUser, editUser}=require("../controllers/userController");
const { isAuthenticated } = require('../middleware/auth');



//user routes
///api/allUsers
router.get('/allusers',isAuthenticated,allUsers)
//api/user/id
router.get('/user/:id',isAuthenticated,singleUser);
//api/user/edit/id
router.put('/user/edit/:id',isAuthenticated,editUser);

module.exports = router;
