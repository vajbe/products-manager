//jshint esversion: 6
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const apiRoutes = require(__dirname + '/server/routes/api-routes');
const dbConn = require(__dirname + "/server/config/creds");
const app = express();
const cors = require('cors');


let port = process.env.PORT || 5566;

app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.use(bodyParser.json());

app.use('/api',apiRoutes); 

app.use(cors());

let url = `mongodb+srv://${dbConn.user}:${dbConn.password}@${dbConn.host}/${dbConn.db}?retryWrites=true`;

mongoose.connect(url, {useNewUrlParser: true},(err)=>{
    if(!err){
        console.log("Successfully connected to DB");
    }
    else
        console.log(err);
});

app.listen(port,() => {
    console.log("Server has started...");
});