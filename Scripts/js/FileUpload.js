export class FilesSelector {
    constructor() {
        const fileInputId = "fileInput";
        this.input = createFilesSelector(fileInputId);
        this.listeners = [];
    }
    toHtmlElement(buttonText, cssButtonClass) {
        let button = createWrapperButton(this.input.id, buttonText, cssButtonClass);
        let selector = document.createElement("div");
        selector.appendChild(this.input);
        selector.appendChild(button);
        return selector;
    }
    getSelectedFiles() {
        return this.input.files;
    }
    addInputChangeListener(newListener) {
        this.listeners.push(newListener);
    }
    startListeners() {
        this.listeners.forEach((action) => {
            this.input.addEventListener("change", action);
        })
    }
}

const noSelectedFileText = "Nenhum arquivo selescionado";

export class FilePreviewList {
    constructor() {
        this.htmlElement = document.createElement("ul");
        this.emptyListText = document.createElement("p");
        this.emptyListText.textContent = noSelectedFileText;
        this.htmlElement.appendChild(this.emptyListText);
        this.filesList = [];
    }

    update(files) {
        console.log(files);
        Array.prototype.forEach.call(files, (file) => {
            let fileAlreadyOnTheList = Object.keys(this.filesList).includes(file.name);
            if (!fileAlreadyOnTheList) {
                let deleteButton = createDeleteButton()
                this.filesList[file.name] = {"image" : createFilePreviewListItem(file, deleteButton), "blob" : file};
                this.htmlElement.appendChild(this.filesList[file.name].html);
                deleteButton.addEventListener("click", (() => this.removeFile(file.name)).bind(this, file.name));
            }
        });
        if (Object.keys(this.filesList).length == 0) {
            this.htmlElement.appendChild(this.emptyListText);
        } else {
            this.htmlElement.removeChild(this.emptyListText);
        }
    }

    removeFile(fileName) {
        let fileListEntry = this.filesList[fileName];
        delete this.filesList[fileName];
        this.htmlElement.removeChild(fileListEntry.html);
    }
    toHtmlElement(listCssClass, deleteButtonCssClass) {
        this.htmlElement.className = listCssClass;
        return this.htmlElement;
    }
}

function createFilesSelector(id) {
    let input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.style["display"] = "none";
    input.id = id;
    return input;
}

function createWrapperButton(inputId, buttonText, cssClass) {
    let button = document.createElement("label");
    button.htmlFor = inputId;
    button.textContent = buttonText;
    button.className = cssClass;
    return button;
}

function createDeleteButton() {
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&#10006";
    deleteButton.style["backgroundColor"] = "inherit";
    deleteButton.style["width"] = "2vw";
    deleteButton.style["height"] = "2vw";
    deleteButton.style["fontSize"] = "1.0vw";
    deleteButton.style["color"] = "red";
    deleteButton.style["border"] = "2px solid red";
    deleteButton.style["borderRadius"] = "100%";
    deleteButton.style["cursor"] = "pointer";
    deleteButton.style["display"] = "tableCell";
    deleteButton.style["verticalAlign"] = "top";
    return deleteButton;
}

function createFilePreviewListItem(file, deleteButton) {
    console.log(file);
    let reader = new FileReader();

    let thumbnail = document.createElement("img");
    reader.readAsDataURL(file);
    reader.onload = ((event) => {thumbnail.src = event.target.result}).bind(thumbnail);

    let name = document.createElement("p");
    name.textContent = "name: " + file.name;

    let size = document.createElement("p");
    size.textContent = "size: " + file.size;

    let listItem = document.createElement("li");
    listItem.appendChild(thumbnail);
    listItem.appendChild(name);
    listItem.appendChild(size);
    listItem.appendChild(deleteButton);

    return listItem;
}


/*function createThumbnailFromImageFile(file) {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    let thumbnail = document.createElement("img");
    thumbnail.src = fileReader.result;
}

class FileUploadPreviewItem {
    constructor(file, cssClass, cancelButton) {
        this.container = document.createElement("div");
        this.thumbnail = createThumbnailFromImageFile(file);
        this.size = document.createElement("p");
        this.size.textContent = file.size;
        this.name = file.name;
    }
}

class FilePreviewList {
    constructor(cssClassName, files) {
        let fileReader = new FileReader();
        this.container = document.createElement("ul");
        var filesBuffer;
        Array.prototype.forEach(files, (value, index) => {
            filesBuffer.push({
                "size" : files.sign,
                "name" : files.name,
                "url" : fileReader.readAsDataURL(files[index])
            });
        });
        this.files = filesBuffer;
    }
}

class FileUpload {
    constructor(fileUploadSelector) {
        this.button = fileUploadButton;
    }
}

/*class FileInfo {
   constructor(file) {
        this.url = new FileReader();
        this.size = file.size;
        this.name = file.name;
        this.url.readAsDataURL(file);
        this.decoded = false;
        this.url.onloadend = (() => {
            this.decoded = true;
        }).bind(this);
   }
   toHtmlElement() {

   }
}

class FilesUploadComponent {
    constructor() {
        this.completeElement = document.createElement("div");
        this.hiddenButton = document.createElement("input");
        this.customButton = document.createElement("label");
        this.previewList = document.createElement("ul");
        this.filesList = new Array();
        this.addedFiles = 0;

        setHtmlAtributes(this.hiddenButton, {
            "type" : "file", "multiple" : "true", "className" : "HiddenElement", "id" : "FileUploadInput"
        });

        setHtmlAtributes(this.customButton, {
            "htmlFor" : "FileUploadInput", "className" : "FileButton", "innerHtml" : "Selecione os arquivos"
        });

        this.completeElement.appendChild(this.hiddenButton);
        this.completeElement.appendChild(this.customButton);

        this.hiddenButton.addEventListener("change", function () {
            for (let i = 0; i < this.hiddenButton.files.length; i++) {
                this.filesList[this.addedFiles++] = this.hiddenButton.files[i];
            }
        });
    }

    getFilesSizes() {

    }

    getFilesUrls() {
        let image = new FileReader();
        this.files.forEach((file) => {

        })
        image.readAsDataURL(this.files[0]);
        image.onloadend = function () {
            let preview = document.getElementById("ImagePreview");
            preview.src = this.result;
        }
    }
}

class FileUploadWindow {
    constructor() {
        this.fileUploadButton = createFileUploadButton();
        this.descriptionBox = this.createFileDescriptionBox();
        this.submitButton = this.createSubmitButton();

        this.window = document.createElement("Form");
        this.window.appendChild(this.createFileUploadButton());
        this.window.appendChild()

        this.element = document.createElement("div");
        this.element.appendChild(this.hiddenFileUploadButton);
        this.element.appendChild(this.customFileUploadButton);
        this.element.appendChild(this.previewImageContainer);
        this.element.className = "FileUploadButton";

    }


    createSubmitButton() {

    }

    createFileDescriptionBox() {
        let descriptionBox = document.createElement("textarea");
        descriptionBox.placeholder = "Descricao";
        descriptionBox.id = "DescricaoInput";
    }


    getElement() {
        return this.element;
    }
    appendTo(parentElement) {
        parentElement.appendChild(this.element);
    }
    kill(parentElement) {
        parentElement.removeChild(this.element);
    }
}
*/
/*function setImagePreview(imageInput, imageOutput) {
    let file = document.getElementById(imageInput);
    file.addEventListener("change", function () {
        let image = new FileReader();
        image.readAsDataURL(this.files[0]);
        image.onloadend = function () {
            let preview = document.getElementById("ImagePreview");
            preview.src = this.result;
        }
    })
}*/
/*
const uploadButton = document.getElementById("Upload");
uploadButton.addEventListener("click", () => {
    let elements = [];

    elements[1] = (new FileUploadButton()).getElement();
    elements[1].id = "FileInput"

    elements[2] = document.createElement("input");
    elements[2].value = "Enviar";
    elements[2].type = "submit";
    elements[2].id = "Submit";

    const popUpWindow = new PopUpWindow("FileUploadWindow", elements);
    console.log("fjdklsaj");
    popUpWindow.display();
    console.log(popUpWindow.closeButton.innerHTML);
    popUpWindow.closeButton.addEventListener("click", (e) => {popUpWindow.kill()});
    popUpWindow.shadow.addEventListener("click", (e) => {popUpWindow.kill()});
    setImagePreview("File", "PreviewImageContainer");
}) */