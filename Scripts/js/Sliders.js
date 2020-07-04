export const DEFAULT_TRANSITION_EFFECT = 'transform 0.4s ease-in-out';

export class Slider {
    constructor(slider, direction) {
        this.container = slider;
        this.numberOfSlides = this.container.children.length;
        this.counter = 0;
        if (direction === 'horizontal') {
            this.axis = 'X';
            this.slidesDistance = this.container.children[0].clientWidth;
        } else {
            this.axis = 'Y';
            this.slidesDistance = this.container.children[0].clientHeight;
        }
    }

    transitionToNextSlide(transitionEffect) {
        console.log(this.getIndexOfNextSlide() + transitionEffect);
        this.transitionToSlide(this.getIndexOfNextSlide(), transitionEffect);
    }

    transitionToPreviousSlide(transitionEffect) {
        console.log(transitionEffect);
        this.transitionToSlide(this.getIndexOfPreviousSlide(), transitionEffect);
    }

    transitionToSlide(position, transitionEffect) {
        console.log(transitionEffect);
        let newCoordinate = -this.slidesDistance * position;
        this.container.style.transition = transitionEffect;
        this.container.style.transform = 'translate' + this.axis + '(' + (newCoordinate) + 'px)';
        this.counter = position;
    }

    addSlide(newSlide, position) {
        if ((position < 0) || (position > this.numberOfSlides)) {
            console.error("[Slider] Position " + position + " out of bounds for insertion");
            return;
        }
        if (position < this.numberOfSlides) {
            this.container.insertBefore(newSlide, this.container.children[position]);
        } else {
            this.container.appendChild(newSlide);
        }
        ++this.numberOfSlides;
        if (this.counter > position) {
            ++this.counter;
        }
    }

    removeSlide(position) {
        if ((position < 0) || (position >= this.numberOfSlides)) {
            console.error("[Slider] Position " + position + " out of bounds for removal");
            return;
        }
        let childToRemove = this.container.children[position];
        this.container.removeChild(childToRemove);
        --this.numberOfSlides;
        if (this.counter > position) {
            --this.counter;
        }
    }

    getIndexOfNextSlide() {
        return (this.counter === this.numberOfSlides - 1) ? this.numberOfSlides - 1 : this.counter + 1;
    }

    getIndexOfPreviousSlide() {
        return (this.counter === 0)  ? 0 : this.counter - 1;
    }
}
