import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Event from './pages/Event';
import ForgotPassword from './pages/ForgotPassword';
import Authentication from './pages/Authentication';
import AdminDashboard from './pages/AdminDashboard';
import AdminNewsletter from './pages/admin/AdminNewletter';
import AdminContact from './pages/admin/AdminContact';
import AdminEvents from './pages/admin/AdminEvent';







function App() {
  console.log('App component is rendering');
  return (
    <div className="app">
      {/* Routes moved from main.jsx to App.jsx */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/event" element={<Event />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Authentication />} />


        <Route path="/admin/admin" element={<AdminDashboard />} />
        <Route path="/admin/newsletter" element={<AdminNewsletter />} />
        <Route path="/admin/contacts" element={<AdminContact />} />
        <Route path="/admin/events" element={<AdminEvents />} />








    
      </Routes>
    </div>
  );
}

export default App;