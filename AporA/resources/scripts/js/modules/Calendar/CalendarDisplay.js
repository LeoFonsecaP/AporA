
const HOURS_IN_A_DAY = 24;

const WEEK_DAYS = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'];

export class CalendarDisplay {
    constructor(htmlContainer, activityDisplaysFactory) {
        this.htmlContainer = htmlContainer;
        this.htmlCalendarTable = {};
        this.activityDisplaysFactory = activityDisplaysFactory;
        this.activityDisplays = {};
    }

    render() {
            let dayLabels = '<div class="DayLabels">'
            WEEK_DAYS.forEach((day) => dayLabels += '<p>' + day + '</p>');
            dayLabels += '</div>';

            let hourLabels = '<div class="HourLabels">'
            for (let i = 0; i < HOURS_IN_A_DAY; i++) {
                hourLabels += '<div><p>' + ('0' + i).slice(-2) + ':00</p></div>';
            }
            hourLabels += '</div>';

            let week = '<div class="Week" id="week">';
            for (let i = 0; i < WEEK_DAYS.length; i++) {
                week += '<div class="DayContainer">' + 
                        '<div class="Hour"></div>'.repeat(24) +
                        '</div>';
            }
            week += '</div>';

            let weekContainer = '<div class="WeekContainer">' +
                                hourLabels + week + '</div>';
            this.htmlContainer.innerHTML = dayLabels + weekContainer;    
            this.htmlCalendarTable = document.getElementById('week');
    }

    getCalendarGrid() {
        if (this.htmlCalendarTable === {}) {
            throw new Error('Calendar has not been rendered yet');
        }
        return this.htmlCalendarTable;
    }

    updateOnAdd(newActivity) {
        const date = newActivity.getDate();
        const key = newActivity.getKey()
        const activityDisplay = this.activityDisplaysFactory.create(
            this.htmlCalendarTable, date
        );
        this.activityDisplays[key] = activityDisplay;
        newActivity.registerDisplay(activityDisplay);
    }

    updateOnRemove(newActivityId) {
        this.activityDisplays[newActivityId].destroy();
    }
}