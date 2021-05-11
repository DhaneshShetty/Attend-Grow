const express = require('express');
const router = express.Router();
const {postEvent,getAllEvents,getEvent,getParticipants,register} =require('../controller/eventController');

//routes post event
router.post('/',postEvent);
//get list of event
router.get('/',getAllEvents);
//get particular event
router.get('/:id',getEvent);
//get list of participants(public)
router.get('/:id/participants',getParticipants);
//register a user to event
router.post('/:id/register',register);

module.exports=router;
