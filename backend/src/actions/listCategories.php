
<?php
    // for url pattern /api.php/categories
    if(count($route) == 1) {
        $categories = $db->query("SELECT * FROM categories");
        while ($res= $categories->fetchArray(1)) {
            echo("<option value=\"{$res["id"]}\">{$res["name"]}</option>\n");
        }
    }    
    // for url pattern /api.php/categories/7/words
    else if(count($route) == 3){
        if(is_numeric($route[1]) and $route[2] == "words") {
            $category_id = $route[1];
        }
        $categories = $db->query("SELECT w.* FROM categories c JOIN words w ON c.id = w.category_id WHERE c.id = '{$category_id}'");
        $data = [];
        while ($res= $categories->fetchArray(1)) {
            array_push($data, $res);
        }
        
        echo json_encode($data);
    }

?>