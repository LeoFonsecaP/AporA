export class PdfThumbnailsGenerator {
    constructor(pdfJs) {
        this.pdfJs = pdfJs;
    }

    generateThumbnail(pdfSrc, destinationImage) {
        this.pdfJs.getDocument(pdfSrc).promise.then((pdf) => {
            const callback = page => mapPageToThumbnail(page, destinationImage);
            return pdf.getPage(1).then(callback);
        });
    }
}

function mapPageToThumbnail(page, destinationImage) {
    const canvas = generateCanvas(destinationImage);
    const renderArguments = generateRenderArguments(page, canvas);
    const updateImageSrc = () => destinationImage.src = canvas.toDataURL();
    return page.render(renderArguments).promise.then(updateImageSrc);
}

function generateCanvas(destinationImage) {
    const canvas = document.createElement('canvas');
    canvas.height = destinationImage.clientHeight;
    canvas.width = destinationImage.clientWidth;
    return canvas;
}

function generateRenderArguments(page, canvas) {
    let renderArguments = {};
    renderArguments.canvasContext = canvas.getContext('2d');
    renderArguments.viewport = page.getViewport({'scale' : 1});
    let optimalScale = canvas.width / renderArguments.viewport.width;
    renderArguments.viewport = page.getViewport({'scale' : optimalScale});
    return renderArguments;
}
