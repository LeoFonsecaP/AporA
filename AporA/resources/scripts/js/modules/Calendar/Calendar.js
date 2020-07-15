export const Day = {
    INVALID: -1, SUN : 0, MON : 1, TUE : 2, WED : 3, THU : 4, FRI : 5, SAT : 6
};

export const INVALID_HOUR = -1;

export const ACTIVITY_NOT_FOUND = {};

export class Calendar {
    constructor(activityFactory) {
        this.activityFactory = activityFactory;
        this.activities = [];
        this.displays = [];
    }

    addActivity(date) {
        const newActivity = this.activityFactory.create(date);
        this.activities.push(newActivity);
        this.displays.forEach(display => {
            display.updateOnAdd(newActivity);
        });
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

    getActivityByDate(date) {
        for (let i = 0; i < this.activities.length; i++) {
            if (this.activities[i].getDate() === date)
                return this.activities[i];
        }
        return ACTIVITY_NOT_FOUND;
    }

    hasTimeAvailableFor(date, allocatedTime, activityToIgnore = {}) {
        const activity = this.activityFactory.create(date);
        activity.setAllocatedTime(allocatedTime);

        for (let i = 0; i < this.activities.length; i++) {
            let shouldIgnore = (this.activities[i] === activityToIgnore)
            if (!shouldIgnore && !this.activities[i].isDisjointTo(activity))
                return false;
        }
        return true;
    }

    hasTimeAvailableAt(date) {
        return (this.getActivityThatContains(date) === ACTIVITY_NOT_FOUND);
    }

    registerDisplay(display) {
        this.displays.push(display);
    }

    unregisterDisplay(display) {
        const indexOfDipslay = this.displays.indexOf(display);
        this.displays.splice(indexOfDipslay, 1);
    }

    updateDisplays() {
        this.displays.forEach((display) => {
            display.update(this.date, this.allocatedTime, this.description);
        });
    }
}