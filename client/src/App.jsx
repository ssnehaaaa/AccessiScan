import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import AnalyzePage from "./pages/AnalyzePage";
import Dashboard from "./pages/Dashboard";
import ResultPage from "./pages/ResultPage";
import PastReports from "./pages/PastReports";
import Guidelines from "./pages/Guidelines";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import AuthPage from "./pages/AuthPage";
import PricingPage from "./pages/PricingPage";
import Resources from "./pages/Resources";
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/resources" element={<Resources />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analyze"
        element={
          <ProtectedRoute>
            <AnalyzePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <ResultPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <PastReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/guidelines"
        element={
          <ProtectedRoute>
            <Guidelines />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/support"
        element={
          <ProtectedRoute>
            <Support />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
