import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { AuthContextProvider } from './Contexts/Auth/AuthContext';

ReactDOM.render(
  // <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
