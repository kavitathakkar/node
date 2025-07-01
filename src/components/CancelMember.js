import React, { useState } from 'react';
import API from '../api';

function CancelMember() {
  const [mobile, setMobile] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.delete('/cancelmember', { data: { mobile } });
      setMsg(res.data.data);
    } catch (err) {
      setMsg(err.response?.data?.data || 'Error');
    }
  };

  return (
    <div className="card p-4">
      <h4>Cancel Membership</h4>
      <form onSubmit={handleSubmit}>
        <input value={mobile} onChange={e => setMobile(e.target.value)} placeholder="Mobile" className="form-control mb-2" required />
        <button className="btn btn-danger">Cancel</button>
      </form>
      {msg && <div className="alert alert-info mt-2">{msg}</div>}
    </div>
  );
}

export default CancelMember;
