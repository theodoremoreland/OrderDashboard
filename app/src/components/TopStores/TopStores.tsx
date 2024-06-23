// React
import { ReactElement, useState } from 'react';

// MUI
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { NativeSelect } from '@mui/material';

// Custom
import Analytics from '../../classes/Analytics';

// Components
import List from '../List';

// Styles
import './TopStores.css';

interface Props {
    analytics: Analytics
}

const TopStores = ({ analytics }: Props): ReactElement => {
    const [tableSelection, setTableSelection] = useState<"totalSpend" | "totalOrders" | "totalItemsPurchased">("totalSpend");

    return (
        <section className="TopStores">
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Top Stores By
                </InputLabel>
                <NativeSelect
                    value={tableSelection}
                    onChange={(e) => setTableSelection(e.target.value as "totalSpend" | "totalOrders" | "totalItemsPurchased")}
                    inputProps={{
                        name: 'topStoresBy',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value="totalSpend">Total Spend</option>
                    <option value="totalOrders">Total Orders</option>
                    <option value="totalItemsPurchased">Total Items Purchased</option>
                </NativeSelect>
            </FormControl>
            {
                tableSelection === "totalSpend" &&
                <List
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
                <List
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
                <List
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
