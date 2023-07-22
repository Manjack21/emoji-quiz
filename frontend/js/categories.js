
window.addEventListener("load", async function(ev) {
    const categorySelect = this.document.getElementById("category_id");
    categorySelect.innerHTML = await (await fetch("/api.php/categories")).text();
    categorySelect.addEventListener("change", async function(ev){
        const categoryId = ev.target.value;
        document.getElementById("emojis").innerHTML = await (await fetch(`/api.php/categories/${categoryId}/words`)).text();
        Array.from(document.querySelectorAll(".revealSpan"))
            .forEach(s => s.addEventListener("click", reveal))
    });
    categorySelect.dispatchEvent(new Event("change"));
    


    function reveal(ev)
    {
        const input = ev.target.parentElement.parentElement.querySelector("input");
        input.type = input.type === "text" ? "password" : "text";
    }
});