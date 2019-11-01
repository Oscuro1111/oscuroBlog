module.exports =function(express,dir,fs){
    return ((exp)=>{
        var router = express.Router();

        router.get('/auth/home',(req,res,next)=>{

            if(!req.session.user){
                res.status(400).send("No validated user account Found ! plz Login with valiadted user Id !");
                return;
            }

            next();
            return;
        },function(req,res ,next){
            fs.readFile(dir+'/myviews/Home.html' ,(err,data)=>{
                if(err) res.status(500).send("Internal server error :( !");

                res.render('Home',{data:data});
            });

        });

        return router; 
    })(express);
}

