import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/predict', {
        text: input,
      });
      setResult(res.data.prediction);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">🧠 SentimentAI</div>
        <div className="nav-buttons">
          <button className="nav-btn">Sign In</button>
          <button className="nav-btn signup">Sign Up</button>
        </div>
      </nav>

      {/* Main Card */}
      <div className="app-card">
        <h1>Review Sentiment Analysis</h1>
  
          <textarea
            rows="7"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your review..."
          ></textarea>
        <button onClick={handleCheck} disabled={loading}>
          {loading ? 'Analyzing...' : 'Check Sentiment'}
        </button>
        {result && (
          <div className={`result ${result}`}>
            <strong>{result.toUpperCase()} REVIEW</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
