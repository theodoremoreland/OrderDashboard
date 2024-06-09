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

  test("should get accurate total spent", () => {
    expect(Analytics.getTotalSpent()).toEqual(450);
  });

  test.only("should get accurate number of total items purchased", () => {
    // 5 items purchased each day.
    expect(Analytics.getTotalItemsPurchased()).toEqual(1827 * 5);
  });

  test("should get accurate number of stores purchased from", () => {
    expect(Analytics.getNumberOfStoresPurchasedFrom()).toEqual(9);
  });

  test("should get accurate total spent by day of week", () => {
    expect(Analytics.getTotalSpendByDayOfWeek()["Fri"]).toEqual(450);
  });

  test("should get accurate total spent by month", () => {
    expect(Analytics.getTotalSpendByMonth()["Jan"]).toEqual(450);
  });

  test("should get accurate totals for each year", () => {
      expect(Analytics.getTotalSpendByYear()[2020]).toEqual(450);
  });

  test("should get top stores by total spend", () => {
    expect(Analytics.getTopStoresByTotalSpend()).toEqual([
      { storeName: "Walmart", total: 150 },
      { storeName: "Walgreens", total: 50 },
      { storeName: "Aldi", total: 50 },
      { storeName: "Dierbergs", total: 50 },
      { storeName: "Target", total: 50 },
      { storeName: "Schnucks", total: 50 },
      { storeName: "Amazon", total: 50 },
      { storeName: "Whole Foods", total: 50 },
      { storeName: "Trader Joe's", total: 50 },
    ]);
  });
});