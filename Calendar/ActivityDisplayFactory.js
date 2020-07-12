import { ActivityDisplay } from './ActivityDisplay.js';

export class ActivityDisplayFactory {
    constructor(cssClass) {
        this.cssClass = cssClass;
    } 
    
    create(parent, date) {
        return new ActivityDisplay(parent, this.cssClass, date); 
    }
}