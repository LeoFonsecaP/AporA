import {addHtmlChild, removeHtmlChild} from '../Utils.js';

export const DEFAULT_TRANSITION = 'transform 0.4s ease-in-out';

const Direction = {'HORIZONTAL' : 0, 'VERTICAL' : 1};

const CSS_TRANSLATE = 'translate%c(%dpx)';

export class Slider {
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
}
