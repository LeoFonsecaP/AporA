import {Slider, DEFAULT_TRANSITION} from "./Slider.js";
import {addHtmlChild} from "../Utils.js";

export class CircularSlider extends Slider {
    constructor(htmlSlider, transitionEffect=DEFAULT_TRANSITION) {
        super(htmlSlider, transitionEffect);
        this._addSentinels();
        super.changeTransitionEffect('none');
        super.transitionToItem(1);
        super.changeTransitionEffect(DEFAULT_TRANSITION);
        super.getHtmlSlider().ontransitionend = this._updateToCorrectIndex.bind(this);
    }

    _addSentinels() {
        let numberOfItems = super.getNumberOfItems();
        let tailClone = super.getItem(numberOfItems - 1).cloneNode(true);
        let headClone =  super.getItem(0).cloneNode(true);
        addHtmlChild(super.getHtmlSlider(), headClone, numberOfItems);
        addHtmlChild(super.getHtmlSlider(), tailClone, 0);
    }

    _updateToCorrectIndex() {
        let targetIndex = this.getIndexOfCurrentItem();
        super.changeTransitionEffect('none');
        super.transitionToItem(targetIndex + 1);
        super.changeTransitionEffect(DEFAULT_TRANSITION);
    }

    transitionToNextItem() {
        super.transitionToItem(super.getIndexOfCurrentItem() + 1);
    }

    transitionToPreviousItem() {
        super.transitionToItem(super.getIndexOfCurrentItem() - 1);
    }

    transitionToItem(index) {
        super.transitionToItem(index + 1);
    }

    addItem(index, newSlide) {
        if (index > this.getNumberOfItems())
            return;
        super.addItem(index + 1, newSlide);
        this._updateTailSentinel();
        this._updateHeadSentinel();
    }

    removeItem(index) {
        if (index >= this.getNumberOfItems())
            return;
        super.removeItem(index + 1);
        this._updateTailSentinel();
        this._updateHeadSentinel();
    }

    _updateHeadSentinel(newSentinel) {
        let lastIndex = super.getNumberOfItems() - 1;
        let headSentinel = super.getItem(0);
        let tail = super.getItem(lastIndex - 1);
        if (headSentinel.innerHTML != tail.innerHTML)
            return;
        super.removeItem(0);
        super.addItem(0, tail.cloneNode(true));
    }

    _updateTailSentinel(newSentinel) {
        let lastIndex = super.getNumberOfItems() - 1;
        let tailSentinel = super.getItem(lastIndex);
        let head = super.getItem(1);
        if (tailSentinel.innerHTML != head.innerHTML)
            return;
        super.removeItem(lastIndex);
        super.addItem(lastIndex, head.cloneNode(true));
    }

    getItem(index) {
        if (index >= this.getNumberOfItems())
            return;
        super.getItem(index + 1);
    }

    getIndexOfCurrentItem() {
        let lastIndex = super.getNumberOfItems() - 1;
        let superCurrentItemIndex =  super.getIndexOfCurrentItem();
        if (superCurrentItemIndex % lastIndex === 0)
            return (superCurrentItemIndex === 0) ? lastIndex - 2 : 0;
        return superCurrentItemIndex - 1;
    }

    getNumberOfItems() {
        return super.getNumberOfItems() - 2;
    }
}
