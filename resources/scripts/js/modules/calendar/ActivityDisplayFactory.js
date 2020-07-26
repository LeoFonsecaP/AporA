import { ActivityDisplay } from './ActivityDisplay.js';

export class ActivityDisplayFactory {
    constructor(displaysCssClass) {
        this.cssClass = displaysCssClass;
    } 

    create(parent, date) {
        return new ActivityDisplay(parent, this.cssClass, date); 
    }
}
