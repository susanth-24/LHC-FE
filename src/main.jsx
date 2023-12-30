import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore, compose } from 'redux';
import {thunk} from 'redux-thunk';
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import reducers from './reducers/index.js';

const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
      <App />
  </Provider>
);