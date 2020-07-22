export const WEEK_DAYS = [
    'Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'
];

export const HOURS_IN_A_DAY = 24;

export const INVALID_HOUR = -1;

export class WeekRelativeDate {
    constructor(dateWeekDay, dateHour) {
        if (dateHour < 0 || dateHour >= HOURS_IN_A_DAY)
            throw new Error('Invelid hour for a WeekRelativeDay');
        let weekDay = dateWeekDay;
        let hour = dateHour;

        this.setWeekDay = (newWeekDay) => {
            weekDay = newWeekDay;
        }

        this.setHour = (newDateHour) => {
            if (newDateHour < 0 || newDateHour >= HOURS_IN_A_DAY)
                throw new Error('Invelid hour for a WeekRelativeDay');
            hour = newDateHour; 
        }

        this.getWeekDay = () => {
            return weekDay;
        }

        this.getHour = () => {
            return hour;
        }
    }
}