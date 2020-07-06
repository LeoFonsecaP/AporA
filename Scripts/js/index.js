import {DotsMenu} from "./modules/DotsMenu.js";
import {MovementMenu} from "./modules/MovementMenu.js";
import {DEFAULT_TRANSITION} from "./modules/Slider.js";
import {SlideShow} from "./modules/SlideShow.js";
import {CircularSlider} from "./modules/CircularSlider.js";
import {SwipeDetector} from "./modules/SwipeDetector.js";

function main() {
    const swipeDetector = new SwipeDetector('slideShowDisplayer');
    const movementMenu = new MovementMenu('nextButton', 'previousButton', swipeDetector);
    const slider = new CircularSlider('slider', DEFAULT_TRANSITION);
    const dotsMenu = new DotsMenu('dotsContainer', 'Dot', 'SelectedDot');
    const slideShow = new SlideShow(slider, movementMenu, dotsMenu);
    slideShow.start();
}

window.onload = main;
