import { ActivityDisplay } from './ActivityDisplay.js';

export const RESIZE_BORDER_CSS_CLASS = '_ResizeBorder';
export const CLOSE_ICON_CSS_CLASS = '_CloseIcon';

export class EditableActivityDisplay extends ActivityDisplay {
    constructor(activitiesParent, activityCssClass) {
        super(activitiesParent, activityCssClass);
        let superRenderMethod = this.render;
        
        this.render = (initialStartDate) => {
            superRenderMethod(initialStartDate);
            let html = this.getHtml();
            html.innerHTML += createResizeBorderHtml();
            html.innerHTML += createDeleteIconHtml();
        }

        let createResizeBorderHtml = () => {
            return `<div class="${RESIZE_BORDER_CSS_CLASS}" `+
                'style="height: 10px; width: 100%; bottom: 0; ' +
                'cursor: ns-resize; position: absolute; background: #057700">' +
                '</div>';
        }

        let createDeleteIconHtml = () => {
            return `<div class="${CLOSE_ICON_CSS_CLASS}" style="height: 20px;` +
                'width: 20px; line-height: 20px; font-size: 20px; ' +
                'text-align: center; cursor: pointer; position: absolute; ' + 
                'top: 7px; right: 7px; background: transparent">&#10005</div>';
        }
    }
}