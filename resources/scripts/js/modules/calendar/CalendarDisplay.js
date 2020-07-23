import { WEEK_DAYS } from './WeekRelativeDate.js'

const HOURS_IN_A_DAY = 24;

export class CalendarDisplay {
    constructor(htmlContainer, activityDisplaysFactory) {
        let htmlGrid = {};
        let activityDisplays = {};
        let weekContainer = {};

        this.render = () => {
            /* Elements must be rendered in this exact sequence */
            renderDayLabels();
            renderWeekContainer();
            renderHtmlHourLabels();
            renderHtmlCalendarGrid();
            scrollToMiddle();
        }

        let renderDayLabels = () => {
            let dayLabels = document.createElement('div');
            dayLabels.className = 'day_labels';

            WEEK_DAYS.forEach(day => {
                const label = document.createElement('p');
                label.innerHTML = day;
                dayLabels.appendChild(label);
            });

            htmlContainer.appendChild(dayLabels);
        }

        let renderWeekContainer = () => {
            weekContainer = document.createElement('div');
            weekContainer.className = 'week_container';
            htmlContainer.appendChild(weekContainer);
        }

        let renderHtmlHourLabels = () => {
            let hourLabels = document.createElement('div')
            hourLabels.className = 'hour_labels';

            for (let i = 0; i < HOURS_IN_A_DAY; i++) {
                const label = document.createElement('div');
                const hour = document.createElement('p');

                hour.innerHTML = `${('0' + i).slice(-2)}:00`;
                label.appendChild(hour);
                hourLabels.appendChild(label);
            } 
            weekContainer.appendChild(hourLabels);
        }

        let renderHtmlCalendarGrid = () => {
            htmlGrid = document.createElement('div');
            htmlGrid.className = 'week';

            for (let i = 0; i < WEEK_DAYS.length; i++) {
                const column = document.createElement('div');
                column.className = "day_container";
                for (let j = 0; j < HOURS_IN_A_DAY; j++) {
                    const row = document.createElement('div');
                    row.className = "hour";
                    column.appendChild(row);
                }
                htmlGrid.appendChild(column);
            }
            weekContainer.appendChild(htmlGrid);
        }

        let scrollToMiddle = () => {
            const containersParent = htmlContainer.parentNode;
            containersParent.scrollTop = containersParent.scrollHeight / 3;
        }

        this.getCalendarGrid = () => {
            if (htmlGrid === {})
                throw new Error('Calendar has not been rendered yet');
            return htmlGrid;
        }

        this.updateOnAdd = (newActivity) => {
            const activityDisplay = activityDisplaysFactory.create(htmlGrid);
            const date = newActivity.getDate();
            const description = newActivity.getDescription();
            const allocatedTime = newActivity.getAllocatedTime();

            activityDisplay.render(date, allocatedTime, description);
            activityDisplays[newActivity.getKey()] = activityDisplay;
            newActivity.registerDisplay(activityDisplay);
        }

        this.updateOnRemove = (newActivityId) => {
            activityDisplays[newActivityId].destroy();
        }
    }
}
