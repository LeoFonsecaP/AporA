import { EditableActivityDisplay } from './EditableActivityDisplay.js';
import { ActivityDisplayFactory } from './ActivityDisplayFactory.js';

export class EditableActivityDisplayFactory {
    constructor(displaysCssClass) {
        let cssClass = displaysCssClass;
        
        this.create = (parent, date) => {
            return new EditableActivityDisplay(parent, cssClass, date); 
        }
    } 
}
