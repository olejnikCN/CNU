import { BrowserRouter as Router } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Routes from './Routes';

import { ToastContextProvider } from './context/toast-context';

export default function App() {
  return (
    <ToastContextProvider>
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </ToastContextProvider>
  );
}
