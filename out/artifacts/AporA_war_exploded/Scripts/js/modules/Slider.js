import {addHtmlChild, removeHtmlChild} from './Utils.js';

export const DEFAULT_TRANSITION = 'transform 0.4s ease-in-out';

const Direction = {'HORIZONTAL' : 0, 'VERTICAL' : 1};

const cssTranslate = 'translate%c(%dpx)';

export class Slider {
    constructor(sliderId, transitionEffect) {
        this.container = document.getElementById(sliderId);
        this.transitionEffect = transitionEffect;
        this.container.style.transition = transitionEffect;
        this.direction = Direction.HORIZONTAL;
        this.counter = 0;
        this.transitionToItem(this.counter);
    }

    setTransitionsDirectionToVertical(direction) {
        /* Doesn't get set directly to avoid changing the transition
        * effect during the execution of a transition */
        this.direction = Direction.VERTICAL;
    }

    changeTransitionEffect(transitionEffect) {
        this.transitionEffect = transitionEffect;
    }

    transitionToNextItem() {
        this.transitionToItem(this.counter + 1);
    }

    transitionToPreviousItem() {
        this.transitionToItem(this.counter - 1);
    }

    transitionToItem(index) {
        if ((index >= this.getNumberOfItems()) || (index < 0))
            return;
        this.container.style.transition = this.transitionEffect;
        let slideCoordinate = calculateItemCoordinate(this, index);
        let axis = (this.direction === Direction.HORIZONTAL) ? 'X' : 'Y';
        let transform = cssTranslate.replace('%c', axis);
        transform = transform.replace('%d', ('-' + slideCoordinate));
        this.container.style.transform = transform;
        this.counter = index;
    }

    addItem(index, slide) {
        if (index <= this.getNumberOfItems())
            addHtmlChild(this.container, slide, index);
    }

    removeItem(index) {
        if (this.isEmpty())
            return;
        removeHtmlChild(this.container, index);
        let numberOfItems = this.getNumberOfItems();
        if ((this.counter === index) && (this.counter === numberOfItems))
            this.transitionToPreviousItem();
    }

    getItem(index) {
        return this.container.children[index];
    }

    clear() {
        while(!this.isEmpty())
            this.removeItem(0);
    }

    isEmpty() {
        return (this.getNumberOfItems() === 0);
    }

    getNumberOfItems() {
        return this.container.children.length;
    }

    getIndexOfCurrentItem() {
        return this.counter;
    }
}

function calculateItemCoordinate(slider, index) {
    let slidesDistance = (slider.direction === Direction.HORIZONTAL) ?
        slider.container.children[0].clientWidth :
        slider.container.children[0].clientHeight;
    return (slidesDistance * index);
}
