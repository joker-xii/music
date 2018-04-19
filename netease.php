<?php
//Copied from https://github.com/whoisnian/music/
function get_by_curl($url, $site)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    if ($site == "163") {
        $header = array(
            'X-Real-IP: 118.88.88.88',
            'Cookie: appver=2.0.2',
            'Accept-Language: zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
            'Content-Type: application/x-www-form-urlencoded'
        );
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_REFERER, "http://music.163.com/");
    } else if ($site == "qq") {
        curl_setopt($ch, CURLOPT_REFERER, "http://y.qq.com/");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
    } else if ($site == "kugou") {
        curl_setopt($ch, CURLOPT_REFERER, "http://www.kugou.com/");
    } else if ($site == "xiami") {
        curl_setopt($ch, CURLOPT_REFERER, "https://h.xiami.com/");
    }
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}
function post_by_curl($url, $post_data, $site)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    if ($site == "163") {
        $header = array(
            'X-Real-IP: 118.88.88.88',
            'Cookie: appver=2.0.2',
            'Accept-Language: zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
            'Content-Type: application/x-www-form-urlencoded'
        );
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_REFERER, "http://music.163.com/");
    } else if ($site == "qq") {
        curl_setopt($ch, CURLOPT_REFERER, "http://y.qq.com/");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
    } else if ($site == "kugou") {
        curl_setopt($ch, CURLOPT_REFERER, "http://www.kugou.com/");
    } else if ($site == "xiami") {
        curl_setopt($ch, CURLOPT_REFERER, "https://h.xiami.com/");
    }
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}
// Thanks to https://github.com/metowolf/Meting/blob/master/src/Meting.php
function encrypt_id($id)
{
    $str1 = str_split('3go8&$8*3*3h0k(2)2');
    $str2 = str_split($id);
    for ($i = 0; $i < count($str2); $i++) {
        $str2[$i] = chr(ord($str2[$i]) ^ ord($str1[$i % count($str1)]));
    }
    $result = base64_encode(md5(implode('', $str2), true));
    $result = str_replace(array('/', '+'), array('_', '-'), $result);
    return $result;
}
function urlsafe_b64encode($string)
{
    $data = base64_encode($string);
    $data = str_replace(array('+', '/', '='), array('-', '_', ''), $data);
    return $data;
}
function urlsafe_b64decode($string)
{
    $data = str_replace(array('-', '_'), array('+', '/'), $string);
    $mod4 = strlen($data) % 4;
    if ($mod4) {
        $data .= substr('====', $mod4);
    }
    return base64_decode($data);
}
class Netease
{
    static function get_album($id, $json_encode = false)
    {
        $url = "http://music.163.com/api/album/" . $id . "?id=" . $id;
        $json = get_by_curl($url, "163");
        if ($json_encode)
            return $json;
        else
            return json_decode($json, true);
    }
    static function get_albums($album, $json_encode = false)
    {
        $url = "http://music.163.com/api/search/pc";
        $post_data = "offset=0&limit=99&type=10&s=" . $album;
        $json = post_by_curl($url, $post_data, "163");
        if ($json_encode)
            return $json;
        else
            return json_decode($json, true);
    }
    static function get_playlist($id, $json_encode = false)
    {
        $url = "http://music.163.com/api/playlist/detail?id=" . $id;
        $json = get_by_curl($url, "163");
        if ($json_encode)
            return $json;
        else
            return json_decode($json, true);
    }
    static function get_playlists($playlist, $json_encode = false)
    {
        $url = "http://music.163.com/api/search/pc";
        $post_data = "offset=0&limit=99&type=1000&s=" . $playlist;
        $json = post_by_curl($url, $post_data, "163");
        if ($json_encode)
            return $json;
        else
            return json_decode($json, true);
    }
    static function get_song($id, $json_encode = false, $raw = false)
    {
        $url = "https://music.163.com/api/song/detail/?id=" . $id . "&ids=[" . $id . "]";
        $json = get_by_curl($url, "163");
        $song_detail = json_decode($json, true);
        if ($raw) {
            if ($json_encode)
                return $json;
            else
                return $song_detail;
        }
        // Thanks to https://github.com/maicong/music/blob/master/music.php
        $other_url = "https://music.163.com/api/song/enhance/player/url?ids=[" . $id . "]&br=320000";
        $other_json = get_by_curl($other_url, "163");
        $other_link = json_decode($other_json, true);
        $song = null;
        if ($song_detail["songs"] != NULL && $song_detail["code"] == 200) {
            if ($other_link["data"][0]["url"] != NULL) {
                $song = $song_detail["songs"][0];
                $song['link'] = $other_link["data"][0]["url"];
            } else {
                $url = "https://music.163.com/api/album/" . $song_detail["songs"][0]["album"]["id"] . "?id=" . $song_detail["songs"][0]["album"]["id"];
                $json = get_by_curl($url, "163");
                $album = json_decode($json, true);
                foreach ($album["album"]["songs"] as $s) {
                    if ($s["id"] == $_GET['id']) {
                        if ($s["hMusic"]["dfsId"] != NULL && $s["hMusic"]["dfsId"] != 0) {
                            $s["link"] = "https://p2.music.126.net/" . encrypt_id($s["hMusic"]["dfsId"]) . "/" . $s["hMusic"]["dfsId"] . ".mp3";
                        } else if ($s["mMusic"]["dfsId"] != NULL && $s["mMusic"]["dfsId"] != 0) {
                            $s["link"] = "https://p2.music.126.net/" . encrypt_id($s["mMusic"]["dfsId"]) . "/" . $s["mMusic"]["dfsId"] . ".mp3";
                        } else if ($s["bMusic"]["dfsId"] != NULL && $s["bMusic"]["dfsId"] != 0) {
                            $s["link"] = "https://p2.music.126.net/" . encrypt_id($s["bMusic"]["dfsId"]) . "/" . $s["bMusic"]["dfsId"] . ".mp3";
                        } else if (array_key_exists("mp3Url", $s) && $s["mp3Url"] != null) {
                            $s["link"] = str_replace("http://m2", "http://p2", $s["mp3Url"]);
                        }
                        $song = $s;
                        break;
                    }
                }
            }
        }
        if (isset($song["link"])) $song["link"] = str_replace("http://", "https://", $song["link"]);
        if (isset($song["album"]["picUrl"])) $song["album"]["picUrl"] = str_replace("http://", "https://", $song["album"]["picUrl"]);
        // Get lyrics of the song
        $url = "https://music.163.com/api/song/media?id=" . $id;
        $lyrics_obj = json_decode(get_by_curl($url, "163"), true);
        if (isset($lyrics_obj["lyric"]))
            $song['lyrics'] = $lyrics_obj["lyric"];
        $url = "https://music.163.com/api/song/lyric?tv=-1&id=" . $id;
        $trans_obj = json_decode(get_by_curl($url, "163"), true);
        if (isset($trans_obj["tlyric"]) && isset($trans_obj["tlyric"]["lyric"]))
            $song['translation'] = $trans_obj["tlyric"]["lyric"];
        if ($json_encode)
            return json_encode(['code' => 200, 'song' => $song]);
        else
            return $song;
    }
    static function get_songs($song, $json_encode = false)
    {
        $url = "http://music.163.com/api/search/pc";
        $post_data = "offset=0&limit=99&type=1&s=" . $song;
        $json = post_by_curl($url, $post_data, "163");
        if ($json_encode)
            return $json;
        else
            return json_decode($json, true);
    }
}