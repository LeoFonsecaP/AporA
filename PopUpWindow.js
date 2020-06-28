class PopUpWindow {
    constructor(cssClassName, windowElements) {
        this.window = document.createElement("div");
        windowElements.forEach(currentValue => {this.window.appendChild(currentValue)});
        this.window.className = cssClassName;
        this.window.style["position"] = "fixed";
        this.window.style["margin"] = "0 auto";
        this.window.style["zIndex"] = "8";


        this.closeButton = document.createElement("button");
        this.closeButton.innerHTML = "&times";
        this.closeButton.style["background"] = "inherit";
        this.closeButton.style["border"] = "none";
        this.closeButton.style["position"] = "absolute";
        this.closeButton.style["right"] = "1%"
        this.closeButton.style["top"] = "1%"
        this.closeButton.style["cursor"] = "pointer";
        this.window.appendChild(this.closeButton);

        this.shadow = document.createElement("div");
        this.shadow.style["height"] = "100%";
        this.shadow.style["width"] = "100%";
        this.shadow.style["position"] = "fixed";
        this.shadow.style["top"] = "50px";
        this.shadow.style["backgroundColor"] = "black"
        this.shadow.style["opacity"] = "0.4";
    }

    display() {
        let body = document.getElementById("page");
        body.appendChild(this.shadow);
        body.appendChild(this.window);
    }

    kill() {
        let body = document.getElementById("page");
        body.removeChild(this.shadow);
        body.removeChild(this.window);
    }
}

const uploadButton = document.getElementById("upload");
console.log("abcd");
uploadButton.addEventListener("click", () => {
    console.log("fdklasjfkldsjalk");
    let elements = [];
    elements[0] = document.createElement("input");
    elements[0].placeholder = "Descricao";
    elements[0].style["position"] = "absolute";
    elements[0].style["height"] = "50%";
    elements[0].style["top"] = "10%";
    elements[0].style["left"] = "10%";
    elements[0].style["right"] = "20%";

    elements[1] = document.createElement("input");
    elements[1].type = "file";
    elements[1].style["position"] = "absolute";
    elements[1].style["top"] = "10%";
    elements[1].style["right"] = "10%";

    const popUpWindow = new PopUpWindow("PopUp", elements);
    popUpWindow.display();
    console.log(popUpWindow.closeButton.innerHTML);
    popUpWindow.closeButton.addEventListener("click", (e) => {popUpWindow.kill()});
    popUpWindow.shadow.addEventListener("click", (e) => {popUpWindow.kill()});
})