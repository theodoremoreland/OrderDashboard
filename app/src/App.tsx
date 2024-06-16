// React
import { ReactElement, useContext, useEffect } from 'react';

// Mock data
import mockOrders from './__tests__/mocks/mockOrders';

// Contexts
import { DataContext } from './contexts/DataContextProvider';

// Components
import Kpi from './components/Kpi';
import List from './components/List';

// Styles
import './App.css';

const App = (): ReactElement => {
  const { analytics, startDate, endDate, setRawData } = useContext(DataContext);

  useEffect(() => {
    setRawData(mockOrders);
  }, [setRawData]);

  return (
    <>
      <h1 id="pp-title" className='title'>Doordash Dashboard</h1>
      {
        analytics && startDate && endDate && (
          <div className="analytics-container">
            <h2>Total Spent: {analytics.getTotalSpent().toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2>
            <h2>Total Orders: {analytics.getTotalPurchases()}</h2>
            <h2>Total Items Purchased: {analytics.getTotalItemsPurchased()}</h2>
            <h2>Number of Stores Purchased From: {analytics.getNumberOfStoresPurchasedFrom()}</h2>
            <h2>Total Number of Days a Purchase was Made: {analytics.getTotalNumberOfDaysAPurchaseWasMade()}</h2>
            <section id="kpis">
              <Kpi id="per-day-averages" title="Average Spend / Purchases Per Day" value={`${analytics.getAverageSpendPerDay(startDate, endDate)} / ${analytics.getAverageNumberOfPurchasesPerDay(startDate, endDate)}`} />
              <Kpi id="per-week-averages" title="Average Spend / Purchases Per Week" value={`${analytics.getAverageSpendPerWeek(startDate, endDate)} / ${analytics.getAverageNumberOfPurchasesPerWeek(startDate, endDate)}`} />
              <Kpi id="per-month-averages" title="Average Spend / Purchases Per Month" value={`${analytics.getAverageSpendPerMonth()} / ${analytics.getAverageNumberOfPurchasesPerMonth()}`} />
              <Kpi id="per-year-averages" title="Average Spend / Purchases Per Year" value={`${analytics.getAverageSpendPerYear(startDate.getFullYear(), endDate.getFullYear())} / ${analytics.getAverageNumberOfPurchasesPerYear(startDate.getFullYear(), endDate.getFullYear())}`} />
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
          </div>
        )}
    </>
  )
}

export default App;
