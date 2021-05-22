const express = require('express');
const router = express.Router();

const {postEvent,getAllEvents,getEvent,getParticipants,register,upload} =require('../controller/eventController');

//routes post event
router.post('/post_event',upload.single('image'), postEvent);
//get list of event
router.get('/events',getAllEvents);
//get particular event
router.get('/:id',getEvent);
//get list of participants(public)
router.get('/:id/participants',getParticipants);
//register a user to event
router.post('/:id/register',register);

module.exports=router;
