import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { ShoppingCartProvider } from './components/khoa/ShoppingCartContext';
 
ReactDOM.render(
  <React.StrictMode>
    <ShoppingCartProvider>
      <App />
    </ShoppingCartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
 
