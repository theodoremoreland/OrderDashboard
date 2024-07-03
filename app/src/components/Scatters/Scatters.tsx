// React
import { ReactElement, useState } from 'react';

// MUI
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// Custom
import Analytics from '../../classes/Analytics';

// Components
import Scatter from './ScatterChart';

// Styles
import './Scatters.css';

interface Props {
    analytics: Analytics
    startDate: Date
    endDate: Date
}

const Scatters = ({ analytics, startDate, endDate }: Props): ReactElement => {
    const [scatterSelection, setScatterSelection] = useState<"totalSpend" | "totalOrders" | "totalItemsPurchased">("totalSpend");

    return (
        <section className='Scatters'>
            <div className='heading'>
                <h2>Activity</h2>
                <FormControl
                    variant="standard"
                    size="small"
                    sx={{ minWidth: 150 }}
                >
                    <Select
                        sx={{ color: '#feffff' }}
                        value={scatterSelection}
                        onChange={(e) => setScatterSelection(e.target.value as "totalSpend" | "totalOrders"  | "totalItemsPurchased")}
                        inputProps={{
                            name: 'Activity by',
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
                scatterSelection === "totalSpend" &&
                <Scatter
                    tooltipFormatter={({ x, y }: { x: number, y: number }) => `${y.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} (${new Date(x).toLocaleDateString()})`}
                    xAxisFormatter={(value: number) => new Date(value).toLocaleDateString()}
                    yAxisFormatter={(value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    data={analytics.getDataMappedToCalendar(startDate, endDate).map(obj => {
                        return { x: new Date(obj.date).getTime(), y: obj.totalSpend, id: obj.date }
                    })}
                />
            }
            {
                scatterSelection === "totalOrders" &&
                <Scatter
                    tooltipFormatter={({ x, y }: { x: number, y: number }) => `${y.toLocaleString()} (${new Date(x).toLocaleDateString()})`}
                    xAxisFormatter={(value: number) => new Date(value).toLocaleDateString()}
                    data={analytics.getDataMappedToCalendar(startDate, endDate).map(obj => {
                        return { x: new Date(obj.date).getTime(), y: obj.totalOrders, id: obj.date }
                    })}
                />
            }
            {
                scatterSelection === "totalItemsPurchased" &&
                <Scatter
                    tooltipFormatter={({ x, y }: { x: number, y: number }) => `${y.toLocaleString()} (${new Date(x).toLocaleDateString()})`}
                    xAxisFormatter={(value: number) => new Date(value).toLocaleDateString()}
                    data={analytics.getDataMappedToCalendar(startDate, endDate).map(obj => {
                        return { x: new Date(obj.date).getTime(), y: obj.totalItems, id: obj.date }
                    })}
                />
            }
            <div className="overlay"></div>
        </section>
    );
}

export default Scatters;
