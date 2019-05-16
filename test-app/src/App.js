import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './routes';

function App() {
  return (
    <div>
      <Router>
        <Routers />
      </Router>
    </div>
  );
}

export default App;
