// vitest
import { expect, test, describe } from 'vitest';

// Custom
import Analytics from "../classes/Analytics";
import mockOrders from './mocks/mockOrders';
import { MonthFormat } from '../types/types';

describe("Analytics", () => {
  new Analytics(mockOrders);

  test.only("should get accurate count of total purchases", () => {
    // 5 years of orders, one for each day (with two leap years) = 1827.
    expect(Analytics.getTotalPurchases()).toEqual(1827);
  });

  test.only("should get accurate total spent", () => {
    // $61.16 spent each day. Ceiling to nearest integer due to floating point inconsistencies.
    expect(Analytics.getTotalSpent()).toEqual(Math.ceil(61.16 * 1827));
  });

  test.only("should get accurate number of total items purchased", () => {
    // 5 items purchased each day.
    expect(Analytics.getTotalItemsPurchased()).toEqual(1827 * 5);
  });

  test.only("should get accurate number of stores purchased from", () => {
    expect(Analytics.getNumberOfStoresPurchasedFrom()).toEqual(25);
  });

  test.only("should get accurate total spent by day of week", () => {
    // 52 Fridays in 2020, 53 Fridays in 2021, 52 Fridays in 2022, 52 Fridays in 2023, 52 Fridays in 2024.
    expect(Analytics.getTotalSpendByDayOfWeek()["Fri"]).toEqual(Math.ceil(261 * 61.16));
  });

  test.only("should get accurate total spent by month", () => {
    // 31 days in Jan with $61.16 spent each day for 5 years = 9479.8.
    expect(Analytics.getTotalSpendByMonth(MonthFormat.January)).toEqual(Math.ceil(9479.8));
  });

  test.only("should get accurate totals for each year", () => {
    // 366 days in 2020 (leap year) = 366 * 61.16 = 22384.56.
    expect(Analytics.getTotalSpendByYear()[2020]).toEqual(Math.ceil(22384.56));
  });

  test.only("should get accurate number of days a purchase was made", () => {
    expect(Analytics.getTotalNumberOfDaysAPurchaseWasMade()).toEqual(1827);
  });

  test.only("should get top stores by total orders", () => {
    // Number of orders for a store per month * 5 years.
    // For example Applebee's has 4 orders per month, 4 * 12 * 5 = 240.
    expect(Analytics.getTopStoresByTotalOrders()).toEqual([
      { storeName: "Applebee's", totalOrders: 240 },
      { storeName: "Aldi", totalOrders: 120 },
      { storeName: "Tony's Donuts", totalOrders: 120 },
      { storeName: "Panda Express", totalOrders: 120 },
      { storeName: "Dierbergs", totalOrders: 60 },
    ]);
  });

  test.only("should get top stores by total items purchased", () => {
    // Number of items purchased per order time orders per month * 5 years.
    // All orders have 5 items. For Applebee's 5 * 4 * 12 * 5 = 1200.
    expect(Analytics.getTopStoresByTotalItemsPurchased()).toEqual([
      { storeName: "Applebee's", totalItemsPurchased: 1200 },
      { storeName: "Aldi", totalItemsPurchased: 600 },
      { storeName: "Tony's Donuts", totalItemsPurchased: 600 },
      { storeName: "Panda Express", totalItemsPurchased: 600 },
      { storeName: "Dierbergs", totalItemsPurchased: 300 },
    ]);
  });

  test.only("should get top stores by total spend", () => {
    // 61.16 * number of orders for store in a month * 12 * 5
    expect(Analytics.getTopStoresByTotalSpend()).toEqual([
      { storeName: "Applebee's", totalSpend: Math.ceil(14678.4) },
      { storeName: "Aldi", totalSpend: Math.ceil(7339.2) },
      { storeName: "Tony's Donuts", totalSpend: Math.ceil(7339.2) },
      { storeName: "Panda Express", totalSpend: Math.ceil(7339.2) },
      { storeName: "Dierbergs", totalSpend: Math.ceil(3669.6) },
    ]);
  });

  test.only("should return correct average spend per day", () => {
    const startDate: Date = new Date("Dec 1 2024");
    const endDate: Date = new Date("Dec 31 2024");
    const averageSpendPerDay: number = Analytics.getAverageSpendPerDay(startDate, endDate);

    expect(averageSpendPerDay).toEqual(Math.ceil(61.16));
  });

  test.only("should return correct average spend per week", () => {
    const startDate: Date = new Date("Dec 1 2024");
    const endDate: Date = new Date("Dec 31 2024");
    const averageSpendPerDay: number = Analytics.getAverageSpendPerWeek(startDate, endDate);

    expect(averageSpendPerDay).toEqual(Math.ceil(61.16 * 7));
  });

  test.only("should return correct average spend per month", () => {
    const averageSpendPerMonth: number = Analytics.getAverageSpendPerMonth(2024);

    expect(averageSpendPerMonth).toEqual(Math.ceil(61.16 * 30.5));
  });

  test.only("should return average spend per year", () => {
    const startYear: number = 2020;
    const endYear: number = 2024;
    const averageSpendPerYear: number = Analytics.getAverageSpendPerYear(startYear, endYear);

    // 1827 orders over 5 years = 365.4 orders per year.
    expect(averageSpendPerYear).toEqual(Math.ceil(61.16 * 365.4));
  });

  test("should get top 5 droughts between purchases", () => {
    const actualTop5droughts: { startDate: string, endDate: string, days: number }[]
      = Analytics.getTop5DroughtsBetweenPurchases();
    expect(actualTop5droughts).toEqual([
      { startDate: "2020-01-01", endDate: "2020-01-02", days: 1 },
      { startDate: "2020-01-02", endDate: "2020-01-03", days: 1 },
      { startDate: "2020-01-03", endDate: "2020-01-04", days: 1 },
      { startDate: "2020-01-04", endDate: "2020-01-05", days: 1 },
      { startDate: "2020-01-05", endDate: "2020-01-06", days: 1 },
    ]);
  });
});