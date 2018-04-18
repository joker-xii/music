<?php
include "netease.php";
echo Netease::get_album($_REQUEST['album_id'],true);