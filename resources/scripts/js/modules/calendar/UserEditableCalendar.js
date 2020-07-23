import { Calendar } from './Calendar.js';
import { CalendarDisplay } from './CalendarDisplay.js';
import { EditableActivityDisplayFactory } from './EditableActivityDisplayFactory.js';
import { ActivityFactory } from './ActivityFactory.js';
import { CalendarListener } from './CalendarListener.js';

export class UserEditableCalendar {
    constructor(container, activityCssClass) {
        const activityDisplayFactory = new EditableActivityDisplayFactory(
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
            const calendarMenu = new CalendarListener(
                calendarDisplay.getCalendarGrid(), calendar
            );
            calendarMenu.startListening();
        }

        this.toJson = () => {
            return calendar.toJson();
        }
    }
}
