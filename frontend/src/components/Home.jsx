import { useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCheck = async () => {
        if (!input.trim()) return;

        try {
            setLoading(true);
            const res = await axios.post('https://symentic-back.onrender.com/predict', {
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
                    <Link to='/login' className="nav-btn">Sign In</Link>
                    <Link to='/signup' className="nav-btn signup">Sign Up</Link>
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
    )
}

export default Home