import { WeekRelativeDate } from "./WeekRelativeDate.js";
import { HOURS_IN_A_DAY } from "./WeekRelativeDate.js";

const DEFAULT_ALLOCATED_TIME = 1;
const DEFAULT_DESCRIPTION = '';

export class Activity {
    constructor(date, key, allocatedTime=1, description='') {
        this.date = date;
        this.key = key;
        this.allocatedTime = allocatedTime;
        this.description = description;
        this.displays = [];
    }
    
    contains(dateToVerify) {
        if (dateToVerify.getDay() !== this.date.getDay())
            return false;
        const timeDistance = dateToVerify.getHour() - this.date.getHour();
        return (timeDistance >= 0) && (timeDistance < this.allocatedTime);
    }

    isDisjointTo(activity) {
        return !(this.contains(activity.getDate()) ||
            activity.contains(this.date));
    }

    registerDisplay(newDisplay) {
        this.displays.push(newDisplay);
        newDisplay.update(this.date, this.allocatedTime, this.description);
    }

    unregisterDisplay(display) {
        const index = this.displays.indexOf(display);
        this.displays.splice(index, 1);
    }

    updateDisplays() {
        this.displays.forEach((display) => {
            display.update(this.date, this.allocatedTime, this.description);
        });
    }

    setDate(newDate) {
        this.date = newDate;
        this.updateDisplays();
    }

    setAllocatedTime(newAllocatedTime) {
        const endHour = this.date.getHour() + newAllocatedTime;
        const isValid = WeekRelativeDate.hourIsValid(endHour) &&
            newAllocatedTime >= 1;

        if (!isValid)
            throw new Error('Invalid allocated time for activity');

        this.allocatedTime = newAllocatedTime;
        this.updateDisplays();
    }

    setDescription(newDescription) {
        this.description = newDescription; 
        this.updateDisplays();
    }

    getDate() {
        return this.date
    }

    getKey() {
        return this.key
    }

    getAllocatedTime() {
        return this.allocatedTime
    }

    getDescription() {
        return this.description
    }
}
