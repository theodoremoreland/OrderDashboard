// React
import { ReactElement, useContext, useEffect } from 'react';

// Data
//import orders from '../../.secret/orders.json';
import orders from './mocks/mockOrders';

// Contexts
import { DataContext } from './contexts/DataContextProvider';

// Components
import Pies from './components/Pies/Pies';
import Scatters from './components/Scatters/Scatters';
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
      <h1 id="app-title" className='title'>Order Dashboard</h1>
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
            <Pies analytics={analytics} />
            <Scatters analytics={analytics} />
            <Grid data={analytics.orders} />
          </div>
        )}
    </>
  )
}

export default App;
