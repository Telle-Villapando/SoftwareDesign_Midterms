const BASE = 'http://localhost:5000/api';

export const api = {
  getJobs: () =>
    fetch(`${BASE}/jobs`)
      .then(r => r.json()),

  createJob: (data) =>
    fetch(`${BASE}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),

  updateJob: (id, data) =>
    fetch(`${BASE}/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),

  deleteJob: (id) =>
    fetch(`${BASE}/jobs/${id}`, {
      method: 'DELETE'
    }).then(r => r.json()),
};