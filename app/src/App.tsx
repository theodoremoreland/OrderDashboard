// React
import { ReactElement, useContext, useEffect } from 'react';

// Data
import orders from '../../.secret/orders.json';
//import orders from './mocks/mockOrders';

// Contexts
import { DataContext } from './contexts/DataContextProvider';

// Components
import NavBar from './components/NavBar';
import Pie from './components/Pies/PieChart';
import Scatters from './components/Scatters/Scatters';
import Kpis from './components/Kpis/Kpis';
import Grid from './components/DataGrid';
import Streaks from './components/Streaks/Streaks';
import TopStores from './components/TopStores/TopStores';

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
      <NavBar />
      {
        analytics && startDate && endDate && (
          <div id="analytics-container">
            <Kpis 
              analytics={analytics}
              startDate={startDate}
              endDate={endDate}
            />   
            <div className='row'>
              <Scatters analytics={analytics} />
              <Streaks analytics={analytics} />
            </div>
            <div className='row'>
              <TopStores analytics={analytics} />
              <Pie metricLabel="Total Spend" dimensionLabel='by Month' data={Object.entries(analytics.getTotalSpendByMonth()).map(([key, value]) => {
                  return { label: key, value: value }
              })} />
              <Pie metricLabel="Total Spend" dimensionLabel='by Weekday' data={Object.entries(analytics.getTotalSpendByDayOfWeek()).map(([key, value]) => {
                    return { label: key, value: value }
              })} />
            </div>
            <div className='order-history'>
              <h2>Order History</h2>
              <Grid
                  data={analytics.orders}
                  pageSize={6}
                  pageSizeOptions={[6]}
                />
            </div>
          </div>
        )}
    </>
  )
}

export default App;
