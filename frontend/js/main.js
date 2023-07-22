

window.addEventListener("load", async function (ev) {
    const targetLabel = this.document.getElementById("current");
    function appendIcon(ev)
    {
        const currentText = (targetLabel.dataset.current ?? "") + ev.target.id;
        targetLabel.dataset.current = currentText;

        targetLabel.innerHTML = currentText;
        
        /*
        const glyphSpan = document.createElement("span");
        glyphSpan.innerHTML = ev.target.innerText;
        glyphSpan.addEventListener("click", function() { targetLabel.removeChild(glyphSpan); })
        
        targetLabel.appendChild(glyphSpan);
        */
        
        document.getElementById("word").value = targetLabel.innerText.trim();
        
    }

    this.document.getElementById("clearButton").addEventListener("click",function(ev) {
        targetLabel.innerHTML = "&nbsp;";
        targetLabel.dataset.current = "";
    });

    
    this.document.getElementById("category_id").innerHTML = await (await this.fetch("/api.php/categories")).text();

    var emojiData = await this.fetch("/frontend/data/emoji.json");
    var emojis = await emojiData.json();
    const emojiTemplate = this.document.getElementById("templ-emoji");
    const list = this.document.getElementById("emoji-list");
    emojis.forEach(e => {
        /** @type {DocumentFragment} */
        const emojiItem = emojiTemplate.content.cloneNode(true);
        
        /** @type {HTMLElement} */
        const emojiColItem = emojiItem.querySelector("div.glyph");
        emojiColItem.id = e.glyph;
        emojiColItem.dataset.description = e.description;
        emojiColItem.innerHTML = e.glyph;
        emojiColItem.addEventListener("click", appendIcon);
        list.append(emojiItem);
    });
});

function saveForm(show)
{
    if(show){
        document.getElementById("saveForm").classList.remove("w3-hide");
        document.getElementById("navbar").classList.add("w3-hide");
    }
    else{
        document.getElementById("saveForm").classList.add("w3-hide");
        document.getElementById("navbar").classList.remove("w3-hide");

    }
}