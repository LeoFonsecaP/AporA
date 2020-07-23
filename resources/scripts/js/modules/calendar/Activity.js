import { WeekRelativeDate } from "./WeekRelativeDate.js";
import { HOURS_IN_A_DAY } from "./WeekRelativeDate.js";

const DEFAULT_ALLOCATED_TIME = 1;
const DEFAULT_DESCRIPTION = '';

export class Activity {
    constructor(date, key, allocatedTime=1, description='') {
        let displays = [];

        this.contains = (dateToVerify) => {
            if (dateToVerify.getDay() !== date.getDay())
                return false;
            const timeDistance = dateToVerify.getHour() - date.getHour();
            return (timeDistance >= 0) && (timeDistance < allocatedTime);
        };

        this.isDisjointTo = (activity) => {
            return !(this.contains(activity.getDate()) ||
                activity.contains(date));
        };

        this.registerDisplay = (display) => {
            displays.push(display);
            display.update(date, allocatedTime, description);
        };

        this.unregisterDisplay = (display) => {
            const index = displays.indexOf(display);
            this.displays.splice(index, 1);
        };

        this.updateDisplays = () => {
            displays.forEach((display) => {
                display.update(date, allocatedTime, description);
            });
        };

        this.setDate = (newDate) => {
            date = newDate;
            this.updateDisplays();
        };

        this.setAllocatedTime = (newAllocatedTime) => {
            const endHour = date.getHour() + newAllocatedTime;
            const isValid = WeekRelativeDate.hourIsValid(endHour) &&
                newAllocatedTime >= 1;

            if (!isValid)
                throw new Error('Invalid allocated time for activity');

            allocatedTime = newAllocatedTime;
            this.updateDisplays();
        };

        this.setDescription = (newDescription) => {
            description = newDescription; 
            this.updateDisplays();
        };

        this.getDate = () => {return date};

        this.getKey = () => {return key};

        this.getAllocatedTime = () => {return allocatedTime};

        this.getDescription = () => {return description};

    }
}
