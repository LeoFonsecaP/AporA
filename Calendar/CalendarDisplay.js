export class CalendarDisplay {
    constructor(htmlElement, activityDisplaysFactory) {
        this.htmlElement = htmlElement;
        this.activityDisplaysFactory = activityDisplaysFactory
        this.activityDisplays = {};
    }

    updateOnAdd(newActivity) {
        const date = newActivity.getDate();
        const key = newActivity.getKey()
        const activityDisplay = this.activityDisplaysFactory.create(
            this.htmlElement, date
        );
        this.activityDisplays[key] = activityDisplay;
        newActivity.registerDisplay(activityDisplay);
    }

    updateOnRemove(newActivityId) {
        this.activityDisplays[newActivityId].destroy();
    }
}