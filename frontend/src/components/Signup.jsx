import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Signup.css'; // Styles for login/signup

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here (e.g. API call)
    console.log('User signed up:', formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login" className="auth-link">Sign In</Link></p>
      </div>
    </div>
  );
};

export default Signup;
