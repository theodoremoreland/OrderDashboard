import { Order } from "../types/types";

export default class Analytics {
    private static data: Order[];

    constructor(data: Order[]) {
        Analytics.data = data.map(order => { 
            return { 
                ...order,
                cost: parseFloat(order.cost.toFixed(2))
            };
        })
        .filter(order => !order.wasCancelled);
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

    public static getTotalPurchases(): number {
        return Analytics.data.length;
    }

    public static getTotalSpent(): number {
        let total: number = 0;

        for (const order of Analytics.data) {
            total += order.cost;
        }

        total = Math.ceil(total);

        return total;
    }

    public static getTotalNumberOfDaysAPurchaseWasMade(): number {
        const days = new Set();

        for (const order of Analytics.data) {
            days.add(order.date);
        }

        return days.size;
    }

    public static getTotalItemsPurchased(): number {
        let total = 0;

        for (const order of Analytics.data) {
            total += order.itemCount;
        }

        return total;
    }

    public static getNumberOfStoresPurchasedFrom(): number {
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

            result[day] = Math.ceil(result[day]);
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

            result[month] = Math.ceil(result[month]);
        }

        return result;
    }

    public static getTotalSpendByYear() {
        const data: { [key: string]: Order[] } = Analytics.groupByYear();
        const result: { [key: string]: number } = {};

        for (const year in data) {
            result[year] = 0;

            for (const order of data[year]) {
                result[year] += order.cost;
            }

            result[year] = Math.ceil(result[year]);
        }

        return result;
    }

    public static getTopStoresByTotalSpend() {
        const data = Analytics.groupByStore();
        const result: { storeName: string, totalSpend: number }[] = [];

        for (const store in data) {
            let total: number = 0;

            for (const order of data[store]) {
                total += order.cost;
            }

            total = parseFloat(total.toFixed(2));

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
            let total: number = 0;

            for (const order of data[store]) {
                total += order.itemCount;
            }

            result.push({ storeName: store, totalItemsPurchased: total });
        }

        return result.sort((a, b) => b.totalItemsPurchased - a.totalItemsPurchased);
    }

    public static getTop5DroughtsBetweenPurchases() {
        const times: number[] = Analytics.getTimeOfOrdersSorted();
        const result: { startDate: string, endDate: string, days: number }[] = [];

        for (let i = 0; i < times.length - 1; i++) {
            const startDate: Date = new Date(times[i]);
            const endDate: Date = new Date(times[i + 1]);
            const days: number = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

            result.push({ startDate: startDate.toDateString(), endDate: endDate.toDateString(), days });
        }

        return result.sort((a, b) => b.days - a.days).slice(0, 5);
    }
}
