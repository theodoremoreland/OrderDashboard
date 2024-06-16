// React
import { ReactElement, useContext, useEffect } from 'react';

// Mock data
import mockOrders from './__tests__/mocks/mockOrders';

// Contexts
import { DataContext } from './contexts/DataContext';

// Components
import List from './components/List';

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
            <h2>Total Number of Days a Purchase was Made: {analytics.getTotalNumberOfDaysAPurchaseWasMade()}</h2>
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
        ) : (
          <h2>Loading...</h2>
        )
      }
    </>
  )
}

export default App;
