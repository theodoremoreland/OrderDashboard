// React
import { ReactElement, useContext, useEffect } from 'react';

// Mock data
import mockOrders from './__tests__/mocks/mockOrders';

// Contexts
import { DataContext } from './contexts/DataContext';

// Styles
import './App.css';

const App = (): ReactElement => {
  const { analytics, setRawData } = useContext(DataContext);

  useEffect(() => {
    setRawData(mockOrders);
  }, [setRawData]);

  return (
    <>
      <h1 id="pp-title" className='title'>Doordash Dashboard</h1>
      {
        analytics ? (
          <div className="analytics-container">
            <h2>Total Purchases: {analytics.getTotalPurchases()}</h2>
            <h2>Total Spent: ${analytics.getTotalSpent()}</h2>
            <h2>Total Items Purchased: {analytics.getTotalItemsPurchased()}</h2>
            <h2>Number of Stores Purchased From: {analytics.getNumberOfStoresPurchasedFrom()}</h2>
            <h2>Total Spent by Day of Week: {JSON.stringify(analytics.getTotalSpendByDayOfWeek())}</h2>
            <h2>Total Spent by Year: {JSON.stringify(analytics.getTotalSpendByYear())}</h2>
            <h2>Total Number of Days a Purchase was Made: {analytics.getTotalNumberOfDaysAPurchaseWasMade()}</h2>
            <h2>Top Stores by Total Orders: {JSON.stringify(analytics.getTopStoresByTotalOrders())}</h2>
            <h2>Top Stores by Total Items Purchased: {JSON.stringify(analytics.getTopStoresByTotalItemsPurchased())}</h2>
          </div>
        ) : (
          <h2>Loading...</h2>
        )
      }
    </>
  )
}

export default App;
