import { WEEK_DAYS, HOURS_IN_A_DAY } from "./WeekRelativeDate.js";

const INITIAL_ALLOCATED_TIME = 1;
const INITIAL_ACTIVITY_DESCRIPTION = '';

export class ActivityDisplay {
    constructor(activitiesParent, activityCssClass) {
        let html = {};
        let cssClass = activityCssClass;
        let parent = activitiesParent;
        let description = {};

        this.render = (initialStartDate, allocatedTime=1, textDescription='') => {
            html = document.createElement('div');
            html.className = cssClass;
            html.style.position = 'absolute';
            
            description = document.createElement('p');
            html.appendChild(description);
    
            updateStartDate(initialStartDate);
            updateAllocatedTime(allocatedTime);
            updateActivityDescription(textDescription);
           
            parent.appendChild(html);
        }
    
        let updateStartDate = (newStartDate) => {
            let weekDayAsInt = WEEK_DAYS.indexOf(newStartDate.getWeekDay());
            html.style.left = toPercentage(weekDayAsInt, WEEK_DAYS.length);
            html.style.top = toPercentage(newStartDate.getHour(), HOURS_IN_A_DAY);
        }

        let updateAllocatedTime = (newAllocatedTime) => {
            html.style.height = toPercentage(newAllocatedTime, HOURS_IN_A_DAY);
        }

        let updateActivityDescription = (newDescription) => {
            description.textContent = newDescription;
        }
    
        this.update = (newStartDate, newAllocatedTime, newDescription) => {
            updateStartDate(newStartDate);
            updateAllocatedTime(newAllocatedTime);
            updateActivityDescription(newDescription);
        }

        this.destroy = () => {
            html.parentNode.removeChild(html);
        }

        this.getHtml = () => {
            return html;
        }
    }
}

function toPercentage(numberOfOccurrences, sampleSpaceSize) {
    return ((numberOfOccurrences / sampleSpaceSize) * 100) + '%';
}