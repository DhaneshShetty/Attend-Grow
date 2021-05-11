const mongoose = require('mongooose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    refreshtoken:{
        type:String,
        required:true
    }
});

const Token = mongoose.model('Token',tokenSchema);
module.exports = Token;