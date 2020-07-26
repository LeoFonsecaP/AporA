import { CalendarModel } from './CalendarModel.js';
import { CalendarDisplay } from './CalendarDisplay.js';
import { EditableActivityDisplayFactory } from './EditableActivityDisplayFactory.js';
import { ActivityFactory } from './ActivityFactory.js';
import { CalendarListener } from './CalendarListener.js';

export class UserEditableCalendar {
    constructor(container, activityCssClass) {
        this.activityDisplayFactory = new EditableActivityDisplayFactory(
            activityCssClass
        );
        this.calendarDisplay = new CalendarDisplay(
            container, this.activityDisplayFactory
        );
        this.activityFactory = new ActivityFactory();
        this.calendar = new CalendarModel(this.activityFactory);
        this.calendarMenu = {};
    }
    run() {
        this.calendarDisplay.render();
        this.calendar.registerDisplay(this.calendarDisplay);
        this.calendarMenu = new CalendarListener(
            this.calendarDisplay.getCalendarGrid(), this.calendar
        );
            this.calendarMenu.startListening();
        }

    toJson() {
        return this.calendar.toJson();
    }
}
