import { HOURS_IN_A_DAY } from "./WeekRelativeDate.js";
import { WeekRelativeDate } from "./WeekRelativeDate.js";

export const ACTIVITY_NOT_FOUND = {};

export class Calendar {
    constructor(activityFactory) {
        let activities = [];
        let displays = [];

        this.addActivity = (date, allocatedTime=1, description='') => {
            const newActivity = activityFactory.create(
                date, allocatedTime, description
            );
            activities.push(newActivity);
            displays.forEach(display => display.updateOnAdd(newActivity));
        };
    
        this.removeActivityThatContains = (date) => {
            const activity = this.getActivityContaining(date);
            if(activity === ACTIVITY_NOT_FOUND)
                return;
            const indexOfActivity = activities.indexOf(activity);
            displays.forEach(display => {
                display.updateOnRemove(activity.getKey());
            });
            activities.splice(indexOfActivity, 1);
        };
   
        this.getActivityContaining = (date) => {
            for (let i = 0; i < activities.length; i++) {
                if (activities[i].contains(date))
                    return activities[i];
            }
            return ACTIVITY_NOT_FOUND;
        };

        this.hasTimeAvailableAt = (date) => {
            return (this.getActivityContaining(date) === ACTIVITY_NOT_FOUND);
        }

        this.resizeActivityContaining = (targetedDate, newEndDate) => {
            const activity = this.getActivityContaining(targetedDate);
            if (activity === ACTIVITY_NOT_FOUND)
                return;
            const activityDate = activity.getDate();

            if (activityDate.getDay() !== newEndDate.getDay())
                return;

            const newAllocatedTime = newEndDate.getHour() - 
                activityDate.getHour() + 1; 
            const canResize = hasTimeAvailableFor(
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

        
        this.moveActivityContaining = (targetedDate, displacement) => {
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

            const canMove = hasTimeAvailableFor(
                newDate, activity.getAllocatedTime(), activity
            );

            if (canMove)
                activity.setDate(newDate);
        }

        let hasTimeAvailableFor = (date, allocatedTime, activityToIgnore) => {
            const buffer = activityFactory.create(date);
            try {
                buffer.setAllocatedTime(allocatedTime);
            } catch(exception) {
                return false;
            }

            for (let i = 0; i < activities.length; i++) {
                let shouldIgnore = (activities[i] === activityToIgnore)
                if (!shouldIgnore && !buffer.isDisjointTo(activities[i]))
                    return false;
            }
            return true;
        };

        this.registerDisplay = (display) => {
            displays.push(display);
        };

        this.unregisterDisplay = (display) => {
            const indexOfDipslay = displays.indexOf(display);
            displays.splice(indexOfDipslay, 1);
        };

        this.updateDisplays = () => {
            displays.forEach((display) => {
                display.update(date, allocatedTime, description);
            });
        };

        this.toJson = () => {
            return JSON.stringify(activities.map((activity) => {
                return {
                    'weekDay' : activity.getDate().getDay(),
                    'startHour' : activity.getDate().getHour(),
                    'allocatedTime': activity.getAllocatedTime()
                };
            }));
        };
    }
}
