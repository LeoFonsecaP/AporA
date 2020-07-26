import { DEFAULT_TRANSITION } from "./Slider.js";
import { DotsMenu } from "./DotsMenu.js";
import { MovementMenu } from "./MovementMenu.js";
import { CircularSlider } from "./CircularSlider.js";
import { SwipeDetector } from "./SwipeDetector.js";

export class CircularSlideShow {
    constructor(
        htmlSlider, htmlNextButton, htmlPreviousButton, htmlDotsMenu,
        dotsCssClass, selectedDotCssClass
    ) {
        this.slider = new CircularSlider(htmlSlider);
        this.movementMenu = new MovementMenu(
            htmlNextButton, htmlPreviousButton, new SwipeDetector(htmlSlider)
        );
        this.dotsMenu = new DotsMenu(
            htmlDotsMenu, dotsCssClass, selectedDotCssClass
        );

        this._setupMovementMenu();
        this._setupDotsMenu();
    }

    _setupMovementMenu() {
        this.movementMenu.addOnNextListener((() => {
            this.slider.transitionToNextItem();
            this.dotsMenu.setSelectedDot(this.slider.getIndexOfCurrentItem());
        }).bind(this));

        this.movementMenu.addOnPreviousListener((() => {
            this.slider.transitionToPreviousItem();
            this.dotsMenu.setSelectedDot(this.slider.getIndexOfCurrentItem());
        }).bind(this));
    }

    _setupDotsMenu() {
        this.dotsMenu.setNumberOfDots(this.slider.getNumberOfItems());
        this.dotsMenu.addOnSelectionListener(((index) => {
            this.slider.transitionToItem(index);
        }).bind(this));
    }

    start() {
        this.dotsMenu.startListening();
        this.movementMenu.startListening();
    }

    refresh() {
        let currentSlide = this.slider.getIndexOfCurrentItem();
        this.slider.changeTransitionEffect('none');
        this.slider.transitionToItem(currentSlide);
        this.dotsMenu.setSelectedDot(currentSlide);
        this.slider.changeTransitionEffect(DEFAULT_TRANSITION);
    }
}
