
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Auth } from './pages/auth';
import { FinancialRecordsProvider } from './contexts/financial-record-context';
import { SignedIn, SignOutButton, SignUpButton, UserButton } from '@clerk/clerk-react';

function App() {


  return (
    

    <Router>
      <div className="app-container">
        <div className='navbar'>
          <Link to="/"> Dashboard</Link>
          <SignedIn>
                <UserButton showName/>

            </SignedIn>
        </div>
        <Routes>
          <Route path="/" element={  // all the componest in dashboard will have acces to record provider componenets
            <FinancialRecordsProvider>
              <Dashboard />
            </FinancialRecordsProvider>} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>



  );
}

export default App