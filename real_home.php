<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>MUSIC</title>
    <link href="https://res.joker.im/Content/bootstrap.css" rel="stylesheet"/>
    <link href="styles.css" media="all" rel="stylesheet"/>
    <link href="scrollbar.css" media="all" rel="stylesheet"/>
    <link rel="icon" href="https://res.joker.im/favicon_music.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="https://res.joker.im/favicon_music.ico" type="image/x-icon"/>
    <link href="https://res.joker.im/Fonts/css/fontawesome.css" media="all" rel="stylesheet"/>
    <link href="https://res.joker.im/Fonts/css/fontawesome-all.css" media="all" rel="stylesheet"/>
    <meta name="description" content="Music Box by Joker"/>
    <script type="text/javascript">
        var song_id_now;
        var switch_bg = true;
        var paused = true;
        var is_mobile = false;
    </script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">

</head>
<body id="page_body">

<div id="back_white" class="blur_back_trans back_style">
</div>
<div id="album_back" class="blur_album_back transparent_back_trans back_style transparent_back"></div>
<div id="table_layer"></div>
<!--    <canvas id="screen" width="1300" height="700" style="position: fixed;bottom: 0px;left: 0px;z-index:-1 "></canvas>-->
<script type="text/javascript" src="music_ctrl.js">

</script>
<nav class="navbar navbar-expand-sm navbar-light navbar_effect" id="navbar">
    <a class="navbar-brand" onclick="hideall()"><h1 style="color: black;">
            <i id="various_color_title" class="fas fa-music"></i> <code >MUSIC</code>
        </h1></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <button class="nav-link btn btn-link" id="player_link" onclick="showPlayer()" hidden>PLAYER
<!--                    <span class="sr-only">(current)</span></button>-->
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
        <div class="row">
            <div class='col-sm-3 border-right-1 border-dark'>
                <div class="card " style="width: 100%;background-color: transparent; border: hidden">
                    <img class="card-img-top rounded" id="song_img" onclick="showAlbum()" alt="Card image cap">
                    <div class="card-body">
                        <hr class="my-1"/>
                        <h5 class="card-title" id="song_name"></h5>
                        <hr class="my-1"/>
                        <p class="card-text">
                            <a onclick="showAlbum()" id="album_name">
                            </a>
                        </p>
                        <hr class="my-1"/>
                        <div class="btn-group-vertical btn-block">
                            <button type="button" class=" btn btn-outline-primary"  data-toggle="modal"
                                    data-target="#show_result">
                                <i class="fas fa-share-alt"></i>
                            </button>
                            <a id="download_link" class="btn btn-outline-success">
                                    <i class="fas fa-download"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-offset-1 col-sm-8 ">
                <div style="height: 70vh;overflow: hidden;padding-top: 5vh;">
                    <div id="lyric" class="blur_front_trans"
                         style="height: inherit;overflow: visible;position: absolute;">
                    </div>
                </div>
                <hr class="my-1"/>
            </div>
        </div>
        <hr class="my-4"/>
    </div>
    <div style="height: 80vh;padding-top: 0vh;position:absolute;overflow: visible">
        <div class="collapse" id="song_list">
        </div>
    </div>
    <div style="height: 80vh;padding-top: 0vh;position:absolute;overflow: visible">
        <div class="collapse" id="album_list">
            <div style='width: 80vw' class="list-group ">
                <a onclick='showPlayer()' class="list-group-item list-group-item-action none_back">
                    <div class='row'>
                        <div class=' col-sm-offset-1 col-sm-3'>
                            <img id="list_album_pic" style='width: 20vh;height: 20vh' class='rounded'/>
                        </div>
                        <div class='col-sm-offset-1 col-sm-6'>
                            <h1 id="list_album_name"></h1>
                            <p><i class="fas fa-building"></i> <span id="list_album_company"></span></p>
                            <p><i class="fas fa-calendar"></i> <span id="list_album_date"></span></p>
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
                <div class="btn-group btn-block">
                    <a class="btn btn-outline-info" id="share_to_qq">
                        <i class="fab fa-qq"></i>
                    </a>
                    <a class="btn btn-outline-warning" id="share_to_qzone">
                        <i class="fab fa-qq"></i>
                    </a>
                    <a class="btn btn-outline-danger" id="share_to_weibo">
                        <i class="fab fa-weibo"></i>
                    </a>
                    <a class="btn btn-outline-primary" id="share_to_fb">
                        <i class="fab fa-facebook"></i>
                    </a>
                    <a class="btn btn-outline-success" id="share_to_gplus">
                        <i class="fab fa-google-plus"></i>
                    </a>
<!--                    <a class="btn btn-outline-secondary" id="copy_link"></a>-->
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<div class="navbar fixed-bottom" hidden id="footer" style="opacity: 0">
    <div class="row" style="width: 100vw">
        <div style="width: 20vw;">
            <button class="btn btn-outline-success player_btn " id="simple_player" onclick="playOrPause()">
                <i id="playing" class=" mx-auto fas fa-pause align-middle" ></i>
                <audio controls id="hoshi_no_uta" loop="loop"
                       style="opacity: 0;z-index: -1;width: 0px;height:0px;">
                    <source id="song_source" type="audio/mpeg">
                </audio>
            </button>
        </div>
        <div style="width: 65vw;">
            <div class="progress border border-info position-relative"
                 style="height: 5vh;background-color: transparent;" id="music_prog_border"
                 onclick="mouse_progress(event)">
                <span style='color:black;font-size: large;' class="justify-content-center d-flex position-absolute w-100" id='prog_span'></span>
                <div class="progress-bar progress-bar-striped  bg-info progress-bar-animated jilao"
                     id="music_progress"
                     role="progressbar" style="width: 0%;"></div>
            </div>
        </div>
        <div style="width: 10vw;padding-left: 3vw">
            <div class="progress border border-primary "
                 style="height: 5vh;background-color: transparent;" id="music_vol_border"
                 onclick="mouse_volume(event)">
                <div class="progress-bar jilao  bg-primary" id="volume"
                     role="progressbar" style="width: 50%;"><i class="mx-auto fas fa-volume-up"></i>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="https://res.joker.im/Scripts/bootstrap.js"></script>
<script type="text/javascript" src="https://res.joker.im/Scripts/jquery-3.1.1.js"></script>
<script type="text/javascript" src="switchbg.js"></script>
<script src="utilities.js" type="text/javascript"></script>
<!--<script src="firestar2.js"></script>-->
<!--<script type="text/javascript">-->
<!--    var fireStar = new FireStars();-->
<!--    fireStar.set(document.getElementById("screen"), 1, 1600);-->
<!--    fireStar.animate();-->
<!--</script>-->

</body>
</html>
