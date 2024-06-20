// React
import { ReactElement, useContext, useEffect } from 'react';

// Data
//import orders from '../../.secret/orders.json';
import orders from './mocks/mockOrders';

// Contexts
import { DataContext } from './contexts/DataContextProvider';

// Components
import Pie from './components/PieChart';
import Scatter from './components/ScatterChart';
import Kpi from './components/Kpi';
import Table from './components/Table';
import Grid from './components/DataGrid';

// Types
import { Order } from './types/types';

// Styles
import './App.css';

const App = (): ReactElement => {
  const { analytics, startDate, endDate, setRawData } = useContext(DataContext);

  useEffect(() => {
      setRawData(orders as Order[]);
  }, [setRawData]);

  return (
    <>
      <h1 id="pp-title" className='title'>Doordash Dashboard</h1>
      {
        analytics && startDate && endDate && (
          <div className="analytics-container">
            <section className="kpis">
              <Kpi id="total-spent" title="Total Spent" value={analytics.getTotalSpent().toLocaleString('en-US', { style: 'currency', currency: 'USD' })} />
              <Kpi id="total-orders" title="Total Orders" value={analytics.getTotalPurchases().toLocaleString()} />
              <Kpi id="total-items-purchased" title="Total Items Purchased" value={analytics.getTotalItemsPurchased().toLocaleString()} />
              <Kpi id="number-of-stores" title="Number of Stores Purchased From" value={analytics.getNumberOfStoresPurchasedFrom().toLocaleString()} />
              <Kpi id="total-days-a-purchase-was-made" title="Total Number of Days a Purchase was Made" value={analytics.getTotalNumberOfDaysAPurchaseWasMade()} />
            </section>
            <section className="kpis">
              <Kpi id="per-day-averages" title="Average Spend / Purchases Per Day" value={`${analytics.getAverageSpendPerDay(startDate, endDate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} / ${analytics.getAverageNumberOfPurchasesPerDay(startDate, endDate)}`} />
              <Kpi id="per-week-averages" title="Average Spend / Purchases Per Week" value={`${analytics.getAverageSpendPerWeek(startDate, endDate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} / ${analytics.getAverageNumberOfPurchasesPerWeek(startDate, endDate)}`} />
              <Kpi id="per-month-averages" title="Average Spend / Purchases Per Month" value={`${analytics.getAverageSpendPerMonth(startDate, endDate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} / ${analytics.getAverageNumberOfPurchasesPerMonth(startDate, endDate)}`} />
              <Kpi id="per-year-averages" title="Average Spend / Purchases Per Year" value={`${analytics.getAverageSpendPerYear(startDate, endDate).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} / ${analytics.getAverageNumberOfPurchasesPerYear(startDate, endDate)}`} />
            </section>
            <Table
              id="stores-by-total-spend"
              title="Top Stores by Total Spend"
              data={analytics
                .getTopStoresByTotalSpend()
                .map(obj => ({ key: obj.storeName, value: obj.totalSpend.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }))
              }
            />
            <Table
              id="stores-by-total-orders"
              title="Top Stores by Total Orders"
              data={analytics
                .getTopStoresByTotalOrders()
                .map(obj => ({ key: obj.storeName, value: obj.totalOrders }))
              }
            />
            <Table
              id="stores-by-total-items-purchased"
              title="Top Stores by Total Items Purchased"
              data={analytics
                .getTopStoresByTotalItemsPurchased()
                .map(obj => ({ key: obj.storeName, value: obj.totalItemsPurchased }))
              }
            />
            <Table
              id="days-with-purchases"
              title="Longest consecutive days of purchases"
              data={analytics
                .getTopPurchaseStreaks()
                .map(obj => ({ key: `${obj.days} days`, value: `${obj.startDate} - ${obj.endDate}` }))
              }
            />
            <Table
              id="days-without-purchases"
              title="Longest consecutive days without purchases"
              data={analytics
                .getTopDroughtsBetweenPurchases()
                .map(obj => ({ key: `${obj.days} days`, value: `${obj.startDate} - ${obj.endDate}` }))
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
            <Scatter
              tooltipFormatter={({ x, y }: { x: number, y: number }) => `${y.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} (${new Date(x).toLocaleDateString()})`}
              xAxisFormatter={(value: number) => new Date(value).toLocaleDateString()}
              yAxisFormatter={(value: number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              data={analytics.getDataMappedToCalendar().map(obj => {
                return { x: new Date(obj.date).getTime(), y: obj.totalSpend, id: obj.date }
              })}
            />
            <Scatter
              tooltipFormatter={({ x, y }: { x: number, y: number }) => `${y.toLocaleString()} (${new Date(x).toLocaleDateString()})`}
              xAxisFormatter={(value: number) => new Date(value).toLocaleDateString()}
              data={analytics.getDataMappedToCalendar().map(obj => {
                return { x: new Date(obj.date).getTime(), y: obj.totalItems, id: obj.date }
              })}
            />
            <Grid data={analytics.orders} />
          </div>
        )}
    </>
  )
}

export default App;
