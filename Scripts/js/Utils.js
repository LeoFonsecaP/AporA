export class Activator {
    constructor(triggerElement, typeOfEvent, action) {
        this.triggerElement = triggerElement;
        this.triggeredBy = typeOfEvent;
        this.action = action;
        this.running = false;
    }

    start() {
        if (!this.running) {
            this.triggerElement.addEventListener(this.triggeredBy, this.action);
            this.running = true;
        }
    }

    interrupt() {
        if (this.running) {
            this.triggerElement.removeEventListener(this.triggeredBy, this.action);
            this.running = false;
        }
    }
}
