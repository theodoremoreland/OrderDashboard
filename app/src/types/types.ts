export enum WeekDayFormat {
    Monday = 'Mon',
    Tuesday = 'Tue',
    Wednesday = 'Wed',
    Thursday = 'Thu',
    Friday = 'Fri',
    Saturday = 'Sat',
    Sunday = 'Sun',
}

export enum MonthFormat {
    January = 'Jan',
    February = 'Feb',
    March = 'Mar',
    April = 'Apr',
    May = 'May',
    June = 'Jun',
    July = 'Jul',
    August = 'Aug',
    September = 'Sep',
    October = 'Oct',
    November = 'Nov',
    December = 'Dec',
}

type RegexMatchedString<Pattern extends string> = 
    `${string & { __brand: Pattern }}`;

/** String of format: Oct 13 2023 */
export type DateFormat = RegexMatchedString<`^(${MonthFormat}) \\d{1,2} \\d{4}$`>;

export interface Order {
    "storeName": string,
    /** String of format: Oct 13 2023 */
    "date": DateFormat,
    "cost": number,
    "itemCount": number,
    "items": string[],
    "wasCancelled": boolean,
    "dayOfWeek": WeekDayFormat
}