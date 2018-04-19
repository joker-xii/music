<?php
include "netease.php";
if (isset($_REQUEST['search'])){
    echo Netease::get_songs($_REQUEST['search'],true);
}elseif (isset($_REQUEST['id'])){
    echo Netease::get_song($_REQUEST['id'],true);
}elseif (isset($_REQUEST['album_id'])){
    echo Netease::get_album($_REQUEST['album_id'],true);
}elseif (isset($_REQUEST['share'])){
    include "real_home.php";
    echo '<script>select_song('.htmlspecialchars($_REQUEST['share']).',false);</script>';
}
else{
    include "real_home.php";
}