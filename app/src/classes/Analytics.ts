
export interface Order {
    "storeName": string,
    /** String of format: Oct 13 2023 */
    "date": string,
    "cost": number,
    "itemCount": number,
    "items": string[],
    "wasCancelled": boolean,
    "dayOfWeek": "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat"
}


export default class Analytics {
    private static data: Order[];

    constructor(data: Order[]) {
        Analytics.data = data;
    }

    // ---------- !!!! Groups Bys !!!! ----------

    private static groupByStore() {
        const data: { [key: string]: Order[] } = {};

        for (const order of Analytics.data) {
            if (!data[order.storeName]) {
                data[order.storeName] = [];
            }

            data[order.storeName].push(order);
        }

        return data;
    }

    private static groupByDate() {
        const data: { [key: string]: Order[] } = {};

        for (const order of Analytics.data) {
            if (!data[order.date]) {
                data[order.date] = [];
            }

            data[order.date].push(order);
        }

        return data;
    }

    private static groupByDayOfWeek() {
        const data: { [key: string]: Order[] } = {};

        for (const order of Analytics.data) {
            if (!data[order.dayOfWeek]) {
                data[order.dayOfWeek] = [];
            }

            data[order.dayOfWeek].push(order);
        }

        return data;
    }

    private static groupByMonth() {
        const data: { [key: string]: Order[] } = {};

        for (const order of Analytics.data) {
            const month = order.date.split(" ")[0];

            if (!data[month]) {
                data[month] = [];
            }

            data[month].push(order);
        }

        return data;
    }

    private static groupByYear() {
        const data: { [key: string]: Order[] } = {};

        for (const order of Analytics.data) {
            const year = order.date.split(" ")[2];

            if (!data[year]) {
                data[year] = [];
            }

            data[year].push(order);
        }

        return data;
    }

    // ---------- !!!! Aggregates !!!! ----------

    public static getTotalPurchases() {
        return Analytics.data.length;
    }

    public static getTotalSpent() {
        let total = 0;

        for (const order of Analytics.data) {
            total += order.cost;
        }

        return total;
    }

    public static getTotalNumberOfDaysAPurchaseWasMade() {
        const days = new Set();

        for (const order of Analytics.data) {
            days.add(order.date);
        }

        return days.size;
    }

    public static getTotalItemsPurchased() {
        let total = 0;

        for (const order of Analytics.data) {
            total += order.itemCount;
        }

        return total;
    }

    public static getNumberOfStoresPurchasedFrom() {
        return Object.keys(Analytics.groupByStore()).length;
    }

    public static getTotalSpendByDayOfWeek() {
        const data = Analytics.groupByDayOfWeek();
        const result: { [key: string]: number } = {};

        for (const day in data) {
            result[day] = 0;

            for (const order of data[day]) {
                result[day] += order.cost;
            }
        }

        return result;
    }

    public static getTotalSpendByMonth() {
        const data = Analytics.groupByMonth();
        const result: { [key: string]: number } = {};

        for (const month in data) {
            result[month] = 0;

            for (const order of data[month]) {
                result[month] += order.cost;
            }
        }

        return result;
    }

    public static getTotalSpendByYear() {
        const data = Analytics.groupByYear();
        const result: { [key: string]: number } = {};

        for (const year in data) {
            result[year] = 0;

            for (const order of data[year]) {
                result[year] += order.cost;
            }
        }

        return result;
    }
}
