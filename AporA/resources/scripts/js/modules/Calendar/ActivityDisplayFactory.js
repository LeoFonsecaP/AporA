import { ActivityDisplay } from './ActivityDisplay.js';

export class ActivityDisplayFactory {
    constructor(displaysCssClass) {
        let cssClass = displaysCssClass;

        this.create = (parent, date) => {
            return new ActivityDisplay(parent, cssClass, date); 
        }
    } 
}