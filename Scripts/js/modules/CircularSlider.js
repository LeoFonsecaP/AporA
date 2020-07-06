import {Slider, DEFAULT_TRANSITION} from "./Slider.js";
import {addHtmlChild} from "./Utils.js";

export class CircularSlider {
    constructor(sliderId, transitionEffect) {
        this.super = new Slider(sliderId, transitionEffect);
        addSentinels.bind(this)();
        this.super.changeTransitionEffect('none');
        this.super.transitionToItem(1);
        this.super.changeTransitionEffect(DEFAULT_TRANSITION);
        this.super.container.ontransitionend = updateToCorrectIndex.bind(this);
    }

    setTransitionsDirectionToVertical(direction) {
        this.super.setTransitionsDirectionToVertical(direction);
    }

    changeTransitionEffect(transitionEffect) {
        this.super.changeTransitionEffect(transitionEffect);
    }

    transitionToNextItem() {
        this.transitionToItem(this.super.counter + 1);
    }

    transitionToPreviousItem() {
        this.transitionToItem(this.super.counter - 1);
    }

    transitionToItem(index) {
        this.super.transitionToItem(index);
    }

    addItem(index, newSlide) {
        if (index > this.getNumberOfItems())
            return;
        this.super.addItem(index + 1, newSlide);
        updateTailSentinel.bind(this)();
        updateHeadSentinel.bind(this)();
    }

    removeItem(index) {
        if (index >= this.getNumberOfItems())
            return;
        this.super.removeItem(index + 1);
        updateHeadSentinel.bind(this)();
        updateTailSentinel.bind(this)();
    }

    getItem(index) {
        if (index >= this.getNumberOfItems())
            return;
        this.super.getItem(index + 1);
    }

    clear() {
        while(!this.super.isEmpty())
            this.removeItem(0);
    }

    isEmpty() {
        return (this.super.getNumberOfItems() === 0);
    }

    getIndexOfCurrentItem() {
        let lastIndex = this.super.getNumberOfItems() - 1;
        let superCurrentItemIndex =  this.super.getIndexOfCurrentItem();
        if (this.super.counter % lastIndex === 0)
            return (superCurrentItemIndex === 0) ? lastIndex - 2 : 0;
        return superCurrentItemIndex - 1;
    }

    getNumberOfItems() {
        return this.super.getNumberOfItems() - 2;
    }
}

function addSentinels() {
    let lastIndex = this.super.getNumberOfItems() - 1;
    let tail = this.super.container.children[lastIndex];
    let head =  this.super.container.children[0];
    addHtmlChild(this.super.container, head.cloneNode(true), lastIndex);
    addHtmlChild(this.super.container, tail.cloneNode(true), 0);
}

function updateToCorrectIndex() {
    let targetIndex = this.getIndexOfCurrentItem();
    this.super.changeTransitionEffect('none');
    this.super.transitionToItem(targetIndex + 1);
    this.super.changeTransitionEffect(DEFAULT_TRANSITION);
}

function updateHeadSentinel(newSentinel) {
    let lastIndex = this.super.getNumberOfItems() - 1;
    let headSentinel = this.super.container.children[0];
    let tail = this.super.container.children[lastIndex - 1];
    if (headSentinel.innerHTML != tail.innerHTML)
        return;
    this.super.removeItem(0);
    this.super.addItem(0, tail.cloneNode(true));
}

function updateTailSentinel(newSentinel) {
    let lastIndex = this.super.getNumberOfItems() - 1;
    let tailSentinel = this.super.container.children[lastIndex];
    let head = this.super.container.children[1];
    if (tailSentinel.innerHTML != head.innerHTML)
        return;
    this.super.removeItem(lastIndex);
    this.super.addItem(lastIndex, head.cloneNode(true));
}

