<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>MUSIC</title>
    <link href="../Content/bootstrap.css" rel="stylesheet"/>
    <link rel="icon" href="../favicon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon"/>
    <meta name="description" content="Music Box by Joker"/>
    <script type="text/javascript" src="../Scripts/jquery-3.1.1.js"></script>
    <script type="text/javascript">
        var song_id_now;
        var switch_bg = true;
        var paused = false;
        var is_mobile = true;
    </script>
    <!--    <script type="text/javascript" src="switchbg.js"></script>-->
    <script src="submit.js" type="text/javascript"></script>
    <link href="styles.css" media="all" rel="stylesheet"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">

</head>
<body id="page_body">

<div id="album_back" class="back_style transparent_back_trans"
     style="z-index: -1;"></div>
<!--    <canvas id="screen" width="1300" height="700" style="position: fixed;bottom: 0px;left: 0px;z-index:-1 "></canvas>-->
<script type="text/javascript" src="music_ctrl.js">

</script>
<nav class="navbar navbar-collapse navbar-light " id="navbar">
    <a class="navbar-brand" onclick="hideall()"><h1 style="color: black;">
            <code>MUSIC</code> !
        </h1></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <button class="nav-link btn btn-link" id="player_link" onclick="showPlayer()" hidden>PLAYER
                    <span class="sr-only">(current)</span></button>
            </li>
            <li class="nav-item active">
                <button class="nav-link btn btn-link" id="album_link" onclick="showAlbum()" hidden>
                    ALBUM
                </button>
            </li>
            <li class="nav-item active">
                <button class="nav-link btn btn-link" id="result_link" onclick="showSearchList()" hidden>
                    LIST
                </button>
            </li>
        </ul>


        <form class="form-inline my-2 my-lg-0" id="submit_form">
            <input class="form-control mr-sm-2" type="search" name="search" id="uta_name" placeholder="Search"
                   aria-label="Search">
            <button class="btn btn-outline-success my-2" name="query" id="query" type="submit">Search
            </button>
        </form>
    </div>
</nav>
<div style="padding-top: 3vh;padding-left: 3vh;padding-right: 3vh">
    <div class="collapse" id="player">
        <div class="card text-white mx-auto" style="width: 90%;background-color: transparent;">
            <img class="card-img rounded" alt="Card image" onclick="showLyricsMobile()" id="song_img">
            <div class="card-img-overlay" style="height: 30vh" onclick="showLyricsMobile()">
                <div class="black_layer rounded">
                    <h5 class="card-title " id="song_name"></h5>
                    <hr class="my-1"/>
                    <p class="card-text " id="album_name">
                    </p>
                </div>
            </div>
            <div class="card-body">

                <div class="progress border border-success "
                     style="height: 5vh;background-color: transparent;" id="music_prog_border"
                     onclick="mouse_progress(event)">
                    <div class="progress-bar progress-bar-striped  bg-success progress-bar-animated jilao"
                         id="music_progress"
                         role="progressbar" style="width: 0%;"></div>
                </div>
                <hr class="my-1"/>
                <div class="btn-group btn-block">
                    <button class="btn btn-outline-info player_btn_mobile btn-block" id="simple_player"
                            onclick="playOrPause()">
                        <span id="playing">&#9655;</span>
                        <audio controls id="hoshi_no_uta" loop="loop"
                               style="opacity: 0;z-index: -1;width: 0px;height:0px;">
                            <source id="song_source" type="audio/mpeg">
                        </audio>
                    </button>
                    <button type="button" class=" btn btn-outline-primary " data-toggle="modal"
                            data-target="#show_result">
                        SHARE
                    </button>
                </div>

            </div>
        </div>
    </div>
    <div style="height: 80vh;padding-top: 0vh;position:absolute;overflow: auto;">
        <div class="collapse" id="song_list">
        </div>
    </div>
    <div style="height: 80vh;padding-top: 0vh;position:absolute;overflow: auto;text-align: center;">
        <div class="collapse" id="lyric_mobile" style="width: 91vw;" onclick="showPlayer()">
        </div>
    </div>
    <div style="height: 80vh;padding-top: 0vh;position:absolute;overflow: auto">
        <div class="collapse" id="album_list">
            <div style='width: 80vw' class="list-group ">
                <a onclick='showPlayer()' class="list-group-item list-group-item-action none_back">
                    <div class='row'>
                        <div class=' col-sm-offset-1 col-sm-3'>
                            <img id="list_album_pic" style='width: 20vh;height: 20vh' class='rounded'/>
                        </div>
                        <div class='col-sm-offset-1 col-sm-6'>
                            <h1 id="list_album_name"></h1>
                            <p id="list_album_company"></p>
                            <p id="list_album_date"></p>
                        </div>
                    </div>
                </a>
            </div>
            <div style='width: 80vw' class="list-group " id="album_list_items">

            </div>
        </div>
    </div>

    <!--    </div>-->
</div>
<div class="modal fade" id="show_result" tabindex="-1" role="dialog" aria-labelledby="show_result" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="result_title">
                    SHARE THIS WEBSITE
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <code>COPY THIS LINK TO SHARE</code>
                <textarea id="result_text" style="width: 100%" readonly></textarea>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<script src="../Scripts/bootstrap.js"></script>

<!--<script src="firestar2.js"></script>-->
<!--<script type="text/javascript">-->
<!--    var fireStar = new FireStars();-->
<!--    fireStar.set(document.getElementById("screen"), 1, 1600);-->
<!--    fireStar.animate();-->
<!--</script>-->
</body>
</html>
