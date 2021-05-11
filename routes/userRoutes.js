const express = require('express');
const router = express.Router();
const {createUser,loginUser,getProfile,eventsList,authenticator} = require('../controller/userController');
//get users profile
router.get('/profile',authenticator,getProfile);
//get list of events registered by user
router.get('/registeredEvents',authenticator,eventsList);
//create user(signup)
router.post('/signup',createUser);
//login
router.post('/login',loginUser);
//edit profile
module.exports=router;
