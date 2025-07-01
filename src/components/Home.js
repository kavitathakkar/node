import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

function Home() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/allservices')
      .then((res) => {
        console.log('API Response:', res.data);
        setServices(res.data.data); // expect array of services
      })
      .catch((err) => {
        console.error('API Error:', err);
        setError('Failed to load services');
      });
  }, []);

  return (
    <div className="container">
      <h3>All Services</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      {services.length === 0 ? (
        <p>Loading or no services available.</p>
      ) : (
        <div className="row">
          {services.map((service) => (
            <div className="col-md-4 mb-4" key={service.code}>
              <div className="card h-100">
                <img
                  src={service.imageUrl}
                  className="card-img-top"
                  alt={service.type}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{service.type}</h5>
                  <p className="card-text">{service.description}</p>
                  <Link to={`/service/${service.code}`} className="btn btn-primary btn-sm">
                    Details
                  </Link>{' '}
                  <Link to={`/request/${service.code}`} className="btn btn-success btn-sm">
                    Request
                  </Link>{' '}
                  <Link to={`/emi/${service.code}`} className="btn btn-warning btn-sm">
                    EMI
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
