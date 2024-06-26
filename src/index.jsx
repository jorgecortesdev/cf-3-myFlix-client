import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { HomePage } from './pages';

import 'react-toastify/dist/ReactToastify.min.css';
import './index.scss';

const App = () => {
  return <HomePage />;
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
