<?php
include "netease.php";
echo Netease::get_song($_REQUEST['uta_id'],true);