import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

function CalculateEMI() {
  const { type } = useParams();
  const [amt, setAmt] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post(`/service/${type}/calculate`, { amt });
      setResult(`EMI: ${res.data.message}`);
    } catch (err) {
      setResult('Failed to calculate');
    }
  };

  return (
    <div className="card p-4">
      <h4>Calculate EMI for {type}</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter amount"
          className="form-control mb-2"
          value={amt}
          onChange={e => setAmt(e.target.value)}
          required
        />
        <button className="btn btn-warning">Calculate</button>
      </form>
      {result && <div className="alert alert-info mt-2">{result}</div>}
    </div>
  );
}

export default CalculateEMI;
