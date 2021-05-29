const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:4
    },
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:2
    },
    password:{
        type:String,
        required:true,
    },
    regEvents:{
        type:Array
    },
    postedEvents:{
        type:Array
    },
    regNo:{
        type:String,
        required:true
    }
},{
    timestamps:true,
});

const User = mongoose.model('User',userSchema);
module.exports = User;