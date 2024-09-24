import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ToastProvider } from './components/ui/use-toast'; 

ReactDOM.render(
  <ToastProvider>
    <App />
  </ToastProvider>,
  document.getElementById('root')
);
