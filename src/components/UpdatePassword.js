import React, { useState } from 'react';
import API from '../api';

function UpdatePassword() {
  const [form, setForm] = useState({ mobile: '', newpassword: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.put('/updatepassword', form);
      setMsg(res.data.data);
    } catch (err) {
      setMsg(err.response?.data?.data || 'Failed to update');
    }
  };

  return (
    <div className="card p-4">
      <h4>Update Password</h4>
      <form onSubmit={handleSubmit}>
        <input name="mobile" placeholder="Mobile" className="form-control mb-2" onChange={handleChange} required />
        <input name="newpassword" placeholder="New Password" type="password" className="form-control mb-2" onChange={handleChange} required />
        <button className="btn btn-secondary">Update</button>
      </form>
      {msg && <div className="alert alert-info mt-2">{msg}</div>}
    </div>
  );
}

export default UpdatePassword;
