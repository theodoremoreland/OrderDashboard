import { Order } from "../types/types";
import generateObjectCalendar from "../modules/generateObjectCalendar";
import getPercentageOfYearPassedOnDate from "../modules/getPercentageOfYearPassedOnDate";

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

    public get orders(): (Omit<Order, 'date'> & { id: number, date: Date})[] {
        return this.data.map((order, id) => {
            return {
                ...order,
                id: id + 1,
                date: new Date(order.date)
            }
        });
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

        return +(total).toFixed(2);
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

            result[day] = +(result[day].toFixed(2));
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

            result[month] = +(result[month].toFixed(2));
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

            result[year] = +(result[year].toFixed(2));
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

            total = +(total).toFixed(2);

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

        return +(sum / objectCalendar.length).toFixed(2);
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

        return +(sum / (objectCalendar.length / 7)).toFixed(2);
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

    // TODO: Need to update unit tests for this method.
    public getAverageSpendPerMonth(startDate: Date, endDate: Date): number {
        const averageSpendPerYear: number = this.getAverageSpendPerYear(startDate, endDate);
        const averageSpendPerMonth: number = averageSpendPerYear / 12;

        return +(averageSpendPerMonth).toFixed(2);
    }

    // TODO: Need to update unit tests for this method.
    public getAverageNumberOfPurchasesPerMonth(startDate: Date, endDate: Date): number {
        const averageNumberOfPurchasesPerYear: number = this.getAverageNumberOfPurchasesPerYear(startDate, endDate);
        const averageNumberOfPurchasesPerMonth: number = averageNumberOfPurchasesPerYear / 12;

        return +(averageNumberOfPurchasesPerMonth).toFixed(2);
    }

    // TODO: Need to update unit tests for this method.
    public getAverageSpendPerYear(startDate: Date, endDate: Date): number {
        const data: {[key: number]: Order[]} = this.groupByYear();
        const validYears: string[] = Object.keys(data).filter(year => {
            return startDate.getFullYear() <= Number(year) && endDate.getFullYear() >= Number(year);
        });
        const numberOfYears: number = validYears.reduce((acc, curr) => {
            if (curr === startDate.getFullYear().toString()) {

                /**
                 * Subtract the percentage of the year that was skipped since the start date
                 * from 1 to get the percentage remaining in the year (i.e. 
                 * the amount of the year actually featuring the order data this function is concerned with).
                 */
                return acc + (1 - getPercentageOfYearPassedOnDate(startDate) / 100);
            } else if (curr === endDate.getFullYear().toString()) {
                    
                    /**
                    * Add the percentage of the year that has passed given the end date
                    * instead of adding 1 because 1 whole year may not have passed by the end date.
                    */
                    return acc + getPercentageOfYearPassedOnDate(endDate) / 100;
                } else {
                    return acc + 1;
                }
        }, 0);
        let sum: number = 0;

        for (const year of validYears) {
            const orders: Order[] = data[Number(year)];

            for (const order of orders) {
                sum += order.cost;
            }
        }

        return +(sum / numberOfYears).toFixed(2);
    }

    // TODO: Need to update unit tests for this method.
    public getAverageNumberOfPurchasesPerYear(startDate: Date, endDate: Date): number {
        const data: {[key: number]: Order[]} = this.groupByYear();
        const validYears: string[] = Object.keys(data).filter(year => {
            return startDate.getFullYear() <= Number(year) && endDate.getFullYear() >= Number(year);
        });
        const numberOfYears: number = validYears.reduce((acc, curr) => {
            if (curr === startDate.getFullYear().toString()) {

                /**
                 * Subtract the percentage of the year that was skipped since the start date
                 * from 1 to get the percentage remaining in the year (i.e. 
                 * the amount of the year actually featuring the order data this function is concerned with).
                 */
                return acc + (1 - getPercentageOfYearPassedOnDate(startDate) / 100);
            } else if (curr === endDate.getFullYear().toString()) {
                    
                    /**
                    * Add the percentage of the year that has passed given the end date
                    * instead of adding 1 because 1 whole year may not have passed by the end date.
                    */
                    return acc + getPercentageOfYearPassedOnDate(endDate) / 100;
                } else {
                    return acc + 1;
                }
        }, 0);
        let totalNumberOfPurchases: number = 0;

        for (const year of validYears) {
            const orders: Order[] = data[Number(year)];

            totalNumberOfPurchases += orders.length;
        }

        return +(totalNumberOfPurchases / numberOfYears).toFixed(2);
    }

    public getDataMappedToCalendar(): { date: string, totalSpend: number, totalOrders: number, totalItems: number }[] {
        const startDate: Date = new Date(this.data[0].date);
        const endDate: Date = new Date();
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

    public getTopDroughtsBetweenPurchases(limit: number = 5): { startDate: string, endDate: string, days: number }[] {
        const times: number[] = this.getTimeOfOrdersSorted();
        const result: { startDate: string, endDate: string, days: number }[] = [];

        for (let i = 0; i < times.length - 1; i++) {
            const startDate: Date = new Date(times[i]);
            const endDate: Date = new Date(times[i + 1]);
            const days: number = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

            result.push({ startDate: startDate.toDateString(), endDate: endDate.toDateString(), days });
        }

        return result.sort((a, b) => b.days - a.days).slice(0, limit);
    }

    public getTopPurchaseStreaks(limit: number = 5): { startDate: string, endDate: string, days: number }[] {
        const times: number[] = [...new Set(this.getTimeOfOrdersSorted())]; // Remove duplicates given some days have multiple orders.
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
            .slice(0, limit)
            .map(dates => {
                return { startDate: dates[0], endDate: dates[dates.length - 1], days: dates.length };
        });
    }
}
