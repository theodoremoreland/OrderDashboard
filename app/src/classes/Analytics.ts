
interface Order {
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
}
