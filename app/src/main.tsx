import React from 'react';
import ReactDOM from 'react-dom/client';

// Custom contexts
import DataProvider from './contexts/DataContextProvider.tsx';

// Components
import App from './App.tsx';

// Styles
import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
)
