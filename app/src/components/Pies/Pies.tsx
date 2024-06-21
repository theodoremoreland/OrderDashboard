// React
import { ReactElement } from 'react';

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
    return (
        <section className='Pies'>
            <Pie data={Object.entries(analytics.getTotalSpendByYear()).map(([key, value]) => {
                return { label: key, value: value }
            })} />
            <Pie data={Object.entries(analytics.getTotalSpendByDayOfWeek()).map(([key, value]) => {
                return { label: key, value: value }
            })} />
            <Pie data={Object.entries(analytics.getTotalSpendByMonth()).map(([key, value]) => {
                return { label: key, value: value }
            })} />
        </section>
    )
}

export default Pies;
