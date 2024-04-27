
interface Order {
    "storeName": string,
    /** String of format: Oct 13 2023 */
    "date": string,
    "cost": number,
    "itemCount": number,
    "items": string[],
    "wasCancelled": boolean,
    "dayOfWeek": "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat"
}


export default class Analytics {
    private static data: Order[];

    constructor(data: Order[]) {
        Analytics.data = data;
    }

    public static getTotalPurchases() {
        return Analytics.data.length;
    }

    public static getTotalSpent() {
        let total = 0;

        for (const order of Analytics.data) {
            total += order.cost;
        }

        return total;
    }

    public static getTotalNumberOfDaysAPurchaseWasMade() {
        const days = new Set();

        for (const order of Analytics.data) {
            days.add(order.date);
        }

        return days.size;
    }
}
