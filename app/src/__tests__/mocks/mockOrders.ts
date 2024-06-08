import { Order, WeekDayFormat, MonthFormat, DateFormat } from "../../types/types";

const storeNames: string[] = [
    "Aldi",
    "Aldi",
    "Dierbergs",
    "Applebee's",
    "Applebee's",
    "Applebee's",
    "Applebee's",
    "Tony's Donuts",
    "Tony's Donuts",
    "Panera Bread",
    "Panda Express",
    "Panda Express",
    "Chic Fil A",
    "Culver's",
    "Walgreens",
    "McDonald's",
    "Burger King",
    "Taco Bell",
    "Bandana's BBQ",
    "Fazoli's",
    "IHOP",
    "Steak N Shake",
    "Dairy Queen",
    "Krispy Kreme",
    "Chipotle",
    "Qdoba",
    "Popeye's Louisiana Kitchen",
    "Tropical Smoothie Cafe",
    "KFC",
    "Wendy's",
    "Papa John's",
    "Wingstop",
    "Walgreens",
];

const items: string[][] = [
    new Array(5).fill("apple"),
    new Array(12).fill("apple"),
    new Array(6).fill("apple"),
    new Array(7).fill("apple"),
    new Array(9).fill("apple"),
    new Array(15).fill("apple"),
    new Array(6).fill("apple"),
    new Array(3).fill("apple"),
    new Array(12).fill("apple"),
    new Array(3).fill("apple"),
    new Array(6).fill("apple"),
    new Array(7).fill("apple"),
    new Array(7).fill("apple"),
    new Array(6).fill("apple"),
    new Array(5).fill("apple"),
    new Array(2).fill("apple"),
    new Array(3).fill("apple"),
    new Array(8).fill("apple"),
    new Array(11).fill("apple"),
    new Array(1).fill("apple"),
];

const itemCounts: number[] = items.map(item => item.length);

const costs: number[] = [
    99.99,
    46,
    64,
    33,
    56,
    70,
    55,
    62.29,
    76.42,
    27.80,
    55.55,
    46.42,
    29.96,
    45.46,
    37.77,
    59.99,
    76.28,
    53.42,
    63.76,
];

const daysOfWeek: WeekDayFormat[] = [
    WeekDayFormat.Sunday,
    WeekDayFormat.Monday,
    WeekDayFormat.Tuesday,
    WeekDayFormat.Wednesday,
    WeekDayFormat.Thursday,
    WeekDayFormat.Friday,
    WeekDayFormat.Saturday,
];

const months: MonthFormat[] = [
    MonthFormat.January,
    MonthFormat.February,
    MonthFormat.March,
    MonthFormat.April,
    MonthFormat.May,
    MonthFormat.June,
    MonthFormat.July,
    MonthFormat.August,
    MonthFormat.September,
    MonthFormat.October,
    MonthFormat.November,
    MonthFormat.December,
];

// Month in JavaScript is 0-indexed (January is 0, February is 1, etc), 
// but by using 0 as the day it will give us the last day of the prior
// month. So passing in 1 as the month number will return the last day
// of January, not February
// https://stackoverflow.com/a/1184359
const getNumberOfDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month, 0).getDate();
}

/***
 * Generates an object for each day of the month with the given month and year.
 * @param month The month number using zero based indexing (i.e. 0-11).
 * @param year The year number.
 */
const generateObjectForEachDayOfMonth = (month: number, year: number): Partial<Order>[] => {
    const numberOfDays: number = getNumberOfDaysInMonth(month, year);
    const objects: Partial<Order>[] = [];

    for (let i = 0; i < numberOfDays; i++) {
        const day: number = i + 1;
        const dayOfWeekIndex: number = new Date(year, month, day).getDay();
        const dayOfWeek: WeekDayFormat = daysOfWeek[dayOfWeekIndex];
        const date: DateFormat = `${months[month]} ${day} ${year}` as DateFormat;
        const order: Partial<Order> = {
            date,
            dayOfWeek,
        };

        objects.push(order);
    }

    return objects;
}

const generateMonthOfOrders = (month: number, year: number, daysWithoutOrders: number = 0): Order[] => {
    const monthOfOrders: Order[] = [];
    const monthOfObjects: Partial<Order>[] = generateObjectForEachDayOfMonth(month, year);

    for (let i = 0; i < monthOfObjects.length - daysWithoutOrders; i++) {
        const storeName: string = storeNames[i];
        const cost: number = costs[i];
        const _items = items[i];
        const itemCount: number = itemCounts[i];
        const wasCancelled: boolean = false;
        const dayOfWeek: WeekDayFormat = monthOfObjects[i].dayOfWeek as WeekDayFormat;
        const date: DateFormat = monthOfObjects[i].date as DateFormat;

        const order: Order = {
            storeName,
            cost,
            items: _items,
            itemCount,
            wasCancelled,
            dayOfWeek,
            date,
        };

        monthOfOrders.push(order);
    }

    return monthOfOrders;
};

// TODO this needs to double as default data displayed in the UI.
const mockOrders2020: Order[] = [
    ...generateMonthOfOrders(0, 2020),
    ...generateMonthOfOrders(1, 2020),
    ...generateMonthOfOrders(2, 2020),
    ...generateMonthOfOrders(3, 2020),
    ...generateMonthOfOrders(4, 2020),
    ...generateMonthOfOrders(5, 2020),
    ...generateMonthOfOrders(6, 2020),
    ...generateMonthOfOrders(7, 2020),
    ...generateMonthOfOrders(8, 2020),
    ...generateMonthOfOrders(9, 2020),
    ...generateMonthOfOrders(10, 2020),
    ...generateMonthOfOrders(11, 2020),
];

const mockOrders2021: Order[] = [
    ...generateMonthOfOrders(0, 2021),
    ...generateMonthOfOrders(1, 2021),
    ...generateMonthOfOrders(2, 2021),
    ...generateMonthOfOrders(3, 2021),
    ...generateMonthOfOrders(4, 2021),
    ...generateMonthOfOrders(5, 2021),
    ...generateMonthOfOrders(6, 2021),
    ...generateMonthOfOrders(7, 2021),
    ...generateMonthOfOrders(8, 2021),
    ...generateMonthOfOrders(9, 2021),
    ...generateMonthOfOrders(10, 2021),
    ...generateMonthOfOrders(11, 2021),
];

const mockOrders2023: Order[] = [
    ...generateMonthOfOrders(0, 2023),
    ...generateMonthOfOrders(1, 2023),
    ...generateMonthOfOrders(2, 2023),
    ...generateMonthOfOrders(3, 2023),
    ...generateMonthOfOrders(4, 2023),
    ...generateMonthOfOrders(5, 2023),
    ...generateMonthOfOrders(6, 2023),
    ...generateMonthOfOrders(7, 2023),
    ...generateMonthOfOrders(8, 2023),
    ...generateMonthOfOrders(9, 2023),
    ...generateMonthOfOrders(10, 2023),
    ...generateMonthOfOrders(11, 2023),
];

const mockOrders2024: Order[] = [
    ...generateMonthOfOrders(0, 2024),
    ...generateMonthOfOrders(1, 2024),
    ...generateMonthOfOrders(2, 2024),
    ...generateMonthOfOrders(3, 2024),
    ...generateMonthOfOrders(4, 2024),
    ...generateMonthOfOrders(5, 2024),
    ...generateMonthOfOrders(6, 2024),
    ...generateMonthOfOrders(7, 2024),
    ...generateMonthOfOrders(8, 2024),
    ...generateMonthOfOrders(9, 2024),
    ...generateMonthOfOrders(10, 2024),
    ...generateMonthOfOrders(11, 2024),
];

const mockOrders: Order[] = mockOrders2020
    .concat(mockOrders2021)
    .concat(mockOrders2023)
    .concat(mockOrders2024);

export default mockOrders;