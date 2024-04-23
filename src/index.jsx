import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import { Provider } from "react-redux";
import { store } from "./state/store";

import "./index.scss";

const App = () => {
  return <MainView />;
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
