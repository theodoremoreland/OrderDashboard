
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

    // ---------- !!!! Sorts !!!! ----------

    private static getTimeOfOrdersSorted() {
        return Analytics.data.map(order => new Date(order.date).getTime()).sort((a, b) => a - b);
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

    public static getTopStoresByTotalSpend() {
        const data = Analytics.groupByStore();
        const result: { storeName: string, totalSpend: number }[] = [];

        for (const store in data) {
            let total = 0;

            for (const order of data[store]) {
                total += order.cost;
            }

            result.push({ storeName: store, totalSpend: total });
        }

        return result.sort((a, b) => b.totalSpend - a.totalSpend);
    }

    public static getTopStoresByTotalOrders() {
        const data = Analytics.groupByStore();
        const result: { storeName: string, totalOrders: number }[] = [];

        for (const store in data) {
            result.push({ storeName: store, totalOrders: data[store].length });
        }

        return result.sort((a, b) => b.totalOrders - a.totalOrders);
    }

    public static getTopStoresByTotalItemsPurchased() {
        const data = Analytics.groupByStore();
        const result: { storeName: string, totalItemsPurchased: number }[] = [];

        for (const store in data) {
            let total = 0;

            for (const order of data[store]) {
                total += order.itemCount;
            }

            result.push({ storeName: store, totalItemsPurchased: total });
        }

        return result.sort((a, b) => b.totalItemsPurchased - a.totalItemsPurchased);
    }

    public static getTop5DroughtsBetweenPurchases() {
        const times = Analytics.getTimeOfOrdersSorted();
        const result: { startDate: string, endDate: string, days: number }[] = [];

        for (let i = 0; i < times.length - 1; i++) {
            const startDate = new Date(times[i]);
            const endDate = new Date(times[i + 1]);
            const days = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

            result.push({ startDate: startDate.toDateString(), endDate: endDate.toDateString(), days });
        }

        return result.sort((a, b) => b.days - a.days).slice(0, 5);
    }
}
