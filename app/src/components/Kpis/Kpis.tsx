import { ReactElement, useState } from 'react';

// Custom
import Analytics from '../../classes/Analytics';

// Components
import Kpi from './Kpi';

// Styles
import './Kpis.css';

interface Props {
    analytics: Analytics
    startDate: Date
    endDate: Date
}

const Kpis = ({ analytics, startDate, endDate }: Props): ReactElement => {
    const [kpiSet] = useState<"totals" | "averages">("totals");

    return (
        <>
            {
                kpiSet === "totals"
                ? (
                    <section className="Kpis totals">
                        <Kpi id="total-spent" title="Total Spent" value={analytics.getTotalSpent().toLocaleString('en-US', { style: 'currency', currency: 'USD' })} />
                        <Kpi id="total-orders" title="Total Orders" value={analytics.getTotalPurchases().toLocaleString()} />
                        <Kpi id="total-items-purchased" title="Total Items Purchased" value={analytics.getTotalItemsPurchased().toLocaleString()} />
                        <Kpi id="number-of-stores" title="Number of Stores Purchased From" value={analytics.getNumberOfStoresPurchasedFrom().toLocaleString()} />
                        <Kpi id="total-days-a-purchase-was-made" title="Total Number of Days a Purchase was Made" value={analytics.getTotalNumberOfDaysAPurchaseWasMade()} />
                    </section>
                )
                : (
                    <section className="Kpis averages">
                        <Kpi id="per-day-averages" title="Average Spend / Purchases Per Day" value={`${analytics.getAverageSpendPerDay(startDate, endDate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} / ${analytics.getAverageNumberOfPurchasesPerDay(startDate, endDate)}`} />
                        <Kpi id="per-week-averages" title="Average Spend / Purchases Per Week" value={`${analytics.getAverageSpendPerWeek(startDate, endDate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} / ${analytics.getAverageNumberOfPurchasesPerWeek(startDate, endDate)}`} />
                        <Kpi id="per-month-averages" title="Average Spend / Purchases Per Month" value={`${analytics.getAverageSpendPerMonth(startDate, endDate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} / ${analytics.getAverageNumberOfPurchasesPerMonth(startDate, endDate)}`} />
                        <Kpi id="per-year-averages" title="Average Spend / Purchases Per Year" value={`${analytics.getAverageSpendPerYear(startDate, endDate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} / ${analytics.getAverageNumberOfPurchasesPerYear(startDate, endDate)}`} />
                    </section>
                )
            }
        </>
    );
}

export default Kpis;
