import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

function ServiceDetails() {
  const { type } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    API.get(`/service/${type}`)
      .then(res => setDetails(res.data.data))
      .catch(err => console.error(err));
  }, [type]);

  if (!details) return <p>Loading...</p>;

  return (
    <div className="card p-4">
      <h4>{details.type}</h4>
      <img src={details.imageUrl} className="img-fluid mb-2" alt="Service" />
      <p>{details.description}</p>
      <h5>Loan Details</h5>
      <ul className="list-group">
        {details.detail.map((d, i) => (
          <li key={i} className="list-group-item">
            Type: {d.type}, Min: {d.min}, Max: {d.max}, Rate: {d.rate}, Max Days: {d.maxdays}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServiceDetails;
