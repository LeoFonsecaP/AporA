import {DEFAULT_TRANSITION} from "./Slider.js";

export class SlideShow {
    constructor(slider, nextPreviousMenu, dotsMenu) {
        this.slider = slider;

        this.nextPreviousMenu = nextPreviousMenu;
        this.nextPreviousMenu.addOnNextListener((() => {
            this.slider.transitionToNextItem();
            this.dotsMenu.setSelectedDot(this.slider.getIndexOfCurrentItem());
        }).bind(this));
        this.nextPreviousMenu.addOnPreviousListener((() => {
            this.slider.transitionToPreviousItem();
            this.dotsMenu.setSelectedDot(this.slider.getIndexOfCurrentItem());
        }).bind(this));

        this.dotsMenu = dotsMenu;
        this.dotsMenu.setNumberOfDots(this.slider.getNumberOfItems());
        this.dotsMenu.addOnSelectionListener(((index) => {
            this.slider.transitionToItem(index);
        }).bind(this));
    }

    start() {
        this.dotsMenu.startListening();
        this.nextPreviousMenu.startListening();
    }

    refresh() {
        let currentSlide = this.slider.getIndexOfCurrentItem();
        this.slider.changeTransitionEffect('none');
        this.slider.transitionToItem(currentSlide);
        this.dotsMenu.setSelectedDot(currentSlide);
        this.slider.changeTransitionEffect(DEFAULT_TRANSITION);
    }
}