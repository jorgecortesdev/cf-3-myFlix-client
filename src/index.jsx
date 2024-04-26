import { createRoot } from 'react-dom/client';
import { HomePage } from "./pages/HomePage/HomePage";
import { Provider } from "react-redux";
import { store } from "./state/store";

import "./index.scss";

const App = () => {
  return <HomePage />;
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
