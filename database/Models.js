
//Following module pattern


module.exports = (async function () {
    var crypto = require('crypto');

    var mongoose = require('mongoose');
    console.log("MoongoDB");
    
    var dbserver =await mongoose.connect("mongodb+srv://Oscuro:Computerislife;@cluster0-guxyc.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
    
    var User = mongoose.Schema({
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        auth: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "authInfo",
            required:true
        },
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" ,required:false}]
    });

    var authInfo = mongoose.Schema({
        hash: String,
        salt: String
    });


    authInfo.methods.setPassword = function (password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString('hex');

    };

    authInfo.methods.validPassword = function (password) {
        var _hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString('hex');

        return this.hash === _hash;
    }

    var post = mongoose.Schema({
        title: String,
        author: {
            type: mongoose.Schema.Types.ObjectId, ref: "user"
        },
        body: String,
        img:String,
        date: {
            type: Date,
            default: Date.now()
        },
        comments: [{ body: String, date: Date }]
    });


    return {
        models: {
            "User": mongoose.model("user", User,"user"),
            "AuthInfo": mongoose.model("authInfo", authInfo ,"authInfo"),
            "Post": mongoose.model("posts", post,"post") ,
             db_:mongoose.connection
        }
    };

})();