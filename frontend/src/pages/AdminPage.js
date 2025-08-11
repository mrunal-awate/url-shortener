// src/pages/AdminPage.js
import React, { useEffect, useState } from "react";
import "./AdminPage.css";

function AdminPage() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/urls");
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `HTTP ${res.status}`);
        }
        const data = await res.json();
        setUrls(data);
      } catch (err) {
        setError(err.message || "Failed to load URLs");
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  return (
    <div className="admin-container">
      <h1 className="admin-title">📊 Admin Dashboard</h1>

      {loading && <p>Loading data...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && urls.length === 0 && <p>No URLs found.</p>}

      {!loading && !error && urls.length > 0 && (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Short Code</th>
                <th>Original URL</th>
                <th>Visits</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => (
                <tr key={url._id}>
                  <td>{url.shortCode}</td>
                  <td>
                    <a href={url.originalUrl} target="_blank" rel="noreferrer">
                      {url.originalUrl}
                    </a>
                  </td>
                  <td>{url.visits}</td>
                  <td>{new Date(url.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
