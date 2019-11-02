$(document).ready(function () {

    var flg = false;
    var socket = io.connect(window.location.host);

    socket.on('connection', (data) => {
        console.log("Connected with socket ID: " + data.msg);
    });

    socket.on("listRecieved", function (data) {

        var container = $("#postContent");
        console.log(data.images);

        if (!flg) {
            if (data.images.length) {
                for (let i = 0; i < data.images.length; i++) {
                    var img = "<div class='postImage' id='post-image'><img src=/postImages/" + data.images[i] + " width='600px' height='300px'><span class='btn' id='img-remove' style='visibility:hidden;background-color:red;color:white'>Remove</span></div>";
                    setTimeout((img=> {
                       
                        var img_=img;
                       
                        return _=>{
                        $(container).append("<br>");
                        $(container).append(img_);
                     
                    };
                })(img), 1000);
                }

                  setTimeout( _=>{$("div#post-image").hover(function () {
                                // over
                                $(this).find("span#img-remove").css({"visibility":"visible"});
                                
                            }, function () {
                                // out

                                $(this).find("span#img-remove").css({"visibility":"hidden"});

                            }
                        );
                        
         $(container).find('span#img-remove').click(function ($event) {

            $event.preventDefault();

            $(this.parentNode).remove();
        });
     },1000);

            }
             
        } else {
            var cimg = "<div id='cover-image'><img src=/postImages/" + data.images + " width='100%' height='300px'><span class='btn' id='img-remove' style='visibility:hidden;background-color:red;color:white'>Remove</span></div>";
            var coverImg = $("#cover-image")[0];
            var parent =coverImg.parentNode;
            setTimeout(_ => {
                
                $(coverImg.parentNode).append(cimg);
                
                var detached = $(coverImg).detach();
                $("div#cover-image").find("span#img-remove").click(function(e){
        
                    e.preventDefault();
                    
                                            $(parent).append(detached);
            
                                            $(this.parentNode).remove();
                        });
            }, 1000);
                flg = false;

        }

        $(container).find('span#img-remove').click(function ($event) {

            $event.preventDefault();

            $(this.parentNode).remove();
        });
    });

    $("h4#cover-image").click(function ($event) {
        $event.preventDefault();

        flg = true;
       window.open("https://oscuro.herokuapp.com/createPost/uploadImg.html");
       // window.open("http://localhost:3000/createPost/uploadImg.html");

    });

});