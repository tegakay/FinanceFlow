
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FinanceProvider } from './contexts/FinanceContext';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Views/Dashboard';
import Transactions from './components/Views/Transactions';
import Budget from './components/Views/Budget';
import Investments from './components/Views/Investments';
import Goals from './components/Views/Goals';
import Profile from './components/Views/Profile';
import { useAuth } from './contexts/AuthContext';
import { Toaster } from "react-hot-toast";

const AuthenticatedApp = () => {
  return (
    <FinanceProvider>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </FinanceProvider>
  );
};

function App() {
    const { user } = useAuth()
    //how to replace this with a custom authentication state
 
  

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {user ? (
          <Route path="/*" element={<AuthenticatedApp />} />
        ) : (
          <>
            {/* <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} /> 
            you can get the login and signup functions from the authcontext*/}
            <Route path="/login" element={<LoginPage  />} />
            <Route path="/signup" element={<SignupPage  />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;