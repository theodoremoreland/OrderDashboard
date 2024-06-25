// React
import { ReactElement, useContext, useEffect } from 'react';

// Data
import orders from '../../.secret/orders.json';
//import orders from './mocks/mockOrders';

// Contexts
import { DataContext } from './contexts/DataContextProvider';

// Components
import Pies from './components/Pies/Pies';
import Scatters from './components/Scatters/Scatters';
import Kpis from './components/Kpis/Kpis';
import Grid from './components/DataGrid';
import Streaks from './components/Streaks/Streaks';
import { TopStoresBar } from './components/TopStores/TopStores';

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
          <div id="analytics-container">
            <Kpis 
              analytics={analytics}
              startDate={startDate}
              endDate={endDate}
            />   
            <div className='row'>
              <Scatters analytics={analytics} />
              <Pies analytics={analytics} />
            </div>
            <div className='row'>
              <TopStoresBar analytics={analytics} />
              {/* <Streaks analytics={analytics} /> */}
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
