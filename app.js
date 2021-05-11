const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser :true, useCreateIndex: true, useUnifiedTopology:true}).then(()=>{
    console.log("MongoDB connected");
}).catch((error)=>{console.log(error);});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
})
app.use('/events',eventRoutes);
app.use('/users',userRoutes);

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
});