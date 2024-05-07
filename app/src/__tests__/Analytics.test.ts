import { expect, test, describe } from 'vitest'

import Analytics from "../classes/Analytics";
import mockOrders from './mocks/mockOrders';

describe("Analytics", () => {
  new Analytics(mockOrders);

  test("should get accurate count of total purchases", () => {
    expect(Analytics.getTotalPurchases()).toEqual(mockOrders.length);
  });

  test("should get accurate total spent", () => {
    expect(Analytics.getTotalSpent()).toEqual(450);
  });

  test("should get accurate number of total items purchased", () => {
    expect(Analytics.getTotalItemsPurchased()).toEqual(27);
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
});