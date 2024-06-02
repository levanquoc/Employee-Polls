import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Leaderboard from './components/Leaderboard';
import Menu from './components/Menu';
import { useSelector } from 'react-redux';
import Add from './components/Add';
import Question from './components/Question';
import PrivateRoute from './components/PrivateRoute';
import Private2Route from './components/Private2Route';
import NotFound from './components/404';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div>
      <Router>
        {isAuthenticated && <Menu/>}
        <Routes>
          <Route path="/login" element={<Private2Route><Login /></Private2Route>} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
          <Route path="/add" element={<PrivateRoute><Add /></PrivateRoute>} />
          <Route path="/questions/:questionId" element={<PrivateRoute><Question /></PrivateRoute>} />
          <Route path="*" element={<PrivateRoute><NotFound /></PrivateRoute>} />
        </Routes>
      </Router>
    </div>
  );
}
 
export default App;