import { HOURS_IN_A_DAY, WeekRelativeDate } from "./WeekRelativeDate.js";

export const ACTIVITY_NOT_FOUND = {};

export class Calendar {
    constructor(calendarsActivityFactory) {
        let activityFactory = calendarsActivityFactory;
        let activities = [];
        let displays = [];

        this.addActivity = (date, allocatedTime=1, description='') => {
            const newActivity = activityFactory.create(date, allocatedTime, description);
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

        this.resizeActivityContaining = (targetedDate, newEndDate) => {
            const activity = this.getActivityContaining(targetedDate);
            const activityDate = activity.getDate();
            const newAllocatedTime = newEndDate.getHour() - 
                activityDate.getHour() + 1; 

            const newActivityVersion = activityFactory.create(activityDate);
            try {
                newActivityVersion.setAllocatedTime(newAllocatedTime);
            } catch(exception) {
                throw exception;
            }
            
            if (!hasTimeAvailableFor(newActivityVersion, activity))
                throw new Error('Invalid end hour for activity');

            try {
                activity.setAllocatedTime(newAllocatedTime);
            } catch(exception) {
                throw exception;
            }
        }

        
        this.moveActivityContaining = (targetedDate, displacement) => {
            const activity = this.getActivityContaining(targetedDate);
            const activityDate = activity.getDate();
            const newDateHour = activityDate.getHour() + displacement; 
            const activityWeekDay = activityDate.getWeekDay();
            let newDate = null;
            try {
                newDate = new WeekRelativeDate(activityWeekDay, newDateHour);
            } catch(exception) {
                throw exception;
            }

            const newActivityVersion = activityFactory.create(newDate);

            try {
                newActivityVersion.setAllocatedTime(activity.getAllocatedTime());
            } catch(exception) {
                throw exception;
            }

            if (!hasTimeAvailableFor(newActivityVersion, activity))
                throw new Error('Invalid end hour for activity');

            activity.setDate(newDate);
        }

        this.hasTimeAvailableAt = (date) => {
            return (this.getActivityContaining(date) === ACTIVITY_NOT_FOUND);
        }

        let hasTimeAvailableFor = (activityBuffer, activityToIgnore = {}) => {
            for (let i = 0; i < activities.length; i++) {
                let shouldIgnore = (activities[i] === activityToIgnore)
                if (!shouldIgnore && !activityBuffer.isDisjointTo(activities[i]))
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
                    'weekDay' : activity.getDate().getWeekDay(),
                    'startHour' : activity.getDate().getHour(),
                    'allocatedTime': activity.getAllocatedTime()
                };
            }));
        };
    }
}