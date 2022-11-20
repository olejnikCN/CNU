import { BrowserRouter as Router } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import ScrollToTop from './functions/ScrollToTop';
import { Routes } from './Routes';
import { ToastContextProvider } from './context/toast-context';

export function App() {
  return (
    <ToastContextProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </ToastContextProvider>
  );
}
