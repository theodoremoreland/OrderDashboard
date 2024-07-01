// React
import { ReactElement, useState, useContext } from 'react';

// MUI
import FormControl from '@mui/material/FormControl';
import { NativeSelect } from '@mui/material';

// Custom
import Analytics from '../../classes/Analytics';

// Context
import { DisplaySettingsContext } from '../../contexts/DisplaySettingsProvider';

// Components
import Bar from '../Bar';

// Styles
import './TopStores.css';

interface Props {
    analytics: Analytics
    startDate: Date
    endDate: Date
}

const TopStores = ({ analytics, startDate, endDate }: Props): ReactElement => {
    const { topStoresCount } = useContext(DisplaySettingsContext);
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
                        .getTopStoresByTotalSpend(startDate, endDate, topStoresCount)
                        .map(obj => ({ key: obj.storeName, value: obj.totalSpend }))
                    }
                    xAxisFormatter={(value) => value?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) || ""}
                />
            }
            {
                barSelection === "totalOrders" &&
                <Bar
                    id="stores-by-total-orders"
                    title="Top Stores by Total Orders"
                    dataset={analytics
                        .getTopStoresByTotalOrders(startDate, endDate, topStoresCount)
                        .map(obj => ({ key: obj.storeName, value: obj.totalOrders }))
                    }
                    xAxisFormatter={(value) => value?.toLocaleString('en-US') || ""}
                />
            }
            {
                barSelection === "totalItemsPurchased" &&
                <Bar
                    id="stores-by-total-items-purchased"
                    title="Top Stores by Total Items Purchased"
                    dataset={analytics
                        .getTopStoresByTotalItemsPurchased(startDate, endDate, topStoresCount)
                        .map(obj => ({ key: obj.storeName, value: obj.totalItemsPurchased }))
                    }
                    xAxisFormatter={(value) => value?.toLocaleString('en-US') || ""}
                />
            }
            <div className="overlay"></div>
        </section>
    );
}

export default TopStores;
