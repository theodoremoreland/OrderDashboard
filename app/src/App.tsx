// React
import { ReactElement, useContext, useEffect } from 'react';

// Data
// import orders from '../../.secret/orders.json';
import mockOrders from './mocks/mockOrders';

// Contexts
import { DataContext } from './contexts/DataContextProvider';
// import { Order } from './types/types';

// Components
import Pie from './components/PieChart';
import Kpi from './components/Kpi';
import List from './components/List';

// Styles
import './App.css';

const App = (): ReactElement => {
  const { analytics, startDate, endDate, setRawData } = useContext(DataContext);

  useEffect(() => {
      // setRawData(orders as Order[]);
      setRawData(mockOrders);
  }, [setRawData]);

  return (
    <>
      <h1 id="pp-title" className='title'>Doordash Dashboard</h1>
      {
        analytics && startDate && endDate && (
          <div className="analytics-container">
            <section className="kpis">
              <Kpi id="total-spent" title="Total Spent" value={analytics.getTotalSpent().toLocaleString('en-US', { style: 'currency', currency: 'USD' })} />
              <Kpi id="total-orders" title="Total Orders" value={analytics.getTotalPurchases()} />
              <Kpi id="total-items-purchased" title="Total Items Purchased" value={analytics.getTotalItemsPurchased()} />
              <Kpi id="number-of-stores" title="Number of Stores Purchased From" value={analytics.getNumberOfStoresPurchasedFrom()} />
              <Kpi id="total-days-a-purchase-was-made" title="Total Number of Days a Purchase was Made" value={analytics.getTotalNumberOfDaysAPurchaseWasMade()} />
            </section>
            <section className="kpis">
              <Kpi id="per-day-averages" title="Average Spend / Purchases Per Day" value={`${analytics.getAverageSpendPerDay(startDate, endDate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} / ${analytics.getAverageNumberOfPurchasesPerDay(startDate, endDate)}`} />
              <Kpi id="per-week-averages" title="Average Spend / Purchases Per Week" value={`${analytics.getAverageSpendPerWeek(startDate, endDate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} / ${analytics.getAverageNumberOfPurchasesPerWeek(startDate, endDate)}`} />
              <Kpi id="per-month-averages" title="Average Spend / Purchases Per Month" value={`${analytics.getAverageSpendPerMonth().toLocaleString('en-US', { style: 'currency', currency: 'USD' })} / ${analytics.getAverageNumberOfPurchasesPerMonth()}`} />
              <Kpi id="per-year-averages" title="Average Spend / Purchases Per Year" value={`${analytics.getAverageSpendPerYear(startDate.getFullYear(), endDate.getFullYear()).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} / ${analytics.getAverageNumberOfPurchasesPerYear(startDate.getFullYear(), endDate.getFullYear())}`} />
            </section>
            <List
              id="list"
              title="Top Stores by Total Spend"
              data={analytics
                .getTopStoresByTotalSpend()
                .map(obj => ({ key: obj.storeName, value: obj.totalSpend }))
              }
            />
            <List
              id="list"
              title="Top Stores by Total Orders"
              data={analytics
                .getTopStoresByTotalOrders()
                .map(obj => ({ key: obj.storeName, value: obj.totalOrders }))
              }
            />
            <List
              id="list"
              title="Top Stores by Total Items Purchased"
              data={analytics
                .getTopStoresByTotalItemsPurchased()
                .map(obj => ({ key: obj.storeName, value: obj.totalItemsPurchased }))
              }
            />
            <List
              id="list"
              title="Top 5 longest consecutive days of purchases"
              data={analytics
                .getTop5PurchaseStreaks()
                .map(obj => ({ key: obj.days, value: `${obj.startDate} - ${obj.endDate}` }))
              }
            />
            <List
              id="list"
              title="Top 5 longest gaps between purchases"
              data={analytics
                .getTop5DroughtsBetweenPurchases()
                .map(obj => ({ key: obj.days, value: `${obj.startDate} - ${obj.endDate}` }))
              }
            />
            <Pie data={Object.entries(analytics.getTotalSpendByYear()).map(([key, value]) => {
              return { label: key, value: value }
            })} />
            <Pie data={Object.entries(analytics.getTotalSpendByDayOfWeek()).map(([key, value]) => {
              return { label: key, value: value }
            })} />
            <Pie data={Object.entries(analytics.getTotalSpendByMonth()).map(([key, value]) => {
              return { label: key, value: value }
            })} />
          </div>
        )}
    </>
  )
}

export default App;
