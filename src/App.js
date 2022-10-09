import { BrowserRouter as Router } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import ScrollToTop from './functions/ScrollToTop';
import { Routes } from './Routes';

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes />
      </Layout>
    </Router>
  );
}
