const express = require('express');
const router = express.Router();

const {postEvent,getAllEvents,getEvent,getParticipants,register,upload} =require('../controller/eventController');
const {authenticator} = require('../controller/userController');

//routes post event
router.post('/post_event',upload.single('image'), postEvent);
//get list of event
router.get('/events',getAllEvents);
//get particular event
router.get('/:id',getEvent);
//get list of participants(public)
router.post('/participants',getParticipants);
//register a user to event
router.post('/register',authenticator,register);

module.exports=router;
