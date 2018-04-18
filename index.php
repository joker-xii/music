<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>MUSIC</title>
    <link href="../Content/bootstrap.css" rel="stylesheet"/>
    <link rel="icon" href="../favicon.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="../favicon.ico" type="image/x-icon" />
    <script type="text/javascript" src="../Scripts/jquery-3.1.1.js"></script>
    <script type="text/javascript">
        var song_id_now;
        var switch_bg=true;
        var paused=false;
    </script>
    <script type="text/javascript" src="switchbg.js"></script>
    <script src="submit.js" type="text/javascript"></script>
    <style type="text/css">
        html, body {
            height: 100%;
            overflow: hidden;
        }
        /* width */
        ::-webkit-scrollbar {
            width: 10px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
            background: transparent;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: #888;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
        .background-transparent {
            background-color: transparent;
            height: 100%;
            width: 100%;
        }

        .background-white {
            background-color: white;
            height: 100%;
            width: 100%;
        }

        .blur_back{
            filter: blur(80px);
            -webkit-filter:blur(80px);
            -moz-filter:blur(80px);
            -o-filter:blur(80px);
        }
        .blur_back_trans {
            /*background: rgba(255, 255, 255, 0.5);*/
            transition: 1.5s filter ease-in ;
            -moz-transition:1.5s -moz-filter ease-in; /* Firefox 4 */
            -webkit-transition:1.5s -webkit-filter ease-in; /* Safari and Chrome */
            -o-transition:1.5s -o-filter ease-in; /* Opera */
        }

        .none_back {
            background: rgba(255, 255, 255, 0);
        }

        .jilao {
            text-align: center;
        }
        .back_style{
            width: 100%;
            height: 100%;
            background: url(back/1.png) no-repeat right center fixed;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
        }
    </style>

</head>
<body id="page_body" >

<div id="back_white" class="blur_back_trans back_style" style="position: absolute;bottom: 0" >
</div>
<div style="position: absolute;width: 100vw;height: 100vh ;bottom: 0;background-color: rgba(255,255,255,0.3)"></div>
<!--    <canvas id="screen" width="1300" height="700" style="position: fixed;bottom: 0px;left: 0px;z-index:-1 "></canvas>-->
        <script type="text/javascript" src="music_ctrl.js">

        </script>
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
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
<!--                    <li class="nav-item dropdown">-->
<!--                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"-->
<!--                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
<!--                            Dropdown-->
<!--                        </a>-->
<!--                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">-->
<!--                            <a class="dropdown-item" href="#">Action</a>-->
<!--                            <a class="dropdown-item" href="#">Another action</a>-->
<!--                            <div class="dropdown-divider"></div>-->
<!--                            <a class="dropdown-item" href="#">Something else here</a>-->
<!--                        </div>-->
<!--                    </li>-->
<!--                    <li class="nav-item">-->
<!--                        <a class="nav-link disabled" href="#">Disabled</a>-->
<!--                    </li>-->
                </ul>
                <form class="form-inline my-2 my-lg-0" id="submit_form">
                    <input class="form-control mr-sm-2" type="search" name="uta_name" id="uta_name" placeholder="Search"
                           aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" name="query" id="query" type="submit">Search
                    </button>
                </form>
            </div>
        </nav>
<div style="padding-top: 3vh;padding-left: 3vh;padding-right: 3vh">
            <!--    <div class="row">-->

            <div class="collapse" id="player">
                <div class="row">
                    <div class="card col-sm-3" style="width: 25%;background-color: transparent;border: solid;border-width: 1px;
                    border-left-color:transparent;border-top-color: transparent;border-bottom-color: transparent;border-right-color: rgba(0,0,0,0.1)">
                        <img class="card-img-top rounded" id="song_img" alt="Card image cap">
                        <div class="card-body">
                            <hr class="my-1"/>
                            <h5 class="card-title" id="song_name"></h5>
                            <hr class="my-1"/>
                            <p class="card-text" id="album_name"></p>
                            <hr class="my-3"/>
                            <div class="btn-group " role="group" aria-label="Basic example">
                                <button class="btn btn-info btn-secondary" id="album_prev">&lt;</button>
                                <button class="btn btn-secondary" id="simple_player" style="background:lightgreen;"
                                   onclick="playOrPause()">
                                    <span id="playing">&#9655; PLAYING</span>
                                    <audio controls id="hoshi_no_uta" loop="loop"
                                           style="opacity: 0;z-index: -1;width: 0px;height:0px;">
                                        <source id="song_source" type="audio/mpeg">
                                    </audio>
                                </button>
                                <button class= "btn btn-info btn-secondary" id="album_next">&gt;</button>
                            </div>

                        </div>
                    </div>
                    <div class="col-sm-offset-1 col-sm-8 ">
                        <div  style="height: 50vh;overflow: hidden;padding-top: 10vh;">
                            <div id="lyric" style="height: inherit;overflow: visible;position: absolute;">
                            </div>
                        </div>

                        <hr class="my-4"/>
                        <div class="row">
                            <div class=" col-sm-8 ">
                                <div class="progress border border-info"
                                     style="height: 10vh;background-color: transparent;" id="music_prog_border"
                                     onclick="mouse_progress(event)">
                                    <div class="progress-bar progress-bar-striped  bg-info progress-bar-animated jilao"
                                         id="music_progress"
                                         role="progressbar" style="width: 0%;"></div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="progress border border-success "
                                     style="height: 10vh;background-color: transparent;" id="music_vol_border"
                                     onclick="mouse_volume(event)">
                                    <div class="progress-bar progress-bar-striped jilao  bg-success " id="volume"
                                         role="progressbar" style="width: 50%;">VOLUME
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="my-4"/>
            </div>
            <div  style="height: 80vh;padding-top: 0vh;position:absolute;overflow: auto">
                   <div class="collapse" id="song_list">
                   </div>
            </div>
            <div  style="height: 80vh;padding-top: 0vh;position:absolute;overflow: auto">
                    <div class="collapse" id="album_list">
                    </div>
            </div>

            <!--    </div>-->
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

<?php
 if (isset($_REQUEST['id'])){
     echo '<script>';
     echo "(function (){select_song(".$_REQUEST['id'] ." )})()";
     echo '</script>';
 }