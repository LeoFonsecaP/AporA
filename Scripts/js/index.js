import {DotsMenu} from "./modules/DotsMenu.js";
import {MovementMenu} from "./modules/MovementMenu.js";
import {DEFAULT_TRANSITION} from "./modules/Slider.js";
import {SlideShow} from "./modules/SlideShow.js";
import {CircularSlider} from "./modules/CircularSlider.js";
import {SwipeDetector} from "./modules/SwipeDetector.js";
import {PdfThumbnailsGenerator} from "./modules/PdfThumbnail.js";

function main() {
    const swipeDetector = new SwipeDetector('slideShowDisplayer');
    const movementMenu = new MovementMenu('nextButton', 'previousButton', swipeDetector);
    const slider = new CircularSlider('slider', DEFAULT_TRANSITION);
    const dotsMenu = new DotsMenu('dots', 'Dot', 'SelectedDot');
    const slideShow = new SlideShow(slider, movementMenu, dotsMenu);
    slideShow.start();

    const slideShowDisplayer = document.getElementById('slideShowDisplayer');
    const height = slideShowDisplayer.clientHeight;
    const width = slideShowDisplayer.clientWidth;
    const pdfThumbnailGenerator = new PdfThumbnailsGenerator(pdfjsLib, width, height);
    const images = document.querySelectorAll('img');

    for (let i = 0; i < images.length; i++) {
        const dataSrc = images[i].getAttribute('data-src');
        if ((dataSrc != null) && dataSrc.search('pdf') != -1) {
            pdfThumbnailGenerator.generateThumbnail(dataSrc, images[i]);
        }
    }
    window.addEventListener('resize', (() => {
        setTimeout(() => slideShow.refresh.bind(slideShow)(), 100);
    }).bind(slideShow));
}

window.onload = main;
