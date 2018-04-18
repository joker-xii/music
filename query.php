<?php
include "netease.php";
echo Netease::get_songs($_REQUEST['uta_name'],true);