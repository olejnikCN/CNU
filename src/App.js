import { BrowserRouter as Router } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Routes from './Routes';

import { ToastContextProvider } from './context/toast-context';
import { SortingContextProvider } from './context/sorting-context';
import { SearchContextProvider } from './context/search-context';

export default function App() {
  return (
    <ToastContextProvider>
      <SearchContextProvider>
        <SortingContextProvider>
          <Router>
            <Layout>
              <Routes />
            </Layout>
          </Router>
        </SortingContextProvider>
      </SearchContextProvider>
    </ToastContextProvider>
  );
}
