import React, { useState } from 'react';
import API from '../api';

function MemberForm() {
  const [form, setForm] = useState({
    mobile: '',
    email: '',
    occupation: '',
    createpassword: ''
  });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/member', form);
      setMsg(res.data.data);
    } catch (err) {
      setMsg(err.response?.data?.data || 'Error occurred');
    }
  };

  return (
    <div className="card p-4">
      <h4>Register as Member</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" name="mobile" className="form-control mb-2" placeholder="Mobile" onChange={handleChange} required />
        <input type="email" name="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="occupation" className="form-control mb-2" placeholder="Occupation" onChange={handleChange} required />
        <input type="password" name="createpassword" className="form-control mb-2" placeholder="Password" onChange={handleChange} required />
        <button className="btn btn-primary">Submit</button>
      </form>
      {msg && <div className="alert alert-info mt-2">{msg}</div>}
    </div>
  );
}

export default MemberForm;
