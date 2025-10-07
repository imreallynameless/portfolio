import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (process.env.NODE_ENV === 'production') {
  import('./reportWebVitals').then(({ default: reportWebVitals }) => {
    reportWebVitals(console.log);
  });
}

