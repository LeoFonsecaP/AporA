import { HOURS_IN_A_DAY } from "./WeekRelativeDate.js";
import { WEEK_DAYS } from "./WeekRelativeDate.js";
import { percentage } from "../Utils.js";

export class ActivityDisplay {
    constructor(parent, cssClass) {
        this.parent = parent;
        this.cssClass = cssClass;
        this.html = {};
        this.description = {};
    }

    render(startDate, allocatedTime=1, description='') {
        this.html = this._createHtmlElement();
        this.description = document.createElement('p');
        this.html.appendChild(this.description);

        this.updateDate(startDate);
        this.updateAllocatedTime(allocatedTime);
        this.updateActivityDescription(description);
          
        this.parent.appendChild(this.html);
    }

    _createHtmlElement() {
        const html = document.createElement('div');
        html.className = this.cssClass;
        html.style.position = 'absolute';
        return html;
    }

    update(newDate, newAllocatedTime, newDescription) {
        this.updateDate(newDate);
        this.updateAllocatedTime(newAllocatedTime);
        this.updateActivityDescription(newDescription);
    }
    
    updateDate(newDate) {
        const weekDay = newDate.getDay();
        const hour = newDate.getHour();

        this.html.style.left = percentage(weekDay, WEEK_DAYS.length);
        this.html.style.top = percentage(hour, HOURS_IN_A_DAY);
    }

    updateAllocatedTime(newAllocatedTime) {
        this.html.style.height = percentage(newAllocatedTime, HOURS_IN_A_DAY);
    }

    updateActivityDescription(newDescription) {
        this.description.textContent = newDescription;
    }
    
    destroy() {
        this.html.parentNode.removeChild(this.html);
    }

    getHtml() {
        return this.html;
    }
}
