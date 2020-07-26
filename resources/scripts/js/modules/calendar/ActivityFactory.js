import { Activity } from './Activity.js';

export class ActivityFactory {
    constructor() {
        this.nextKey = 0;

    }
    create(date, allocatedTime=1, description='') {
        return new Activity(date, this.nextKey++, allocatedTime, description);
    }
}
