import {DotsMenu} from "./modules/slideshow/DotsMenu.js";
import {MovementMenu} from "./modules/slideshow/MovementMenu.js";
import {DEFAULT_TRANSITION} from "./modules/slideshow/Slider.js";
import {SlideShow} from "./modules/slideshow/SlideShow.js";
import {CircularSlider} from "./modules/slideshow/CircularSlider.js";
import {SwipeDetector} from "./modules/slideshow/SwipeDetector.js";

function main() {
    const swipeDetector = new SwipeDetector('slideShowDisplayer');
    const movementMenu = new MovementMenu('nextButton', 'previousButton', swipeDetector);
    const slider = new CircularSlider('slider', DEFAULT_TRANSITION);
    const dotsMenu = new DotsMenu('dots', 'dot', 'selected_dot');
    const slideShow = new SlideShow(slider, movementMenu, dotsMenu);
    slideShow.start();

    window.addEventListener('resize', () => {
        setTimeout(() => slideShow.refresh(), 100);
    });
}

window.onload = main;
