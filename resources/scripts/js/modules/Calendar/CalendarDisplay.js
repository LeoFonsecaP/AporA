import { WEEK_DAYS } from './WeekRelativeDate.js'

const HOURS_IN_A_DAY = 24;

export class CalendarDisplay {
    constructor(calendarsHtmlContainer, calendarActivityDisplaysFactory) {
        let htmlContainer = calendarsHtmlContainer;
        let htmlCalendarGrid = {};
        let activityDisplaysFactory = calendarActivityDisplaysFactory;
        let activityDisplays = {};

        this.render = () => {
            const dayLabels = createDayLabels();
            htmlCalendarGrid = createHtmlCalendarGrid();
            const hourLabels = createHtmlHourLabels();
            const weekContainer = createWeekContainer();
            weekContainer.appendChild(hourLabels);
            weekContainer.appendChild(htmlCalendarGrid);
            htmlContainer.appendChild(dayLabels);
            htmlContainer.appendChild(weekContainer);
        }

        let createDayLabels = () => {
            let dayLabels = document.createElement('div');
            dayLabels.className = 'DayLabels';
            WEEK_DAYS.forEach(day => dayLabels.innerHTML += '<p>' + day + '</p>');
            return dayLabels;
        }

        let createHtmlHourLabels = () => {
            let hourLabels = document.createElement('div')
            hourLabels.className = 'HourLabels';
            for (let i = 0; i < HOURS_IN_A_DAY; i++) {
                hourLabels.innerHTML += '<div><p>' + ('0' + i).slice(-2) +
                    ':00</p></div>';
            }
            return hourLabels;
        }

        let createHtmlCalendarGrid = () => {
            let calendarGrid = document.createElement('div');
            calendarGrid.className = 'Week';
            for (let i = 0; i < WEEK_DAYS.length; i++) {
                calendarGrid.innerHTML += '<div class="DayContainer">' + 
                    '<div class="Hour"></div>'.repeat(24) + '</div>';
            }
            return calendarGrid;
        }

        let createWeekContainer = () => {
            let weekContainer = document.createElement('div');
            weekContainer.className = 'WeekContainer';
            return weekContainer;
        }

        this.getCalendarGrid = () => {
            if (htmlCalendarGrid === {}) {
                throw new Error('Calendar has not been rendered yet');
            }
            return htmlCalendarGrid;
        }

        this.updateOnAdd = (newActivity) => {
            const date = newActivity.getDate();
            const key = newActivity.getKey()
            const description = newActivity.getDescription();
            const allocatedTime = newActivity.getAllocatedTime();
            const activityDisplay = activityDisplaysFactory.create(htmlCalendarGrid);
            activityDisplay.render(date, allocatedTime, description);
            activityDisplays[key] = activityDisplay;
            newActivity.registerDisplay(activityDisplay);
        }

        this.updateOnRemove = (newActivityId) => {
            activityDisplays[newActivityId].destroy();
        }
    }
}