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
            <Switch
                sx={{
                    transform: 'rotate(90deg)'
                }}
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            {
                kpiSet === "totals"
                ? (
                    <>
                        <Kpi
                            id="total-spent"
                            title='Total amount spent on all orders.'
                            label="Spent"
                            icon={<PaymentsIcon className="icon" />}
                            value={analytics.getTotalSpent().toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        />
                        <Kpi
                            id="total-orders"
                            title='Total number of orders made.'
                            label="Orders"
                            icon={<OrdersIcon className="icon" />}
                            value={analytics.getTotalPurchases().toLocaleString()}
                        />
                        <Kpi
                            id="total-items-purchased"
                            title='Total number of items ordered.'
                            label="Items Ordered"
                            icon={<ShoppingCartIcon className="icon" />}
                            value={analytics.getTotalItemsPurchased().toLocaleString()}
                        />
                        <Kpi
                            id="number-of-stores"
                            title='Total number of stores ordered from.'
                            label="Stores Ordered From"
                            icon={<StoreIcon className="icon" />}
                            value={analytics.getNumberOfStoresPurchasedFrom().toLocaleString()}
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
                            label="Average Spend / Orders Per Day"
                            value={`${analytics.getAverageSpendPerDay(startDate, endDate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} / ${analytics.getAverageNumberOfPurchasesPerDay(startDate, endDate)}`}
                        />
                        <Kpi
                            id="per-week-averages"
                            label="Average Spend / Orders Per Week"
                            value={`${analytics.getAverageSpendPerWeek(startDate, endDate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} / ${analytics.getAverageNumberOfPurchasesPerWeek(startDate, endDate)}`}
                        />
                        <Kpi
                            id="per-month-averages"
                            label="Average Spend / Orders Per Month"
                            value={`${analytics.getAverageSpendPerMonth(startDate, endDate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} / ${analytics.getAverageNumberOfPurchasesPerMonth(startDate, endDate)}`}
                        />
                        <Kpi
                            id="per-year-averages"
                            label="Average Spend / Orders Per Year"
                            value={`${analytics.getAverageSpendPerYear(startDate, endDate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} / ${analytics.getAverageNumberOfPurchasesPerYear(startDate, endDate)}`}
                        />
                    </>
                )
            }
        </section>
    );
}

export default Kpis;
