$( function () {
    var bg = document.getElementById("back_white");

    var interval = 8000;
    var index = 0;
    var delay = 500;
    var body = document.body;
    var url = 'url("back/{file}")';

    var imageList = ['1.png', '2.png', '3.png', '4.png', '5.png'];

        // bg.style.transition = "background-color " + delay/1000 +"s";
        console.log(bg.style.transition);
        setInterval(function () {
            if(switch_bg) {
                index++;
                if (index >= imageList.length) {
                    index = 0;
                }
                // body.classList.add('blur_back');
                bg.classList.add("blur_back");
                setTimeout(function () {
                    bg.classList.remove("blur_back");
                    bg.style.background = url.replace("{file}", imageList[index])+" no-repeat center center fixed";
                    bg.style.backgroundSize='cover';
                }, delay * 1.5);
            }
            /*bg.animate({
                //backgroundColor:'rgba(255,255,255,1)'
            }, delay * 1, function () {
                body.css('background',url.replace("{file}",imageList[index])+" no-repeat right center fixed;" );
                console.log(imageList[index]);
                setTimeout(function () {
                    bg.animate({
                //backgroundColor:'rgba(255,255,255,0)'
                    }, delay * 1);
                }, delay * 0.1);
            });*/
        }, interval);

});