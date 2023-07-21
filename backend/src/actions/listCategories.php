
<?php
    $data = [];
    $categories = $db->query("SELECT * FROM categories");
    while ($res= $categories->fetchArray(1))
    {
        //insert row into array
        array_push($data, $res);
    }
    
    echo json_encode($data);
?>