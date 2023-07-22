<?php


class EmojiDB extends SQLite3
{
    function __construct()
    {
        $this->open("backend/data/emoji.db", SQLITE3_OPEN_READWRITE | SQLITE3_OPEN_CREATE);

        $this->exec("CREATE TABLE IF NOT EXISTS words (`id` INTEGER PRIMARY KEY, `word`, `solution`, `category_id` INTEGER NOT NULL)");
        $this->exec("CREATE TABLE IF NOT EXISTS categories (`id` INTEGER PRIMARY KEY, `name`)");
        $this->exec("INSERT OR REPLACE INTO categories (`id`, `name`) VALUES (1, 'Songs')");
        $this->exec("INSERT OR REPLACE INTO categories (`id`, `name`) VALUES (2, 'People')");
        $this->exec("INSERT OR REPLACE INTO categories (`id`, `name`) VALUES (3, 'Movies')");
        $this->exec("INSERT OR REPLACE INTO categories (`id`, `name`) VALUES (4, 'Things')");
        $this->exec("INSERT OR REPLACE INTO categories (`id`, `name`) VALUES (5, 'Companies')");
        $this->exec("INSERT OR REPLACE INTO categories (`id`, `name`) VALUES (6, 'Sayings')");
        $this->exec("INSERT OR REPLACE INTO categories (`id`, `name`) VALUES (7, 'Other')");
        $this->exec("INSERT OR REPLACE INTO categories (`id`, `name`) VALUES (8, 'Fairytales')");
    }

    


}

?>