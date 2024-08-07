// React
import { ReactElement, useState, useContext } from 'react';

// MUI
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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
    const { barChartsCount } = useContext(DisplaySettingsContext);
    const [barSelection, setBarSelection] = useState<"totalSpend" | "totalOrders" | "totalItemsPurchased">("totalSpend");

    return (
        <section className="TopStores">
            <div className='heading'>
                <h2>Top Stores</h2>
                <FormControl
                    variant="standard"
                    size="small"
                    sx={{ minWidth: 150 }}
                >
                    <Select
                        sx={{ color: '#feffff' }}
                        value={barSelection}
                        onChange={(e) => setBarSelection(e.target.value as "totalSpend" | "totalOrders" | "totalItemsPurchased")}
                        inputProps={{
                            name: 'Top Stores by',
                            id: 'uncontrolled-native',
                        }}
                    >
                        <MenuItem value="totalSpend">by Total Spend</MenuItem>
                        <MenuItem value="totalOrders">by Total Orders</MenuItem>
                        <MenuItem value="totalItemsPurchased">by Total Items</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {
                barSelection === "totalSpend" &&
                <Bar
                    id="stores-by-total-spend"
                    title="Top Stores by Total Spend"
                    dataset={analytics
                        .getTopStoresByTotalSpend(startDate, endDate, barChartsCount)
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
                        .getTopStoresByTotalOrders(startDate, endDate, barChartsCount)
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
                        .getTopStoresByTotalItemsPurchased(startDate, endDate, barChartsCount)
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
