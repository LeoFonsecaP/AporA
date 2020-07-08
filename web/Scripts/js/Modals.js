export class Modal {
    constructor(contents, cssClass) {
        this.contents = contents;
        this.cssClass = cssClass;
        this.htmlWrapper = null;
        this.onShowActions = [];
    }

    addOnShowListener(newListener) {
        this.onShowActions.push(newListener);
    }

    show() {
        this.onShowActions.forEach((action) => {action()});
        let shadowFilter = createShadowFilter();
        let container = createHtmlContainer(this.contents, this.cssClass);
        this.htmlWrapper = createHtmlWrapper(container, shadowFilter);
        document.body.appendChild(this.htmlWrapper);
        document.body.style["overflowY"] = "hidden";
    }

    kill() {
        console.log(this.htmlWrapper);
        document.body.removeChild(this.htmlWrapper);
        document.body.style["overflowY"] = "scroll";
    }
}

const SHADOW_FILTER_STYLE = {
    "backgroundColor" : "#000000", "opacity" : "0.4",
    "width" : "100vw", "height" : "100vh", "zIndex" : "100", "position" : "fixed",
    "top" : "0", "bottom" : "0", "left" : "0", "right" : "0", "overflowY" : "hidden"
}

function createShadowFilter() {
    let background = document.createElement("div");
    Object.keys(SHADOW_FILTER_STYLE).forEach((key) => {
        background.style[key] = SHADOW_FILTER_STYLE[key]
    });
    return background;
}

function createHtmlContainer(contents, cssClass) {
    let container = document.createElement("div");
    contents.forEach((content) => {container.appendChild(content)});
    container.className = cssClass;
    container.style["zIndex"] = "101";
    return container;
}

function createHtmlWrapper(container, shadowFilter) {
    let htmlWrapper = document.createElement("div");
    htmlWrapper.appendChild(shadowFilter);
    htmlWrapper.appendChild(container);
    htmlWrapper.style["width"] = "100vw";
    htmlWrapper.style["height"] = "100vh";
    return htmlWrapper;
}
