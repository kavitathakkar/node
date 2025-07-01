import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

function RequestForm() {
  const { type } = useParams();
  const [form, setForm] = useState({ mobile: '', email: '', amt: '', msg: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = { ...form, type, code: type };
      const res = await API.post(`/service/${type}/form`, payload);
      setMsg(res.data.data);
    } catch (err) {
      setMsg(err.response?.data?.data || 'Error occurred');
    }
  };

  return (
    <div className="card p-4">
      <h4>Request for {type}</h4>
      <form onSubmit={handleSubmit}>
        <input name="mobile" placeholder="Mobile" className="form-control mb-2" onChange={handleChange} required />
        <input name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} required />
        <input name="amt" placeholder="Amount" type="number" className="form-control mb-2" onChange={handleChange} required />
        <input name="msg" placeholder="Message" className="form-control mb-2" onChange={handleChange} required />
        <button className="btn btn-success">Send Request</button>
      </form>
      {msg && <div className="alert alert-info mt-2">{msg}</div>}
    </div>
  );
}

export default RequestForm;
