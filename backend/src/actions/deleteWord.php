<?php

if(count($route) < 2){
    http_response_code(400);
    echo("Missing word id");
    die();
}
else if(!is_numeric($route[1])) {    
    http_response_code(400);
    echo("Invalid word id given");
    die();
}

$id = SQLite3::escapeString($route[1]);
$db->exec("DELETE FROM words where id = '{$id}'");
http_response_code(307);
header("Location: /index.html?msg=WORD_DELETED");