var mongoose = require("../../node_modules/mongoose");


 async function start(){
var dbserver =  await mongoose.connect("mongodb://localhost:27017/blogUsers", { useNewUrlParser: true, useUnifiedTopology: true });
var connection = mongoose.connection;


    connection.db.collection('user' , function(err,collections){
        collections.find({}).toArray((err ,data)=>{
            if(err) console.log("==="+err);
            console.log(data);
        });
    });

}

start();