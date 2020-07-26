import { WEEK_DAYS } from './WeekRelativeDate.js'

const HOURS_IN_A_DAY = 24;

const DAY_LABELS_CSS_CLASS = 'day_labels';
const WEEK_CONTAINER_CSS_CLASS = 'week_container';
const HOUR_LABELS_CSS_CLASS = 'hour_labels';
const DAY_CONTAINER_CSS_CLASS = 'day_container';
const HOUR_CSS_CLASS = 'hour';


export class CalendarDisplay {
    constructor(htmlContainer, activityDisplaysFactory) {
        this.htmlContainer = htmlContainer;
        this.activityDisplaysFactory = activityDisplaysFactory;
        this.htmlGrid = {};
        this.activityDisplays = {};
        this.weekContainer = {};
    }

    render() {
        /* Elements must be rendered in this exact sequence */
        this._renderHtmlDayLabels();
        this._renderHtmlWeekContainer();
        this._renderHtmlHourLabels();
        this._renderHtmlCalendarGrid();
        this._scrollToMiddle();
    }

    _renderHtmlDayLabels() {
        const dayLabels = document.createElement('div');
        dayLabels.className = DAY_LABELS_CSS_CLASS;

        WEEK_DAYS.forEach(day => {
            const label = document.createElement('p');
            label.innerHTML = day;
            dayLabels.appendChild(label);
        });

        this.htmlContainer.appendChild(dayLabels);
    }

    _renderHtmlWeekContainer() {
        this.weekContainer = document.createElement('div');
        this.weekContainer.className = WEEK_CONTAINER_CSS_CLASS;
        this.htmlContainer.appendChild(this.weekContainer);
    }

    _renderHtmlHourLabels() {
        const hourLabels = document.createElement('div')
        hourLabels.className = HOUR_LABELS_CSS_CLASS;

        for (let i = 0; i < HOURS_IN_A_DAY; i++) {
            const label = document.createElement('div');
            const hour = document.createElement('p');

            hour.innerHTML = `${('0' + i).slice(-2)}:00`;
            label.appendChild(hour);
            hourLabels.appendChild(label);
        } 
        this.weekContainer.appendChild(hourLabels);
    }

    _renderHtmlCalendarGrid() {
        this.htmlGrid = document.createElement('div');
        this.htmlGrid.className = 'week';

        for (let i = 0; i < WEEK_DAYS.length; i++) {
            const column = document.createElement('div');
            column.className = DAY_CONTAINER_CSS_CLASS;
            for (let j = 0; j < HOURS_IN_A_DAY; j++) {
                const row = document.createElement('div');
                row.className = HOUR_CSS_CLASS;
                column.appendChild(row);
            }
            this.htmlGrid.appendChild(column);
        }
        this.weekContainer.appendChild(this.htmlGrid);
    }

    _scrollToMiddle() {
        const containersParent = this.htmlContainer.parentNode;
        containersParent.scrollTop = containersParent.scrollHeight / 3;
    }

    getCalendarGrid() {
        if (this.htmlGrid === {})
            throw new Error('Calendar has not been rendered yet');
        return this.htmlGrid;
    }

    updateOnAdd(newActivity) {
        const activityDisplay = this.activityDisplaysFactory.create(this.htmlGrid);
        const date = newActivity.getDate();
        const description = newActivity.getDescription();
        const allocatedTime = newActivity.getAllocatedTime();

        activityDisplay.render(date, allocatedTime, description);
        this.activityDisplays[newActivity.getKey()] = activityDisplay;
        newActivity.registerDisplay(activityDisplay);
    }

    updateOnRemove(newActivityId) {
        this.activityDisplays[newActivityId].destroy();
    }
}
