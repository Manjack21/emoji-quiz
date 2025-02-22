
var preload = function(url, callback){
}

window.addEventListener("load", async function (ev) {
    window.setTimeout(() => {
        console.log("Start loading")

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'frontend/css/main.css';

        link.addEventListener('load', () => {
            document.getElementById('loading-indicator').classList.add('w3-hide');
            document.getElementById('emoji-list').classList.remove('w3-hide');
        });

        document.head.appendChild(link);
    }, 500);

    const targetLabel = this.document.getElementById("current");
    const previewLabel = this.document.getElementById("currentPreview");

    var history = [];
    function appendIcon(ev)
    {
        const currentText = (targetLabel.dataset.current ?? "");
        history.push(currentText);

        const newText = currentText + ev.target.id;
        setCurrentText(newText);
    }

    this.window.addEventListener("scroll", function(ev){
        const isVisible = !previewLabel.classList.contains("w3-hide");
        if(window.scrollY > 200 && !isVisible) previewLabel.classList.remove("w3-hide")
        else if(window.scrollY <= 200 && isVisible) previewLabel.classList.add("w3-hide")
    });

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
        previewLabel.innerHTML = (text === '' ? "&nbsp;" : text);
        document.getElementById("word").value = targetLabel.innerText.trim();
    }
    
    this.document.getElementById("category_id").innerHTML = await (await this.fetch("api.php/categories")).text();

    var emojiData = await this.fetch("data/emoji.json");
    var emojis = await emojiData.json();
    const emojiTemplate = this.document.getElementById("templ-emoji");
    const list = this.document.getElementById("emoji-list");
    emojis.forEach(e => {
        /** @type {DocumentFragment} */
        const emojiItem = emojiTemplate.content.cloneNode(true);
        
        /** @type {HTMLElement} */
        const emojiColItem = emojiItem.querySelector("div.glyph");
        emojiColItem.id = e.glyph;
        emojiColItem.dataset.description = e.description.toLowerCase();
        emojiColItem.innerHTML = e.glyph;
        emojiColItem.addEventListener("click", appendIcon);
        list.append(emojiItem);
    });
});

var searchDelay;
function search()
{
    window.clearTimeout(searchDelay);
    searchDelay = window.setTimeout(
        () => {
            var searchterm = document.getElementById('searchterm').value;
            
            Array.from(document.getElementById('emoji-list').childNodes)
                .filter(node => node.nodeType == Node.ELEMENT_NODE)
                .forEach(/** @type {ChildNode} */ node => {
                    console.log(node);

                    if(node.dataset.description.indexOf(searchterm) > -1 || searchterm == '')
                    {
                        node.classList.remove('w3-hide');
                    }
                    else
                    {
                        node.classList.add('w3-hide');
                    }
                }
            );
        },
        800
    );
}

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