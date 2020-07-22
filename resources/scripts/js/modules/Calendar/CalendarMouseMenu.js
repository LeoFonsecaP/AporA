import { RESIZE_BORDER_CSS_CLASS, CLOSE_ICON_CSS_CLASS } from "./EditableActivityDisplay.js";
import { WeekRelativeDate, WEEK_DAYS, HOURS_IN_A_DAY } from "./WeekRelativeDate.js";

const EVENTS_THAT_INTERRUPT_ACTION = [
    'mouseup', 'mouseleave', 'contextmenu', 'touchend', 'touchcancel'
];

export class CalendarMouseActionsMenu {
    constructor(_calendarContainer, _calendar) {
        let calendarContainer = _calendarContainer;
        let calendar = _calendar;
        let currentListener = () => {};

        let detectEventDate = (event) => {
            const xCoordinate = getEventXCoordinate(event);
            const YCoordinate = getEventYCoordinate(event);
            const targetedDay = detectEventDay(xCoordinate);
            const targetedHour = detectEventHour(YCoordinate);
            return new WeekRelativeDate(WEEK_DAYS[targetedDay], targetedHour);
        }
    
        let detectEventDay = (eventXCoordinate) => {
            const viewPort = calendarContainer.getBoundingClientRect(); 
            const relativeXCoordinate = (eventXCoordinate - viewPort.left) /
                viewPort.width; 
            return Math.ceil(relativeXCoordinate * WEEK_DAYS.length) - 1;
        };

        let detectEventHour = (eventYCoordinate) => {
            const viewPort = calendarContainer.getBoundingClientRect(); 
            const relativeYCoordinate = (eventYCoordinate - viewPort.top) /
                viewPort.height; 
            return Math.ceil(relativeYCoordinate * HOURS_IN_A_DAY) - 1;
        };
    
        let setUpNewActivityAddition = (targetDate) => {
            calendar.addActivity(targetDate);
            interruptActiveListener()
            setupActivityAllocatedTimeEditing(targetDate)
        };

        let setupActivityDateEditing = (targetDate) => {
            let previousDate = targetDate;
            let currentDate = previousDate;
            interruptActiveListener()
            currentListener = (event) => {
                event.preventDefault();
                previousDate = currentDate;
                currentDate = detectEventDate(event);

                if (currentDate.getWeekDay() !== previousDate.getWeekDay())
                    return false;
                const displacement = currentDate.getHour() - previousDate.getHour();
                calendar.moveActivityContaining(previousDate, displacement);
                return false;
            };
        }

        let setupActivityAllocatedTimeEditing = (targetDate) => {
            interruptActiveListener()
            currentListener = (event) => {
                event.preventDefault();
                const newEndDate = detectEventDate(event);
                calendar.resizeActivityContaining(targetDate, newEndDate);
                return false;
            };
        }

        let startActiveListener = () => {
            calendarContainer.addEventListener('mousemove', currentListener);
            calendarContainer.addEventListener('touchmove', currentListener);
        }

        let interruptActiveListener = () => {
            calendarContainer.removeEventListener('mousemove', currentListener);
            calendarContainer.removeEventListener('touchmove', currentListener);
        }

        this.startListening = () => {
            calendarContainer.addEventListener('mousedown', (event) => {
                event.preventDefault();
                const targetDate = detectEventDate(event);
                const targetClassName = event.target.className;

                try {
                    if (calendar.hasTimeAvailableAt(targetDate))
                        setUpNewActivityAddition(targetDate);
                    else if (targetClassName === RESIZE_BORDER_CSS_CLASS)
                        setupActivityAllocatedTimeEditing(targetDate);
                    else if (targetClassName === CLOSE_ICON_CSS_CLASS)
                        calendar.removeActivityThatContains(targetDate);
                    else  
                        setupActivityDateEditing(targetDate);
                } catch(exception) {
                    return;
                }
                startActiveListener();
            });
        
            /*let dateEditingTimeoutId = 0;
                this.calendarContainer.addEventListener('touchstart', ((event) => {
                const targetDate = this.detectEventDate(event);
                const targetClassName = event.target.className;
                this.interruptActiveListener();
            if (this.calendar.hasTimeAvailableFor(targetDate, 1))
                return;
            else if (targetClassName === CLOSE_ICON_CSS_CLASS) 
                return; 
            if (targetClassName === RESIZE_BORDER_CSS_CLASS) {
                this.setupActivityAllocatedTimeEditing(targetDate);
                this.startActiveListener();
            }
            else {
                dateEditingTimeoutId = setTimeout((() => {
                    this.setupActivityDateEditing(targetDate);
                    this.startActiveListener();
                }).bind(this), 400);
            }
        }).bind(this));*/

            EVENTS_THAT_INTERRUPT_ACTION.forEach((event) => {
                document.body.addEventListener(event, interruptActiveListener);
            });
        }
    }
}

function getEventXCoordinate(event) {
    return event.type.includes('mouse') ?
           event.clientX : event.touches[0].clientX;
}

function getEventYCoordinate(event) {
    return event.type.includes('mouse') ?
           event.clientY : event.touches[0].clientY;
}