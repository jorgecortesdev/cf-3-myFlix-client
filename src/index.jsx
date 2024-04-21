import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
import Container from 'react-bootstrap/Container';

import "./index.scss";

const App = () => {
  return (
    <Container className='h-100 py-5'>
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<App />);
