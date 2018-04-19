function setSwitch(bol) {
    switch_bg=bol;
    if(bol){
        document.getElementById('back_white').classList.remove('blur_back');
        document.getElementById('back_white').classList.remove('transparent_back');
        document.getElementById('album_back').classList.add("transparent_back");
    }else {
        document.getElementById('back_white').classList.add('blur_back');
        document.getElementById('back_white').classList.add('transparent_back');
        document.getElementById('album_back').classList.remove("transparent_back");
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


function get_album(id) {
        $.ajax({
            type: 'post',
            url: "query_album.php",
            data: '&album_id=' + id,
            success: function (data) {
                var docList = document.getElementById('album_list_items');
                var change_string = "";
                var pre = "  <a onclick=\"" + "select_song(";
                var mid = ",true)" + "\" class=\"list-group-item list-group-item-action none_back\">\n";
                var end = "  </a>\n"
                var uta_list_obj = JSON.parse(data);
                 document.getElementById('list_album_pic').src=uta_list_obj.album.picUrl ;
                document.getElementById('list_album_name').innerHTML=uta_list_obj.album.name;
                document.getElementById('list_album_company').innerHTML= uta_list_obj.album.company;
                var pub_date = new Date();
                pub_date.setTime(uta_list_obj.album.publishTime);
                document.getElementById('list_album_date').innerHTML= (1900 + pub_date.getYear()) + "/" + pub_date.getMonth() + "/" + pub_date.getDate();
                for (xx in uta_list_obj.album.songs) {
                    var x = uta_list_obj.album.songs[xx];
                    change_string += pre + x.id + mid + x.name;

                    if (x.alias && x.alias.length > 0) {
                        change_string += ' <i><sub>(';
                        for (var ind in x.alias) {
                            if (ind != 0) change_string += '/';
                            change_string += x.alias[ind];
                        }
                        change_string += ')</sub></i>';
                    }
                    change_string += " - ";
                    var next_artist = "";
                    for (yy in x.artists) {
                        var y = x.artists[yy];
                        if (next_artist != "") {
                            next_artist += "/" + y.name;
                        } else next_artist += y.name;
                    }
                    change_string += next_artist + end;
                }
                docList.innerHTML = change_string;
                var player_select = document.getElementById('album_link');
                player_select.removeAttribute('hidden');
            }
        });
}

function select_song(id,from_album) {
    song_id_now = id;
    $.ajax({
        type: "post",
        url: "get_song_by_id.php",
        data: '&uta_id=' + id,
        success: function (ret) {
            var obj = JSON.parse(ret);
            // console.log(obj);
            var name = document.getElementById('song_name');
            var url = document.getElementById('song_source');
            var lyric = document.getElementById('lyric');

            url.src = obj.song.link;
            name.innerHTML = obj.song.name;
            if(! from_album){
                var album = document.getElementById('album_name');
                album.innerHTML =  obj.song.album.name ;
                var img = document.getElementById('song_img');
                img.src = obj.song.album.picUrl;
                document.getElementById('album_back').style.background="url("+obj.song.album.picUrl+") no-repeat right center fixed";
                document.getElementById('result_title').innerHTML='SHARE 「'+ obj.song.name+'」';
                var share=document.getElementById('result_text');
                var href=window.location.href;
                href=href.substr(0, href.lastIndexOf('/'))+"/?id="+obj.song.id;
                share.innerHTML=share.href=href;
            }
            // console.log(times);
            showPlayer();
            var x = document.getElementById('hoshi_no_uta');
             // console.log( document.getElementById('volume').style.width.toString());
             x.volume =0.5;
            document.getElementById('volume').style.width=(x.volume*100)+"%";
            x.load();
            x.play();
            if(!from_album) {
                get_album(parseInt(obj.song.album.id));
                var player_select = document.getElementById('player_link');
                player_select.removeAttribute('hidden');
            }
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
            var mid = ",false)" + "\" class=\"list-group-item list-group-item-action none_back\">\n";
            var end = "  </a>\n"
            var uta_list_obj = JSON.parse(data);
            // console.log(uta_list_obj);
            for (xx in uta_list_obj.result.songs) {
                var x = uta_list_obj.result.songs[xx];
                change_string += pre + x.id + mid + "<img src='" + x.album.picUrl+"?param=130y130" + "' style='height: 5vh' class='rounded'/> " + x.name
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