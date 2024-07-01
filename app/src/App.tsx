// React
import { ReactElement, useContext, useEffect } from 'react';

// Data
import orders from '../../.secret/orders.json';
//import orders from './mocks/mockOrders';

// Contexts
import { DataContext } from './contexts/DataContextProvider';

// Components
import NavBar from './components/NavBar';
import Pie from './components/PieChart';
import Scatters from './components/Scatters/Scatters';
import Kpis from './components/Kpis/Kpis';
import Grid from './components/DataGrid';
import TopStreaks from './components/TopStreaks/TopStreaks';
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
      {
        analytics && startDate && endDate && (
          <>
            <NavBar analytics={analytics} />
            <div id="analytics-container">
              <Kpis 
                analytics={analytics}
                startDate={startDate}
                endDate={endDate}
              />   
              <div className='row'>
                <Scatters analytics={analytics} startDate={startDate} endDate={endDate} />
                <TopStreaks analytics={analytics} startDate={startDate} endDate={endDate} />
              </div>
              <div className='row'>
                <TopStores analytics={analytics} startDate={startDate} endDate={endDate} />
                <Pie
                  metricLabel="Total Spend"
                  dimensionLabel='by Month'
                  data={Object.entries(analytics.getTotalSpendByMonth(startDate, endDate)).map(([key, value]) => {
                    return { label: key, value: value }
                  })}
                />
                <Pie
                  metricLabel="Total Spend"
                  dimensionLabel='by Weekday'
                  data={Object.entries(analytics.getTotalSpendByDayOfWeek(startDate, endDate)).map(([key, value]) => {
                      return { label: key, value: value }
                  })}
                />
              </div>
              <div className='order-history'>
                <div className='heading'>
                  <h2>Order History</h2>
                </div>
                <Grid
                    data={analytics.getOrdersBetweenDates(startDate, endDate)}
                    pageSize={5}
                    pageSizeOptions={[5]}
                  />
                  <div className='overlay'></div>
              </div>
              <div className='overlay-2'></div>
            </div>
          </>
        )}
    </>
  )
}

export default App;
