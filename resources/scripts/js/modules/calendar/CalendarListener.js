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
        let currentListener = () => {};

        this.startListening = () => {
            calendarContainer.addEventListener('mousedown', (event) => {
                event.preventDefault();
                performSetupOperation(event);
                startActiveListener();
            });

            calendarContainer.addEventListener('contextmenu', (event) => {
                event.preventDefault();
            })

            let touchActionTimeoutId = null;
            calendarContainer.addEventListener('touchstart', (event) => {
                touchActionTimeoutId = setTimeout(() => {
                    event.preventDefault();
                    performSetupOperation(event);
                    startActiveListener();
                }, 200);
                return false;
            });

            EVENTS_THAT_INTERRUPT_ACTION.forEach((event) => {
                document.body.addEventListener(event, () => {
                    interruptActiveListener();
                    clearTimeout(touchActionTimeoutId);
                });
            });
        }

        let performSetupOperation = (event) => {
            const targetDate = detectEventDate(event);
            const targetClassName = event.target.className;

            if (calendar.hasTimeAvailableAt(targetDate))
                setUpNewActivityAddition(targetDate);
            else if (targetClassName === RESIZE_BORDER_CSS_CLASS)
                setupActivityAllocatedTimeEditing(targetDate);
            else if (targetClassName === DELETE_ICON_CSS_CLASS)
                setupActivityRemoval(targetDate);
            else
                setupActivityDateEditing(targetDate);
        }

        let detectEventDate = (event) => {
            const xCoordinate = getEventXCoordinate(event);
            const YCoordinate = getEventYCoordinate(event);
            const targetedDay = detectEventDay(xCoordinate);
            const targetedHour = detectEventHour(YCoordinate);

            try {
                return new WeekRelativeDate(targetedDay, targetedHour)
            } catch (exception) {
                return null;
            }
        }

        let getEventXCoordinate = (event) => {
            return event.type.includes('mouse') ?
                event.clientX : event.touches[0].clientX;
        }

        let getEventYCoordinate = (event) => {
            return event.type.includes('mouse') ?
                event.clientY : event.touches[0].clientY;
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
            interruptActiveListener()
            calendar.addActivity(targetDate);
            setupActivityAllocatedTimeEditing(targetDate)
        };

        let setupActivityDateEditing = (targetDate) => {
            interruptActiveListener()
            let previousDate = targetDate;
            let currentDate = previousDate;
            currentListener = (event) => {
                event.preventDefault();
                previousDate = currentDate;
                currentDate = detectEventDate(event);
                const displacement = currentDate.getHour() - 
                    previousDate.getHour();
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
                targetDate = newEndDate;
                return false;
            };
        }

        let setupActivityRemoval = (targetDate) => {
            calendar.removeActivityThatContains(targetDate);
            currentListener = () => {};
        }

        let startActiveListener = () => {
            calendarContainer.addEventListener('mousemove', currentListener);
            calendarContainer.addEventListener('touchmove', currentListener);
        }

        let interruptActiveListener = () => {
            calendarContainer.removeEventListener('mousemove', currentListener);
            calendarContainer.removeEventListener('touchmove', currentListener);
        }
    }
}
