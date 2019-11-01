module.exports=function(express ,dir,fs){
    return (exp=>{
        var router = exp.Router();

        router.get('/logout' ,function(req,res){
            if(req.session.acc){
                delete req.session.acc;

                fs.readFile(dir+'/libs/Knight/index.html', (err, data) => {
                    if (err) throw err;
                    res.render('index', { title: 'Home', errors: [], data: data });
                  });

            }else{

                res.status(400).send("Bad Requiest!");
            }
        });

        return router;
    })(express);
}