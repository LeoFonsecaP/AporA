import { Activity } from './Activity.js';

export class ActivityFactory {
    constructor() {
        this.nextKey = 0;
    }
    create(date) {
        return new Activity(date, this.nextKey++);
    }
}