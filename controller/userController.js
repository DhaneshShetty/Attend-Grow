const User = require('../models/user.model');
const Tokens = require('../model/refreshtoken.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Token = require('../models/refreshtoken.model');

const createUser = async(req,res)=>{
    try{
        let email = req.body.email;
        let name = req.body.name;
        let regNo = req.body.regNo;
        let password = req.body.password;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({email:email,name:name,password:hashedPassword,regNo:regNo,regEvents:[]});
        newUser.save()
        .then(()=>res.status(201).json({Success:true}))
        .catch(err=> res.status(400).json({Success:false,Message:err}));  
    }
    catch(error){
        console.log(error);
        res.status(400).json({Success:false,Message:error});
    }
}

const loginUser = async(req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    const user =  User.find({email:email}).then(async user=>{
        if(user == null){
            return res.status(404).json({Success:false,Message:'Cannot find User'});
        }
        try{
            if(await bcrypt.compare(password,user[0].password)){
                const accessToken=jwt.sign({email:user[0].email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'60m'});
                const refreshToken = jwt.sign({email:user[0].email},process.env.REFRESH_TOKEN_SECRET);
                const token = new Tokens({refreshToken});
                token.save()
                .then(()=>res.status(200).json({Success:true,Message:'Logged In Successfully',AccessToken:accessToken,RefreshToken:refreshToken}));                
            }
            else{
                return res.status(403).json({Success:false,Message:'Wrong Password'});
            }
        }
        catch(error){
            console.log(error);
            res.status(400).json({Success:false,Message:error});
        }
    }).catch(err=>{
        console.log(error);
        res.status(400).json({Success:false,Message:error});
    });    
}

function authenticator(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return res.status(401).json({Success:false,Message:'Token not passed'});
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.status(403).json({Success:false,Message:Forbidden});
        req.user = user
        next()
    })
}

const getProfile = (req,res) =>{
    const user =  User.find({email:req.user.email}).then(user=>{
        if(user == null){
            return res.status(404).json({Success:false,Message:'Cannot find User'});
        }
        return res.status(200).json({Success:true,data:user});
    }).catch(err=>{
        console.log(error);
        res.status(400).json({Success:false,Message:error});
    })
}

const eventsList = (req,res) =>{
    User.find({email:req.user.email}).then(user=>{
        if(user == null){
            return res.status(404).json({Success:false,Message:'Cannot find User'});
        }
        return res.status(200).json({Success:true,data:user.regEvents});
    }).catch(err=>{
        console.log(error);
        res.status(400).json({Success:false,Message:error});
    })
}

module.exports = {createUser,loginUser,getProfile,eventsList,authenticator};


