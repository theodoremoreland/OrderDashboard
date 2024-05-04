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
});