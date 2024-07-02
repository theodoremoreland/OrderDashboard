import { Order } from "../types/types";
import generateObjectCalendar from "./generateObjectCalendar";
import _storeData from "../mocks/stores.json";

const storeData = _storeData as { [storeName: string]: { items: string[] }};
const storeNames: string[] = Object.keys(storeData);

const randomDay: number = Math.floor(Math.random() * 28) + 1;
const randomMonth: number = Math.floor(Math.random() * 12) + 1;
const randomYear: number = Math.floor(Math.random() * 10) + 2013;

const randomStartDate: Date = new Date(randomYear, randomMonth, randomDay);
const endDate: Date = new Date();

const objectCalendar = generateObjectCalendar(randomStartDate, endDate);

const generateRandomOrderCost = (min: number, max: number, numberOfItems: number): number => {
    return +(((Math.random() * (max - min + 1)) + min) * numberOfItems).toFixed(2);
};

const getRandomItem = (items: string[]): string => {
    return items[Math.floor(Math.random() * items.length)];
}

const getRandomItemCount = (min: number = 5, max: number = 50): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomStore = () => {
    const storeName: string = storeNames[Math.floor(Math.random() * storeNames.length)];
    const storeItems = [];
    let itemCount = 0;

    while (itemCount < getRandomItemCount(3, storeData[storeName].items.length)) {
        storeItems.push(getRandomItem(storeData[storeName].items));
        itemCount++;
    }
    
    return {
        storeName,
        items: storeItems,
    }
}

const shouldGenerateOrder = (): boolean => {
    return Math.random() < 0.74;
}

const shouldGenerateSecondOrder = (): boolean => {
    return Math.random() < 0.08;
}

const shouldGenerateThirdOrder = (): boolean => {
    return Math.random() < 0.078;
}

export const generateRandomOrderData = (): Order | { date: string, dayOfWeek: string }[] => {
    const orders: Order[] = [];

    for (const orderSlot of objectCalendar) {
        
        if (shouldGenerateOrder()) {
            const { storeName, items } = getRandomStore();
            const order: Order = {
                cost: generateRandomOrderCost(3, 23, items.length),
                storeName,
                items,
                itemCount: items.length,
                ...orderSlot,
                wasCancelled: false,
            };
    
            orders.push(order);
        } else {
            continue;
        }

        if (shouldGenerateSecondOrder()) {
            const { storeName, items } = getRandomStore();
            const order: Order = {
                cost: generateRandomOrderCost(3, 20, items.length),
                storeName,
                items,
                itemCount: items.length,
                ...orderSlot,
                wasCancelled: false,
            };
    
            orders.push(order);
        } else {
            continue;
        }

        if (shouldGenerateThirdOrder()) {
            const { storeName, items } = getRandomStore();
            const order: Order = {
                cost: generateRandomOrderCost(3, 20, items.length),
                storeName,
                items,
                itemCount: items.length,
                ...orderSlot,
                wasCancelled: false,
            };
    
            orders.push(order);
        } else {
            continue;
        }
    }

    return orders;
};
