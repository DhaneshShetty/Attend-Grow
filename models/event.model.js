const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name:{
      type: String,
      required: true,
      trim: true
    },
    description:{
      type: String,
      required: true
    },
    time:{
      type: String,
      required: true
    },
    date:{
      type: String,
      required: true
    },
    img:{
      data: Buffer,
      contentType: String
    },
    venue:{
      type: String,
      required: true
    },
    tags:{
      type:String
    },
    isUsingRegPortal:{
      type: Boolean
    },
    regLink:{
      type: String
    }
});

const Event = mongoose.model('Event',eventSchema);
module.exports = Event;
