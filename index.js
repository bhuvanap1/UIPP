require("dotenv").config();

const express = require("express");

const app = express();

const mongoose=require("mongoose");

const path = require( 'path');

const userRoutes = require('./server/routes/user');

const postRoutes = require('./server/routes/post');

const cookieParser = require('cookie-parser');

const cors = require('cors');

const bodyParser=require('body-parser');

mongoose.connect(process.env.dbURL)
.then(console.log("Database Connected!!!"))
.catch(error=>console.log(error));

app.use (express. json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true})); 

app.use(bodyParser.json()); 

app.use(express.static(__dirname + "/client/build"));

app.get('/', (req, res) => res.sendFile(path.join(__dirname,'/client/build', 'index.html')));

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));

app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Headers","Origin,X-Requested-Width, Content-Type, Accept, Authorization")

    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

    next();

});

app.use('/user', userRoutes);

app.use('/post', postRoutes);

const PORT = process.env. PORT || 6000;

app. listen(PORT, () => console. log(`Server started on port ${PORT}!`)) ;
