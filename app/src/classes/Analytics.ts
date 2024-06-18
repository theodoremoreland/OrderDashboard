import { Order } from "../types/types";
import generateObjectCalendar from "../modules/generateObjectCalendar";

export default class Analytics {
    private data: Order[];

    constructor(data: Order[]) {
        this.data = data.map(order => { 
            return { 
                ...order,
                cost: parseFloat(order.cost.toFixed(2))
            };
        })
        .filter(order => !order.wasCancelled)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    // ---------- !!!! Groups Bys !!!! ----------

    private groupByStore() {
        const data: { [key: string]: Order[] } = {};

        for (const order of this.data) {
            if (!data[order.storeName]) {
                data[order.storeName] = [];
            }

            data[order.storeName].push(order);
        }

        return data;
    }

    private groupByDate() {
        const data: { [key: string]: Order[] } = {};

        for (const order of this.data) {
            if (!data[order.date]) {
                data[order.date] = [];
            }

            data[order.date].push(order);
        }

        return data;
    }

    private groupByDayOfWeek() {
        const data: { [key: string]: Order[] } = {};

        for (const order of this.data) {
            if (!data[order.dayOfWeek]) {
                data[order.dayOfWeek] = [];
            }

            data[order.dayOfWeek].push(order);
        }

        return data;
    }

    private groupByMonth() {
        const data: { [key: string]: Order[] } = {};

        for (const order of this.data) {
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

    private groupByYear() {
        const data: { [key: number]: Order[] } = {};

        for (const order of this.data) {
            const year = Number(order.date.split(" ")[2]);

            if (!data[year]) {
                data[year] = [];
            }

            data[year].push(order);
        }

        return data;
    }

    // ---------- !!!! Sorts !!!! ----------

    private getTimeOfOrdersSorted(): number[] {
        return this.data.map(order => new Date(order.date).getTime()).sort((a, b) => a - b);
    }
                        
    // ---------- !!!! Aggregates !!!! ----------

    public getTotalPurchases(): number {
        return this.data.length;
    }

    public getTotalSpent(): number {
        let total: number = 0;

        for (const order of this.data) {
            total += order.cost;
        }

        total = Math.ceil(total);

        return total;
    }

    public getTotalNumberOfDaysAPurchaseWasMade(): number {
        const days = new Set();

        for (const order of this.data) {
            days.add(order.date);
        }

        return days.size;
    }

    public getTotalItemsPurchased(): number {
        let total = 0;

        for (const order of this.data) {
            total += order.itemCount;
        }

        return total;
    }

    public getNumberOfStoresPurchasedFrom(): number {
        return Object.keys(this.groupByStore()).length;
    }

    public getTotalSpendByDayOfWeek(): { [key: string]: number } {
        const data = this.groupByDayOfWeek();
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

    public getTotalSpendByMonth(year?: number): { [key: string]: number } {
        const data = this.groupByMonth();
        const validMonths: string[] = year
            ? Object.keys(data)
                .filter(monthYear => monthYear.includes(year.toString()))
            : Object.keys(data);
        const result: { [key: string]: number } = {};

        for (const monthYear of validMonths) {
            const orders: Order[] = data[monthYear];
            const month: string = monthYear.split(" ")[0];

            if (!result[month]) {
                result[month] = 0;
            }

            for (const order of orders) {
                result[month] += order.cost;
            }

            result[month] = Math.ceil(result[month]);
        }

        return result; 
    }

    public getTotalSpendByYear(): { [key: string]: number } {
        const data: { [key: string]: Order[] } = this.groupByYear();
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

    public getTopStoresByTotalSpend(limit: number = 5): { storeName: string, totalSpend: number }[] {
        const data = this.groupByStore();
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

    public getTopStoresByTotalOrders(limit: number = 5): { storeName: string, totalOrders: number }[] {
        const data = this.groupByStore();
        const result: { storeName: string, totalOrders: number }[] = [];

        for (const store in data) {
            result.push({ storeName: store, totalOrders: data[store].length });
        }

        return result
            .sort((a, b) => b.totalOrders - a.totalOrders)
            .slice(0, limit);
    }

    public getTopStoresByTotalItemsPurchased(limit: number = 5): { storeName: string, totalItemsPurchased: number }[] {
        const data = this.groupByStore();
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

    // ---------- !!!! Averages !!!! ----------

    public getAverageSpendPerDay(startDate: Date, endDate: Date): number {
        const objectCalendar = generateObjectCalendar(startDate, endDate);
        const data: {[key: string]: Order[]} = this.groupByDate();
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

    public getAverageNumberOfPurchasesPerDay(startDate: Date, endDate: Date): number {
        const objectCalendar = generateObjectCalendar(startDate, endDate);
        const data: {[key: string]: Order[]} = this.groupByDate();
        let totalNumberOfPurchases: number = 0;

        for (const filler of objectCalendar) {
            const date: string = filler.date;
            const orders: Order[] = data[date] || [];

            totalNumberOfPurchases += orders.length;
        }

        return +(totalNumberOfPurchases / objectCalendar.length).toFixed(2);
    }

    public getAverageSpendPerWeek(startDate: Date, endDate: Date): number {
        const objectCalendar = generateObjectCalendar(startDate, endDate);
        const data: {[key: string]: Order[]} = this.groupByDate();
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

    public getAverageNumberOfPurchasesPerWeek(startDate: Date, endDate: Date): number {
        const objectCalendar = generateObjectCalendar(startDate, endDate);
        const data: {[key: string]: Order[]} = this.groupByDate();
        let totalNumberOfPurchases: number = 0;

        for (const filler of objectCalendar) {
            const date: string = filler.date;
            const orders: Order[] = data[date] || [];

            totalNumberOfPurchases += orders.length;
        }

        return +(totalNumberOfPurchases / (objectCalendar.length / 7)).toFixed(2);
    }

    public getAverageSpendPerMonth(year?: number): number {
        const data: {[key: string]: Order[]} = this.groupByMonth();
        const validMonths: string[] = Object.keys(data)
            .filter(monthYear => {
                if (!year) {
                    return true;
                }

                return monthYear.includes(year.toString());
            });
        let sum: number = 0;

        for (const monthYear of validMonths) {
            const orders: Order[] = data[monthYear];

            for (const order of orders) {
                sum += order.cost;
            }
        }

        return Math.ceil(sum / validMonths.length);
    }

    public getAverageNumberOfPurchasesPerMonth(year?: number): number {
        const data: {[key: string]: Order[]} = this.groupByMonth();
        const validMonths: string[] = Object.keys(data)
            .filter(monthYear => {
                if (!year) {
                    return true;
                }

                return monthYear.includes(year.toString());
            });
        let totalNumberOfPurchases: number = 0;

        for (const monthYear of validMonths) {
            const orders: Order[] = data[monthYear];

            totalNumberOfPurchases += orders.length;
        }

        return +(totalNumberOfPurchases / validMonths.length).toFixed(2);
    }

    public getAverageSpendPerYear(startYear: number, endYear: number): number {
        const data: {[key: number]: Order[]} = this.groupByYear();
        const validYears: string[] = Object.keys(data).filter(year => {
            return startYear <= Number(year) && endYear >= Number(year);
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

    public getAverageNumberOfPurchasesPerYear(startYear: number, endYear: number): number {
        const data: {[key: number]: Order[]} = this.groupByYear();
        const validYears: string[] = Object.keys(data).filter(year => {
            return startYear <= Number(year) && endYear >= Number(year);
        });
        let totalNumberOfPurchases: number = 0;

        for (const year of validYears) {
            const orders: Order[] = data[Number(year)];

            totalNumberOfPurchases += orders.length;
        }

        return +(totalNumberOfPurchases / validYears.length).toFixed(2);
    }

    public getDataMappedToCalendar(): { date: string, totalSpend: number, totalOrders: number, totalItems: number }[] {
        const startDate: Date = new Date(this.data[0].date);
        const endDate: Date = new Date(this.data[this.data.length - 1].date);
        const objectCalendar = generateObjectCalendar(startDate, endDate);
        const ordersByDate: {[key: string]: Order[]} = this.groupByDate();
        const data: {date: string, totalSpend: number, totalOrders: number, totalItems: number }[] = [];
        
        for (const filler of objectCalendar) {
            const date: string = filler.date;
            const _data = { date, totalSpend: 0, totalOrders: 0, totalItems: 0 };
            
            if (!ordersByDate[date]) {
                data.push(_data);
                continue;
            }

            for (const order of ordersByDate[date]) {
                _data.totalSpend += order.cost;
                _data.totalOrders++;
                _data.totalItems += order.itemCount;
            }

            data.push(_data);
        }

        return data;
    }

    // ---------- !!!! Streaks !!!! ----------

    public getTop5DroughtsBetweenPurchases(): { startDate: string, endDate: string, days: number }[] {
        const times: number[] = this.getTimeOfOrdersSorted();
        const result: { startDate: string, endDate: string, days: number }[] = [];

        for (let i = 0; i < times.length - 1; i++) {
            const startDate: Date = new Date(times[i]);
            const endDate: Date = new Date(times[i + 1]);
            const days: number = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

            result.push({ startDate: startDate.toDateString(), endDate: endDate.toDateString(), days });
        }

        return result.sort((a, b) => b.days - a.days).slice(0, 5);
    }

    public getTop5PurchaseStreaks(): { startDate: string, endDate: string, days: number }[] {
        const times: number[] = this.getTimeOfOrdersSorted();
        const consecutiveOrderDates: string[][] = [];

        for (let i = 0; i < times.length; i++) {
            if (i === 0) {
                consecutiveOrderDates.push([new Date(times[i]).toDateString()]);
                continue;
            }

            const previousOrderDate: Date = new Date(times[i - 1]);
            const currentOrderDate: Date = new Date(times[i]);
            const dayDifference: number = Math.floor((currentOrderDate.getTime() - previousOrderDate.getTime()) / (1000 * 60 * 60 * 24));
            
            if (dayDifference >= 2) {
                consecutiveOrderDates.push([currentOrderDate.toDateString()]);
            } else {
                consecutiveOrderDates[consecutiveOrderDates.length - 1].push(currentOrderDate.toDateString());
            }
        }

        return consecutiveOrderDates
            .sort((a, b) => b.length - a.length)
            .slice(0, 5)
            .map(dates => {
                return { startDate: dates[0], endDate: dates[dates.length - 1], days: dates.length };
        });
    }
}
