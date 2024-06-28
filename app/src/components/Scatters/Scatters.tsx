// React
import { ReactElement, useState } from 'react';

// MUI
import FormControl from '@mui/material/FormControl';
import { NativeSelect } from '@mui/material';

// Custom
import Analytics from '../../classes/Analytics';

// Components
import Scatter from './ScatterChart';

// Styles
import './Scatters.css';

interface Props {
    analytics: Analytics
}

const Scatters = ({ analytics }: Props): ReactElement => {
    const [scatterSelection, setScatterSelection] = useState<"totalSpend" | "totalOrders" | "totalItemsPurchased">("totalSpend");

    return (
        <section className='Scatters'>
            <div className='heading'>
                <h2>Activity</h2>
                <FormControl
                    size="small"
                    sx={{ minWidth: 150 }}
                >
                    <NativeSelect
                        sx={{ color: '#feffff' }}
                        value={scatterSelection}
                        onChange={(e) => setScatterSelection(e.target.value as "totalSpend" | "totalOrders"  | "totalItemsPurchased")}
                        inputProps={{
                            name: 'Activity by',
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
                scatterSelection === "totalSpend" &&
                <Scatter
                    tooltipFormatter={({ x, y }: { x: number, y: number }) => `${y.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} (${new Date(x).toLocaleDateString()})`}
                    xAxisFormatter={(value: number) => new Date(value).toLocaleDateString()}
                    yAxisFormatter={(value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    data={analytics.getDataMappedToCalendar().map(obj => {
                        return { x: new Date(obj.date).getTime(), y: obj.totalSpend, id: obj.date }
                    })}
                />
            }
            {
                scatterSelection === "totalOrders" &&
                <Scatter
                    tooltipFormatter={({ x, y }: { x: number, y: number }) => `${y.toLocaleString()} (${new Date(x).toLocaleDateString()})`}
                    xAxisFormatter={(value: number) => new Date(value).toLocaleDateString()}
                    data={analytics.getDataMappedToCalendar().map(obj => {
                        return { x: new Date(obj.date).getTime(), y: obj.totalOrders, id: obj.date }
                    })}
                />
            }
            {
                scatterSelection === "totalItemsPurchased" &&
                <Scatter
                    tooltipFormatter={({ x, y }: { x: number, y: number }) => `${y.toLocaleString()} (${new Date(x).toLocaleDateString()})`}
                    xAxisFormatter={(value: number) => new Date(value).toLocaleDateString()}
                    data={analytics.getDataMappedToCalendar().map(obj => {
                        return { x: new Date(obj.date).getTime(), y: obj.totalItems, id: obj.date }
                    })}
                />
            }
            <div className="overlay"></div>
        </section>
    );
}

export default Scatters;
