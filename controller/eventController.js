const express = require('express');
const router = express.Router();
const EVENT_OBJ = require("../models/event.model");
const User = require('../models/user.model');
const multer=require('multer')
const fs = require('fs');
const path = require('path');
const storage=multer.diskStorage({
    destination:function(Request,file,callback)
    {
        callback(null,'./Uploads');
    },
    filename:function(Request,file,callback)
    {
        callback(null,Date.now()+'-'+file.originalname);
    },
});
const upload=multer({storage:storage});
router.use(express.urlencoded({ extended: true }))

const postEvent = (req,res)=>{
    const details=new EVENT_OBJ({name:req.body.name ,description:req.body.description ,time:req.body.time,date:req.body.date,img:{data:fs.readFileSync(path.join('Uploads/' + req.file.filename)),contentType: 'image/png'},venue:req.body.venue ,tags:req.body.tags,isUsingRegPortal:req.body.isUsingRegPortal,regLink:req.body.regLink});
    try{
        details.save();
        res.send(details);
    }
    catch(error)
    {
        res.status(500).send(error);
    }
}

const getAllEvents = async (req,res)=>{
    const data= await EVENT_OBJ.find().sort({_id:-1});
    res.send(data)
}

const getEvent = (req,res)=>{}

const getParticipants = (req,res)=>{
    const id=req.body.id;
    User.find({regEvents:{$elemMatch:{$eq:id}}}).then(users=>{
        res.status(200).send(users);
    }).catch(err=>{
        console.log(err);
        res.status(400);
    });

}

const register = (req,res)=>{
    const user = req.user;
    const id=req.body.id;
    User.updateOne({email:user.email},{$push: { regEvents:id } }).then(response=>{
        res.status(200).json({Success:true})
    }).catch(err=>{
        console.log(err);
        res.status(400);
    });
}

module.exports={postEvent,getAllEvents,getEvent,getParticipants,register,upload};
