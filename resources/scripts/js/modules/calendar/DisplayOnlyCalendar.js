import { CalendarModel } from './CalendarModel.js';
import { CalendarDisplay } from './CalendarDisplay.js';
import { ActivityDisplayFactory } from './ActivityDisplayFactory.js';
import { ActivityFactory } from './ActivityFactory.js';

export class DisplayOnlyCalendar {
    constructor(container, activityCssClass) {
        this.activityDisplayFactory = new ActivityDisplayFactory(
            activityCssClass
        );
        this.calendarDisplay = new CalendarDisplay(
            container, this.activityDisplayFactory
        );
        this.activityFactory = new ActivityFactory();
        this.calendar = new CalendarModel(this.activityFactory);
    }

    run() {
        this.calendarDisplay.render();
        this.calendar.registerDisplay(this.calendarDisplay);
    }

    addActivity(date, allocatedTime, description) {
        this.calendar.addActivity(date, allocatedTime, description);
    }

    toJson() {
        return this.calendar.toJson();
    }
}
