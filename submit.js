function setSwitch(bol) {
    if (switch_bg === bol) return;
    switch_bg = bol;
    if (bol) {
        document.getElementById('table_layer').style.opacity = 0;
        if (!is_mobile) {
            document.getElementById('back_white').classList.remove('blur_back');
            document.getElementById('back_white').classList.remove('transparent_back');
            document.getElementById('album_back').classList.add("transparent_back");
        } else {
            document.getElementById('album_back').classList.add("moblie_back_style");
        }
    } else {
        document.getElementById('table_layer').style.opacity = 1;
        if (!is_mobile) {
            document.getElementById('back_white').classList.add('blur_back');
            document.getElementById('back_white').classList.add('transparent_back');
            document.getElementById('album_back').classList.remove("transparent_back");
        } else {
            document.getElementById('album_back').classList.remove("moblie_back_style");
        }
    }
}

function showPlayer() {
    $('#song_list').collapse('hide');
    $('#album_list').collapse('hide');
    if (is_mobile) {
        $('#lyric_mobile').collapse('hide');
        $('#navbar_collapse').collapse('hide');
    }
    $('#player').collapse('show');
    setSwitch(false);
}

function showAlbum() {
    $('#player').collapse('hide');
    $('#song_list').collapse('hide');
    if (is_mobile) {
        $('#lyric_mobile').collapse('hide');
        $('#navbar_collapse').collapse('hide');
    }
    $('#album_list').collapse('show');
    setSwitch(false);
}

function showSearchList() {
    $('#player').collapse('hide');
    $('#album_list').collapse('hide');
    if (is_mobile) {
        $('#lyric_mobile').collapse('hide');
        $('#navbar_collapse').collapse('hide');
    }
    $('#song_list').collapse('show');
    setSwitch(false);
}

function hideall() {
    $('#player').collapse('hide');
    $('#song_list').collapse('hide');
    $('#album_list').collapse('hide');
    if (is_mobile) {
        $('#lyric_mobile').collapse('hide');
        $('#navbar_collapse').collapse('hide');
    }
    setSwitch(true);
}

function showLyricsMobile() {
    $('#player').collapse('hide');
    $('#song_list').collapse('hide');
    $('#album_list').collapse('hide');
    $('#lyric_mobile').collapse('show');
    setSwitch(false);
}

function get_album(id) {
    $.ajax({
        type: 'post',
        url: "/music/",
        data: '&album_id=' + id,
        success: function (data) {
            var docList = document.getElementById('album_list_items');
            var change_string = "";
            var pre = "  <a onclick=\"" + "select_song(";
            var mid = ",true)" + "\" class=\"list-group-item list-group-item-action none_back\">\n";
            var end = "  </a>\n"
            var uta_list_obj = JSON.parse(data);
            document.getElementById('list_album_pic').src = uta_list_obj.album.picUrl.replace('http://', 'https://');
            document.getElementById('list_album_name').innerHTML = uta_list_obj.album.name;
            document.getElementById('list_album_company').innerHTML = uta_list_obj.album.company;
            var pub_date = new Date();
            pub_date.setTime(uta_list_obj.album.publishTime);
            document.getElementById('list_album_date').innerHTML = (1900 + pub_date.getYear()) + "/" + pub_date.getMonth() + "/" + pub_date.getDate();
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

function tryShowPlayer() {
    if(document.getElementById('player_link').hidden===false)
        showPlayer();
}

function setBackPc(aback, picUrl) {
    aback.style.background = "url(" + picUrl + ")";
    aback.style.backgroundSize = 'cover';
    aback.style.backgroundPosition = 'center';
}

function setBack(aback, picId, picUrl) {
    $.ajax({
        type: "post",
        url: '/music/',
        data: '&blur_pic_redirect=' + "https://music.163.com/api/img/blur/" + picId,
        success: function (data) {
            console.log(data);
            picId = data.replace('http://', 'https://');
            console.log(picId + ' ' + picUrl);
            aback.style.background = "url(" + picId + ")";
            document.body.style.background = 'url(' + picUrl + ')';
            document.body.style.backgroundSize = aback.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = aback.style.backgroundPosition = 'center';
        }
    });
}

function getShareLink(id) {
    var href = window.location.href;
    return href.substr(0, href.lastIndexOf('/')) + "/?share=" + id;
}

function select_song(id, from_album) {

    song_id_now = id;
    $.ajax({
        type: "post",
        url: '/music/',
        data: '&id=' + id,
        success: function (ret) {
            var obj = JSON.parse(ret);
            // console.log(obj);
            var name = document.getElementById('song_name');
            var url = document.getElementById('song_source');
            // var lyric = document.getElementById('lyric');
            document.title = '「' + obj.song.name + '」 - MUSIC';
            var meta = document.getElementsByTagName("meta");
            url.src = obj.song.link;
            name.innerHTML = obj.song.name;
            if (!from_album) {
                var album = document.getElementById('album_name');
                if (obj.song.album.name) album.innerHTML = obj.song.album.name;
                var img = document.getElementById('song_img');
                var picurl = obj.song.album.picUrl.replace('http://', 'https://');
                img.src = picurl;

                var aback = document.getElementById('album_back');
                if (is_mobile) {
                    var picId = obj.song.album.picId;
                    if (obj.song.album.picId_str) {
                        var strId = obj.song.album.picId_str;
                        if (strId != picId.toString()) picId = strId;
                    }
                    setBack(aback, picId, picurl);
                }
                else {
                    setBackPc(aback, picurl);
                }
                for (var i = 0; i < meta.length; i++) {
                    if (meta[i].name.toLowerCase() == "description") {
                        meta[i].content = obj.song.album.name;
                    }
                }
            }
            document.getElementById('result_title').innerHTML = 'SHARE 「' + obj.song.name + '」';
            var href = getShareLink(obj.song.id);
            var share = document.getElementById('result_text');
            if (is_mobile){
                share.href=href;
            }else {
                share.innerHTML = href;
            }
            showPlayer();
            if (!is_mobile) document.getElementById('footer').removeAttribute('hidden');
            var x = document.getElementById('hoshi_no_uta');
            if (!is_mobile) {
                x.volume = 0.5;
                document.getElementById('volume').style.width = (x.volume * 100) + "%";
            }
            x.load();
            x.play();
            if (!from_album) {
                get_album(parseInt(obj.song.album.id));
                var player_select = document.getElementById('player_link');
                player_select.removeAttribute('hidden');
            }
            if (obj.song.lyrics) {
                var lyric_strings = obj.song.lyrics.split('\n');
                var times = new Array(), allLyrics = new Array();
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
                if (obj.song.translation) {
                    var trans_strings = obj.song.translation.split('\n');
                    // console.log(trans_strings);
                    var _trans_times = new Array(), allTrans = new Array();
                    var cnt2 = 0;
                    for (line in trans_strings) {
                        var y2 = trans_strings[line];
                        if (y2[0] == '[') {
                            var ind2 = y2.indexOf(']');
                            var timeStr2 = y2.substr(1, ind2 - 1);
                            // console.log(timeStr+" "+timeStr.substr(0,2)+" "+timeStr.substr(3));
                            _trans_times[cnt2] = parseFloat(timeStr2.substr(0, 2)) * 60 + parseFloat(timeStr2.substr(3));
                            allTrans[cnt2] = y2.substr(ind + 1);
                            cnt2++;
                        }
                    }
                    // console.log(allTrans);
                    // console.log(_trans_times);
                    loop(id, times, allLyrics, _trans_times, allTrans, -1);
                } else {
                    // console.log("no trans");
                    loop(id, times, allLyrics, null, null, -1);
                }
            } else {
                loop(id, null, null, null, null, -1);
            }

        }
    });
}

function submitForm() {
    var form = $("form");
    var data = form.serialize();
    $.ajax({
        type: form.attr('method'),
        url: "/music/",
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
                change_string += pre + x.id + mid + "<img src='" + x.album.picUrl.replace('http://', 'https://') + "?param=130y130" + "' style='height: 5vh' class='rounded'/> " + x.name;
                if (x.alias && x.alias.length > 0) {
                    change_string += ' <i><sub>(';
                    for (var ind in x.alias) {
                        change_string += x.alias[ind];
                    }
                    change_string += ')</sub></i>';
                }
                change_string += " - ";
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

function footerEffect(docHeight, now) {
    docHeight /= 3;
    now -= docHeight * 2;
    var percent = now / docHeight;
    var p2 = percent;
    var p3;
    if (percent > 0.5) p3 = 0;
    else if (percent < 0) {
        p3 = 100;
    } else {
        p3 = 100 * (1 - 2 * percent);
    }
    if (now < 0) {
        percent = p2 = 0;
    }
    if (percent > 0.7) percent = 1;
    p2 *= 0.6;
    // console.log(percent+" "+now+" "+docHeight);
    var footer = document.getElementById('footer');
    footer.style.opacity = percent;
    footer.style.filter = 'blur(' + p3 + 'px)';
    footer.style.background = 'linear-gradient(to top,white ' + (p2 * 100) + '%,transparent)';
}

function navbarEffect(docHeight, now) {
    var opa, lg, blur;
    if (now > docHeight / 3) {
        opa = lg = blur = 0;
    }
    else {
        opa = now / docHeight * 3;
        opa = 1 - opa;
        if (opa < 0.75) {
            blur = 100 - opa * 133.33;
        } else {
            blur = 0;
        }
        lg = opa * 60;
        if (opa > 0.7) opa = 1;
    }
    var navbar = document.getElementById('navbar');
    navbar.style.opacity = opa;
    navbar.style.filter = 'blur(' + blur + 'px)';
    navbar.style.background = 'linear-gradient(to bottom,white ' + (lg) + '%,transparent)';

}

function copyShareLink(obj) {
    obj.select();
    document.execCommand("Copy");
    // alert("已复制好");
    document.getElementById('copy_result').innerHTML='COPY COMPLETED';
}

function getClipboard() {
    if (window.clipboardData) {
        return (window.clipboardData.getData('Text'));
    }
    else if (window.netscape) {
        netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if (!clip) return;
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans) return;
        trans.addDataFlavor('text/unicode');
        clip.getData(trans, clip.kGlobalClipboard);
        var str = new Object();
        var len = new Object();
        try {
            trans.getTransferData('text/unicode', str, len);
        }
        catch (error) {
            return null;
        }
        if (str) {
            if (Components.interfaces.nsISupportsWString) str = str.value.QueryInterface(Components.interfaces.nsISupportsWString);
            else if (Components.interfaces.nsISupportsString) str = str.value.QueryInterface(Components.interfaces.nsISupportsString);
            else str = null;
        }
        if (str) {
            return (str.data.substring(0, len.value / 2));
        }
    }
    return null;
}

$("document").ready(function (e) {
    function checkNeteaseShareLink(searchStr) {
        if (searchStr.indexOf('music.163.com/') >= 0) {
            var id = parseInt(searchStr.substr(searchStr.indexOf('song/') + 5));
            if (id < 0) id = parseInt(searchStr.substr(searchStr.indexOf('id=') + 3));
            if (id === parseInt(searchStr.substr(searchStr.indexOf('userid=') + 7))) return false;
            else {
                if (id) return getShareLink(id);
                else return false;
            }
        } else {
            return false;
        }
    }

    var clip = getClipboard();
    if(clip) checkNeteaseShareLink(clip);
    $("#submit_form").submit(function (e) {
        e.preventDefault();
        var searchStr = document.getElementById('uta_name').value;
        var ret = checkNeteaseShareLink(searchStr);
        if (ret) window.location.href = ret;
        else submitForm();
    });
    var thisBody = $('body');
    if (!is_mobile) {
        thisBody.mousemove(function (e) {
            var docHeight = window.innerHeight;
            var now = e.pageY;
            navbarEffect(docHeight, now);
            footerEffect(docHeight, now);
        });
        thisBody.keydown(function (e) {
            var target = $(e.target);
            if (!target.is('input')) {
                var keynum;
                var keychar;
                if (window.event) {
                    keynum = e.keyCode;
                }
                else if (e.which) {
                    keynum = e.which;
                }

                keychar = String.fromCharCode(keynum);
                console.log(keychar);
                if (keychar === ' ') {
                    playOrPause();
                }
            }
        });
    }
});
