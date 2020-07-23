import { Activity } from './Activity.js';

export class ActivityFactory {
    constructor() {
        let nextKey = 0;

        this.create = (date, allocatedTime=1, description='') => {
            return new Activity(date, nextKey++, allocatedTime, description);
        }
    }
}
