<?php

    if($_SERVER["REQUEST_METHOD"] != "POST"){
        http_response_code(405);
        echo("Method not allowed");
    }
    else if(!key_exists("word", $_POST) or $_POST["word"] == ''){
        http_response_code(400);
        echo("No emoji word given");
    }
    else if(!key_exists("solution", $_POST) or $_POST["solution"] == ''){
        http_response_code(400);
        echo("No solution given");
    }
    else if(!key_exists("category_id", $_POST) or $_POST["category_id"] == ''){
        http_response_code(400);
        echo("No category given");
    }
    else{
        
        $word = SQLite3::escapeString($_POST["word"]);
        $solution = SQLite3::escapeString($_POST["solution"]);
        $category_id = SQLite3::escapeString($_POST["category_id"]);

        if(is_null($db->querySingle("SELECT * FROM words WHERE word = '{$word}' AND category_id = '{$category_id}'"))) {
            $db->exec("INSERT INTO words (`word`, `solution`, `category_id`) VALUES ('{$word}', '{$solution}', {$category_id})");
        }
        else {
            http_response_code(400);
            echo("Word is already present in this category");
        }        
    }
?>