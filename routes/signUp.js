

module.exports = function (express, dir, fs) {

    return (( exp, fs) => {
        var router = exp.Router();

        router.get("/signUp", function (req, res) {
            fs.readFile(dir+"/signUp/signUp.html" , function(err , data){
                if(err) res.status(500).send("Inetrnal server error:(!");

                res.render("index" ,{title:"SignUp Form" , data:data.toString(),errors:[]});
            });
        });


        return router;
    })(express, fs);

};