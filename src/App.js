import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import ServiceDetails from './components/ServiceDetails';
import MemberForm from './components/MemberForm';
import RequestForm from './components/RequestForm';
import CalculateEMI from './components/CalculateEMI';
import UpdatePassword from './components/UpdatePassword';
import CancelRequest from './components/CancelRequest';
import CancelMember from './components/CancelMember';

function App() {
  return (
    <Router>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Finance Service Portal</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/member">Register Member</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/update-password">Update Password</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cancel-request">Cancel Request</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cancel-member">Cancel Member</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* MAIN PAGE CONTENT */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service/:type" element={<ServiceDetails />} />
          <Route path="/member" element={<MemberForm />} />
          <Route path="/request/:type" element={<RequestForm />} />
          <Route path="/emi/:type" element={<CalculateEMI />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/cancel-request" element={<CancelRequest />} />
          <Route path="/cancel-member" element={<CancelMember />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
