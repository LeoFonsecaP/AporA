import { Calendar } from './Calendar.js';
import { CalendarDisplay } from './CalendarDisplay.js';
import { ActivityDisplayFactory } from './ActivityDisplayFactory.js';
import { ActivityFactory } from './ActivityFactory.js';

export class DisplayOnlyCalendar {
    constructor(container, activityCssClass) {
        const activityDisplayFactory = new ActivityDisplayFactory(
            activityCssClass
        );
        const calendarDisplay = new CalendarDisplay(
            container, activityDisplayFactory
        );
        const activityFactory = new ActivityFactory();
        const calendar = new Calendar(activityFactory);

        this.run = () => {
            calendarDisplay.render();
            calendar.registerDisplay(calendarDisplay);
        }

        this.addActivity = (date, allocatedTime, description) => {
            calendar.addActivity(date, allocatedTime, description);
        }

        this.toJson = () => {
            return calendar.toJson();
        }
    }
}
