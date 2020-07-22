import {DotsMenu} from "./modules/SlideShow/DotsMenu.js";
import {MovementMenu} from "./modules/SlideShow/MovementMenu.js";
import {DEFAULT_TRANSITION} from "./modules/SlideShow/Slider.js";
import {SlideShow} from "./modules/SlideShow/SlideShow.js";
import {CircularSlider} from "./modules/SlideShow/CircularSlider.js";
import {SwipeDetector} from "./modules/SlideShow/SwipeDetector.js";
import {PdfThumbnailsGenerator} from "./modules/SlideShow/PdfThumbnail.js";

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
