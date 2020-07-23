export const WEEK_DAYS = [
    'Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'
];

export const HOURS_IN_A_DAY = 24;

export class WeekRelativeDate {
    static hourIsValid(hour) {
        return (hour >= 0 && hour <= HOURS_IN_A_DAY);
    }

    constructor(weekDay, hour) {
        if (!this.constructor.hourIsValid(hour))
            throw new Error('Invalid hour for a WeekRelativeDay');

        this.getDay = () => {
            return weekDay;
        }

        this.getHour = () => {
            return hour;
        }

        this.setDay = (newDay) => {
            weekDay = newDay;
        }

        this.setHour = (newDateHour) => {
            if (!this.constructor.hourIsValid(dateHour))
                throw new Error('Invalid hour for a WeekRelativeDay');
            hour = newDateHour; 
        }
    }
}
