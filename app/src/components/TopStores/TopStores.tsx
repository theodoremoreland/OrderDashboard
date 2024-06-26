// React
import { ReactElement, useState } from 'react';

// MUI
import FormControl from '@mui/material/FormControl';
import { NativeSelect } from '@mui/material';

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
            {/* <FormControl fullWidth>
                <NativeSelect
                    value={barSelection}
                    onChange={(e) => setBarSelection(e.target.value as "totalSpend" | "totalOrders" | "totalItemsPurchased")}
                    inputProps={{
                        name: 'topStoresBy',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value="totalSpend">Total Spend</option>
                    <option value="totalOrders">Total Orders</option>
                    <option value="totalItemsPurchased">Total Items Purchased</option>
                </NativeSelect>
            </FormControl> */}
            <ul className="title-selector">
                <li>
                    <button
                        className={barSelection === "totalSpend" ? "selected" : ""}
                        onClick={() => setBarSelection("totalSpend")}
                    >
                        Total Spend
                    </button>
                </li>
                <li>
                    <button
                        className={barSelection === "totalOrders" ? "selected" : ""}
                        onClick={() => setBarSelection("totalOrders")}
                    >
                        Total Orders
                    </button>
                </li>
                <li>
                    <button
                        className={barSelection === "totalItemsPurchased" ? "selected" : ""}
                        onClick={() => setBarSelection("totalItemsPurchased")}
                    >
                        Total Items Purchased
                    </button>
                </li>
            </ul>
            {
                barSelection === "totalSpend" &&
                <Bar
                    id="stores-by-total-spend"
                    title="Top Stores by Total Spend"
                    dataset={analytics
                        .getTopStoresByTotalSpend(10)
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
                        .getTopStoresByTotalOrders(10)
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
                        .getTopStoresByTotalItemsPurchased(10)
                        .map(obj => ({ key: obj.storeName, value: obj.totalItemsPurchased }))
                    }
                />
            }
        </section>
    );
}

export default TopStores;
