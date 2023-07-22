
Select-String '.\Noto Color Emoji - Google Fonts.htm' -Pattern '"Glyph (.{1,3})"' -AllMatches |
    Select-Object -ExpandProperty Matches |
    ForEach-Object {
        "{`"glyph`": `"$($_.Groups[1].Value)`", `"description`": `"`"},"
    } |
    Out-File emoji.json
