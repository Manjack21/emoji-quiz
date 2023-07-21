
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
            echo("<li class=\"w3-row\">
                <div class=\"w3-col s5 m3 glyph\" style=\"font-size: 3rem;\">{$res["word"]}</div>
                <div class=\"w3-col s6 m8 glyph\">
                    <div class=\"w3-border w3-round-xlarge\" style=\"overflow: hidden;\">
                        <input class=\"w3-input\" type=\"password\" value=\"{$res["solution"]}\">
                        <span class=\"revealSpan\">👁</span>
                    </div>
                </div>
                <div class=\"w3-col s1 m1 w3-xxlarge\">
                </div>
            </li>");
        }
    }

?>