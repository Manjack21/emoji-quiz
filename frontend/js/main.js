

window.addEventListener("load", async function (ev) {

    
    const targetLabel = this.document.getElementById("current");
    function appendIcon(ev)
    {
        const glyphSpan = document.createElement("span");
        glyphSpan.innerHTML = ev.target.innerText;
        glyphSpan.addEventListener("click", function() { targetLabel.removeChild(glyphSpan); })

        targetLabel.appendChild(glyphSpan);
    }

    this.document.getElementById("clearButton").addEventListener("click",function(ev) {
        targetLabel.innerHTML = "&nbsp;";
    });

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
