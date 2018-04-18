function setSwitch(bol) {
    switch_bg=bol;
    if(bol){
        document.getElementById('back_white').classList.remove('blur_back');
    }else {
        document.getElementById('back_white').classList.add('blur_back');
    }
}
function showPlayer() {
    $('#song_list').collapse('hide');
    $('#album_list').collapse('hide');
    $('#player').collapse('show');
    setSwitch(false);
}
function showAlbum() {
    $('#player').collapse('hide');
    $('#song_list').collapse('hide');
    $('#album_list').collapse('show');
    setSwitch(false);
}

function showSearchList() {
    $('#player').collapse('hide');
    $('#album_list').collapse('hide');
    $('#song_list').collapse('show');
    setSwitch(false);
}
function hideall() {
    $('#player').collapse('hide');
    $('#song_list').collapse('hide');
    $('#album_list').collapse('hide');
    setSwitch(true);
}


function get_album(id,song_id) {
    $.ajax({
        type: 'post',
        url: "query_album.php",
        data: '&album_id=' + id,
        success: function (data) {
            var docList = document.getElementById('album_list');
            var change_string = "<div style='width: 80vw' class=\"list-group \"> \n";
            var pre = "  <a onclick=\"" + "select_song(";
            var mid = ")" + "\" class=\"list-group-item list-group-item-action none_back\">\n";
            var end = "  </a>\n"
            var uta_list_obj = JSON.parse(data);
            change_string += "<a onclick= 'showPlayer()' class=\"list-group-item list-group-item-action none_back\">" +
                "<div class ='row'>" +
                "<div class=' col-sm-offset-1 col-sm-3'>" +
                "<img src='" + uta_list_obj.album.picUrl + "' style='width: 20vh;height: 20vh'  class='rounded' />" +
                "</div>" +
                " <div class= 'col-sm-offset-1 col-sm-6'>" +
                "<h1>" + uta_list_obj.album.name + "</h1>" +
                "<p>" + uta_list_obj.album.company + "</p>" ;
            var pub_date = new Date();
            pub_date.setTime( uta_list_obj.album.publishTime);
            change_string+= "<p>"+(1900+ pub_date.getYear())+"/"+pub_date.getMonth()+"/"+pub_date.getDate()+"</p>"+
                "</div> " +
                "</div>"
            "</a>";
            // console.log(uta_list_obj);
            var prev_btn=document.getElementById('album_prev')
                ,next_btn=document.getElementById('album_next');
            var prev=null,next=null,selected=0;
            for (xx in uta_list_obj.album.songs) {
                var x = uta_list_obj.album.songs[xx];
                change_string += pre + x.id + mid + x.name ;

                if(x.alias&&x.alias.length>0){
                    change_string+=' <i><sub>(';
                    for(var ind in x.alias){
                        if(ind!=0)change_string+='/';
                        change_string+=x.alias[ind];
                    }
                    change_string+=')</sub></i>';
                }
                change_string+= " - ";
                var next_artist = "";
                for (yy in x.artists) {
                    var y = x.artists[yy];
                    if (next_artist != "") {
                        next_artist += "/" + y.name;
                    } else next_artist += y.name;
                }
                change_string += next_artist + end;
                if(parseInt(x.id)==song_id){
                    selected=1;
                }else {
                    if (selected == 0) {
                        prev = x.id;
                    } else if (selected == 1) {
                        selected = 2;
                        next = x.id;
                    }
                }
            }
            if(prev){
                prev_btn.setAttribute("onclick","select_song("+prev +")");
                prev_btn.disabled=false;
            }
            else prev_btn.disabled=true;
            if(next){
                next_btn.setAttribute("onclick","select_song("+next +")");
                next_btn.disabled=false;
            }
            else next_btn.disabled=true;
            change_string += "</div>";
            docList.innerHTML = change_string;
            var player_select = document.getElementById('album_link');
            player_select.removeAttribute('hidden');
        }
    });
}

function select_song(id) {
    song_id_now = id;
    $.ajax({
        type: "post",
        url: "get_song_by_id.php",
        data: '&uta_id=' + id,
        success: function (ret) {
            var obj = JSON.parse(ret);
            // console.log(obj);
            var img = document.getElementById('song_img');
            var name = document.getElementById('song_name');
            var album = document.getElementById('album_name');
            var url = document.getElementById('song_source');
            var lyric = document.getElementById('lyric');

            album.innerHTML = '<a onclick="showAlbum()">' + obj.song.album.name + '</a>';
            url.src = obj.song.link;
            img.setAttribute('onclick','showAlbum()');
            img.src = obj.song.album.picUrl;
            name.innerHTML = obj.song.name;
            // console.log(times);
            showPlayer();
            var x = document.getElementById('hoshi_no_uta');
             // console.log( document.getElementById('volume').style.width.toString());
             x.volume =0.5;
            document.getElementById('volume').style.width=(x.volume*100)+"%";
            x.load();
            x.play();
            get_album(parseInt(obj.song.album.id),parseInt(obj.song.id));
            var player_select = document.getElementById('player_link');
            player_select.removeAttribute('hidden');
            if (obj.song.lyrics) {
                var lyric_strings = obj.song.lyrics.split('\n');
                var times = new Array(), allLines = new Array(), allLyrics = new Array();
                var cnt = 0;
                for (line in lyric_strings) {
                    var y = lyric_strings[line];
                    if (y[0] == '[') {
                        var ind = y.indexOf(']');
                        var timeStr = y.substr(1, ind - 1);
                        // console.log(timeStr+" "+timeStr.substr(0,2)+" "+timeStr.substr(3));
                        times[cnt] = parseFloat(timeStr.substr(0, 2)) * 60 + parseFloat(timeStr.substr(3));
                        allLyrics[cnt] = "<p id='__lyric_p_" + cnt + "' style='height: 5vh;border-radius: 5px;'>" + y.substr(ind + 1) + "</p>";
                        cnt++;
                    }
                }
                loop(times, allLyrics, id);
            } else {
                loop(null, null, id);
            }

        }
    });
}

function submitForm() {
    var form = $("form");
    var data = form.serialize();
    $.ajax({
        type: form.attr('method'),
        url: "query.php",
        data: data,
        success: function (data) {
            // setSwitch(true);
            var docList = document.getElementById('song_list');
            var change_string = "<div class=\"list-group \"> <div>\n";
            var pre = "  <a onclick=\"" + "select_song(";
            var mid = ")" + "\" class=\"list-group-item list-group-item-action none_back\">\n";
            var end = "  </a>\n"
            var uta_list_obj = JSON.parse(data);
            // console.log(uta_list_obj);
            for (xx in uta_list_obj.result.songs) {
                var x = uta_list_obj.result.songs[xx];
                change_string += pre + x.id + mid + "<img src='" + x.album.picUrl + "' style='height: 5vh' class='rounded'/> " + x.name
                if(x.alias&&x.alias.length>0){
                    change_string+=' <i><sub>(';
                    for(var ind in x.alias){
                        change_string+=x.alias[ind];
                    }
                    change_string+=')</sub></i>';
                }
                change_string+= " - ";
                var next = "";
                for (yy in x.artists) {
                    var y = x.artists[yy];
                    if (next != "") {
                        next += "/" + y.name;
                    } else next += y.name;
                }
                change_string += next + " - " + x.album.name + end;
            }
            change_string += "</div></div>";
            docList.innerHTML = change_string;
            showSearchList();
            var player_select = document.getElementById('result_link');
            player_select.removeAttribute('hidden');
        }
    });

}

$("document").ready(function (e) {
    $("#submit_form").submit(function (e) {
        e.preventDefault();
        submitForm();
    });

})
