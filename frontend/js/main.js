

window.addEventListener("load", async function (ev) {
    const targetLabel = this.document.getElementById("current");
    var history = [];
    function appendIcon(ev)
    {
        const currentText = (targetLabel.dataset.current ?? "");
        history.push(currentText);

        const newText = currentText + ev.target.id;
        setCurrentText(newText);
        
        /*
        const glyphSpan = document.createElement("span");
        glyphSpan.innerHTML = ev.target.innerText;
        glyphSpan.addEventListener("click", function() { targetLabel.removeChild(glyphSpan); })
        
        targetLabel.appendChild(glyphSpan);
        */       
        
    }

    this.document.getElementById("clearButton").addEventListener(
        "click",
        function(ev) { 
            setCurrentText("&nbsp;")
        }
    );

    this.document.getElementById("backButton").addEventListener(
        "click",
        function(ev) { 
            if(history.length > 0) setCurrentText(history.pop());
        }
    );

    function setCurrentText(text){
        targetLabel.dataset.current = text;
        targetLabel.innerHTML = (text === '' ? "&nbsp;" : text);
        document.getElementById("word").value = targetLabel.innerText.trim();
    }
    
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