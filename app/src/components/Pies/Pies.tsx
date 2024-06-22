// React
import { ReactElement, useState } from 'react';

// MUI
import FormControl from '@mui/material/FormControl';
import { NativeSelect } from '@mui/material';

// Custom
import Analytics from '../../classes/Analytics';

// Components
import Pie from './PieChart';

// Styles
import './Pies.css';

interface Props {
    analytics: Analytics
}

const Pies = ({ analytics }: Props): ReactElement => {
    const [pieSelection, setPieSelection] = useState<"dayOfWeek" | "month" | "year">("year");

    return (
        <section className='Pies'>
            <FormControl fullWidth>
                <NativeSelect
                    value={pieSelection}
                    onChange={(e) => setPieSelection(e.target.value as "dayOfWeek" | "month" | "year")}
                    inputProps={{
                        name: 'topStoresBy',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value="dayOfWeek">Day of Week</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                </NativeSelect>
            </FormControl>
            {
                pieSelection === "dayOfWeek" &&
                <Pie data={Object.entries(analytics.getTotalSpendByDayOfWeek()).map(([key, value]) => {
                    return { label: key, value: value }
                })} />
            }
            {
                pieSelection === "month" &&
                <Pie data={Object.entries(analytics.getTotalSpendByMonth()).map(([key, value]) => {
                    return { label: key, value: value }
                })} />
            }
            {
                pieSelection === "year" &&
                <Pie data={Object.entries(analytics.getTotalSpendByYear()).map(([key, value]) => {
                    return { label: key, value: value }
                })} />
            }
        </section>
    )
}

export default Pies;
