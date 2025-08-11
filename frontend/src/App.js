// import React, { useState } from "react";
// import "./App.css";

// function App() {
//   const [longUrl, setLongUrl] = useState("");
//   const [shortUrl, setShortUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!longUrl) {
//       setError("Please enter a valid URL");
//       return;
//     }
//     setError("");
//     setLoading(true);
//     setShortUrl("");

//     try {
//       const res = await fetch("http://localhost:5000/api/shorten", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ originalUrl: longUrl }),
//       });

//       const data = await res.json();
//       if (data.shortUrl) {
//         setShortUrl(data.shortUrl);
//       } else {
//         setError(data.error || "Something went wrong");
//       }
//     } catch (err) {
//       setError("Failed to connect to the server");
//     }
//     setLoading(false);
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(shortUrl);
//     alert("Copied to clipboard!");
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>🔗 URL Shortener</h1>
//         <form onSubmit={handleSubmit} className="url-form">
//           <input
//             type="url"
//             placeholder="Enter your long URL here..."
//             value={longUrl}
//             onChange={(e) => setLongUrl(e.target.value)}
//           />
//           <button type="submit" disabled={loading}>
//             {loading ? "Shortening..." : "Shorten URL"}
//           </button>
//         </form>

//         {error && <p className="error">{error}</p>}

//         {shortUrl && (
//           <div className="result">
//             <p>Short URL:</p>
//             <a href={shortUrl} target="_blank" rel="noopener noreferrer">
//               {shortUrl}
//             </a>
//             <button onClick={copyToClipboard}>📋 Copy</button>
//           </div>
//         )}
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";
import "./App.css";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!longUrl.trim()) {
      setError("❌ Please enter a valid URL");
      return;
    }

    setError("");
    setLoading(true);
    setShortUrl("");

    try {
      const res = await fetch("http://localhost:5000/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: longUrl }),
      });

      const data = await res.json();
      if (data.shortUrl) {
        setShortUrl(data.shortUrl);
      } else {
        setError(data.error || "⚠️ Something went wrong");
      }
    } catch (err) {
      setError("🚫 Failed to connect to the server");
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("✅ Short URL copied to clipboard!");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔗 URL Shortener</h1>
        <p className="subtitle">
          Paste a long URL below to get a short one instantly.
        </p>

        <form onSubmit={handleSubmit} className="url-form">
          <input
            type="url"
            placeholder="https://example.com"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "⏳ Shortening..." : "🚀 Shorten URL"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {shortUrl && (
          <div className="result">
            <p>Your short link is ready:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="short-link"
            >
              {shortUrl}
            </a>
            <button onClick={copyToClipboard} className="copy-btn">
              📋 Copy
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
