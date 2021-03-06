function setPlay(setplay) {
    var x = document.getElementById('hoshi_no_uta');
    var p = document.getElementById('simple_player');
    var name = document.getElementById('playing');
    if (setplay) {
        x.play();

        name.classList.add('fa-pause');
        name.classList.remove('fa-play');
        p.classList.remove('btn-outline-warning');
        p.classList.add('btn-outline-success');

        paused = false;
        // console.log("play");
    } else {
        x.pause();

        name.classList.remove('fa-pause');
        name.classList.add('fa-play');
        p.classList.remove('btn-outline-success');
        p.classList.add('btn-outline-warning');
        paused = true;
    }
}
function playOrPause() {
    var x = document.getElementById('hoshi_no_uta');
    if (song_id_now) {
        if (x.paused || x.ended) {
            setPlay(true);
        } else {
            setPlay(false);
        }
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


function loop(thisId, lyrics, allLyrics,last) {
    if (!(thisId === song_id_now)) {
        console.log('return' + thisId);
        return;
    }
    var interval = 500;
        var prog_span=document.getElementById('prog_span');
        var prog = document.getElementById('music_progress');
        var x = document.getElementById('hoshi_no_uta');
        prog.style.width = (x.currentTime * 100 / x.duration) + "%";
        var currTime = Math.floor(x.currentTime);
        var duration = Math.floor(x.duration);
        var showCur = '', showDur = '';
        if (currTime > 60) showCur += Math.floor(currTime / 60) + ':';
        if (duration > 60) showDur += Math.floor(duration / 60) + ':';
        showCur += (currTime % 60) < 10 ? ('0' + (currTime % 60)) : (currTime % 60);
        showDur += (duration % 60) < 10 ? ('0' + (duration % 60)) : (duration % 60);
    prog_span.innerHTML = "" + showCur + '/' + showDur ;

    if (!paused) {
        var lyric;
        if (is_mobile) {
            lyric = document.getElementById('lyric_mobile');
        } else {
            lyric = document.getElementById('lyric');
        }
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
            if (lineNow != last) {
                last = lineNow;
                // lyric.classList.add('blur_back');
                var tmp = new Array();
                // console.log("NONE---------------");
                var showCnt=3;
                // if(is_mobile) showCnt=2;
                var magic_begin = Math.max(0, lineNow - showCnt), magic_end = lineNow + showCnt+1;
                if (magic_end >= allLyrics.length) magic_end = allLyrics.length;
                var count=0;
                // console.log("magic: " +magic_begin+ " "+magic_end)
                for (var line_added = magic_begin; line_added < magic_end; line_added += 1) {
                    tmp[count++] =allLyrics[line_added];
                    // console.log(line_added + ' added');
                }

                // if (transTime) {
                //     var transLine = 0;
                //     for (line in transTime) {
                //         if (transTime[line] != null) {
                //             if (transTime[line] > x.currentTime) break;
                //             transLine = line;
                //         }
                //     }
                //     transLine=parseInt(transLine);
                //     if (transLine !=lastTrans) {
                //         var trans_begin = Math.max(0, transLine - showCnt),trans_end = transLine + showCnt+1;
                //         if (trans_end >= allTrans.length) trans_end = allTrans.length;
                //         count=0;
                //         for(var line_trans=trans_begin;line_trans<trans_end;line_trans++){
                //             if(tmp[count]) tmp[count]=tmp[count].replace('</div>',"<br><i class='trans_line'>"+ allTrans[line_trans]+"</i></div>");
                //             count++;
                //         }
                //     }
                // }
                lyric.innerHTML='';
                for (lines in tmp){
                    lyric.innerHTML += tmp[lines];
                }
                var lyricNow = document.getElementById('__lyric_p_' + lineNow);
                if(lyricNow)lyricNow.classList.add('lyric_now');
                // console.log(lineNow+" "+ lyric_begin+' to '+lyric_end +" " +allLyrics.length);

                // setTimeout(function () {
                //     lyric.classList.remove('blur_back');
                // }, interval);
            }

        } else {
                lyric.innerHTML='<p class="text-light border-light rounded" style="position: relative; top: 30vh;">No Lyrics</p>';
        }
    }
    // console.log((x.currentTime/x.duration));
    requestAnimationFrame(function () {
        setTimeout(function () {
            loop(thisId, lyrics, allLyrics, last);
        }, interval);
    })
}
function validClr() {
    return Math.floor(Math.random()*256);
}
function titleChangeColor(elem) {
    interval=1000;
    if(!paused) elem.style.color = "rgb(" + [validClr(),validClr(),validClr()].join(",") + ")";
    // console.log( "rgba(" + [validClr(), validClr(), validClr(), 1].join(",") + ")");
    setTimeout(function () {
        titleChangeColor(elem);
    }, interval);
}
