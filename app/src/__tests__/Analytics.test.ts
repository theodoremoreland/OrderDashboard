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

  test("should get top stores by total orders", () => {
    expect(Analytics.getTopStoresByTotalOrders()).toEqual([
      { storeName: "Applebee's", totalOrders: 150 },
      { storeName: "Aldi", totalOrders: 50 },
      { storeName: "Tony's Donuts", totalOrders: 50 },
      { storeName: "Panda Express", totalOrders: 50 },
      { storeName: "Dierbergs", totalOrders: 50 },
      { storeName: "Panera Bread", totalOrders: 50 },
      { storeName: "Chic Fil A", totalOrders: 50 },
      { storeName: "Culver's", totalOrders: 50 },
      { storeName: "Walgreens", totalOrders: 50 },
    ]);
  });

  test("should get top stores by total items purchased", () => {
    expect(Analytics.getTopStoresByTotalItemsPurchased()).toEqual([
      { storeName: "Applebee's", totalItemsPurchased: 150 },
      { storeName: "Aldi", totalItemsPurchased: 50 },
      { storeName: "Tony's Donuts", totalItemsPurchased: 50 },
      { storeName: "Panda Express", totalItemsPurchased: 50 },
      { storeName: "Dierbergs", totalItemsPurchased: 50 },
      { storeName: "Panera Bread", totalItemsPurchased: 50 },
      { storeName: "Chic Fil A", totalItemsPurchased: 50 },
      { storeName: "Culver's", totalItemsPurchased: 50 },
      { storeName: "Walgreens", totalItemsPurchased: 50 },
    ]);
  });

  test("should get top stores by total spend", () => {
    expect(Analytics.getTopStoresByTotalSpend()).toEqual([
      { storeName: "Applebee's", totalSpend: 150 },
      { storeName: "Aldi", totalSpend: 50 },
      { storeName: "Tony's Donuts", totalSpend: 50 },
      { storeName: "Panda Express", totalSpend: 50 },
      { storeName: "Dierbergs", totalSpend: 50 },
      { storeName: "Panera Bread", totalSpend: 50 },
      { storeName: "Chic Fil A", totalSpend: 50 },
      { storeName: "Culver's", totalSpend: 50 },
      { storeName: "Walgreens", totalSpend: 50 },
    ]);
  });
});