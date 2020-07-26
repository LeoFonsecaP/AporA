import { ActivityDisplay } from './ActivityDisplay.js';
import { setStyleAttributes } from '../Utils.js';

export const RESIZE_BORDER_CSS_CLASS = '_resize_border';
export const DELETE_ICON_CSS_CLASS = '_delete_icon';

export class EditableActivityDisplay extends ActivityDisplay {
    constructor(activitiesParent, activityCssClass) {
        super(activitiesParent, activityCssClass);
    }
        
    render(initialStartDate) {
        super.render(initialStartDate);
        let html = this.getHtml();
        html.appendChild(this._createResizeBorderHtml());
        html.appendChild(this._createDeleteIconHtml());
    }

    _createResizeBorderHtml() {
        const resizeBorder = document.createElement('div');
        resizeBorder.className = RESIZE_BORDER_CSS_CLASS;
        setStyleAttributes(resizeBorder, {
            'height': '10px', 'width': '100%', 'bottom': '0',
            'cursor': 'ns-resize', 'position': 'absolute', 
            'background': '#057700'
        });
        return resizeBorder; 
    }

    _createDeleteIconHtml() {
        const deleteIcon = document.createElement('div');
        deleteIcon.className = DELETE_ICON_CSS_CLASS;
        deleteIcon.innerHTML = '&#10005';
        setStyleAttributes(deleteIcon, {
            'height': '20px', 'width': '20px', 'lineHeight': '20px',
            'fontSize': '20px', 'textAlign': 'center', 'top': '7px',
            'right': '7px', 'background': 'transparent',
            'position': 'absolute', 'cursor': 'pointer'
        });
        return deleteIcon; 
    }
}
