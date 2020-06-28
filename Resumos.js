class Resumo {
    constructor(path, description) {
        this.setDescription(description);
        this.setLink(path)
        this.setThumbnail(path);
    }

    setDescription(description) {
        this.description = document.createElement("p");
        this.description.setAttribute("class", "Description");
        this.description.innerHTML = description;
    }

    setThumbnail(path) {
        this.thumbnail = document.createElement("img");
        this.thumbnail.setAttribute("class", "Thumbnail");
        this.thumbnail.setAttribute("src", path);
        this.link.appendChild(this.thumbnail);
    }

    setLink(path) {
        this.link = document.createElement("a");
        this.link.setAttribute("href", path);
        this.link.setAttribute("target", "_blank")
    }

    appendTo(component) {
        let listEntry = document.createElement("li");
        listEntry.appendChild(this.description);
        listEntry.appendChild(this.link);
        component.appendChild(listEntry);
    }
}

/*let file = document.getElementById("pathInput");
file.addEventListener("change", function() {
    let image = new FileReader();
    image.readAsDataURL(this.files[0]);
    image.onloadend = function() {
        let preview = document.getElementById("file_preview").setAttribute("src", this.result);
    }
})*/

/*let a = document.getElementById("addResumo");
a.addEventListener("click", (a) =>{
    a.preventDefault();
    const d = "descriptionInput";
    const p = document.getElementById("file_preview").src;
    let description = document.getElementById(d).value;
    new Resumo(p, description).appendTo(document.getElementById("ResumosContainer"));
});*/
