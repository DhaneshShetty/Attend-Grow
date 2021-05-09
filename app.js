const express = require('express');
const cors = require('cors');
const app = express();

const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use('/events',eventRoutes);
app.use('/users',userRoutes);

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})