import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectConfig from './pages/ProjectConfig';
import Editor from './pages/Editor';

// Helper to protect routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Default to Login if no path provided */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          <Route path="/login" element={<Login />} />
          
          <Route path="/dashboard" element={
            <PrivateRoute><Dashboard /></PrivateRoute>
          } />
          
          <Route path="/create" element={
            <PrivateRoute><ProjectConfig /></PrivateRoute>
          } />
          
          <Route path="/editor/:id" element={
            <PrivateRoute><Editor /></PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;