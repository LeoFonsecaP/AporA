import { HOURS_IN_A_DAY } from "./WeekRelativeDate.js";
import { WEEK_DAYS } from "./WeekRelativeDate.js";
import { percentage } from "../Utils.js";

export class ActivityDisplay {
    constructor(parent, cssClass) {
        let html = {};
        let description = {};

        this.render = (startDate, allocatedTime=1, textDescription='') => {
            html = createHtmlElement();
            description = document.createElement('p');
            html.appendChild(description);

            updateDate(startDate);
            updateAllocatedTime(allocatedTime);
            updateActivityDescription(textDescription);
          
            parent.appendChild(html);
        }

        let createHtmlElement = () => {
            html = document.createElement('div');
            html.className = cssClass;
            html.style.position = 'absolute';
            return html;
        }

        this.update = (newDate, newAllocatedTime, newDescription) => {
            updateDate(newDate);
            updateAllocatedTime(newAllocatedTime);
            updateActivityDescription(newDescription);
        }
    
        let updateDate = (newDate) => {
            const weekDay = newDate.getDay();
            const hour = newDate.getHour();

            html.style.left = percentage(weekDay, WEEK_DAYS.length);
            html.style.top = percentage(hour, HOURS_IN_A_DAY);
        }

        let updateAllocatedTime = (newAllocatedTime) => {
            html.style.height = percentage(newAllocatedTime, HOURS_IN_A_DAY);
        }

        let updateActivityDescription = (newDescription) => {
            description.textContent = newDescription;
        }
    

        this.destroy = () => {
            html.parentNode.removeChild(html);
        }

        this.getHtml = () => {
            return html;
        }
    }
}
