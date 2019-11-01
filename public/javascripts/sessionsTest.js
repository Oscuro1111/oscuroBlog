var createError = require('http-errors');
var fs = require('fs');
var ejs = require('ejs');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var MongoStore = require("../../node_modules/connect-mongo")(session);

var FileStore = require("../../node_modules/session-file-store")(session);
var mongoose = require("../../node_modules/mongoose");

const app = express();

const dbURL = "mongodb://127.0.0.1:27017/blogUsers";

mongoose.connect(dbURL);

const { Schema } = mongoose;
const {
    PORT = 3000,
    SECRET="Default"
} = process.env;


app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: SECRET,
    resave: true,
    store: new MongoStore({  mongooseConnection: mongoose.connection }),
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60*4  
    }
}));


app.use('/Home', function (req, res, next) {


    res.cookie("Name", "oscuro");
    req.session.user = {
        name: "Max",
        age: "20",
        rollNo: "7"
    };
    console.log(JSON.stringify(req.cookies));
    console.dir(JSON.stringify(req.session));

    res.send("Home");
});
app.get('/list' ,function(req, res ,next){

    //importent piece
    mongoose.connection.db.collection("sessions" ,function(err ,collection){
        if(err) throw err;
          var results;
          
          collection.find({}).toArray(function(err,data){
              if(err) return res.status(500).send("Internal server error:(!");
              results= JSON.stringify(data);
              console.log(data);
          });
           res.send(results);
    });
});
   
app.use('/user2', function (req, res, next) {


    console.log(JSON.stringify(req.cookies));
    console.dir(JSON.stringify(req.session));

    res.send("end");

});

app.listen(PORT, _ => console.log(PORT));
