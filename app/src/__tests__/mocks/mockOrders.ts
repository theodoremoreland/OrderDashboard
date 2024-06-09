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
];

const items: string[][] = [
    [
        "Milk",
        "Bread",
        "Eggs",
        "Cheese",
        "Apples"
    ],
    [
        "Cereal",
        "Yogurt",
        "Chicken Breasts",
        "Spinach",
        "Orange Juice"
    ],
    [
        "Ground Beef",
        "Tomatoes",
        "Lettuce",
        "Pasta",
        "Marinara Sauce"
    ],
    [
        "Boneless Wings",
        "Classic Burger",
        "Fiesta Lime Chicken",
        "Mozzarella Sticks",
        "Brownie Bites"
    ],
    [
        "Chicken Wonton Tacos",
        "Four Cheese Mac & Cheese with Honey Pepper Chicken Tenders",
        "House Salad",
        "Riblet Platter",
        "Apple Chimi Cheesecake"
    ],
    [
        "Quesadilla Burger",
        "Chicken Caesar Salad",
        "Onion Rings",
        "Triple Chocolate Meltdown",
        "Pepsi"
    ],
    [
        "Double-Glazed Baby Back Ribs",
        "Spinach & Artichoke Dip",
        "Loaded Fajitas",
        "Classic Fries",
        " Blue Ribbon Brownie"
    ],
    [
        "Glazed Donut",
        "Chocolate Frosted Donut",
        "Jelly Filled Donut",
        "Maple Bar",
        "Apple Fritter"
    ],
    [
        "Boston Cream Donut",
        "Cinnamon Roll",
        "Strawberry Frosted Donut",
        "Powdered Sugar Donut",
        "Blueberry Donut"
    ],
    [
        "Broccoli Cheddar Soup",
        "Turkey Sandwich",
        "Greek Salad",
        "Bagel with Cream Cheese",
        "Chocolate Chip Cookie"
    ],
    [
        "Orange Chicken",
        "Kung Pao Chicken",
        "Chow Mein",
        "Fried Rice",
        "Spring Rolls"
    ],
    [
        "Beijing Beef",
        "Honey Walnut Shrimp",
        "String Bean Chicken Breast",
        "Black Pepper Angus Steak",
        "Veggie Spring Roll"
    ],
    [
        "Chicken Sandwich",
        "Waffle Fries",
        "Spicy Chicken Deluxe Sandwich",
        "Chicken Nuggets",
        "Lemonade"
    ],
    [
        "ButterBurger",
        "Cheese Curds",
        "Concrete Mixer",
        "Chicken Tenders",
        "Crinkle Cut Fries"
    ],
    [
        "Ibuprofen",
        "Band-Aids",
        "Toothpaste",
        "Shampoo",
        "Laundry Detergent"
    ],
    [
        "Multivitamins",
        "Cough Syrup",
        "Lip Balm",
        "Face Mask",
        "Hand Sanitizer"
    ],
    [
        "Big Mac",
        "Chicken McNuggets",
        "Fries",
        "McFlurry",
        "McChicken"
    ],
    [
        "Whopper",
        "Chicken Fries",
        "Onion Rings",
        "Impossible Whopper",
        "Hershey's Sundae Pie"
    ],
    [
        "Crunchwrap Supreme",
        "Beef Tacos",
        "Quesadilla",
        "Nachos BellGrande",
        "Cinnamon Twists"
    ],
    [
        "Pulled Pork Sandwich",
        "BBQ Ribs",
        "Baked Beans",
        "Coleslaw",
        "Cornbread Muffin"
    ],
    [
        "Spaghetti with Meatballs",
        "Fettuccine Alfredo",
        "Breadsticks",
        "Caesar Salad",
        "Pizza Slice"
    ],
    [
        "Pancakes",
        "Omelette",
        "Bacon",
        "Hash Browns",
        "French Toast"
    ],
    [
        "Steakburger",
        "Chili Cheese Fries",
        "Milkshake",
        "Chicken Fingers",
        "Onion Rings"
    ],
    [
        "Blizzard",
        "Dipped Cone",
        "Cheeseburger",
        "Chicken Strip Basket",
        "Sundae"
    ],
    [
        "Original Glazed Donut",
        "Chocolate Iced Glazed Donut",
        "Glazed Raspberry Filled Donut",
        "Chocolate Iced Custard Filled Donut",
        "Cinnamon Apple Filled Donut"
    ],
    [
        "Burrito Bowl",
        "Chicken Burrito",
        "Chips and Guacamole",
        "Steak Tacos",
        "Sofritas Salad"
    ],
    [
        "Chicken Quesadilla",
        "Ground Beef Nachos",
        "Veggie Burrito",
        "Grilled Steak Burrito Bowl",
        "Chips and Queso"
    ],
    [
        "Spicy Chicken Sandwich",
        "Cajun Fries",
        "Mashed Potatoes with Gravy",
        "Red Beans and Rice",
        "Biscuits"
    ],
    [
        "Bahama Mama Smoothie",
        "Chicken Pesto Flatbread",
        "Island Green Smoothie",
        "Turkey Bacon Ranch Sandwich",
        "Acai Berry Boost Smoothie"
    ],
    [
        "Original Recipe Chicken",
        "Mashed Potatoes with Gravy",
        "Coleslaw",
        "Mac & Cheese",
        "Biscuits"
    ],
    [
        "Baconator",
        "Spicy Chicken Sandwich",
        "Frosty",
        "French Fries",
        "Chili"
    ],
    [
        "Pepperoni Pizza",
        "Cheese Pizza",
        "Breadsticks",
        "Garlic Knots",
        "Chicken Wings"
    ],
];

const itemCounts: number[] = items.map(item => item.length);

const costs: number[] = [
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16,
    61.16, // 28 - 1712.48
    61.16, // 29 - 1773.64
    61.16, // 30 - 1834.8
    61.16, // 31 - 1895.96
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
/**
 * Leap year. 366 days.
 */
const mockOrders2020: Order[] = [
    // 31 days in January
    ...generateMonthOfOrders(0, 2020),
    // 29 days in February
    ...generateMonthOfOrders(1, 2020),
    // 31 days in March
    ...generateMonthOfOrders(2, 2020),
    // 30 days in April
    ...generateMonthOfOrders(3, 2020),
    // 31 days in May
    ...generateMonthOfOrders(4, 2020),
    // 30 days in June
    ...generateMonthOfOrders(5, 2020),
    // 31 days in July
    ...generateMonthOfOrders(6, 2020),
    // 31 days in August
    ...generateMonthOfOrders(7, 2020),
    // 30 days in September
    ...generateMonthOfOrders(8, 2020),
    // 31 days in October
    ...generateMonthOfOrders(9, 2020),
    // 30 days in November
    ...generateMonthOfOrders(10, 2020),
    // 31 days in December
    ...generateMonthOfOrders(11, 2020),
];

const mockOrders2021: Order[] = [
    // 31 days in January
    ...generateMonthOfOrders(0, 2021),
    // 28 days in February
    ...generateMonthOfOrders(1, 2021),
    // 31 days in March
    ...generateMonthOfOrders(2, 2021),
    // 30 days in April
    ...generateMonthOfOrders(3, 2021),
    // 31 days in May
    ...generateMonthOfOrders(4, 2021),
    // 30 days in June
    ...generateMonthOfOrders(5, 2021),
    // 31 days in July
    ...generateMonthOfOrders(6, 2021),
    // 31 days in August
    ...generateMonthOfOrders(7, 2021),
    // 30 days in September
    ...generateMonthOfOrders(8, 2021),
    // 31 days in October
    ...generateMonthOfOrders(9, 2021),
    // 30 days in November
    ...generateMonthOfOrders(10, 2021),
    // 31 days in December
    ...generateMonthOfOrders(11, 2021),
];

const mockOrders2022: Order[] = [
    // 31 days in January
    ...generateMonthOfOrders(0, 2022),
    // 28 days in February
    ...generateMonthOfOrders(1, 2022),
    // 31 days in March
    ...generateMonthOfOrders(2, 2022),
    // 30 days in April
    ...generateMonthOfOrders(3, 2022),
    // 31 days in May
    ...generateMonthOfOrders(4, 2022),
    // 30 days in June
    ...generateMonthOfOrders(5, 2022),
    // 31 days in July
    ...generateMonthOfOrders(6, 2022),
    // 31 days in August
    ...generateMonthOfOrders(7, 2022),
    // 30 days in September
    ...generateMonthOfOrders(8, 2022),
    // 31 days in October
    ...generateMonthOfOrders(9, 2022),
    // 30 days in November
    ...generateMonthOfOrders(10, 2022),
    // 31 days in December
    ...generateMonthOfOrders(11, 2022),
];

const mockOrders2023: Order[] = [
    // 31 days in January
    ...generateMonthOfOrders(0, 2023),
    // 28 days in February
    ...generateMonthOfOrders(1, 2023),
    // 31 days in March
    ...generateMonthOfOrders(2, 2023),
    // 30 days in April
    ...generateMonthOfOrders(3, 2023),
    // 31 days in May
    ...generateMonthOfOrders(4, 2023),
    // 30 days in June
    ...generateMonthOfOrders(5, 2023),
    // 31 days in July
    ...generateMonthOfOrders(6, 2023),
    // 31 days in August
    ...generateMonthOfOrders(7, 2023),
    // 30 days in September
    ...generateMonthOfOrders(8, 2023),
    // 31 days in October
    ...generateMonthOfOrders(9, 2023),
    // 30 days in November
    ...generateMonthOfOrders(10, 2023),
    // 31 days in December
    ...generateMonthOfOrders(11, 2023),
];

/**
 * Leap year. 366 days.
 */
const mockOrders2024: Order[] = [
    // 31 days in January
    ...generateMonthOfOrders(0, 2024),
    // 29 days in February
    ...generateMonthOfOrders(1, 2024),
    // 31 days in March
    ...generateMonthOfOrders(2, 2024),
    // 30 days in April
    ...generateMonthOfOrders(3, 2024),
    // 31 days in May
    ...generateMonthOfOrders(4, 2024),
    // 30 days in June
    ...generateMonthOfOrders(5, 2024),
    // 31 days in July
    ...generateMonthOfOrders(6, 2024),
    // 31 days in August
    ...generateMonthOfOrders(7, 2024),
    // 30 days in September
    ...generateMonthOfOrders(8, 2024),
    // 31 days in October
    ...generateMonthOfOrders(9, 2024),
    // 30 days in November
    ...generateMonthOfOrders(10, 2024),
    // 31 days in December
    ...generateMonthOfOrders(11, 2024),
];

const mockOrders: Order[] = mockOrders2020
    .concat(mockOrders2021)
    .concat(mockOrders2022)
    .concat(mockOrders2023)
    .concat(mockOrders2024);

export default mockOrders;