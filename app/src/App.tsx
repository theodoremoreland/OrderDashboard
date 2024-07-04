// React
import { ReactElement, useContext, useEffect, useState } from 'react';

// Data
import { generateRandomOrderData } from './modules/randomizeData';

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
  const [pageSize, setPageSize] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (window.innerWidth < 1080) {
      setPageSize(10);
    } else if (window.innerHeight > 1600) {
      setPageSize(20);
    } else if (window.innerHeight === 1080) {
      setPageSize(4);
    } else {
      setPageSize(5);
    }
  }, []);

  useEffect(() => {
      setRawData(generateRandomOrderData() as Order[]);
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
              <div className="row">
                <Scatters analytics={analytics} startDate={startDate} endDate={endDate} />
                <TopStreaks analytics={analytics} startDate={startDate} endDate={endDate} />
              </div>
              <div className="row">
                <TopStores analytics={analytics} startDate={startDate} endDate={endDate} />
                <Pie
                  metricLabel="Total Spend"
                  dimensionLabel="by Month"
                  data={Object.entries(analytics.getTotalSpendByMonth(startDate, endDate)).map(([key, value]) => {
                    return { label: key, value: value }
                  })}
                />
                <Pie
                  metricLabel="Total Spend"
                  dimensionLabel="by Weekday"
                  data={Object.entries(analytics.getTotalSpendByDayOfWeek(startDate, endDate)).map(([key, value]) => {
                      return { label: key, value: value }
                  })}
                />
              </div>
              <div className="order-history">
                <div className="heading">
                  <h2>Order History</h2>
                </div>
                {pageSize && <Grid
                    data={analytics.getOrdersBetweenDates(startDate, endDate)}
                    pageSize={pageSize}
                    pageSizeOptions={[pageSize]}
                  />
                }
                  <div className="overlay"></div>
              </div>
            </div>
            <div className="app-overlay"></div>
          </>
        )}
    </>
  )
}

export default App;
