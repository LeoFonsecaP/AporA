import {addHtmlChild, removeHtmlChild} from '../Utils.js';

export const DEFAULT_TRANSITION = 'transform 0.4s ease-in-out';

const Direction = {'HORIZONTAL' : 0, 'VERTICAL' : 1};

const CSS_TRANSLATE = 'translate%c(%dpx)';

export class Slider {
<<<<<<< HEAD:resources/scripts/js/modules/SlideShow/Slider.js
    constructor(sliderId, transitionEffect) {
        let container = document.getElementById(sliderId);
        container.style.transition = transitionEffect;
        let direction = Direction.HORIZONTAL;
        let counter = 0;

    	this.setTransitionsDirectionToVertical = (direction) => {
        	direction = Direction.VERTICAL;
    	}

    	this.changeTransitionEffect = (transitionEffect) => {
        	transitionEffect = transitionEffect;
    	}

    	this.transitionToItem = (index) => {
        	if ((index >= this.getNumberOfItems()) || (index < 0))
            		return;

        	container.style.transition = transitionEffect;
        	const slideCoordinate = calculateItemCoordinate(index);
        	const axis = (this.direction === Direction.HORIZONTAL) ? 'X' : 'Y';
        	/*const transform = CSS_TRANSLATE.replace('%c', axis)
			.replace('%d', ('-' + slideCoordinate));
        	transform = transform.replace('%d', ('-' + slideCoordinate));*/
        	container.style.transform = CSS_TRANSLATE.replace('%c', axis)
				.replace('%d', ('-' + slideCoordinate));
        	counter = index;
    	}

		let calculateItemCoordinate = (index) => {
    		const slidesDistance = (direction === Direction.HORIZONTAL) ?
        		container.children[0].clientWidth :
        		container.children[0].clientHeight;
    		return (slidesDistance * index);
		}

    	this.transitionToNextItem = () => {
        	this.transitionToItem(counter + 1);
    	}

    	this.transitionToPreviousItem = () => {
        	this.transitionToItem(counter - 1);
    	}

    	this.getNumberOfItems = () => {
        	return container.children.length;
    	}

    	this.getIndexOfCurrentItem = () => {
        	return counter;
		}
		
		this.transitionToItem(this.counter);
    }
=======
    constructor(htmlSlider, transitionEffect=DEFAULT_TRANSITION) {
        this.htmlSlider = htmlSlider;
        this.htmlSlider.style.transition = transitionEffect;

        this.counter = 0;
        this.direction = Direction.HORIZONTAL;
        this.transitionEffect = transitionEffect;
        this.transitionToItem(this.counter);
    }

    setTransitionsDirectionToVertical(direction) {
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
        if ((index >= this.htmlSlider.children.length) || (index < 0))
            return;

        this.counter = index;
        this.htmlSlider.style.transition = this.transitionEffect;

        let slideCoordinate = this._calculateItemCoordinate(this, index);
        let axis = (this.direction === Direction.HORIZONTAL) ? 'X' : 'Y';
        this.htmlSlider.style.transform = CSS_TRANSLATE.replace('%c', axis)
            .replace('%d', ('-' + slideCoordinate));
    }

    _calculateItemCoordinate(slider, index) {
        let slidesDistance = (slider.direction === Direction.HORIZONTAL) ?
            slider.htmlSlider.children[0].clientWidth :
            slider.htmlSlider.children[0].clientHeight;
        return (slidesDistance * index);
    }

    addItem(index, slide) {
        if (index <= this.htmlSlider.children.length)
            addHtmlChild(this.htmlSlider, slide, index);
    }

    removeItem(index) {
        if (this.isEmpty())
            return;
        removeHtmlChild(this.htmlSlider, index);
        let numberOfItems = this.htmlSlider.children.length;
        if ((this.counter === index) && (this.counter === numberOfItems))
            this.transitionToPreviousItem();
    }

    getItem(index) {
        return this.htmlSlider.children[index];
    }

    clear() {
        while(!this.isEmpty())
            this.removeItem(0);
    }

    isEmpty() {
        return (this.htmlSlider.children.length === 0);
    }

    getNumberOfItems() {
        return this.htmlSlider.children.length;
    }

    getIndexOfCurrentItem() {
        return this.counter;
    }

    getHtmlSlider() {
        return this.htmlSlider;
    }
>>>>>>> b60b6640651da733c9a359b31ea6180a4569859c:resources/scripts/js/modules/slideshow/Slider.js
}
