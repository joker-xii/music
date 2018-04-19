function playOrPause() {
    var x = document.getElementById('hoshi_no_uta');
    var p = document.getElementById('simple_player');
    var name = document.getElementById('playing');
    if (x.paused || x.ended) {
        x.play();
        name.innerHTML = '&#9655; PLAYING';
        p.style.setProperty('background-color',"rgba(144,238,144,0.4)");
        paused=false;
        // console.log("play");
    } else {
        x.pause();
        name.innerHTML = '&#10072; &#10072; PAUSED'
        p.style.setProperty('background-color',"rgba(255,165,0,0.4)");
        // console.log("pause");
        paused=true;
    }
}

function mouse_volume(e) {
    var xx = document.getElementById('music_vol_border');
    var xxb = xx.getBoundingClientRect();
    var xlen = xxb.width;
    var xpos = e.clientX - xxb.left;
    // console.log(" vol" + e.clientX + " " + xpos + " " + xlen);
    var audio = document.getElementById('hoshi_no_uta');
    audio.volume = parseFloat(xpos / xlen);

    var yy = document.getElementById('volume');
    yy.style.width = (audio.volume * 100) + "%";
}

function mouse_progress(e) {
    var xx = document.getElementById('music_prog_border');
    var xxb = xx.getBoundingClientRect();
    var xlen = xxb.width;
    var xpos = e.clientX - xxb.left;
    // console.log(e.clientX + " " + xpos + " " + xlen);
    var audio = document.getElementById('hoshi_no_uta');
    audio.currentTime = parseFloat(xpos / xlen * audio.duration);
}


function loop(lyrics, allLyrics,thisId) {
    if (!(thisId === song_id_now)) return;
    if(!paused) {
        var interval = 500;
        var prog = document.getElementById('music_progress');
        var x = document.getElementById('hoshi_no_uta');
        prog.style.width = (x.currentTime * 100 / x.duration) + "%";
        var currTime= Math.floor(x.currentTime);
        var duration= Math.floor(x.duration);
        var showCur='',showDur='';
        if(currTime>60)showCur+=Math.floor(currTime/60)+':';
        if(duration>60)showDur+=Math.floor(duration/60)+':';
        showCur+=(currTime%60)<10?('0'+(currTime%60)):(currTime%60);
        showDur+=(duration%60)<10?('0'+(duration%60)):(duration%60);
        prog.innerHTML = "<span style='color:white;font-size: large;'>" + showCur +'/' + showDur + '<span>';
        if (lyrics) {
            var lineNow = 0;
            for (line in lyrics) {
                if (lyrics[line] != null) {
                    if (lyrics[line] > x.currentTime) break;
                    lineNow = line;
                }
            }
            // console.log(lineNow + " " + x.currentTime);
            lineNow = parseInt(lineNow);
            var lyric = document.getElementById('lyric');
            if (lineNow >= 0) {
                var tmp = "";
                // console.log("NONE---------------");
                var magic_begin = Math.max(0, lineNow - 2), magic_end = lineNow + 3;
                if (magic_end >= allLyrics.length) magic_end = allLyrics.length;
                // console.log("magic: " +magic_begin+ " "+magic_end)
                for (var line_added = magic_begin; line_added < magic_end; line_added += 1) {
                    tmp += allLyrics[line_added];
                    // console.log(line_added + ' added');
                }

                lyric.innerHTML = tmp;
                // console.log(lineNow+" "+ lyric_begin+' to '+lyric_end +" " +allLyrics.length);
                var lyricNow = document.getElementById('__lyric_p_' + lineNow)
                lyricNow.style.backgroundColor = 'rgba(255,255,255,0.5)';
                lyricNow.style.fontSize = 'x-large';
            }
        }else {
            document.getElementById('lyric').innerHTML='';
        }
    }
    // console.log((x.currentTime/x.duration));
    requestAnimationFrame(function () {
        setTimeout(function () {
            loop(lyrics, allLyrics,thisId);
        }, interval);
    })
}