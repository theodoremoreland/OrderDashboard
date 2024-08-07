import { DateFormat, WeekDayFormat } from "../types/types"

/**
 * Create an array of objects with a date property.
 * This can be used to create a calendar of orders wherein
 * some dates may not have orders.
 * TODO - This needs unit tests.
 */
export default (startDate: Date, endDate: Date): { date: DateFormat, dayOfWeek: WeekDayFormat }[] => {  
    const data: { date: DateFormat, dayOfWeek: WeekDayFormat }[] = [];

    // new Date(startDate.getTime()) is used to clone the startDate object as to not mutate it.
    for (let d = new Date(startDate.getTime()); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateUnits: string[] = d.toString().split(' ');
        const month: string = dateUnits[1];
        const day: number = parseInt(dateUnits[2]); // ParseInt is used to remove leading 0s.
        const year: string = dateUnits[3];
        const formattedDate: DateFormat = `${month} ${day} ${year}` as DateFormat;

        data.push({
            date: formattedDate,
            dayOfWeek: dateUnits[0] as WeekDayFormat,
        });
    }

    return data;
}