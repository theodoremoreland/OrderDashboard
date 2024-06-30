// React
import { ReactElement, useState, ChangeEvent } from 'react';

// Material UI
import Switch from '@mui/material/Switch';

// Custom
import Analytics from '../../classes/Analytics';

// Components
import Kpi from './Kpi';

// Images
import PaymentsIcon from '../../assets/images/icons/payments.svg?react';
import OrdersIcon from '../../assets/images/icons/orders.svg?react';
import ShoppingCartIcon from '../../assets/images/icons/shopping-cart.svg?react';
import StoreIcon from '../../assets/images/icons/store.svg?react';
import DayIcon from '../../assets/images/icons/today.svg?react';
import WeekIcon from '../../assets/images/icons/date_range.svg?react';
import MonthIcon from '../../assets/images/icons/calendar_month.svg?react';
import YearIcon from '../../assets/images/icons/ad_group.svg?react';

// Styles
import './Kpis.css';

interface Props {
    analytics: Analytics
    startDate: Date
    endDate: Date
}

const Kpis = ({ analytics, startDate, endDate }: Props): ReactElement => {
    const [checked, setChecked] = useState(false);
    const [kpiSet, setKpiSet] = useState<"totals" | "averages">("totals");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked: _checked } = event.target;

        if (_checked) {
            setKpiSet("averages");
        } else {
            setKpiSet("totals");
        }

        setChecked(_checked);
    };

    return (
        <section className={`Kpis ${kpiSet}`}>
            <div className='switch-wrapper'>
                <span
                    onClick={() => {
                        setKpiSet('totals');
                        setChecked(false);
                    }}
                    className={`switch-label ${kpiSet === 'totals' ? 'selected' : ''}`}
                >
                        Totals
                </span>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <span
                    onClick={() => {
                        setKpiSet('averages');
                        setChecked(true);
                    }}
                    className={`switch-label ${kpiSet === 'averages' ? 'selected' : ''}`}
                >
                        Averages
                </span>
            </div>
            {
                kpiSet === "totals"
                ? (
                    <>
                        <Kpi
                            id="total-spent"
                            title='Total amount spent on all orders.'
                            label="Spent"
                            icon={<PaymentsIcon className="icon" />}
                            value={analytics.getTotalSpent(startDate, endDate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        />
                        <Kpi
                            id="total-orders"
                            title='Total number of orders made.'
                            label="Orders"
                            icon={<OrdersIcon className="icon" />}
                            value={analytics.getTotalPurchases(startDate, endDate).toLocaleString()}
                        />
                        <Kpi
                            id="total-items-purchased"
                            title='Total number of items ordered.'
                            label="Items Ordered"
                            icon={<ShoppingCartIcon className="icon" />}
                            value={analytics.getTotalItemsPurchased(startDate, endDate).toLocaleString()}
                        />
                        <Kpi
                            id="number-of-stores"
                            title='Total number of stores ordered from.'
                            label="Stores Ordered From"
                            icon={<StoreIcon className="icon" />}
                            value={analytics.getNumberOfStoresPurchasedFrom(startDate, endDate).toLocaleString()}
                        />
                        {/* <Kpi
                            id="total-days-a-purchase-was-made"
                            label="Number of Days a Purchase was Made"
                            value={analytics.getTotalNumberOfDaysAPurchaseWasMade()}
                        /> */}
                    </>
                )
                : (
                    <>
                        <Kpi
                            id="per-day-averages"
                            label="Average Orders Per Day"
                            icon={<DayIcon className="icon" />}
                            value={`${analytics.getAverageNumberOfPurchasesPerDay(startDate, endDate)} @ ${analytics.getAverageSpendPerDay(startDate, endDate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}
                        />
                        <Kpi
                            id="per-week-averages"
                            label="Average Orders Per Week"
                            icon={<WeekIcon className="icon" />}
                            value={`${analytics.getAverageNumberOfPurchasesPerWeek(startDate, endDate)} @ ${analytics.getAverageSpendPerWeek(startDate, endDate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}
                        />
                        <Kpi
                            id="per-month-averages"
                            label="Average Orders Per Month"
                            icon={<MonthIcon className="icon" />}
                            value={`${analytics.getAverageNumberOfPurchasesPerMonth(startDate, endDate)} @ ${analytics.getAverageSpendPerMonth(startDate, endDate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}
                        />
                        <Kpi
                            id="per-year-averages"
                            label="Average Orders Per Year"
                            icon={<YearIcon className="icon" />}
                            value={`${analytics.getAverageNumberOfPurchasesPerYear(startDate, endDate)} @ ${analytics.getAverageSpendPerYear(startDate, endDate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}
                        />
                    </>
                )
            }
        </section>
    );
}

export default Kpis;
