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
    const [scatterSelection, setScatterSelection] = useState<"totalSpend" | "totalItemsPurchased">("totalSpend");

    return (
        <section className='Scatters'>
            <FormControl fullWidth>
                <NativeSelect
                    value={scatterSelection}
                    onChange={(e) => setScatterSelection(e.target.value as "totalSpend" | "totalItemsPurchased")}
                    inputProps={{
                        name: 'topStoresBy',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value="totalSpend">Total Spend by date</option>
                    <option value="totalItemsPurchased">Total Items Purchased by date</option>
                </NativeSelect>
            </FormControl>
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
                scatterSelection === "totalItemsPurchased" &&
                <Scatter
                    tooltipFormatter={({ x, y }: { x: number, y: number }) => `${y.toLocaleString()} (${new Date(x).toLocaleDateString()})`}
                    xAxisFormatter={(value: number) => new Date(value).toLocaleDateString()}
                    data={analytics.getDataMappedToCalendar().map(obj => {
                        return { x: new Date(obj.date).getTime(), y: obj.totalItems, id: obj.date }
                    })}
                />
            }
        </section>
    );
}

export default Scatters;
