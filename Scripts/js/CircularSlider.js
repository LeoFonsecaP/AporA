import {Slider} from "./Sliders.js";

export class CircularSlider extends Slider {
    constructor(slider, direction) {
        super(slider, direction);
        this.addSentinels();
        this.counter = 1;
    }

    addSlide(newSlide, position) {
        if (position + 1 === this.numberOfSlides - 1) {
            console.error("[Slider] Position " + position + " out of bounds for insertion");
            return;
        }

        if (position === 0) {
            this.updateLastChildNodeSentinel(newSlide.cloneNode(true));
        } else if (position === this.numberOfSlides - 2) {
            this.updateFirstChildNodeSentinel(newSlide.cloneNode(true));
        }
        super.addSlide(newSlide, position + 1);
    }

    removeSlide(position) {
        if (position + 1 === this.numberOfSlides - 2) {
            console.error("[Slider] Position " + position + " out of bounds for removal");
            return;
        }

        if (position === 0) {
            let newFirstChildSentinel = this.container.children[2].cloneNode(true);
            this.updateLastChildNodeSentinel(newFirstChildSentinel);
        } else if (position === this.numberOfSlides - 2) {
            let newLastChildSentinel = this.container.children[2].cloneNode(true);
            this.updateFirstChildNodeSentinel(newLastChildSentinel);
        }
        super.removeSlide(position + 1);
    }

    transitionToSlide(position, transitionEffect) {
        super.transitionToSlide(position, transitionEffect);

        this.container.addEventListener('transitionend', () => {
            if (this.counter == 0) {
                super.transitionToSlide(this.numberOfSlides - 2, 'none');
            } else if (this.counter == this.numberOfSlides - 1) {
                console.log('triggered');
                super.transitionToSlide(this.numberOfSlides - this.counter, 'none');
            }
        });
    }

    /*getIndexOfNextSlide() {
        return (this.counter + 1) % this.numberOfSlides;
    }

    getIndexOfPreviousSlide() {
        return (this.counter === 0) ? this.numberOfSlides - 1 : this.counter - 1;
    } */

    updateFirstChildNodeSentinel(newSentinel) {
        super.removeSlide(0);
        super.addSlide(newSentinel, 0);
    }

    updateLastChildNodeSentinel(newSentinel) {
        super.removeSlide(this.numberOfSlides - 1);
        super.addSlide(newSentinel, this.numberOfSlides - 1);
    }

    addSentinels() {
        let firstNode =  this.container.children[0];
        let lastNode = this.container.children[this.numberOfSlides - 1];
        super.addSlide(firstNode.cloneNode(true), this.numberOfSlides);
        super.addSlide(lastNode.cloneNode(true), 0);
    }
}