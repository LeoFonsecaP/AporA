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
    const dotsMenu = new DotsMenu('dots', 'dot', 'selected_dot');
    const slideShow = new SlideShow(slider, movementMenu, dotsMenu);
    slideShow.start();

    const slideShowDisplayer = document.getElementById('slideShowDisplayer');
    window.addEventListener('resize', (() => {
        setTimeout(() => slideShow(), 100);
    }).bind(slideShow));
}

window.onload = main;
