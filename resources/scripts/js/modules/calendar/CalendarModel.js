import { HOURS_IN_A_DAY } from "./WeekRelativeDate.js";
import { WeekRelativeDate } from "./WeekRelativeDate.js";

export const ACTIVITY_NOT_FOUND = {};

export class CalendarModel {
    constructor(activityFactory) {
        this.activityFactory = activityFactory;
        this.activities = [];
        this.displays = [];
    }

    addActivity(date, allocatedTime=1, description='') {
        const newActivity = this.activityFactory.create(
            date, allocatedTime, description
        );
        this.activities.push(newActivity);
        this.displays.forEach(display => display.updateOnAdd(newActivity));
    }
    
    removeActivityThatContains(date) {
        const activity = this.getActivityContaining(date);
        if(activity === ACTIVITY_NOT_FOUND)
            return;
        const indexOfActivity = this.activities.indexOf(activity);
        this.displays.forEach(display => {
            display.updateOnRemove(activity.getKey());
        });
        this.activities.splice(indexOfActivity, 1);
    }
   
    getActivityContaining(date) {
        for (let i = 0; i < this.activities.length; i++) {
            if (this.activities[i].contains(date))
                return this.activities[i];
        }
        return ACTIVITY_NOT_FOUND;
    }

    hasTimeAvailableAt(date) {
        return (this.getActivityContaining(date) === ACTIVITY_NOT_FOUND);
    }

    resizeActivityContaining(targetedDate, newEndDate) {
        const activity = this.getActivityContaining(targetedDate);
        if (activity === ACTIVITY_NOT_FOUND)
            return;
        const activityDate = activity.getDate();

        if (activityDate.getDay() !== newEndDate.getDay())
            return;

        const newAllocatedTime = newEndDate.getHour() - 
            activityDate.getHour() + 1; 
        const canResize = this._hasTimeAvailableFor(
            activityDate, newAllocatedTime, activity
        );
            
        if (!canResize)
            return;
        try {
            activity.setAllocatedTime(newAllocatedTime);
        } catch(exception) {
            return;
        }
    }

        
    moveActivityContaining(targetedDate, displacement) {
        const activity = this.getActivityContaining(targetedDate);
        if (activity === ACTIVITY_NOT_FOUND)
            return;
        const activityDate = activity.getDate();
        const activityDay = activityDate.getDay();

        const newDateHour = activityDate.getHour() + displacement;
        let newDate = null;
        try{
            newDate = new WeekRelativeDate(activityDay, newDateHour);
        } catch (exception) {
            return;
        }

        const canMove = this._hasTimeAvailableFor(
            newDate, activity.getAllocatedTime(), activity
        );

        if (canMove)
            activity.setDate(newDate);
    }

    _hasTimeAvailableFor(date, allocatedTime, activityToIgnore) {
        const buffer = this.activityFactory.create(date);
        try {
            buffer.setAllocatedTime(allocatedTime);
        } catch(exception) {
            return false;
        }

        for (let i = 0; i < this.activities.length; i++) {
            let shouldIgnore = (this.activities[i] === activityToIgnore)
            if (!shouldIgnore && !buffer.isDisjointTo(this.activities[i]))
                return false;
        }
        return true;
    }

    registerDisplay(display) {
        this.displays.push(display);
    }

    unregisterDisplay(display) {
        const indexOfDipslay = displays.indexOf(display);
        this.displays.splice(indexOfDipslay, 1);
    };

    updateDisplays() {
        this.displays.forEach((display) => {
            display.update(this.date, this.allocatedTime, this.description);
        });
    };

    toJson() {
        return JSON.stringify(this.activities.map((activity) => {
            return {
                'weekDay' : activity.getDate().getDay(),
                'startHour' : activity.getDate().getHour(),
                'allocatedTime': activity.getAllocatedTime()
            };
        }));
    }
}
