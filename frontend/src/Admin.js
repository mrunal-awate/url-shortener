import React, { useEffect, useState } from "react";
import "./Admin.css";

function Admin() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/urls/all")
      .then((res) => res.json())
      .then((data) => {
        setUrls(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching URLs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="admin-container">
      <h1>📊 URL Shortener - Admin Panel</h1>
      <table>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Visits</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url._id}>
              <td>
                <a href={url.originalUrl} target="_blank" rel="noreferrer">
                  {url.originalUrl}
                </a>
              </td>
              <td>
                <a
                  href={`http://localhost:5000/${url.shortCode}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {`http://localhost:5000/${url.shortCode}`}
                </a>
              </td>
              <td>{url.visits}</td>
              <td>{new Date(url.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
