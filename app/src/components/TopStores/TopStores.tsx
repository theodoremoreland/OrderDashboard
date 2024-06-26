// React
import { ReactElement, useState } from 'react';

// Custom
import Analytics from '../../classes/Analytics';

// Components
import Bar from '../Bar';

// Styles
import './TopStores.css';

interface Props {
    analytics: Analytics
}

const TopStores = ({ analytics }: Props): ReactElement => {
    const [barSelection, setBarSelection] = useState<"totalSpend" | "totalOrders" | "totalItemsPurchased">("totalSpend");

    return (
        <section className="TopStores">
            <ul className="title-selector">
                <li
                    className={barSelection === "totalSpend" ? "selected" : ""}
                    onClick={() => setBarSelection("totalSpend")}
                >
                        Total Spend
                </li>
                <li
                    className={barSelection === "totalOrders" ? "selected" : ""}
                    onClick={() => setBarSelection("totalOrders")}
                >
                        Total Orders
                </li>
                <li
                    className={barSelection === "totalItemsPurchased" ? "selected" : ""}
                    onClick={() => setBarSelection("totalItemsPurchased")}
                >
                        Total Items Purchased
                </li>
            </ul>
            {
                barSelection === "totalSpend" &&
                <Bar
                    id="stores-by-total-spend"
                    title="Top Stores by Total Spend"
                    dataset={analytics
                        .getTopStoresByTotalSpend(7)
                        .map(obj => ({ key: obj.storeName, value: obj.totalSpend }))
                    }
                />
            }
            {
                barSelection === "totalOrders" &&
                <Bar
                    id="stores-by-total-orders"
                    title="Top Stores by Total Orders"
                    dataset={analytics
                        .getTopStoresByTotalOrders(7)
                        .map(obj => ({ key: obj.storeName, value: obj.totalOrders }))
                    }
                />
            }
            {
                barSelection === "totalItemsPurchased" &&
                <Bar
                    id="stores-by-total-items-purchased"
                    title="Top Stores by Total Items Purchased"
                    dataset={analytics
                        .getTopStoresByTotalItemsPurchased(7)
                        .map(obj => ({ key: obj.storeName, value: obj.totalItemsPurchased }))
                    }
                />
            }
        </section>
    );
}

export default TopStores;
