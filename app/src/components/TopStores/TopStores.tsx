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
            <div className='heading'>
                <h2>Top Stores</h2>
                <FormControl
                    size="small"
                    sx={{ minWidth: 150 }}
                >
                    <NativeSelect
                        sx={{ color: '#feffff' }}
                        value={barSelection}
                        onChange={(e) => setBarSelection(e.target.value as "totalSpend" | "totalOrders" | "totalItemsPurchased")}
                        inputProps={{
                            name: 'Top Stores by',
                            id: 'uncontrolled-native',
                        }}
                    >
                        <option value="totalSpend">by Total Spend</option>
                        <option value="totalOrders">by Total Orders</option>
                        <option value="totalItemsPurchased">by Total Items</option>
                    </NativeSelect>
                </FormControl>
            </div>
            {
                barSelection === "totalSpend" &&
                <Bar
                    id="stores-by-total-spend"
                    title="Top Stores by Total Spend"
                    dataset={analytics
                        .getTopStoresByTotalSpend(5)
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
                        .getTopStoresByTotalOrders(5)
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
                        .getTopStoresByTotalItemsPurchased(5)
                        .map(obj => ({ key: obj.storeName, value: obj.totalItemsPurchased }))
                    }
                />
            }
            <div className="overlay"></div>
        </section>
    );
}

export default TopStores;
