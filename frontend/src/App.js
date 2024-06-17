import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Users from './pages/Users';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
