// vitest
import { expect, test, describe } from 'vitest';

// Custom
import Analytics from "../classes/Analytics";
import mockOrders from '../mocks/mockOrders';

describe("Analytics", () => {
  const analytics: Analytics = new Analytics(mockOrders);

  test.only("should get accurate count of total purchases", () => {
    // 5 years of orders, one for each day (with two leap years) = 1827.
    expect(analytics.getTotalPurchases()).toEqual(1827);
  });

  test.only("should get accurate total spent", () => {
    // $61.16 spent each day. Ceiling to nearest integer due to floating point inconsistencies.
    expect(analytics.getTotalSpent()).toEqual(Math.ceil(61.16 * 1827));
  });

  test.only("should get accurate number of total items purchased", () => {
    // 5 items purchased each day.
    expect(analytics.getTotalItemsPurchased()).toEqual(1827 * 5);
  });

  test.only("should get accurate number of stores purchased from", () => {
    expect(analytics.getNumberOfStoresPurchasedFrom()).toEqual(25);
  });

  test.only("should get accurate total spent by day of week", () => {
    // 52 Fridays in 2020, 53 Fridays in 2021, 52 Fridays in 2022, 52 Fridays in 2023, 52 Fridays in 2024.
    expect(analytics.getTotalSpendByDayOfWeek()["Fri"]).toEqual(Math.ceil(261 * 61.16));
  });

  // TODO: Fix this test.
  test.only("should get accurate total spent by month", () => {
    // 31 days in Jan with $61.16 spent each day for 5 years = 9479.8.
    const actualTotalSpend2024Months = analytics.getTotalSpendByMonth(2024);
    const actualTotalSpendAllMonths = analytics.getTotalSpendByMonth();
    
    expect(actualTotalSpendAllMonths).toEqual({
      Jan: Math.ceil(61.16 * 31 * 5),
      Feb: Math.ceil(61.16 * 142), // Testing failing on this. Off by 2.
      Mar: Math.ceil(61.16 * 31) * 5,
      Apr: Math.ceil(61.16 * 30) * 5,
      May: Math.ceil(61.16 * 31) * 5,
      Jun: Math.ceil(61.16 * 30) * 5,
      Jul: Math.ceil(61.16 * 31) * 5,
      Aug: Math.ceil(61.16 * 31) * 5,
      Sep: Math.ceil(61.16 * 30) * 5,
      Oct: Math.ceil(61.16 * 31) * 5,
      Nov: Math.ceil(61.16 * 30) * 5,
      Dec: Math.ceil(61.16 * 31) * 5,
    });
    expect(actualTotalSpend2024Months).toEqual({
      Jan: Math.ceil(61.16 * 31),
      Feb: Math.ceil(61.16 * 29),
      Mar: Math.ceil(61.16 * 31),
      Apr: Math.ceil(61.16 * 30),
      May: Math.ceil(61.16 * 31),
      Jun: Math.ceil(61.16 * 30),
      Jul: Math.ceil(61.16 * 31),
      Aug: Math.ceil(61.16 * 31),
      Sep: Math.ceil(61.16 * 30),
      Oct: Math.ceil(61.16 * 31),
      Nov: Math.ceil(61.16 * 30),
      Dec: Math.ceil(61.16 * 31),
    });
  });

  test.only("should get accurate totals for each year", () => {
    // 366 days in 2020 (leap year) = 366 * 61.16 = 22384.56.
    expect(analytics.getTotalSpendByYear()[2020]).toEqual(Math.ceil(22384.56));
  });

  test.only("should get accurate number of days a purchase was made", () => {
    expect(analytics.getTotalNumberOfDaysAPurchaseWasMade()).toEqual(1827);
  });

  test.only("should get top stores by total orders", () => {
    // Number of orders for a store per month * 5 years.
    // For example Applebee's has 4 orders per month, 4 * 12 * 5 = 240.
    expect(analytics.getTopStoresByTotalOrders()).toEqual([
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
    expect(analytics.getTopStoresByTotalItemsPurchased()).toEqual([
      { storeName: "Applebee's", totalItemsPurchased: 1200 },
      { storeName: "Aldi", totalItemsPurchased: 600 },
      { storeName: "Tony's Donuts", totalItemsPurchased: 600 },
      { storeName: "Panda Express", totalItemsPurchased: 600 },
      { storeName: "Dierbergs", totalItemsPurchased: 300 },
    ]);
  });

  test.only("should get top stores by total spend", () => {
    // 61.16 * number of orders for store in a month * 12 * 5
    expect(analytics.getTopStoresByTotalSpend()).toEqual([
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
    const averageSpendPerDay: number = analytics.getAverageSpendPerDay(startDate, endDate);

    expect(averageSpendPerDay).toEqual(Math.ceil(61.16));
  });

  test.only("should return correct average number of purchases per day", () => {
    const startDate: Date = new Date("Jan 1 2020");
    const endDate: Date = new Date("Dec 31 2024");
    const averagePurchasesPerDay: number = analytics.getAverageNumberOfPurchasesPerDay(startDate, endDate);

    expect(averagePurchasesPerDay).toEqual(1);
  });

  test.only("should return correct average spend per week", () => {
    const startDate: Date = new Date("Dec 1 2024");
    const endDate: Date = new Date("Dec 31 2024");
    const averageSpendPerDay: number = analytics.getAverageSpendPerWeek(startDate, endDate);

    expect(averageSpendPerDay).toEqual(Math.ceil(61.16 * 7));
  });

  test.only("should return average number of purchases made per week", () => {
    const startDate: Date = new Date("Jan 1 2020");
    const endDate: Date = new Date("Dec 31 2024");
    const averagePurchasesPerWeek: number = analytics.getAverageNumberOfPurchasesPerWeek(startDate, endDate);

    expect(averagePurchasesPerWeek).toEqual(7);
  });

  test.only("should return correct average spend per month", () => {
    const averageSpendPerMonth: number = analytics.getAverageSpendPerMonth(2024);

    expect(averageSpendPerMonth).toEqual(Math.ceil(61.16 * 30.5));
  });

  test.only("should return average number of purchases made per month", () => {
    const averagePurchasesPerMonth: number = analytics.getAverageNumberOfPurchasesPerMonth();

    // Should be equal to the average number of days.
    expect(averagePurchasesPerMonth).toEqual(30.45);
  });

  test.only("should return average spend per year", () => {
    const startYear: number = 2020;
    const endYear: number = 2024;
    const averageSpendPerYear: number = analytics.getAverageSpendPerYear(startYear, endYear);

    // 1827 orders over 5 years = 365.4 orders per year.
    expect(averageSpendPerYear).toEqual(Math.ceil(61.16 * 365.4));
  });

  test.only("should return average number of purchases made per year", () => {
    const startYear: number = 2020;
    const endYear: number = 2024;
    const averagePurchasesPerYear: number = analytics.getAverageNumberOfPurchasesPerYear(startYear, endYear);

    // Should be equal to the average number of days.
    expect(averagePurchasesPerYear).toEqual(365.4);
  });

  test.only("should return totals per day mapped to calendar", () => {
    const data: { 
      date: string;
      totalSpend: number;
      totalOrders: number;
      totalItems: number}[] = analytics.getDataMappedToCalendar();
    const dates: string[] = data.map(obj => obj.date);
    const totalSpend: number = data.reduce((acc, curr) => acc + curr.totalSpend, 0);
    const totalItems: number = data.reduce((acc, curr) => acc + curr.totalItems, 0);
    const totalOrders: number = data.reduce((acc, curr) => acc + curr.totalOrders, 0);

    expect(dates.slice(0, 5)).toEqual([
      "Jan 1 2020",
      "Jan 2 2020",
      "Jan 3 2020",
      "Jan 4 2020",
      "Jan 5 2020",
    ]);
    expect(Math.ceil(totalSpend)).toEqual(Math.ceil(61.16 * 1827));
    expect(totalItems).toEqual(1827 * 5);
    expect(totalOrders).toEqual(1827);
    expect(data.length).toEqual(1827);
  });

  test.only("should get top 5 droughts between purchases", () => {
    const actualTop5droughts: { startDate: string, endDate: string, days: number }[]
      = analytics.getTop5DroughtsBetweenPurchases();

    expect(actualTop5droughts).toEqual([
      { startDate: "Wed Jan 01 2020", endDate: "Thu Jan 02 2020", days: 1 },
      { startDate: "Thu Jan 02 2020", endDate: "Fri Jan 03 2020", days: 1 },
      { startDate: "Fri Jan 03 2020", endDate: "Sat Jan 04 2020", days: 1 },
      { startDate: "Sat Jan 04 2020", endDate: "Sun Jan 05 2020", days: 1 },
      { startDate: "Sun Jan 05 2020", endDate: "Mon Jan 06 2020", days: 1 },
    ]);
  });

  test.only("should get top 5 purchase streaks", () => {
    const actualTop5PurchaseStreaks: { startDate: string, endDate: string, days: number }[]
      = analytics.getTop5PurchaseStreaks();
    
    expect(actualTop5PurchaseStreaks).toEqual([
      { startDate: "Wed Jan 01 2020", endDate: "Tue Dec 31 2024", days: 1827 },
    ]);
  });
});