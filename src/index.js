import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './app/store';
import 'antd/dist/reset.css'; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
);

reportWebVitals();
