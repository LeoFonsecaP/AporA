export class Activity {
    constructor(date, key) {
        this.date = date;
        this.allocatedTime = 1;
        this.key = key;
        this.displays = [];
        this.description = '';
    }

    setDate(date) {
        this.date = date;
        this.updateDisplays();
    }

    setAllocatedTime(allocatedTime) {
        this.allocatedTime = allocatedTime;
        this.updateDisplays();
    }

    setDescription(description) {
        this.description = description; 
        this.updateDisplays();
    }

    getDate() {
        return this.date;
    }

    getKey() {
        return this.key;
    }

    contains(date) {
        const timeDistance = date.hour - this.date.hour;
        return ((date.day === this.date.day) && 
                ((timeDistance >= 0) && (timeDistance < this.allocatedTime)));
    }

    isDisjointTo(activity) {
        return (!this.contains(activity.getDate()) &&
               (!activity.contains(this.getDate())));
    }

    getAllocatedTime() {
        return this.allocatedTime;
    }

    getDescription() {
        return this.description; 
    }

    registerDisplay(display) {
        this.displays.push(display);
    }

    unregisterDisplay(display) {
        let indexOfDipslay = this.displays.indexOf(display);
        this.displays.splice(indexOfDipslay, 1);
    }

    updateDisplays() {
        this.displays.forEach((display) => {
            display.update(this.date, this.allocatedTime, this.description);
        });
    }
}