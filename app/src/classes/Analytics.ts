import { Order } from "../types/types";
import generateObjectCalendar from "../modules/generateObjectCalendar";
import getPercentageOfYearPassedOnDate from "../modules/getPercentageOfYearPassedOnDate";

// TODO many of the methods in this class seem incredibly inefficient, namely the reuse of object calendar, repeated filters, and repeated iterations.
// TODO (cont.) Refactoring these in a vacuum would be trivial, however refactoring them to accommodate the needs of the React app requires more thought.
// TODO (cont.) Specifically, how can this be refactored such that a React state change to startDate and endDate triggers a re-calculation of the data?
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

    public getOrdersBetweenDates(startDate: Date, endDate: Date): (Omit<Order, 'date'> & { id: number, date: Date})[] {
        return this.orders
            .filter(order => {
                const orderDate: Date = order.date;

                return orderDate >= startDate && orderDate <= endDate;
            });
    }

    // ---------- !!!! Groups Bys !!!! ----------

    private groupByStore(startDate: Date, endDate: Date) {
        const dataFiltered: Order[] = this.data.filter(order => {
            const orderDate: Date = new Date(order.date);

            return orderDate >= startDate && orderDate <= endDate;
        });
        const results: { [key: string]: Order[] } = {};

        for (const order of dataFiltered) {
            if (!results[order.storeName]) {
                results[order.storeName] = [];
            }

            results[order.storeName].push(order);
        }

        return results;
    }

    private groupByDate(startDate: Date, endDate: Date) {
        const dataFiltered: Order[] = this.data.filter(order => {
            const orderDate: Date = new Date(order.date);

            return orderDate >= startDate && orderDate <= endDate;
        });
        const results: { [key: string]: Order[] } = {};

        for (const order of dataFiltered) {
            if (!results[order.date]) {
                results[order.date] = [];
            }

            results[order.date].push(order);
        }

        return results;
    }

    private groupByDayOfWeek(startDate: Date, endDate: Date) {
        const dataFiltered: Order[] = this.data.filter(order => {
            const orderDate: Date = new Date(order.date);

            return orderDate >= startDate && orderDate <= endDate;
        });
        const results: { [key: string]: Order[] } = {};

        for (const order of dataFiltered) {
            if (!results[order.dayOfWeek]) {
                results[order.dayOfWeek] = [];
            }

            results[order.dayOfWeek].push(order);
        }

        return results;
    }

    private groupByMonth(startDate: Date, endDate: Date) {
        const dataFiltered: Order[] = this.data.filter(order => {
            const orderDate: Date = new Date(order.date);

            return orderDate >= startDate && orderDate <= endDate;
        });
        const results: { [key: string]: Order[] } = {};

        for (const order of dataFiltered) {
            const month: string = order.date.split(" ")[0];
            const year: string = order.date.split(" ")[2];
            const monthYear: string = `${month} ${year}`;

            if (!results[monthYear]) {
                results[monthYear] = [];
            }

            results[monthYear].push(order);
        }

        return results;
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

    private getTimeOfOrdersSorted(startDate: Date, endDate: Date): number[] {
        return this.data
        .filter(order => {
            const orderDate: Date = new Date(order.date);

            return orderDate >= startDate && orderDate <= endDate;
        })
        .map(order => new Date(order.date).getTime()).sort((a, b) => a - b);
    }
                        
    // ---------- !!!! Aggregates !!!! ----------

    public getTotalPurchases(startDate: Date, endDate: Date): number {
        return this.data.filter(order => {
            const orderDate: Date = new Date(order.date);

            return orderDate >= startDate && orderDate <= endDate;
        }).length;
    }

    public getTotalSpent(startDate: Date, endDate: Date): number {
        const dataFiltered: Order[] = this.data.filter(order => {
            const orderDate: Date = new Date(order.date);

            return orderDate >= startDate && orderDate <= endDate;
        });
        let total: number = 0;

        for (const order of dataFiltered) {
            total += order.cost;
        }

        return +(total).toFixed(2);
    }

    public getTotalNumberOfDaysAPurchaseWasMade(startDate: Date, endDate: Date): number {
        const dataFiltered: Order[] = this.data.filter(order => {
            const orderDate: Date = new Date(order.date);

            return orderDate >= startDate && orderDate <= endDate;
        });
        const days = new Set();

        for (const order of dataFiltered) {
            days.add(order.date);
        }

        return days.size;
    }

    public getTotalItemsPurchased(startDate: Date, endDate: Date): number {
        const dataFiltered: Order[] = this.data.filter(order => {
            const orderDate: Date = new Date(order.date);

            return orderDate >= startDate && orderDate <= endDate;
        });
        let total = 0;

        for (const order of dataFiltered) {
            total += order.itemCount;
        }

        return total;
    }

    public getNumberOfStoresPurchasedFrom(startDate: Date, endDate: Date): number {
        return Object.keys(this.groupByStore(startDate, endDate)).length;
    }

    public getTotalSpendByDayOfWeek(startDate: Date, endDate: Date): { [key: string]: number } {
        const data = this.groupByDayOfWeek(startDate, endDate);
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

    public getTotalSpendByMonth(startDate: Date, endDate: Date): { [key: string]: number } {
        const data = this.groupByMonth(startDate, endDate);
        const validMonths: string[] = Object.keys(data);
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

    public getTopStoresByTotalSpend(startDate: Date, endDate: Date, limit: number = 5): { storeName: string, totalSpend: number }[] {
        const data = this.groupByStore(startDate, endDate);
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

    public getTopStoresByTotalOrders(startDate: Date, endDate: Date, limit: number = 5): { storeName: string, totalOrders: number }[] {
        const data = this.groupByStore(startDate, endDate);
        const result: { storeName: string, totalOrders: number }[] = [];

        for (const store in data) {
            result.push({ storeName: store, totalOrders: data[store].length });
        }

        return result
            .sort((a, b) => b.totalOrders - a.totalOrders)
            .slice(0, limit);
    }

    public getTopStoresByTotalItemsPurchased(startDate: Date, endDate: Date, limit: number = 5): { storeName: string, totalItemsPurchased: number }[] {
        const data = this.groupByStore(startDate, endDate);
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
        const data: {[key: string]: Order[]} = this.groupByDate(startDate, endDate);
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
        const data: {[key: string]: Order[]} = this.groupByDate(startDate, endDate);
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
        const data: {[key: string]: Order[]} = this.groupByDate(startDate, endDate);
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
        const data: {[key: string]: Order[]} = this.groupByDate(startDate, endDate);
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

    public getDataMappedToCalendar(startDate: Date, endDate: Date): { date: string, totalSpend: number, totalOrders: number, totalItems: number }[] {
        const objectCalendar = generateObjectCalendar(startDate, endDate);
        const ordersByDate: {[key: string]: Order[]} = this.groupByDate(startDate, endDate);
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

    public getTopDroughtsBetweenPurchases(startDate: Date, endDate: Date, limit: number = 5): { startDate: string, endDate: string, days: number }[] {
        const times: number[] = this.getTimeOfOrdersSorted(startDate, endDate);
        const result: { startDate: string, endDate: string, days: number }[] = [];

        for (let i = 0; i < times.length - 1; i++) {
            const startDate: Date = new Date(times[i]);
            const endDate: Date = new Date(times[i + 1]);
            const days: number = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

            result.push({ startDate: startDate.toDateString(), endDate: endDate.toDateString(), days });
        }

        return result.sort((a, b) => b.days - a.days).slice(0, limit);
    }

    public getTopPurchaseStreaks(startDate: Date, endDate: Date, limit: number = 5): { startDate: string, endDate: string, days: number }[] {
        const times: number[] = [...new Set(this.getTimeOfOrdersSorted(startDate, endDate))]; // Remove duplicates given some days have multiple orders.
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
