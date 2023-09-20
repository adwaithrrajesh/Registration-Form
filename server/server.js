const express = require('express');
const cors = require('cors');
const morgan  = require('morgan');
const dotenv = require('dotenv');
const app = express();
const formRouter = require('./routes/formRouter')

require('./database/config');


// Configing DotEnv
dotenv.config();

//  Express
app.use(express.json());

// Cors
app.use(cors({
    origin: '*',
    methods:['GET','POST','PUT','PATCH','DELETE'],
    credentials:true
}));

// Specify Route
app.use('/api',formRouter)

// Morgan
app.use(morgan('dev'));


// Port Setup
const port = process.env.PORT;
app.listen(port,()=>{console.log(`server started at port ${port}`);});