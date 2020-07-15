import { RESIZE_BORDER_CSS_CLASS, CLOSE_ICON_CSS_CLASS } from "./ActivityDisplay.js";

const InputMode = {MOUSE : 0, TOUCH : 1};

export class CalendarMouseActionsMenu {
    constructor(calendarContainer, calendar) {
        this.calendarContainer = calendarContainer;
        this.calendar = calendar;
        this.selectedActivity = {};
        this.activeListener = () => {};
    }

    detectEventDay(event) {
        const containerRect = this.calendarContainer.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerX = containerRect.left;
        const eventX = getEventXCoordinate(event);
        const eventRelativeX = (eventX - containerX) / containerWidth;
        return Math.ceil(eventRelativeX * 7) - 1;
    }

    detectEventHour(event) {
        const containerRect = this.calendarContainer.getBoundingClientRect();
        const containerHeight = containerRect.height;
        const containerY = containerRect.top;
        const eventY = getEventYCoordinate(event);
        const eventRelativeY = (eventY - containerY) / containerHeight;
        return Math.ceil(eventRelativeY * 24) - 1;
    }

    detectEventDate(event) {
        const selectedDay = this.detectEventDay(event);
        const selectedHour = this.detectEventHour(event);
        return {'day' : selectedDay, 'hour' : selectedHour};
    }

    resizeActivityAllocatedTime(newEndDate) {
        const activityDate = this.selectedActivity.getDate();
        const newAllocatedTime = newEndDate.hour - activityDate.hour + 1; 
       
        if ((newAllocatedTime < 1) || (activityDate.hour + newAllocatedTime > 24))
            return;

        const canResize = this.calendar.hasTimeAvailableFor(
            activityDate, newAllocatedTime, this.selectedActivity
        );
        if (canResize)
            this.selectedActivity.setAllocatedTime(newAllocatedTime);
    }

    changeActivityStartingDate(currentDateTarget, previousTargetDate) {
        const activityDate = this.selectedActivity.getDate();
        const activityAllocatedTime = this.selectedActivity.getAllocatedTime();
        const datesDistance = currentDateTarget.hour - previousTargetDate.hour;
        const newDate = {
            'day' : activityDate.day, 'hour' : activityDate.hour + datesDistance
        };

        if ((newDate.hour < 0) || (newDate.hour + activityAllocatedTime > 24))
            return;

        const canChangeStartingDate = this.calendar.hasTimeAvailableFor(
            newDate, activityAllocatedTime, this.selectedActivity
        );
        if (canChangeStartingDate)
            this.selectedActivity.setDate(newDate);
    }

    removeAcitivy(targetDate) {
        this.calendar.removeActivityThatContains(targetDate);
    }

    setUpNewActivityAddition(targetDate) {
        this.calendar.addActivity(targetDate);
        this.selectedActivity = this.calendar.getActivityByDate(targetDate);
        this.calendarContainer.removeEventListener('touchmove', this.activeListener);
        this.activeListener = (((event) => {
            event.preventDefault();
            const newEndDate = this.detectEventDate(event);
            this.resizeActivityAllocatedTime(newEndDate);
            return false;
        })).bind(this);
    }  

    setupActivityDateEditing(targetDate) {
        this.selectedActivity = this.calendar.getActivityContaining(targetDate);
        let previousDate = targetDate;
        let currentDate = previousDate;
        this.calendarContainer.removeEventListener('touchmove', this.activeListener);
        this.activeListener = (((event) => {
            event.preventDefault();
            previousDate = currentDate;
            currentDate = this.detectEventDate(event);
            this.changeActivityStartingDate(currentDate, previousDate);
            return false;
        })).bind(this);
    }

    setupActivityAllocatedTimeEditing(targetDate) {
        this.selectedActivity = this.calendar.getActivityContaining(targetDate);
        this.calendarContainer.removeEventListener('touchmove', this.activeListener);
        this.activeListener = (((event) => {
            event.preventDefault();
            const newEndDate = this.detectEventDate(event);
            this.resizeActivityAllocatedTime(newEndDate);
            return false;
        })).bind(this);
    }

    startActiveListener() {
        this.calendarContainer.addEventListener('mousemove', this.activeListener);
        this.calendarContainer.addEventListener('touchmove', this.activeListener);
    }

    interruptActiveListener() {
        this.calendarContainer.removeEventListener('mousemove', this.activeListener);
        this.calendarContainer.removeEventListener('touchmove', this.activeListener);
    }

    startListeningToMouseEvents() {
        this.calendarContainer.addEventListener('mousedown', ((event) => {
            event.preventDefault();
            this.interruptActiveListener();
            const targetDate = this.detectEventDate(event);
            const targetClassName = event.target.className;
            
            if (this.calendar.hasTimeAvailableFor(targetDate, 1))
                this.setUpNewActivityAddition(targetDate);
            else if (targetClassName === RESIZE_BORDER_CSS_CLASS)
                this.setupActivityAllocatedTimeEditing(targetDate);
            else if (targetClassName === CLOSE_ICON_CSS_CLASS)
                this.removeAcitivy(targetDate);
            else 
                this.setupActivityDateEditing(targetDate);
            this.startActiveListener();
        }).bind(this));

        document.body.addEventListener('mouseup', (() => {
            this.interruptActiveListener();
        }).bind(this));

        document.body.addEventListener('mouseleave',(() => {
            this.interruptActiveListener();
        }).bind(this));

        document.body.addEventListener('contextmenu', (() => {
            this.interruptActiveListener();
        }).bind(this));
    }

    startListening() {
        let dateEditingTimeoutId = 0;
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
        }).bind(this));

        document.body.addEventListener('touchend', (() => {
            clearTimeout(dateEditingTimeoutId);
            this.interruptActiveListener();
        }).bind(this));
        document.body.addEventListener('touchcancel', (() => {
            clearTimeout(dateEditingTimeoutId);
            this.interruptActiveListener();
        }).bind(this));

        this.startListeningToMouseEvents();
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