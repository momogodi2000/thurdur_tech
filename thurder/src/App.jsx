import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Event from './pages/Event';
import ForgotPassword from './pages/ForgotPassword';
import Authentication from './pages/Authentication';




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




    
      </Routes>
    </div>
  );
}

export default App;