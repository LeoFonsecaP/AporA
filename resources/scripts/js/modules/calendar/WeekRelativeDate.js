export const WEEK_DAYS = [
    'Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'
];

export const HOURS_IN_A_DAY = 24;

export class WeekRelativeDate {
    static hourIsValid(hour) {
        return (hour >= 0 && hour <= HOURS_IN_A_DAY);
    }

    constructor(weekDay, hour) {
        this.weekDay = weekDay;
        this.hour = hour;
        if (!this.constructor.hourIsValid(hour))
            throw new Error('Invalid hour for a WeekRelativeDay');
    }

    getDay() {
        return this.weekDay;
    }

    getHour() {
        return this.hour;
    }

    setDay(newDay) {
        this.weekDay = newDay;
    }

    setHour(newDateHour) {
        if (!this.constructor.hourIsValid(dateHour))
            throw new Error('Invalid hour for a WeekRelativeDay');
        this.hour = newDateHour; 
    }
}
