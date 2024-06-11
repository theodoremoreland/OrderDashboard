// vitest
import { expect, test, describe } from 'vitest';

// Custom
import Analytics from "../classes/Analytics";
import mockOrders from './mocks/mockOrders';

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
    expect(Analytics.getTotalSpendByMonth()["Jan"]).toEqual(Math.ceil(9479.8));
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

  test("should get top stores by total spend", () => {
    expect(Analytics.getTopStoresByTotalSpend()).toEqual([
      { storeName: "Applebee's", totalOrders: 240 },
      { storeName: "Aldi", totalOrders: 50 },
      { storeName: "Tony's Donuts", totalOrders: 50 },
      { storeName: "Panda Express", totalOrders: 50 },
      { storeName: "Dierbergs", totalOrders: 50 },
    ]);
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
  })
});