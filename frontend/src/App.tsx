import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {routes.map((route, idx) => (
            <Route key={idx} path={route.path}
              element={route.element}
            />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
