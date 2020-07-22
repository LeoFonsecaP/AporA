import { HOURS_IN_A_DAY } from "./WeekRelativeDate.js";

const DEFAULT_ALLOCATED_TIME = 1;
const DEFAULT_DESCRIPTION = '';

export class Activity {
    constructor(activityDate, activityKey, activityAllocatedTime=1, activityDescription='') {
        let key = activityKey;
        let date = activityDate;
        let allocatedTime = activityAllocatedTime;
        let description = activityDescription;
        console.log({'date': date, 'allocatedTime': allocatedTime, 'description': description});
        let displays = [];

        this.setDate = (newDate) => {
            date = newDate;
            this.updateDisplays();
        };

        this.setAllocatedTime = (newAllocatedTime) => {
            const endHour = date.getHour() + newAllocatedTime;
            if (endHour < 0 || endHour > HOURS_IN_A_DAY)
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

        this.contains = (dateToVerify) => {
            if (dateToVerify.getWeekDay() !== date.getWeekDay())
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
            const indexOfDipslay = displays.indexOf(display);
            this.displays.splice(indexOfDipslay, 1);
        };

        this.updateDisplays = () => {
            displays.forEach((display) => {
                display.update(date, allocatedTime, description);
            });
        };
    }
}