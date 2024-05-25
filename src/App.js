import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes/route'; 
import Spinner from './components/Spinner';

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        {routes}
      </Suspense>
    </Router>
  );
};

export default App;
