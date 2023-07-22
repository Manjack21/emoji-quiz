<?php
include_once "backend/src/db.php";

$db = new EmojiDB();

if(!array_key_exists("PATH_INFO", $_SERVER)){
    http_response_code(404);
    echo("No endpoint found");
    die();
}
else if(array_key_exists("PATH_INFO", $_SERVER))
$route = explode('/', trim($_SERVER['PATH_INFO'], '/'));

switch($route[0])
{
    case "words":
        switch($_SERVER["REQUEST_METHOD"])
        {
            case "POST":  
                if(!array_key_exists("REQUEST_METHOD", $_POST)) {
                    include "backend/src/actions/addWord.php";
                }
                else if($_POST["REQUEST_METHOD"] == "DELETE") {
                    include "backend/src/actions/deleteWord.php";
                }
                else {
                    http_response_code(405);
                    echo("Method not allowed");                
                    break;
                }
                break;
            default:
                http_response_code(405);
                echo("Method not allowed");                
                break;
        }
        break;
    case "categories":
        switch($_SERVER["REQUEST_METHOD"])
        {
            case "GET":  
                include "backend/src/actions/listCategories.php";
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