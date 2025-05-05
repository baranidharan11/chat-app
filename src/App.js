import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Auth from './screens/Auth/Auth';
import useAuth from './customHooks/useAuth';
import Dashboard from './screens/Dashboard/Dashboard';

import useMessages from './customHooks/useMessages';

// ProtectedRoute to protect private routes
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return isLoggedIn ? children : <Navigate to="/login" />;
};

// PublicRoute to restrict access to the login route when already logged in
const PublicRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return isLoggedIn ? <Navigate to="/dashboard" /> : children;
};

// Loading screen component
const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="text-lg font-semibold animate-pulse">Loading...</div>
    </div>
  );
};

function App() {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();
  useMessages(isLoggedIn);

  return (
    <Routes>
      {/* Public Route: Login / Signup page */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Auth navigate={navigate} />
          </PublicRoute>
        }
      />

      {/* Protected Route: Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
