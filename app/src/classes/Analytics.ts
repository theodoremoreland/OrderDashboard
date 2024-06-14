import { MonthFormat, Order } from "../types/types";
import generateObjectCalendar from "../modules/generateObjectCalendar";

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
            const month: string = order.date.split(" ")[0];
            const year: string = order.date.split(" ")[2];
            const monthYear: string = `${month} ${year}`;

            if (!data[monthYear]) {
                data[monthYear] = [];
            }

            data[monthYear].push(order);
        }

        return data;
    }

    private static groupByYear() {
        const data: { [key: number]: Order[] } = {};

        for (const order of Analytics.data) {
            const year = Number(order.date.split(" ")[2]);

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

    public static getTotalSpendByMonth(month: MonthFormat, year?: number) {
        const data = Analytics.groupByMonth();
        const result: { [key: string]: number } = {};

        for (const monthYear in data) {
            result[monthYear] = 0;

            for (const order of data[monthYear]) {
                result[monthYear] += order.cost;
            }

            result[monthYear] = Math.ceil(result[monthYear]);
        }

        if (year) {
            return result[`${month} ${year}`];
        }

        return result[month];
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

    public static getTopStoresByTotalSpend(limit: number = 5) {
        const data = Analytics.groupByStore();
        const result: { storeName: string, totalSpend: number }[] = [];

        for (const store in data) {
            let total: number = 0;

            for (const order of data[store]) {
                total += order.cost;
            }

            total = Math.ceil(total);

            result.push({ storeName: store, totalSpend: total });
        }

        return result
            .sort((a, b) => b.totalSpend - a.totalSpend)
            .slice(0, limit);
    }

    public static getTopStoresByTotalOrders(limit: number = 5) {
        const data = Analytics.groupByStore();
        const result: { storeName: string, totalOrders: number }[] = [];

        for (const store in data) {
            result.push({ storeName: store, totalOrders: data[store].length });
        }

        return result
            .sort((a, b) => b.totalOrders - a.totalOrders)
            .slice(0, limit);
    }

    public static getTopStoresByTotalItemsPurchased(limit: number = 5) {
        const data = Analytics.groupByStore();
        const result: { storeName: string, totalItemsPurchased: number }[] = [];

        for (const store in data) {
            let total: number = 0;

            for (const order of data[store]) {
                total += order.itemCount;
            }

            result.push({ storeName: store, totalItemsPurchased: total });
        }

        return result
            .sort((a, b) => b.totalItemsPurchased - a.totalItemsPurchased)
            .slice(0, limit);
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

    // ---------- !!!! Averages !!!! ----------
    // TODO: Implement the following methods
    public static getAverageSpendPerDay(startDate: Date, endDate: Date): number {
        const objectCalendar = generateObjectCalendar(startDate, endDate);
        const data: {[key: string]: Order[]} = Analytics.groupByDate();
        let sum: number = 0;

        for (const filler of objectCalendar) {
            const date: string = filler.date;
            const orders: Order[] = data[date] || [{ date, cost: 0 }];

            for (const order of orders) {
                sum += order.cost;
            }
        }

        return Math.ceil(sum / objectCalendar.length);
    }

    public static getAverageSpendPerWeek(startDate: Date, endDate: Date): number {
        const objectCalendar = generateObjectCalendar(startDate, endDate);
        const data: {[key: string]: Order[]} = Analytics.groupByDate();
        let sum: number = 0;

        for (const filler of objectCalendar) {
            const date: string = filler.date;
            const orders: Order[] = data[date] || [{ date, cost: 0 }];

            for (const order of orders) {
                sum += order.cost;
            }
        }

        return Math.ceil(sum / (objectCalendar.length / 7));
    }

    // TODO: Consider using a more precise method to calculate the average spend per month.
    public static getAverageSpendPerMonth(startDate: Date, endDate: Date): number {
        const objectCalendar = generateObjectCalendar(startDate, endDate);
        const data: {[key: string]: Order[]} = Analytics.groupByDate();
        let sum: number = 0;

        for (const filler of objectCalendar) {
            const date: string = filler.date;
            const orders: Order[] = data[date] || [{ date, cost: 0 }];

            for (const order of orders) {
                sum += order.cost;
            }
        }

        return Math.ceil(sum / (objectCalendar.length / 30.5));
    }

    public static getAverageSpendPerYear(startYear: number, endYear: number): number {
        const data: {[key: number]: Order[]} = Analytics.groupByYear();
        const validYears: string[] = Object.keys(data).filter(year => {
            return startYear >= Number(year) && endYear <= Number(year);
        });
        let sum: number = 0;

        for (const year of validYears) {
            const orders: Order[] = data[Number(year)];

            for (const order of orders) {
                sum += order.cost;
            }
        }

        return Math.ceil(sum / validYears.length);
    }
}
