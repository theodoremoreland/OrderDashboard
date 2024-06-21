// React
import { ReactElement, useState } from 'react';

// Custom
import Analytics from '../../classes/Analytics';

// Components
import Table from '../Table';

// Styles
import './TopStores.css';

interface Props {
    analytics: Analytics
}

const TopStores = ({ analytics }: Props): ReactElement => {
    const [tableSelection] = useState<"totalSpend" | "totalOrders" | "totalItemsPurchased">("totalSpend");

    return (
        <section className="TopStores">
            {
                tableSelection === "totalSpend" &&
                <Table
                    id="stores-by-total-spend"
                    title="Top Stores by Total Spend"
                    data={analytics
                        .getTopStoresByTotalSpend()
                        .map(obj => ({ key: obj.storeName, value: obj.totalSpend.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }))
                    }
                />
            }
            {
                tableSelection === "totalOrders" &&
                <Table
                    id="stores-by-total-orders"
                    title="Top Stores by Total Orders"
                    data={analytics
                        .getTopStoresByTotalOrders()
                        .map(obj => ({ key: obj.storeName, value: obj.totalOrders }))
                    }
                />
            }
            {
                tableSelection === "totalItemsPurchased" &&
                <Table
                    id="stores-by-total-items-purchased"
                    title="Top Stores by Total Items Purchased"
                    data={analytics
                        .getTopStoresByTotalItemsPurchased()
                        .map(obj => ({ key: obj.storeName, value: obj.totalItemsPurchased }))
                    }
                />
            }
        </section>
    );
}

export default TopStores;
