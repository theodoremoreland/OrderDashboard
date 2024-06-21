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
import Streaks from './components/Streaks/Streaks';
import Kpis from './components/Kpis/Kpis';
import TopStores from './components/TopStores/TopStores';
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
            <Kpis 
              analytics={analytics}
              startDate={startDate}
              endDate={endDate}
            />
            <TopStores analytics={analytics} />
            <Streaks analytics={analytics} />
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
