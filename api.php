<?php
include_once "backend/src/db.php";

$db = new EmojiDB();

$fileName = pathinfo($_SERVER['SCRIPT_FILENAME'], PATHINFO_BASENAME);
$route = explode('/', trim(str_after($_SERVER['PHP_SELF'], $fileName), '/'));


switch($route[0])
{
    case "words":
        switch($_SERVER["REQUEST_METHOD"])
        {
            case "POST":  
                include "backend/src/actions/addWord.php";
                break;
            default:
                http_response_code(405);
                echo("Method not allowed");                
                break;
        }
        break;
}



function str_after(string $haystack, string $needle)
{
    $startPos = strpos($haystack, $needle);
    if($startPos === false) return "";

    return substr($haystack, $startPos + strlen($needle), null);
}
?>