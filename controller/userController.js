const User = require('../models/user.model');
const Token = require('../models/refreshtoken.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const EVENT_OBJ = require("../models/event.model");


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
    console.log("request is " + req.body);
    User.find({email:email}).then(async user=>{
        if(user == null){
            return res.status(404).json({Success:false,Message:'Cannot find User'});
        }
        try{
            if(await bcrypt.compare(password,user[0].password)){
                const accessToken=jwt.sign({email:user[0].email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'60m'});
                const refreshToken = jwt.sign({email:user[0].email},process.env.REFRESH_TOKEN_SECRET);
                const token = new Token({refreshtoken:refreshToken});
                token.save()
                .then(()=>{
                    res.cookie("refreshToken",refreshToken,{
                        httpOnly: true,
                        sameSite: "strict" });
                    res.cookie("accessToken",accessToken,{
                        httpOnly: true,
                        sameSite: "strict" });
                    res.cookie("loggedIn",'true',{
                        httpOnly:false,
                        sameSite:"strict"
                    });
                    res.redirect('../');
                })
                .catch(err=>console.log(err));
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
    const token = req.cookies.accessToken;
    const refresh = req.cookies.refreshToken;
    if(token == null){
        if(req.xhr){
            return res.status(403).send({success:true});
        }
        return res.redirect('../login.html');
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) {
            Token.find({refreshtoken:refresh}).then(token=>{
                if(token==null) return res.status(403).redirect('../login.html');
                jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
                    if(err) return res.status(403).redirect('../login.html');
                    const accessToken = jwt.sign({email:user.email},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'60m'});
                    res.cookie('accessToken',accessToken,{
                        httpOnly: true,
                        sameSite: "strict" });
                });
            }).catch(err=>{
                console.log(err);
            })
        }
        req.user = user;
        next();
    })
}

const getProfile = (req,res) =>{
    User.find({email:req.user.email}).then(user=>{
        if(user == null){
            return res.status(404).json({Success:false,Message:'Cannot find User'});
        }
        return res.status(200).json({Success:true,data:user});
    }).catch(err=>{
        console.log(error);
        res.status(400).json({Success:false,Message:error});
    })
}


const registeredEventsList =(req,res) =>{
    User.find({email:req.user.email}).then(async user=>{
        if(user == null){
            return res.status(404).json({Success:false,Message:'Cannot find User'});
        }
        var name=user[0].name
        var email=user[0].email
        var reg_no=user[0].regNo
        var arr=user[0].regEvents
        var data_arr=[]
        for(var i=0;i<arr.length;i++)
        {
            await EVENT_OBJ.find({_id:arr[i]}).then((data1)=>{
                data_arr.push(data1[0])
            }).catch(err=>{
                console.log(err);
                res.status(400).json({Success:false,Message:err});
            })
            
        }
        return res.status(200).json({Success:true,result:data_arr,name:name,email:email,reg:reg_no})
    }).catch(err=>{
        console.log(err);
        res.status(400).json({Success:false,Message:err});
    })
}


const postedEventsList =(req,res) =>{
    User.find({email:req.user.email}).then(async user=>{
        if(user == null){
            return res.status(404).json({Success:false,Message:'Cannot find User'});
        }
        var arr=user[0].postedEvents
        var data_arr=[]
        for(var i=0;i<arr.length;i++)
        {
            await EVENT_OBJ.find({_id:arr[i]}).then((data1)=>{
                data_arr.push(data1[0])
            }).catch(err=>{
                console.log(err);
                res.status(400).json({Success:false,Message:err});
            })
            
        }
        return await res.status(200).json({Success:true,result:data_arr})
    }).catch(err=>{
        console.log(err);
        res.status(400).json({Success:false,Message:err});
    })
}


const getNewToken = (req,res) =>{
    const refreshToken = req.body.token;
    if(refreshToken == null) return res.sendStatus(400);

}

const logOut = (req,res) =>{
    const refreshToken = req.cookies.refreshToken;
    Token.deleteOne({refreshtoken:refreshToken}).then(()=>{
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.clearCookie('loggedIn');
        res.status(204).json({Success:true,data:'LogOut Successful'})
    }).catch(err=>{
        console.log(err);
        res.sendStatus(404);
    })
}

module.exports = {createUser,loginUser,getProfile,registeredEventsList,authenticator,getNewToken,logOut,postedEventsList};
