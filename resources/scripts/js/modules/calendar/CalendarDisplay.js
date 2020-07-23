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
            weekContainer.scrollTop = weekContainer.scrollHeight / 3;
        }

        let renderDayLabels = () => {
            let dayLabels = document.createElement('div');
            dayLabels.className = 'DayLabels';

            WEEK_DAYS.forEach(day => {
                const label = document.createElement('p');
                label.innerHTML = day;
                dayLabels.appendChild(label);
            });

            htmlContainer.appendChild(dayLabels);
        }

        let renderWeekContainer = () => {
            weekContainer = document.createElement('div');
            weekContainer.className = 'WeekContainer';
            htmlContainer.appendChild(weekContainer);
        }

        let renderHtmlHourLabels = () => {
            let hourLabels = document.createElement('div')
            hourLabels.className = 'HourLabels';

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
            htmlGrid.className = 'Week';

            for (let i = 0; i < WEEK_DAYS.length; i++) {
                const column = document.createElement('div');
                column.className = "DayContainer";
                for (let j = 0; j < HOURS_IN_A_DAY; j++) {
                    const row = document.createElement('div');
                    row.className = "Hour";
                    column.appendChild(row);
                }
                htmlGrid.appendChild(column);
            }
            weekContainer.appendChild(htmlGrid);
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
