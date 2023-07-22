
<?php
    // for url pattern /api.php/categories
    if(count($route) == 1) {
        $categories = $db->query("SELECT * FROM categories ORDER BY `name`");

        echo("<option value=\"all\">All</option>\n");
        while ($res= $categories->fetchArray(1)) {
            echo("<option value=\"{$res["id"]}\">{$res["name"]}</option>\n");
        }
    }    
    // for url pattern /api.php/categories/7/words
    // or /api.php/categories/all/words
    else if(count($route) == 3){
        if(is_numeric($route[1]) and $route[2] == "words") {
            $categories = $db->query("SELECT w.*, c.`name` as category_name FROM categories c JOIN words w ON c.id = w.category_id WHERE c.id = '{$route[1]}'");
            $showCategory = false;
        }
        else
        {
            $categories = $db->query("SELECT w.*, c.`name` as category_name FROM words w JOIN categories c ON c.id = w.category_id");
            $showCategory = true;
        }

        $data = [];
        while ($res= $categories->fetchArray(1)) {
            $categoryHint = "";
            if($showCategory) $categoryHint = "<br/><small class=\"w3-small\">({$res["category_name"]})</small>";
            
            echo("<li class=\"w3-row\" data-id=\"{$res["id"]}\">
                <div class=\"w3-col w3-hide-small m1\">&nbsp;</div>
                <div class=\"w3-col w3-mobile m4 glyph\" style=\"font-size: 4rem;\">
                    {$res["word"]}{$categoryHint}
                </div>
                <div class=\"w3-col w3-mobile m6\">
                    <div class=\"w3-border w3-round-xlarge\" style=\"overflow: hidden;\">
                        <input class=\"w3-input\" type=\"password\" value=\"{$res["solution"]}\">
                        <div class=\"revealSpan glyph\">👁</div>
                    </div>
                </div>
                <div class=\"w3-col w3-hide-small m1\">&nbsp;</div>
            </li>");
        }
    }

?>