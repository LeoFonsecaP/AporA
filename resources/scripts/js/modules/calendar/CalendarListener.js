import { RESIZE_BORDER_CSS_CLASS } from "./EditableActivityDisplay.js";
import { DELETE_ICON_CSS_CLASS } from "./EditableActivityDisplay.js";
import { WeekRelativeDate } from "./WeekRelativeDate.js";
import { WEEK_DAYS } from "./WeekRelativeDate.js";
import { HOURS_IN_A_DAY } from "./WeekRelativeDate.js";

const EVENTS_THAT_INTERRUPT_ACTION = [
    'mouseup', 'mouseleave', 'contextmenu', 'touchend', 'touchcancel'
];

export class CalendarListener {
    constructor(calendarContainer, calendar) {
        this.calendarContainer = calendarContainer;
        this.calendar = calendar;
        this.currentListener = () => {};
    }

    startListening() {
        this.calendarContainer.addEventListener('mousedown', (event) => {
            event.preventDefault();
            this._performSetupOperation(event);
            this._startActiveListener();
        });

        this.calendarContainer.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });

        let touchActionTimeoutId = null;
        this.calendarContainer.addEventListener('touchstart', (event) => {
            touchActionTimeoutId = setTimeout(() => {
                event.preventDefault();
                this._performSetupOperation(event);
                this._startActiveListener();
            }, 200);
            return false;
        });

        EVENTS_THAT_INTERRUPT_ACTION.forEach((interruptEvent) => {
            document.body.addEventListener(interruptEvent, () => {
                this._interruptActiveListener();
                clearTimeout(touchActionTimeoutId);
            });
        });
    }

    _performSetupOperation(event) {
        const targetDate = this._detectEventDate(event);
        const targetClassName = event.target.className;

        if (this.calendar.hasTimeAvailableAt(targetDate))
            this._setUpNewActivityAddition(targetDate);
        else if (targetClassName === RESIZE_BORDER_CSS_CLASS)
            this._setupActivityAllocatedTimeEditing(targetDate);
        else if (targetClassName === DELETE_ICON_CSS_CLASS)
            this._setupActivityRemoval(targetDate);
        else
            this._setupActivityDateEditing(targetDate);
    }

    _detectEventDate(event) {
        const xCoordinate = this._getEventXCoordinate(event);
        const YCoordinate = this._getEventYCoordinate(event);
        const targetedDay = this._detectEventDay(xCoordinate);
        const targetedHour = this._detectEventHour(YCoordinate);

        try {
            return new WeekRelativeDate(targetedDay, targetedHour)
        } catch (exception) {
            return null;
        }
    }

    _getEventXCoordinate(event) {
        return event.type.includes('mouse') ?
            event.clientX : event.touches[0].clientX;
    }

    _getEventYCoordinate(event) {
        return event.type.includes('mouse') ?
            event.clientY : event.touches[0].clientY;
    }
    
    _detectEventDay(eventXCoordinate) {
        const viewPort = this.calendarContainer.getBoundingClientRect(); 
        const relativeXCoordinate = (eventXCoordinate - viewPort.left) /
            viewPort.width; 
        return Math.ceil(relativeXCoordinate * WEEK_DAYS.length) - 1;
    }

    _detectEventHour(eventYCoordinate) {
        const viewPort = this.calendarContainer.getBoundingClientRect(); 
        const relativeYCoordinate = (eventYCoordinate - viewPort.top) /
            viewPort.height; 
        return Math.ceil(relativeYCoordinate * HOURS_IN_A_DAY) - 1;
    }
    
    _setUpNewActivityAddition(targetDate) {
        this._interruptActiveListener()
        this.calendar.addActivity(targetDate);
        this._setupActivityAllocatedTimeEditing(targetDate)
    };

    _setupActivityDateEditing(targetDate) {
        this._interruptActiveListener()
        let previousDate = targetDate;
        let currentDate = previousDate;
        this.currentListener = (event) => {
            event.preventDefault();
            previousDate = currentDate;
            currentDate = this._detectEventDate(event);
            const displacement = currentDate.getHour() - 
                previousDate.getHour();

            this.calendar.moveActivityContaining(previousDate, displacement);
            return false;
        };
    }

    _setupActivityAllocatedTimeEditing(targetDate) {
        this._interruptActiveListener()
        this.currentListener = (event) => {
            event.preventDefault();
            const newEndDate = this._detectEventDate(event);
            this.calendar.resizeActivityContaining(targetDate, newEndDate);
            targetDate = newEndDate;
            return false;
        };
    }

    _setupActivityRemoval(targetDate) {
        this.calendar.removeActivityThatContains(targetDate);
        this.currentListener = () => {};
    }

    _startActiveListener() {
        this.calendarContainer.addEventListener('mousemove', this.currentListener);
        this.calendarContainer.addEventListener('touchmove', this.currentListener);
    }

    _interruptActiveListener() {
        this.calendarContainer.removeEventListener('mousemove', this.currentListener);
        this.calendarContainer.removeEventListener('touchmove', this.currentListener);
    }
}
