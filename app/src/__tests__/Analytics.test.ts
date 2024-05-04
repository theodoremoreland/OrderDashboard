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
});